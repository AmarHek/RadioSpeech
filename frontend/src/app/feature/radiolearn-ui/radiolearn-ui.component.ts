import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {
  AuthenticationService,
  BackendCallerService,
  DataParserService,
  InputParserService,
  MatDialogService,
  RadiolearnService
} from "@app/core";
import {ChipColors, InputChip, Material, Role, User, Variable} from "@app/models";
import {CategoryError} from "@app/models/errorModel";

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
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-radiolearn-ui",
  templateUrl: "./radiolearn-ui.component.html",
  styleUrls: ["./radiolearn-ui.component.scss"]
})
export class RadiolearnUiComponent implements OnInit, OnChanges {

  @ViewChild(RadiolearnOptionsComponent) radiolearnOptionsChild: RadiolearnOptionsComponent;
  @ViewChild(ImageDisplayStudentComponent) imageDisplayStudentChild: ImageDisplayStudentComponent;
  @ViewChild(ImageDisplayComponent) imageDisplayChild: ImageDisplayComponent;
  @ViewChild("chipInput") chipInput: ElementRef<HTMLInputElement> | undefined;

  material: Material;
  ogMaterial: Material;

  categories: M.Category[];
  boxLabels: string[];

  selectedCatList = ["undefined"];
  selectedCat: string;
  selectedPathologies: string[];
  correctPathologies: boolean[];

  inputEnabled: boolean;
  chips: InputChip[] = []
  input: string = ""
  mergedInput: string = ""
  selectedSelectableID: string = ""

  userMode: boolean;

  private user: User;

  timestampStart: number;

  constructor(private backendCaller: BackendCallerService,
              private route: ActivatedRoute,
              private router: Router,
              private dataParser: DataParserService,
              private authenticationService: AuthenticationService,
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

  get detailedMode() {
    return this.radiolearnService.detailedMode;
  }

  switchInputMode() {
    this.inputEnabled = !this.inputEnabled;
    this.input = ""
    this.generateChips()
  }

  updateFromVariable(selectable) {
    setTimeout(() => this.updateFromVariableDelayed(selectable), 5)
  }

  //A variable was clicked, check if any variables of its parent now are active, if yes => set parent to active
  updateFromVariableDelayed(selectable) {
    let anyVarsActive = false
    selectable.variables.forEach(variable => {
      if (variable.kind == 'oc' && variable.value != undefined) {
        anyVarsActive = true
      }
      if (variable.kind == 'mc') {
        variable.values.forEach(value => {
          if (value[1]) {
            anyVarsActive = true
          }
        })
      }
    })
    if (anyVarsActive) {
      selectable.value = true
    }
    this.generateChips()
  }

  updateFromParent(selectable) {
    setTimeout(() => this.updateFromParentDelayed(selectable), 5)
  }

  updateFromOptions() {
    setTimeout(() => this.generateChips(), 5)
  }

  //A parent object was selected, check if it is now unchecked, if yes, disable all its variables
  updateFromParentDelayed(selectable) {
    if (!selectable.value) {
      selectable.variables.forEach(variable => {
        if (variable.kind == 'oc') {
          variable.value = null
        } else if (variable.kind == 'mc') {
          variable.values.forEach(value => {
            value[1] = false
          })
        }
      })
    }
    this.generateChips()
  }

  generateChips() {
    this.selectedSelectableID = ""
    if (this.radiolearnService.detailedMode) {
      this.chips = this.chipHelper.generateChipsForParts(this.ogMaterial.deepDocTemplate.parts, this.material.deepDocTemplate.parts)
    } else {
      this.chips = this.chipHelper.generateChipsForParts(this.ogMaterial.shallowDocTemplate.parts, this.material.shallowDocTemplate.parts)
    }
  }

  get colorBlindMode() {
    return this.radiolearnService.colorBlindMode;
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(
      (x) => {
        this.user = x;
        this.userMode = !this.isMod;
      });
    this.getData().then();
    this.timestampStart = Date.now()
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }

  async getData() {
    this.route.paramMap.subscribe(async (ps) => {
      if (ps.has("id")) {
        const matID = ps.get("id");
        await this.backendCaller.getMaterialById(matID).subscribe(res => {
          if (res.material === undefined) {
            window.alert("Der Eintrag mit dieser ID existiert nicht! " +
              "Bitte zur Aufnahmen-Liste zurückkehren und eines der dort aufgeführten Aufnahmen auswählen.");
          } else {
            this.material = res.material;
            this.ogMaterial = JSON.parse(JSON.stringify(res.material));
            if (!this.isMod) {
              this.material.deepDocTemplate = this.radiolearnService.resetTemplate(this.material.deepDocTemplate);
            }
            this.categories = this.dataParser.extractCategories(this.material.deepDocTemplate.parts, false);
            //Todo, remove line below, once keys are automatically added during parsing of templates
            this.dataParser.addVariableKeysToParts(this.categories)
            this.inputParser.init(this.categories)
            if (this.selectedCat === undefined) {
              this.selectedCat = this.categories[0].name;
            }
            this.selectedCatList = [this.selectedCat];
            // Do this so radiolearn report-output-options don't break on route change
            if (this.radiolearnOptionsChild !== undefined) {
              this.radiolearnOptionsChild.categories = this.categories;
            }
            this.getBoxLabels();
          }
        }, err => {
          window.alert(err.message);
        });
      }
    });
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
    this.material.pathologies = this.radiolearnService.extractPathologies(this.material.annotations);
    this.backendCaller.updateMaterial(this.material).subscribe(res => {
      window.alert(res.message);
      this.next();
    });
  }

  submit(){
    let duration = Date.now() - this.timestampStart
    let modeString = this.radiolearnService.detailedMode ? "deep" : "shallow"
    this.backendCaller.addUsageData(
      this.material.deepDocTemplate,
      this.material.shallowDocTemplate,
      modeString,
      this.timestampStart,
      duration
    ).subscribe(res => {console.log(res.message)})
  }

  toggleUserMode() {
    this.userMode = !this.userMode;
  }

  switchMode() {
    this.radiolearnService.detailedMode = !this.radiolearnService.detailedMode;
    this.reset()
    this.inputParser.init(this.categories)
  }

  check() {
    let errors: CategoryError[];
    if (this.detailedMode) {
      errors = this.radiolearnService.compareTemplates(this.ogMaterial.deepDocTemplate,
        this.material.deepDocTemplate);
    } else {
      errors = this.radiolearnService.compareTemplates(this.ogMaterial.shallowDocTemplate,
        this.material.shallowDocTemplate);
    }

    // TODO: Reimplement correctness check
    /* const modes = ["main", "lateral", "pre"];
    for (const mode of modes) {
      if (this.material.annotations[mode].length > 0) {
        this.radiolearnService.checkCorrectAnnotations(this.material.annotations[mode],
          this.pathologyList, this.material.deepDocTemplate);
    } */

    if (this.userMode) {
      this.imageDisplayStudentChild.toggleBoxes();
    }

    // Modal Dialog here, then await confirm press for next
    const dialogConfig = this.dialogService.defaultConfig("1100px", {errors});
    const dialogRef = this.dialog.open(StudentErrorsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.next();
      }
    });
  }

  next() {
    const judged = !this.isMod;
    this.correctPathologies.fill(true);
    this.selectedPathologies = [];
    if (this.userMode) {
      this.imageDisplayStudentChild.toggleBoxes();
    } else {
      this.imageDisplayChild.toggleBoxes();
    }
    this.backendCaller.getRandom(judged, this.radiolearnService.currentPathology).subscribe(res => {
      if (res.material === null) {
        window.alert("Keine weiteren Befunde verfügbar");
      } else if (res.material._id === this.material._id) {
        this.next();
      } else {
        this.router.navigate(["/", "radiolearn", "main", res.material._id]);
      }
    }, err => {
      console.log(err);
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
    if (resetChips) this.chips = []
    this.input = ""
    if (this.radiolearnService.detailedMode) {
      //deep
      this.material = JSON.parse(JSON.stringify(this.ogMaterial))
      this.categories = this.dataParser.extractCategories(this.material.deepDocTemplate.parts, false);
      //Todo, remove line below, once keys are automatically added during parsing of templates
      this.dataParser.addVariableKeysToParts(this.categories)
    } else {
      //shallow
      this.material = JSON.parse(JSON.stringify(this.ogMaterial))
      this.categories = this.dataParser.extractCategories(this.material.shallowDocTemplate.parts, false);
      //Todo, remove line below, once keys are automatically added during parsing of templates
      this.dataParser.addVariableKeysToParts(this.categories)
    }
  }

  remove(chip: InputChip): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.reset(false)
    this.onInput()
  }

  onChipClick(chip: InputChip){
    // this.selectedCat = chip.clickable.category
    this.selectedCat = chip.id.split(" ")[0]
    this.selectedSelectableID = chip.id
    console.log("selected selectable")
    console.log(">" + this.selectedSelectableID + "<")
    console.log("selected cat")
    console.log(">" + this.selectedCat + "<")
  }

  onInput() {
    for (let chip of this.chips){
      if(chip.color == ChipColors.RED){
        const index = this.chips.indexOf(chip);
        if (index >= 0) {
          this.chips.splice(index, 1);
        }
      }
    }
    //Combine existing chips and text input into one input line
    this.mergedInput = this.chipHelper.getMergedInput(this.input, this.chips, false)
    //Pare this line, assign the values and generate the new chips accordingly
    this.inputParser.parseInput(this.mergedInput)
    this.assignValues()
    this.generateChips()
    //Remove everything that was detected as a clickable or variable from the input
    this.mergedInput = this.chipHelper.getTextWithoutVariables(this.mergedInput, this.inputParser.foundVariables)
    this.mergedInput = this.chipHelper.getTextWithoutClickables(this.mergedInput, this.inputParser.foundClickables)
    if (this.input != " ") this.input = this.mergedInput.trimStart()
    //Additionally setting the value via ELEMENT REF is necessary for the case that text is pasted into the input
    //field, since otherwise the input text won't update via ngModel
    if(this.input.trim() != "") this.chips.push(new InputChip(this.input, ChipColors.RED, null))
    this.input = ""
    this.chipInput.nativeElement.value = this.input
  }

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
}
