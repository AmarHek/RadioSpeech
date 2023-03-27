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
import {BoxLabel, ChipColors, InputChip, Material, Role, User} from "@app/models";
import {CategoryError} from "@app/models/errorModel";
import {getResetCounter, getSurveyStatus, getUUID, increaseSurveyCounter} from "@app/helpers/localStorageHelper";

import * as M from "@app/models/templateModel";
import {
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
  styleUrls: ["./radiolearn-ui.component.scss"],
})
export class RadiolearnUiComponent implements OnInit {

  @ViewChild(RadiolearnOptionsComponent) radiolearnOptionsChild: RadiolearnOptionsComponent;
  @ViewChild(ImageDisplayStudentComponent) imageDisplayStudentChild: ImageDisplayStudentComponent;
  @ViewChild(ImageDisplayComponent) imageDisplayChild: ImageDisplayComponent;
  @ViewChild("chipInput") chipInput: ElementRef<HTMLInputElement> | undefined;

  // debugging
  SAVE_EVALUATION_DATA = false

  // data variables
  material: Material;
  ogMaterial: Material;
  emptyMaterial: Material;
  deepCategories: M.Category[];
  shallowCategories: M.Category[];
  boxLabels: BoxLabel[];
  errors: CategoryError[];

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
  isMobile = false;
  anyComments = false;

  // usageData variables
  timestamp: number;
  sawFeedback = false;
  showSurveyEveryNMaterials = 3;
  private uuid = "undefined";

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
      console.log("isMobile: " + this.isMobile);
    });

    // get current mode
    this.setWorkMode();

    // get actual data
    this.getData().then();

    // data collection
    this.uuid = getUUID();
    this.timestamp = Date.now();
  }

  async getData() {
    this.route.paramMap.subscribe(async (ps) => {
      if (!ps.has("id")) return;
      const matID = ps.get("id");
      await this.backendCaller.getMaterialById(matID).subscribe(res => {
        if (res.material === undefined) {
          window.alert("Der Eintrag mit dieser ID existiert nicht! " +
            "Bitte zur Aufnahmen-Liste zurückkehren und eine der dort aufgeführten Aufnahmen auswählen.");
          return;
        }
        this.material = res.material;
        this.ogMaterial = JSON.parse(JSON.stringify(res.material));
        // since ogMaterial is partly filled out in radiolearn, an additional empty material is needed to compare against for chip creation
        this.emptyMaterial = JSON.parse(JSON.stringify(res.material));
        this.emptyMaterial.deepDocTemplate = this.radiolearnService.resetTemplate(this.emptyMaterial.deepDocTemplate);
        this.emptyMaterial.shallowDocTemplate = this.radiolearnService.resetTemplate(this.emptyMaterial.shallowDocTemplate);

        if (!this.isMod) {
          this.material.deepDocTemplate = this.radiolearnService.resetTemplate(this.material.deepDocTemplate);
          this.material.shallowDocTemplate = this.radiolearnService.resetTemplate(this.material.shallowDocTemplate);
        }
        this.deepCategories = this.dataParser.extractCategories(this.material.deepDocTemplate.parts);
        this.shallowCategories = this.dataParser.extractCategories(this.material.shallowDocTemplate.parts);
        if (this.workMode === "deep") {
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
        this.sawFeedback = false;

        //check if there are any comments in the annotations, to enable the "view comment" button
        this.anyComments = this.materialHasComments(this.material);
        this.imageDisplayStudentChild.hideToolTip();
        this.timestamp = Date.now();

        const surveyStatus = getSurveyStatus();
        if (surveyStatus > 0 && surveyStatus % this.showSurveyEveryNMaterials === 0) {
          this.openSurveyDialog();
        }
      }, err => {
        window.alert(err.message);
      });
    });
  }

  setWorkMode() {
    if (this.radiolearnService.workMode !== undefined) {
      // try service first: if coming from radiolearn welcome, radiolearnService.workMode should not be undefined
      this.workMode = this.radiolearnService.workMode;
      // add to localStorage afterwards
      localStorage.setItem("workMode", this.workMode);
    } else {
      // if here from reloading, try localStorage
      const workMode = localStorage.getItem("workMode");
      if (workMode !== null) {
        this.workMode = workMode;
      } else {
        // default behaviour, if all else fails
        this.workMode = "deep";
      }
    }
  }

  switchInputMode() {
    this.inputEnabled = !this.inputEnabled;
    this.input = "";
    this.generateChips();
  }

  // USED FOR SHALLOW
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
      this.chips = this.chipHelper.generateChipsForParts(this.emptyMaterial.deepDocTemplate.parts,
        this.material.deepDocTemplate.parts);
    } else {
      this.chips = this.chipHelper.generateChipsForParts(this.emptyMaterial.shallowDocTemplate.parts,
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
      this.nextMaterialToAnnotate();
    });
  }

  submit() {
    if (!this.SAVE_EVALUATION_DATA) return
    let deepToSave = null;
    let shallowToSave = null;
    if (this.workMode == "deep") {
      deepToSave = this.material.deepDocTemplate
      this.ogMaterial.shallowDocTemplate = null
    } else {
      shallowToSave = this.material.shallowDocTemplate
      this.ogMaterial.deepDocTemplate = null
    }

    const duration = Date.now() - this.timestamp;
    this.backendCaller.addUsageData(
      this.uuid,
      this.material._id,
      deepToSave,
      shallowToSave,
      this.workMode,
      this.timestamp,
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
    this.initInputParser();
  }

  initInputParser() {
    if (this.workMode === "deep") {
      this.inputParser.init(this.deepCategories);
    } else {
      this.inputParser.init(this.shallowCategories);
    }
  }

  checkForErrors() {
    if (!this.sawFeedback) {
      this.submit();
      if (this.workMode === "deep") {
        this.errors = this.radiolearnService.compareTemplates(this.ogMaterial.deepDocTemplate,
          this.material.deepDocTemplate);
      } else {
        this.errors = this.radiolearnService.compareTemplates(this.ogMaterial.shallowDocTemplate,
          this.material.shallowDocTemplate);
      }
      this.imageDisplayStudentChild.toggleBoxes();
    }

    // state variable
    this.sawFeedback = true;

    // Modal Dialog here, then await confirm press for next
    const errors = this.errors;
    const dialogConfig = this.dialogService.defaultConfig("1100px", {errors});
    const dialogRef = this.dialog.open(StudentErrorsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.nextMaterial();
      }
    });
  }

  nextMaterial() {
    if (this.userMode) {
      this.nextMaterialStudent();
    } else {
      if (window.confirm("Nicht gespeicherte Daten gehen verloren. Trotzdem nächste Aufnahme laden?")) {
        this.nextMaterialToAnnotate();
      }
    }
  }

  nextMaterialStudent() {
    this.backendCaller.getUnusedMaterial(this.uuid, this.workMode, getResetCounter()).subscribe(res => {
      if (res.material === null) {
        this.openNoMaterialsLeftDialog();
      } else {
        if (this.imageDisplayStudentChild.displayBoxes) {
          this.imageDisplayStudentChild.toggleBoxes();
        }
        this.sawFeedback = false;
        increaseSurveyCounter();
        this.router.navigate(["/", "radiolearn", "main", res.material._id]).then();
      }
    }, err => {
      console.log(err);
    });
  }

  nextMaterialToAnnotate() {
    if (this.imageDisplayChild.displayBoxes) {
      this.imageDisplayChild.toggleBoxes();
    }
    this.backendCaller.getRandom(false).subscribe(res => {
      console.log(res);
      if (res.material === null) {
        window.alert("Keine weiteren Befunde verfügbar");
      } else {
        this.router.navigate(["/", "radiolearn", "main", res.material._id]).then();
      }
    }, err => {
      window.alert(err);
      console.log(err);
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
      this.router.navigate(["radiolearn/list"]).then();
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

  onChipClick(chip: InputChip) {
    this.selectedCat = chip.id.split(" ")[0];
    this.selectedSelectableID = chip.id;
  }

  onInput() {
    //Remove chips showing unrecognized text
    this.chipHelper.removeRedChips(this.chips);
    // Combine existing chips and text input into one input line
    this.mergedInput = this.chipHelper.getMergedInput(this.input, this.chips);
    //Parse this input, assign the values and generate the new chips accordingly
    this.inputParser.parseInput(this.mergedInput);
    this.assignValues();
    this.generateChips();
    //navigate to category of last chip
    if (this.chips.length > 0) {
      this.selectedCat = this.chips[this.chips.length - 1].id.split(" ")[0];
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


  materialHasComments(material): boolean {
    let result = false;
    material.annotations.pre.forEach(annotation => {
      if (annotation.comment !== undefined) {
        if (annotation.comment.length > 0) {
          result = true;
        }
      }
    });
    material.annotations.lateral.forEach(annotation => {
      if (annotation.comment !== undefined) {
        if (annotation.comment.length > 0) {
          result = true;
        }
      }
    });
    material.annotations.main.forEach(annotation => {
      if (annotation.comment !== undefined) {
        if (annotation.comment.length > 0) {
          result = true;
        }
      }
    });
    return result;

  }

}
