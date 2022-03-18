import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

import * as M from "@app/models/templateModel";
import {Material, Pathology, Role, User} from "@app/models";
import {
  DataParserService,
  BackendCallerService,
  AuthenticationService, RadiolearnService, MatDialogService
} from "@app/core";
import {RadiolearnErrorsComponent, FeedbackDialogComponent, RadiolearnOptionsComponent} from "@app/shared";

@Component({
  selector: "app-judge-mat",
  templateUrl: "./radiolearn-ui.component.html",
  styleUrls: ["./radiolearn-ui.component.scss"]
})
export class RadiolearnUiComponent implements OnInit {

  @ViewChild(RadiolearnOptionsComponent) radiolearnOptionsChild: RadiolearnOptionsComponent;

  material: Material;
  ogMaterial: Material;

  categories: M.Category[];
  report = "";
  judgment = "";
  selectedCat = ["undefined"];

  pathologyList: Pathology[];

  userMode: boolean;
  showBoxes = false;

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

  async ngOnInit() {
    this.userMode = !this.isMod;
    await this.authenticationService.user.subscribe(x => this.user = x);
    await this.getData();
    this.getPathologyList();
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

  getPathologyList() {
    this.backendCaller.getPathologyList().subscribe(res => {
      this.pathologyList = res.pathologyList;
    }, err => {
      console.log(err);
    });
  }

  makeNormal() {
    this.dataParser.makeNormal(this.material.template.parts);
  }

  save() {
    this.backendCaller.updateMaterial(this.material).subscribe(res => {
      window.alert(res.message);
      this.next();
    });
  }

  switchMode() {
    this.userMode = !this.userMode;
  }

  check() {
    const errors = this.radiolearnService.compareTemplates(this.ogMaterial.template, this.material.template);

    const modes = ["main", "lateral", "pre"];
    for (const mode of modes) {
      if (this.material.annotations[mode].length > 0) {
        const annotation =
          this.radiolearnService.checkCorrectAnnotations(this.material.annotations[mode], this.pathologyList,
          this.material.template);
      }
    }

    this.showBoxes = true;

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
    this.backendCaller.getRandom(true, this.radiolearnService.currentPathology).subscribe(res => {
      if (res.material._id === this.material._id) {
        this.next();
      } else {
        this.router.navigate(["/", "radiolearn", "main", res.material._id]);
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

  getSelectedCatIndex() {
    for (const category of this.categories) {
      if (category.name === this.selectedCat[0]) {
        return this.categories.indexOf(category);
      }
    }
  }

  nextCategory() {
    const idx = this.getSelectedCatIndex();
    const nextIdx = Math.min(idx + 1, this.categories.length - 1);
    this.selectedCat = [this.categories[nextIdx].name];
  }

  previousCategory() {
    const idx = this.getSelectedCatIndex();
    const nextIdx = Math.max(idx - 1, 0);
    this.selectedCat = [this.categories[nextIdx].name];
  }

}
