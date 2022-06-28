import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {
  AuthenticationService,
  BackendCallerService,
  DataParserService,
  MatDialogService,
  RadiolearnService
} from "@app/core";
import {Material, Role, User} from "@app/models";
import {CategoryError} from "@app/models/errorModel";

import * as M from "@app/models/templateModel";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
  FeedbackDialogComponent,
  ImageDisplayComponent,
  ImageDisplayStudentComponent,
  StudentErrorsComponent,
  RadiolearnOptionsComponent
} from "@app/shared";

@Component({
  selector: "app-radiolearn-ui",
  templateUrl: "./radiolearn-ui.component.html",
  styleUrls: ["./radiolearn-ui.component.scss"]
})
export class RadiolearnUiComponent implements OnInit, OnChanges {

  @ViewChild(RadiolearnOptionsComponent) radiolearnOptionsChild: RadiolearnOptionsComponent;
  @ViewChild(ImageDisplayStudentComponent) imageDisplayStudentChild: ImageDisplayStudentComponent;
  @ViewChild(ImageDisplayComponent) imageDisplayChild: ImageDisplayComponent;

  material: Material;
  ogMaterial: Material;

  categories: M.Category[];
  boxLabels: string[];

  selectedCatList = ["undefined"];
  selectedCat: string;
  selectedPathologies: string[];
  correctPathologies: boolean[];

  userMode: boolean;

  private user: User;

  constructor(private backendCaller: BackendCallerService,
              private route: ActivatedRoute,
              private router: Router,
              private dataParser: DataParserService,
              private authenticationService: AuthenticationService,
              private radiolearnService: RadiolearnService,
              private dialog: MatDialog,
              private dialogService: MatDialogService) { }

  get isMod() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.Moderator);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  get detailedMode() {
    return this.radiolearnService.detailedMode;
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
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
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

  toggleUserMode() {
    this.userMode = !this.userMode;
  }

  switchMode() {
    this.radiolearnService.detailedMode = !this.radiolearnService.detailedMode;
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
    dialogConfig.position = { top: "50px" };

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
}
