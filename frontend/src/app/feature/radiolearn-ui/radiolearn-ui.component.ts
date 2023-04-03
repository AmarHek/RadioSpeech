import * as M from "@app/models/templateModel";
import {ActivatedRoute, Router} from "@angular/router";
import {BoxLabel, ChipColors, InputChip, Material, Role, Template, User} from "@app/models";
import {CategoryError} from "@app/models/errorModel";
import {ChipHelperService} from "@app/core/services/chip-helper.service";
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {DialogNoMaterialsComponent} from "@app/feature/dialog-no-materials/dialog-no-materials.component";
import {DialogTemplateComponent} from "@app/feature/dialog-template/dialog-template.component";
import {MatDialog} from "@angular/material/dialog";
import {getResetCounter, getSurveyStatus, getUUID, increaseSurveyCounter} from "@app/helpers/localStorageHelper";
import {
  FeedbackDialogComponent,
  ImageDisplayComponent,
  ImageDisplayStudentComponent,
  RadiolearnOptionsComponent,
  StudentErrorsComponent
} from "@app/shared";
import {
  AuthenticationService,
  BackendCallerService,
  DataParserService, DisplayService,
  InputParserService,
  MatDialogService,
  RadiolearnService
} from "@app/core";

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
  template: Template = undefined;
  ogTemplate: Template;
  emptyTemplate: Template;
  categories: M.Category[];

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

  get isMod() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.Moderator);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  get deepMode() {
    return (this.workMode === "deep");
  }

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
        // Template to be worked on
        this.template = this.workMode === "deep" ? this.material.deepDocTemplate : this.material.shallowDocTemplate;
        // Original Template to be compared against for error check
        this.ogTemplate = JSON.parse(JSON.stringify(this.template));
        // Empty Template to be compared against for chip generation
        this.emptyTemplate = this.radiolearnService.resetTemplate(JSON.parse(JSON.stringify(this.template)))

        if (!this.isMod) {
          this.template = this.radiolearnService.resetTemplate(this.template);
        }

        this.categories = this.dataParser.extractCategories(this.template.parts);
        this.inputParser.init(this.categories);
        this.selectedCat = this.categories[0].name;
        this.selectedCatList = [this.selectedCat];
        // Do this so radiolearn report-output-options don't break on route change
        if (this.radiolearnOptionsChild !== undefined) {
          this.radiolearnOptionsChild.categories = this.categories;
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

  openNoMaterialsLeftDialog(): void {
    this.dialog.open(DialogNoMaterialsComponent);
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

  onSelect(event) {
    this.selectedCat = event.options[0].value;
  }

  getBoxLabels() {
    this.boxLabels = this.radiolearnService.getBoxLabels(this.material.shallowDocTemplate.parts[0] as M.Category);
  }

  save() {
    this.radiolearnService.fillShallowTemplateByBoxAnnotations(this.material.shallowDocTemplate,
      this.material.annotations);
    this.backendCaller.updateMaterial(this.material).subscribe(res => {
      window.alert(res.message);
      this.nextMaterialToAnnotate();
    });
  }

  // SPECIFIC TO RADIOLEARN (no eval) (below until comment HANDLE CHIPS)
  toggleUserMode() {
    this.userMode = !this.userMode;
  }

  switchMode() {
    this.workMode = this.workMode === "deep" ? "shallow" : "deep";
    localStorage.setItem("workMode", this.workMode);
    this.reset();
    this.ngOnInit()
  }

  checkForErrors() {
    if (!this.sawFeedback) {
      this.submit();
      this.errors = this.radiolearnService.compareTemplates(this.ogTemplate, this.template)
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

  // HANDLE CHIPS
  onChipClick(chip: InputChip) {
    this.selectedCat = chip.id.split(" ")[0];
    this.selectedSelectableID = chip.id;
  }

  remove(chip: InputChip): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.reset(false);
    this.onInput();
  }

  reset(resetUI: boolean = true) {
    if (resetUI) {
      this.chips = [];
      this.selectedCat = this.categories[0].name;
      this.selectedSelectableID = "";
    }
    this.input = "";
    this.template = JSON.parse(JSON.stringify(this.emptyTemplate));
    this.categories = this.dataParser.extractCategories((this.template.parts))
  }

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
    if (this.chips.length > 0 && JSON.stringify(this.chips) !== oldChips) {
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

  updateFromOptions() {
    this.chipInput.nativeElement.focus()
    this.selectedSelectableID = "";
    // setTimeout(() => this.updateText(), 1);
    setTimeout(() => this.generateChips(), 5);
  }

  assignValues() {
    // Assigns all found keywords in inputParser to this.parts
    this.dataParser.assignValuesFromInputParser(this.categories, this.inputParser.foundClickables,
      this.inputParser.foundVariables);
  }

  generateChips() {
    this.selectedSelectableID = "";
    this.chips = this.chipHelper.generateChipsForParts(this.emptyTemplate.parts, this.template.parts);
  }

  makeNormal() {
    this.dataParser.makeNormal(this.template.parts);
  }

  // DATA COLLECTION
  submit() {
    if (!this.SAVE_EVALUATION_DATA) return

    const duration = Date.now() - this.timestamp;
    this.backendCaller.addUsageData(
      this.uuid,
      this.material._id,
      this.template,
      this.ogTemplate,
      this.workMode,
      this.timestamp,
      duration,
      getResetCounter()
    ).subscribe(res => {
      console.log(res.message);
    });
  }

  openSurveyDialog(): void {
    //todo rework dialogs
    this.dialog.open(DialogTemplateComponent);
  }

}
