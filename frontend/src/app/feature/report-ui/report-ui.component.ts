import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

import {AuthenticationService, BackendCallerService, DataParserService, InputParserService} from "@app/core";
import {ReportOptionsComponent} from "@app/shared";
import {Category, ColoredText, InputChip, Role, Template, TopLevel, User, Variable} from "@app/models";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {ChipHelperService} from "@app/core/services/chip-helper.service";

interface Layout{
  id: number;
  displayName: string;
}

@Component({
  selector: "app-workspace",
  templateUrl: "./report-ui.component.html",
  styleUrls: ["./report-ui.component.scss"],
})

export class ReportUiComponent implements OnInit {

  @ViewChild("chipInput") chipInput: ElementRef<HTMLInputElement> | undefined;

  @ViewChild(ReportOptionsComponent)
  private optionsComponent: ReportOptionsComponent;

  useChips = true;
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

  currentLayout = this.layouts[0];

  parts: TopLevel[];
  defaultParts: TopLevel[];

  input = "";
  mergedInput = ""
  foundKeywords: ColoredText[] = [];

  categories: Category[];
  report = "";
  judgment = "";

  downJson: SafeUrl;

  private user: User;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private dataParser: DataParserService,
              private _location: Location,
              private inputParser: InputParserService,
              private chipHelper: ChipHelperService,
              private backendCaller: BackendCallerService,
              private sanitizer: DomSanitizer,
              private authenticationService: AuthenticationService) {
  }

  get isModerator() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.Moderator);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.getData();
  }

//HANDLE CHIPS
  add(event: MatChipInputEvent): void {
    // Clear the input value
    // event.chipInput?.clear();
  }

  remove(chip: InputChip): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.reset(false, false)
    this.onInput(new Event(""))
  }

  onSelected(cat: string){
    this.selectedCat = cat;
    this.selectedSelectableID = ""
  }

  layoutChanged(newLayout: Layout){
    this.selectedCat = "undefined";
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
            this.parts = template.parts;
            this.defaultParts = JSON.parse(JSON.stringify(this.parts));
            this.categories = this.dataParser.extractCategories(this.parts);
            this.inputParser.init(this.defaultParts);
          }
        });
      }
    });
  }

  // auxiliary function to get parsed json (mostly because of missing excel parser in node)
  generateDownloadJson(jsonData) {
    const json = JSON.stringify(jsonData);
    this.downJson = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));
  }

  updateText(): void {
    console.log(this.parts);
    [this.report, this.judgment] = this.dataParser.makeText(this.parts);
  }

  resetText(): void {
    this.report = "";
    this.judgment = "";
  }

  onChipClick(chip: InputChip){
    // this.selectedCat = chip.clickable.category
    this.selectedCat = chip.id.split(" ")[0]
    this.selectedSelectableID = chip.id
  }

  onClick() {
    this.selectedSelectableID = ""
    setTimeout(() => this.updateText(), 1);
    setTimeout(() => this.modelChange(), 5)
  }

  onBackSpaceKeyDown(event){
    //Override onBackSpaceKeyDown to prevent default behavior of deleting chips
    if(this.useChips){
      let chipCount = this.chips.length
      if(chipCount>0){
        let oldInput = this.input
        let newInput = ""
        this.chips.forEach(c => newInput += c.content + " ")
        newInput = newInput.trim()
        this.input = newInput + " " + oldInput
        this.chips = []
      }
    }
    this.reset()
    return true
  }

  //If useChips is set to false, inputs are handled exactly like before the implementations of chips
  onInput(ev) {
    if(ev.inputType === "deleteContentBackward") {
      //reset is now handled in onBackSpacePress
      // this.reset();
      return
    }
    if (this.input[this.input.length - 1] === " ") {
      this.input = this.inputParser.autocorrect(this.input);
    }

    if(this.useChips){
      console.log("___________________________________________________________________________________")
      //Check if previous run ended with text variable, if yes, don't automatically separate chip and input with spaces
      let trim = false
      let allVars = []
      this.inputParser.foundVariables.forEach(list => allVars = allVars.concat(list))
      if(allVars.length>0 && allVars[allVars.length-1].kind == "text"){
        if(this.inputParser.foundClickables[this.inputParser.foundClickables.length-1].name == allVars[allVars.length-1].selectable){
          trim = true
        }
      }
      this.mergedInput = this.chipHelper.getMergedInput(this.input, this.chips, trim)
      console.log("------------------MERGED INPUT>" + this.mergedInput + "<")
      this.inputParser.parseInput(this.mergedInput);
      this.debugPrintVars()
    }else{
      this.inputParser.parseInput(this.input);
    }

    this.assignValues();
    if(this.useChips) this.generateChips()
    this.foundKeywords = this.inputParser.getColoredText(this.input);
    setTimeout(() => this.updateText(), 5);
  }


  debugPrintVars(){
    console.log("--FOUND VARIABLES")
    console.log(this.inputParser.foundVariables)
    this.inputParser.foundVariables.forEach(list => {
      list.forEach((v, i) => {
        console.log(i + ") "+v.textBefore + " synonym >" + v.synonym + "< pos[" + v.position + "," + v.positionEnd + "] substring >" + this.mergedInput.substring(v.position, v.positionEnd) + "< value >" + v.value + "<")
      })
    })
  }


  generateChips(){
    this.mergedInput = this.chipHelper.getTextWithoutVariables(this.mergedInput, this.inputParser.foundVariables)
    console.log("TEXT NO VARS>" + this.mergedInput + "<")
    this.mergedInput = this.chipHelper.getTextWithoutClickables(this.mergedInput, this.inputParser.foundClickables)
    console.log("TEXT NO CLICKABLES>" + this.mergedInput + "<")
    //Add chips displaying the active clickables and variables, deduced from this.parts
    this.chips = this.chipHelper.generateChipsForParts(this.defaultParts, this.parts)
    //Show the remaining text that was not detected as part of a clickable or a variable
    if(this.input != " ") this.input = this.mergedInput.trimStart()
    //Additionally setting the value via ELEMENT REF is necessary for the case that text is pasted into the input
    //field, since otherwise the input text won't update via ngModel
    this.chipInput.nativeElement.value = this.input
    this.selectedSelectableID = ""
  }

  // Assigns all found keywords in inputParser to this.parts
  assignValues() {
    for (const key of this.inputParser.foundClickables) {
      if (key.name === "Rest normal") {
        this.makeNormal();
        continue
      }

      const foundVariables = this.inputParser.foundVariables.get(key.category + " " + key.name);
      const cat = this.categories.find(c =>
        c.name === key.category
      );
      const sel = cat.selectables.find(s =>
        s.name === key.name || s.name === key.group
      );
      let variables: Variable[];
      if (sel.kind === "box") {
        sel.value = true;
        variables = sel.variables;
      } else {
        sel.value = key.name;
        const option = sel.options.find(o => o.name === key.name);
        variables = option.variables;
      }
      // assign variable values
      if (variables.length <= 0 || foundVariables === undefined) continue

      for (const varKey of foundVariables) {
        const vari = variables.find(v => v.id === varKey.id);
        if (vari.kind === "oc") {
          vari.value = varKey.name;
        } else if (vari.kind === "mc") {
          const val = vari.values.find(v => v[0] === varKey.name);
          val[1] = true;
        } else if (varKey.value !== undefined) {
          if (vari.kind === "ratio") {
            vari.numerator = varKey.value[0] as number;
            vari.denominator = varKey.value[1] as number;
          } else if (vari.kind === "text") {
            vari.value = varKey.value as string;
          } else if (vari.kind === "number") {
            vari.value = varKey.value as number;
          } else {
            vari.value = varKey.value as NgbDateStruct;
          }
        }
      }
    }
  }

  makeNormal() {
    this.dataParser.makeNormal(this.parts);
    this.updateText();
    this.onInput(new Event(""))
  }

  modelChange(){
    this.chips = this.chipHelper.generateChipsForParts(this.defaultParts, this.parts)
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
    if (resetChips) this.chips = []
    this.input = ""
    this.selectedCat = this.categories[0].name
    if (resetSelectedCat) this.selectedSelectableID = ""
    setTimeout(() => this.optionsComponent.initRows(), 1);
    setTimeout(() => this.resetText(), 1);
  }
}

