import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import * as M from "@app/models/templateModel";
import {Material, Pathology, Role, User} from "@app/models";
import {
  DataParserService,
  BackendCallerService,
  AuthenticationService, RadiolearnService, MatDialogService
} from "@app/core";
import {MatDialog} from "@angular/material/dialog";
import {RadiolearnErrorsComponent} from "@app/shared/radiolearn-errors/radiolearn-errors.component";
import {FeedbackDialogComponent} from "@app/shared/feedback-dialog/feedback-dialog.component";
import {RadiolearnOptionsComponent} from "@app/shared/radiolearn-options/radiolearn-options.component";
import {InlineImageDisplayComponent} from "@app/shared/inline-image-display/inline-image-display.component";

@Component({
  selector: "app-judge-mat",
  templateUrl: "./radiolearn-ui.component.html",
  styleUrls: ["./radiolearn-ui.component.scss"]
})
export class RadiolearnUiComponent implements OnInit {

  @ViewChild(RadiolearnOptionsComponent) radiolearnOptionsChild: RadiolearnOptionsComponent;
  @ViewChild(InlineImageDisplayComponent) inlineImageDisplayChild: InlineImageDisplayComponent;

  material: Material;
  ogMaterial: Material;

  categories: M.Category[];
  report = "";
  judgment = "";
  selectedCat = "undefined";

  pathologyList: Pathology[];

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

  updateText() {
    [this.report, this.judgment] = this.dataParser.makeText(this.material.template.parts);
    console.log(this.report, this.judgment);
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

    this.inlineImageDisplayChild.boxDisplayConfirmed = true;

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
        this.router.navigate(["/", "radiolearn", "main", res.material._id]).then();
      }
    });
  }

  isRestricted(): boolean {
    return !(this.user.role === Role.Admin || this.user.role === Role.Moderator);
}

  feedbackModal() {
    const dialogConfig = this.dialogService.defaultConfig("700px", {
      userID: this.user.id,
      materialID: this.material._id
    });
    this.dialog.open(FeedbackDialogComponent, dialogConfig);
  }

}
