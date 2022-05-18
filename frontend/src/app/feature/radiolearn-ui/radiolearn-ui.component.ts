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
import {Material, Pathology, Role, User} from "@app/models";

import * as M from "@app/models/templateModel";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
  FeedbackDialogComponent,
  ImageDisplayComponent,
  ImageDisplayStudentComponent,
  RadiolearnErrorsComponent,
  RadiolearnOptionsComponent
} from "@app/shared";

@Component({
  selector: "app-judge-mat",
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
  pathologyList: Pathology[];

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

  async ngOnInit() {
    this.authenticationService.user.subscribe(
      (x) => {
        this.user = x;
        this.userMode = !this.isMod;
      });
    await this.getData();
    this.getPathologyList();
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
              this.material.template = this.radiolearnService.resetTemplate(this.material.template);
            }
            this.categories = this.dataParser.extractCategories(this.material.template.parts, false);
            if (this.selectedCat === undefined) {
              this.selectedCat = this.categories[0].name;
            }
            this.selectedCatList = [this.selectedCat];
            // Do this so radiolearn options don't break on route change
            if (this.radiolearnOptionsChild !== undefined) {
              this.radiolearnOptionsChild.categories = this.categories;
            }
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

  getPathologyList() {
    this.backendCaller.getPathologyList().subscribe(res => {
      this.pathologyList = res.pathologyList;
      this.correctPathologies = new Array(this.pathologyList.length).fill(true);
    }, err => {
      console.log(err);
    });
  }

  makeNormal() {
    this.dataParser.makeNormal(this.material.template.parts);
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
    if (this.radiolearnService.detailedMode) {
      this.detailedCheck();
    } else {
      this.simpleCheck();
    }
  }

  simpleCheck() {
    if (this.userMode) {
      this.imageDisplayStudentChild.toggleBoxes();
    }

    this.correctPathologies = this.radiolearnService.comparePathologies(
      this.material.pathologies, this.selectedPathologies, this.pathologyList);

    console.log(this.material.pathologies);
    console.log(this.selectedPathologies);
    console.log(this.pathologyList);
    console.log(this.correctPathologies);
  }

  detailedCheck() {
    const errors = this.radiolearnService.compareTemplates(this.ogMaterial.template, this.material.template);

    const modes = ["main", "lateral", "pre"];
    for (const mode of modes) {
      if (this.material.annotations[mode].length > 0) {
        const annotation =
          this.radiolearnService.checkCorrectAnnotations(this.material.annotations[mode], this.pathologyList,
          this.material.template);
      }
    }

    if (this.userMode) {
      this.imageDisplayStudentChild.toggleBoxes();
    }

    // Modal Dialog here, then await confirm press for next
    const dialogConfig = this.dialogService.defaultConfig("1100px", {errors});
    const dialogRef = this.dialog.open(RadiolearnErrorsComponent, dialogConfig);

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
      this.router.navigate(["radiolearn/list"]).then();
    } else {
      this.router.navigate(["/"]).then();
    }
  }
}
