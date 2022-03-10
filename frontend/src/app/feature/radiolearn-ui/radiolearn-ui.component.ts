import {Component, HostListener, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import * as M from "@app/models/templateModel";
import {Material, Role, User} from "@app/models";
import {
  DataParserService,
  PopoutService,
  POPOUT_MODALS,
  PopoutData,
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
export class RadiolearnUiComponent implements OnInit, OnDestroy {

  @ViewChild(RadiolearnOptionsComponent) radiolearnOptionsChild: RadiolearnOptionsComponent;
  @ViewChild(InlineImageDisplayComponent) inlineImageDisplayChild: InlineImageDisplayComponent;

  material: Material;
  ogMaterial: Material;

  categories: M.Category[];
  report = "";
  judgement = "";
  selectedCat = "undefined";

  submitText: string;
  private user: User;

  constructor(private backendCaller: BackendCallerService,
              private route: ActivatedRoute,
              private router: Router,
              private dataParser: DataParserService,
              private popoutService: PopoutService,
              private authenticationService: AuthenticationService,
              private radiolearnService: RadiolearnService,
              private dialog: MatDialog,
              private dialogService: MatDialogService) { }

  get isMod() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.Moderator);
  }

  @HostListener("window:beforeunload", ["$event"])
  onWindowClose() {
    this.popoutService.closePopoutModal();
  }

  async ngOnInit() {
    await this.authenticationService.user.subscribe(x => this.user = x);
    await this.getData();
    if (this.isMod) {
      this.submitText = "Speichern";
    } else {
      this.submitText = "Prüfen";
    }
  }

  ngOnDestroy(): void {
    this.popoutService.closePopoutModal();
  }

  async getData() {
    this.route.paramMap.subscribe(async (ps) => {
      if (ps.has("id")) {
        const matID = ps.get("id");
        await this.backendCaller.getMaterialById(matID).subscribe(res => {
          if (res.material === undefined) {
            window.alert("Der Eintrag mit dieser ID existiert nicht! " +
              "Bitte zur Aufnahmenliste zurückkehren und eines der dort aufgeführten Aufnahmen auswählen.");
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

  makeNormal() {
    this.dataParser.makeNormal(this.material.template.parts);
  }

  save() {
    this.backendCaller.updateMaterial(this.material).subscribe(res => {
      window.alert(res.message);
      this.next();
    });
  }

  check() {
    const errors = this.radiolearnService.compareTemplates(this.ogMaterial.template, this.material.template);

    // POPOUT_MODALS["componentInstance"].boxDisplayConfirmed = true;
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

  openImagePopout() {
    const restricted = this.isRestricted();
    const modalData: PopoutData = {
      scans: this.material.scans,
      annotations: this.material.annotations,
      restricted
    };
    this.popoutService.openPopoutModal(modalData);
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