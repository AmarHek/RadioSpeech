import {ENTER} from "@angular/cdk/keycodes";
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

import {
  AuthenticationService,
  BackendCallerService,
  DataParserService,
  InputParserService
} from "@app/core";
import {ComponentCanDeactivate} from "@app/guards/pending-changes.guard";
import {ChipHelperService} from "@app/core/services/chip-helper.service";
import {Category, ChipColors, InputChip, Role, Template, TopLevel, User} from "@app/models";
import {ReportOptionsComponent} from "@app/shared";
import {Observable} from "rxjs";

interface Layout{
  id: number;
  displayName: string;
}

export interface DialogData{
  id: string;
}

@Component({
  selector: "app-dialog-overview-example-dialog-component",
  templateUrl: "./app-dialog-overview-example-dialog-component.html",
})

export class DialogOverviewExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}

@Component({
  selector: "app-report-ui",
  templateUrl: "./report-ui.component.html",
  styleUrls: ["./report-ui.component.scss"],
})

export class ReportUiComponent implements OnInit, ComponentCanDeactivate {

  @ViewChild("chipInput") chipInput: ElementRef<HTMLInputElement> | undefined;

  @ViewChild(ReportOptionsComponent)
  private optionsComponent: ReportOptionsComponent;

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.sessionData.length <= this.savedSessionData;
  }

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER];
  selectedCat = "undefined";
  selectedSelectableID = "";

  chips: InputChip[] = [];

  layouts: Layout[] = [
    {id: 0, displayName: "Standard Layout"},
    {id: 1, displayName: "Kategorien Aufklappen"}
  ];

  currentLayout = this.layouts[1];

  parts: TopLevel[];
  defaultParts: TopLevel[];

  input = "";
  mergedInput = "";

  categories: Category[];
  report = "";
  judgement = "";

  //data collection
  timestampStart: number;
  imageID: string;
  mode: string;
  template: Template = undefined;
  timerStarted = false;
  sessionData = [];
  savedSessionData = 0;

  private user: User;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private dataParser: DataParserService,
              private _location: Location,
              private inputParser: InputParserService,
              private chipHelper: ChipHelperService,
              private backendCaller: BackendCallerService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService
              ) {
  }

  get isTester() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.tester);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  get pseudonym() {
    const extendedUsername = "user-" + this.user.username;
    return extendedUsername.split("").map(v => v.charCodeAt(0)).reduce(
      (a, v) => a + ((a << 7) + (a << 3)) ^ v).toString(16);
  }

  get dataFilename() {
    return this.user.username + "_" + (new Date().toLocaleString()) + ".json";
  }

  // auxiliary function to get parsed json (mostly because of missing excel parser in node)
  get downJson() {
    const jsonData = JSON.stringify(this.sessionData);
    const uri = "data:text/json;charset=UTF-8," + encodeURIComponent(jsonData);
    return this.sanitizer.bypassSecurityTrustUrl(uri);
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.getData();
    // data collection
  }

  // HANDLE CHIPS
  remove(chip: InputChip): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.reset(false, false);
    this.onInput();
  }

  onSelected(cat: string){
    this.chipInput.nativeElement.focus()
    this.selectedCat = cat;
    this.selectedSelectableID = "";
  }

  layoutChanged(newLayout: Layout){
    this.selectedCat = this.categories[0].name;
    this.currentLayout = newLayout;
  }

  // gets parts from node server via id in url
  getData() {
    this.route.paramMap.subscribe(ps => {
      if (ps.has("id")) {
        const templateID = ps.get("id");
        this.backendCaller.getTemplateById(templateID).subscribe((template: Template) => {
          if (template === undefined) {
            window.alert("Dieses Dictionary existiert nicht! " +
              "Bitte auf List Seite zurückkehren und eines der dort aufgeführten Dictionaries auswählen.");
          } else {
            this.template = template;
            this.parts = template.parts;
            this.defaultParts = JSON.parse(JSON.stringify(this.parts));
            this.categories = this.dataParser.extractCategories(this.parts);
            this.selectedCat = this.categories[0].name;
            this.inputParser.init(this.defaultParts);
            this.chipInput.nativeElement.focus()
          }
        });
      }
    });
  }

  updateText(): void {
    [this.report, this.judgement] = this.dataParser.makeText(this.parts);
  }

  resetText(): void {
    this.report = "";
    this.judgement = "";
  }

  onChipClick(chip: InputChip){
    this.selectedCat = chip.id.split(" ")[0];
    this.selectedSelectableID = chip.id;
  }

  onClick() {
    this.chipInput.nativeElement.focus()
    this.selectedSelectableID = "";
    setTimeout(() => this.updateText(), 1);
    setTimeout(() => this.modelChange(), 5);
  }

  //If useChips is set to false, inputs are handled exactly like before the implementations of chips
  onInput() {
    //Remove chips showing unrecognized text
    this.chipHelper.removeRedChips(this.chips);
    //remember old chips to prevent change of category if no new correct chip has been found
    const oldChips = JSON.stringify(this.chips);
    // Combine existing chips and text input into one input line
    this.mergedInput = this.chipHelper.getMergedInput(this.inputParser.autocorrect(this.input), this.chips);
    //Parse this input, assign the values and generate the new chips accordingly
    this.inputParser.parseInput(this.mergedInput);
    this.assignValues();
    this.generateChips();
    //navigate to category of last chip
    if(this.chips.length > 0 && JSON.stringify(this.chips) !== oldChips) {
      this.selectedCat = this.chips[this.chips.length-1].id.split(" ")[0];
    }
    // Remove everything that was detected as a clickable or variable from the input
    this.mergedInput = this.chipHelper.getTextWithoutVariables(this.mergedInput, this.inputParser.foundVariables);
    this.mergedInput = this.chipHelper.getTextWithoutClickables(this.mergedInput, this.inputParser.foundClickables);
    //Add a red chip containing unrecognized text if there is any
    if (this.mergedInput.trim() !== "") {
      this.chips.push(new InputChip(this.mergedInput, ChipColors.RED, null));
    }
    //Clear the text input
    this.input = "";
    this.chipInput.nativeElement.value = "";

    setTimeout(() => this.updateText(), 5);
  }

  generateChips(){
    this.selectedSelectableID = "";
    this.chips = this.chipHelper.generateChipsForParts(this.defaultParts, this.parts);
  }

  // TODO Auf Dataparser auslagern
  // Assigns all found keywords in inputParser to this.parts
  assignValues() {
    this.dataParser.assignValuesFromInputParser(this.categories, this.inputParser.foundClickables,
      this.inputParser.foundVariables);
  }

  makeNormal() {
    this.dataParser.makeNormal(this.parts);
    this.updateText();
    this.onInput();
  }

  modelChange(){
    this.chips = this.chipHelper.generateChipsForParts(this.defaultParts, this.parts);
  }

  // for when the radiologist finishes: empty parts and input
  // Will not be necessary once the input is streamed
  next() {
    this.reset();
    this.input = "";
  }

  resetDialog() {
    const reset = confirm("Formular zurücksetzen=");
    if (!reset) {
      return;
    } else {
      this.reset();
    }
  }

  reset(resetSelectedCat: boolean = true, resetChips = true) {
    this.parts = JSON.parse(JSON.stringify(this.defaultParts));
    this.categories = this.dataParser.extractCategories(this.parts);
    if (resetChips) {
      this.chips = [];
    }
    this.input = "";
    if(resetSelectedCat){
      this.selectedCat = this.categories[0].name;
    }
    if (resetSelectedCat) {
      this.selectedSelectableID = "";
    }
    setTimeout(() => this.optionsComponent.initRows(), 1);
    setTimeout(() => this.resetText(), 1);
  }

  submit(){
    const pseudonym = this.pseudonym;
    const duration = Date.now() - this.timestampStart;

    this.sessionData.push({
      template: this.template,
      timestampStart: this.timestampStart,
      duration,
      imageID: this.imageID,
      currentLayout: this.currentLayout.id,
      mode: this.mode,
      report: this.report + "\nJudgement below:\n" + this.judgement,
      pseudonym
    });

    this.backendCaller.addDoctorReport(
      this.template,
      this.timestampStart,
      duration,
      this.imageID,
      this.currentLayout.id,
      this.mode,
      this.report + "\nJudgement below:\n" + this.judgement,
      pseudonym
    ).subscribe(res => console.log(res.message));
  }

  startReportClicked(){
    this.openDialog();
    this.reset();
    this.updateText();
  }

  submitReportClicked(){
    this.timerStarted = false;
    this.submit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: "350px",
      data: {id: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mode = result.split("$")[1];
      this.imageID = result.split("$")[0];
      console.log("mode:" + this.mode);
      console.log("id:" + this.imageID);
      this.timerStarted = true;
      this.timestampStart = Date.now();
    });
  }

  updateSessionData(event) {
    console.log(event);
  }

}
