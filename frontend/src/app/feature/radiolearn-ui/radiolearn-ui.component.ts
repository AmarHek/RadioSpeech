import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {
  AuthenticationService,
  BackendCallerService,
  DataParserService, DisplayService,
  InputParserService,
  MatDialogService,
  RadiolearnService
} from "@app/core";
import {BoxLabel, ChipColors, InputChip, Material, Role, User, Variable} from "@app/models";
import {CategoryError} from "@app/models/errorModel";
import {getResetCounter, getSurveyStatus, getUUID, increaseSurveyCounter} from "@app/helpers/localStorageHelper";

import * as M from "@app/models/templateModel";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
  FeedbackDialogComponent,
  ImageDisplayComponent,
  ImageDisplayStudentComponent,
  RadiolearnOptionsComponent,
  StudentErrorsComponent
} from "@app/shared";
import {ChipHelperService} from "@app/core/services/chip-helper.service";
import {DialogTemplateComponent} from "@app/feature/dialog-template/dialog-template.component";
import {DialogNoMaterialsComponent} from "@app/feature/dialog-no-materials/dialog-no-materials.component";

@Component({
  selector: "app-radiolearn-ui",
  templateUrl: "./radiolearn-ui.component.html",
  styleUrls: ["./radiolearn-ui.component.scss"]
})
export class RadiolearnUiComponent implements OnInit {

  @ViewChild(RadiolearnOptionsComponent) radiolearnOptionsChild: RadiolearnOptionsComponent;
  @ViewChild(ImageDisplayStudentComponent) imageDisplayStudentChild: ImageDisplayStudentComponent;
  @ViewChild(ImageDisplayComponent) imageDisplayChild: ImageDisplayComponent;
  @ViewChild("chipInput") chipInput: ElementRef<HTMLInputElement> | undefined;

  // data variables
  material: Material;
  ogMaterial: Material;
  deepCategories: M.Category[];
  shallowCategories: M.Category[];
  boxLabels: BoxLabel[];

  // variables for options/category UI
  selectedCatList = ["undefined"];
  selectedCat: string;

  // inputParser variables
  inputEnabled: boolean;
  chips: InputChip[] = [];
  input = "";
  mergedInput = "";
  selectedSelectableID = "";

  // state variables
  userMode: boolean;
  workMode: string; // "deep" or "shallow"

  // usageData variables
  timestampStart: number;
  sawFeedback = false;
  isMobile = false;

  private UUID = "undefined";
  showSurveyEveryNMaterials = 3;

  private user: User;

  constructor(private backendCaller: BackendCallerService,
              private route: ActivatedRoute,
              private router: Router,
              private dataParser: DataParserService,
              private authenticationService: AuthenticationService,
              private displayService: DisplayService,
              private radiolearnService: RadiolearnService,
              private chipHelper: ChipHelperService,
              private inputParser: InputParserService,
              private dialog: MatDialog,
              private dialogService: MatDialogService) {
  }

  get isMod() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.Moderator);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  get deepMode() {
    return (this.workMode === "deep");
  }

  ngOnInit() {
    // Mod or regular user?
    this.authenticationService.user.subscribe(
      (x) => {
        this.user = x;
        this.userMode = !this.isMod;
      });

    // mobile check
    this.displayService.isMobile.subscribe(res => {
      this.isMobile = res;
    });

    // get current mode
    if (this.radiolearnService.workMode !== undefined) {
      // try service first: if coming from radiolearn welcome, radiolearnservice.workMode should not be undefined
      this.workMode = this.radiolearnService.workMode;
      // add to localStorage afterwards
      localStorage.setItem("workMode", this.workMode);
    } else {
      // if here from reloading, try localStorage
      const workMode = localStorage.getItem("workMode");
      if (workMode !== null) {
        this.workMode = workMode
      } else {
        // default behaviour, if all else fails
        this.workMode = "deep"
      }

      console.log(this.workMode);
    }



    // get actual data
    this.getData().then();

    // data collection
    this.timestampStart = Date.now();
    this.UUID = getUUID()
  }

  async getData() {
    this.route.paramMap.subscribe(async (ps) => {
      if (ps.has("id")) {
        const matID = ps.get("id");
        await this.backendCaller.getMaterialById(matID).subscribe(res => {
          if (res.material === undefined) {
            window.alert("Der Eintrag mit dieser ID existiert nicht! " +
              "Bitte zur Aufnahmen-Liste zurückkehren und eine der dort aufgeführten Aufnahmen auswählen.");
          } else {
            this.material = res.material;
            this.ogMaterial = JSON.parse(JSON.stringify(res.material));
            if (!this.isMod) {
              this.material.deepDocTemplate = this.radiolearnService.resetTemplate(this.material.deepDocTemplate);
              this.material.shallowDocTemplate = this.radiolearnService.resetTemplate(this.material.shallowDocTemplate);
            }
            this.deepCategories = this.dataParser.extractCategories(this.material.deepDocTemplate.parts);
            this.shallowCategories = this.dataParser.extractCategories(this.material.shallowDocTemplate.parts);
            if (this.workMode === "deep") {
              console.log(this.deepCategories);
              this.inputParser.init(this.deepCategories);
            } else {
              this.inputParser.init(this.shallowCategories);
            }
            if (this.selectedCat === undefined) {
              this.selectedCat = this.deepCategories[0].name;
            }
            this.selectedCatList = [this.selectedCat];
            // Do this so radiolearn report-output-options don't break on route change
            if (this.radiolearnOptionsChild !== undefined) {
              this.radiolearnOptionsChild.categories = this.deepCategories;
            }
            this.getBoxLabels();
            this.sawFeedback = false
            let surveyStatus = getSurveyStatus()
            if (surveyStatus > 0 && surveyStatus % this.showSurveyEveryNMaterials == 0){
              this.openSurveyDialog()
            }
          }
        }, err => {
          window.alert(err.message);
        });
      }
    });
  }

  switchInputMode() {
    this.inputEnabled = !this.inputEnabled;
    this.input = "";
    this.generateChips();
  }

  updateFromVariable(selectable) {
    setTimeout(() => this.updateFromVariableDelayed(selectable), 5);
  }

  //A variable was clicked, check if any variables of its parent now are active, if yes => set parent to active
  updateFromVariableDelayed(selectable) {
    let anyVarsActive = false;
    selectable.variables.forEach(variable => {
      if (variable.kind === "oc" && variable.value !== undefined) {
        anyVarsActive = true;
      }
      if (variable.kind === "mc") {
        variable.values.forEach(value => {
          if (value[1]) {
            anyVarsActive = true;
          }
        });
      }
    });
    if (anyVarsActive) {
      selectable.value = true;
    }
    this.generateChips();
  }

  updateFromParent(selectable) {
    setTimeout(() => this.updateFromParentDelayed(selectable), 5);
  }

  updateFromOptions() {
    setTimeout(() => this.generateChips(), 5);
  }

  //A parent object was selected, check if it is now unchecked, if yes, disable all its variables
  updateFromParentDelayed(selectable) {
    if (!selectable.value) {
      selectable.variables.forEach(variable => {
        if (variable.kind === "oc") {
          variable.value = null;
        } else if (variable.kind === "mc") {
          variable.values.forEach(value => {
            value[1] = false;
          });
        }
      });
    }
    this.generateChips();
  }

  generateChips() {
    this.selectedSelectableID = "";
    if (this.workMode === "deep") {
      this.chips = this.chipHelper.generateChipsForParts(this.ogMaterial.deepDocTemplate.parts,
        this.material.deepDocTemplate.parts);
    } else {
      this.chips = this.chipHelper.generateChipsForParts(this.ogMaterial.shallowDocTemplate.parts,
        this.material.shallowDocTemplate.parts);
    }
  }

  openSurveyDialog(): void {
    this.dialog.open(DialogTemplateComponent);
  }

  openNoMaterialsLeftDialog(): void {
    this.dialog.open(DialogNoMaterialsComponent);
  }

  onSelect(event) {
    this.selectedCat = event.options[0].value;
  }

  getBoxLabels() {
    this.boxLabels = this.radiolearnService.getBoxLabels(this.material.shallowDocTemplate.parts[0] as M.Category);
  }

  makeNormal() {
    this.dataParser.makeNormal(this.material.deepDocTemplate.parts);
  }

  save() {
    this.radiolearnService.fillShallowTemplateByBoxAnnotations(this.material.shallowDocTemplate,
      this.material.annotations);
    this.backendCaller.updateMaterial(this.material).subscribe(res => {
      window.alert(res.message);
      this.nextMaterial();
    });
  }

  submit(){
    const duration = Date.now() - this.timestampStart;
    this.backendCaller.addUsageData(
      this.UUID,
      this.material._id,
      this.material.deepDocTemplate,
      this.material.shallowDocTemplate,
      this.workMode,
      this.timestampStart,
      duration,
      this.ogMaterial,
      getResetCounter()
    ).subscribe(res => {
      console.log(res.message);
      });
  }

  toggleUserMode() {
    this.userMode = !this.userMode;
  }

  switchMode() {
    if (this.workMode === "deep") {
      this.workMode = "shallow";
    } else {
      this.workMode = "deep";
    }
    localStorage.setItem("workMode", this.workMode);

    this.reset();
    this.initInputParser()
  }

  initInputParser() {
    if (this.workMode === "deep") {
      this.inputParser.init(this.deepCategories)
    } else {
      this.inputParser.init(this.shallowCategories);
    }
  }

  checkForErrors() {
    if(!this.sawFeedback){
      this.submit()
    }
    this.sawFeedback = true
    let errors: CategoryError[];
    if (this.workMode === "deep") {
      errors = this.radiolearnService.compareTemplates(this.ogMaterial.deepDocTemplate,
        this.material.deepDocTemplate);
    } else {
      errors = this.radiolearnService.compareTemplates(this.ogMaterial.shallowDocTemplate,
        this.material.shallowDocTemplate);
    }

    if (this.userMode) {
      this.imageDisplayStudentChild.toggleBoxes();
    }

    // Modal Dialog here, then await confirm press for next
    const dialogConfig = this.dialogService.defaultConfig("1100px", {errors});
    const dialogRef = this.dialog.open(StudentErrorsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.nextMaterial();
      }
    });
  }

  nextMaterial() {
    this.backendCaller.getUnusedMaterial(this.UUID, this.workMode, getResetCounter()).subscribe(res => {
      console.log(res);
      if (res.material === null) {
        window.alert("Keine weiteren Befunde verfügbar");
      } else {
        if (this.userMode) {
          if(this.imageDisplayStudentChild.displayBoxes) this.imageDisplayStudentChild.toggleBoxes();
        } else {
          if(this.imageDisplayChild.displayBoxes) this.imageDisplayChild.toggleBoxes();
        }
        this.sawFeedback = false
        increaseSurveyCounter()
        this.router.navigate(["/", "radiolearn", "main", res.material._id]);
      }
    }, err => {
      if (err === "no-unused-materials"){
        console.log("No unused materials left");
        this.openNoMaterialsLeftDialog();
      } else {
        console.log(err);
      }
    });
  }

  nextWarning() {
    const dialogData = new ConfirmDialogModel(
      "warning",
      "Warnung",
      "Nicht gespeicherte Daten gehen eventuell verloren. Nächste Aufnahme laden?");

    const dialogConfig = this.dialogService.defaultConfig("400px", dialogData);
    dialogConfig.position = {top: "50px"};

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {

      }
    });
  }

  feedbackModal() {
    const dialogConfig = this.dialogService.defaultConfig("700px", {
      userID: this.user.id,
      materialID: this.material._id
    });
    this.dialog.open(FeedbackDialogComponent, dialogConfig);
  }

  nextCategory(nextCat: string) {
    this.selectedCatList = [nextCat];
    this.selectedCat = nextCat;
  }

  back() {
    if (this.isMod) {
      this.router.navigate(["radiolearn/template-list"]).then();
    } else {
      this.router.navigate(["/"]).then();
    }
  }

  reset(resetChips: boolean = true) {
    if (resetChips) {
      this.chips = [];
    }
    this.input = "";
    if (this.radiolearnService.workMode === "deep") {
      this.material = JSON.parse(JSON.stringify(this.ogMaterial));
      this.deepCategories = this.dataParser.extractCategories(this.material.deepDocTemplate.parts);
    } else {
      this.material = JSON.parse(JSON.stringify(this.ogMaterial));
      this.shallowCategories = this.dataParser.extractCategories(this.material.shallowDocTemplate.parts);
    }
  }

  remove(chip: InputChip): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.reset(false);
    this.onInput();
  }

  onChipClick(chip: InputChip){
    // this.selectedCat = chip.clickable.category
    this.selectedCat = chip.id.split(" ")[0];
    this.selectedSelectableID = chip.id;
    console.log("selected selectable");
    console.log(">" + this.selectedSelectableID + "<");
    console.log("selected cat");
    console.log(">" + this.selectedCat + "<");
  }

  onInput() {
    for (const chip of this.chips){
      if(chip.color === ChipColors.RED){
        const index = this.chips.indexOf(chip);
        if (index >= 0) {
          this.chips.splice(index, 1);
        }
      }
    }
    // Combine existing chips and text input into one input line
    this.mergedInput = this.chipHelper.getMergedInput(this.input, this.chips, false);
    //Pare this line, assign the values and generate the new chips accordingly
    this.inputParser.parseInput(this.mergedInput);
    this.assignValues();
    this.generateChips();
    // Remove everything that was detected as a clickable or variable from the input
    this.mergedInput = this.chipHelper.getTextWithoutVariables(this.mergedInput, this.inputParser.foundVariables);
    this.mergedInput = this.chipHelper.getTextWithoutClickables(this.mergedInput, this.inputParser.foundClickables);
    if (this.input !== " ") {
      this.input = this.mergedInput.trimStart();
    }
    // Additionally, setting the value via ELEMENT REF is necessary for the case that text is pasted into the input
    // field, since otherwise the input text won't update via ngModel
    if (this.input.trim() !== "") {
      this.chips.push(new InputChip(this.input, ChipColors.RED, null));
    }
    this.input = "";
    this.chipInput.nativeElement.value = this.input;
  }

  assignValues() {
    if (this.radiolearnService.workMode === "deep") {
      this.dataParser.assignValuesFromInputParser(this.deepCategories, this.inputParser.foundClickables,
        this.inputParser.foundVariables);
    } else {
      this.dataParser.assignValuesFromInputParser(this.shallowCategories, this.inputParser.foundClickables,
        this.inputParser.foundVariables);
    }
  }

}
