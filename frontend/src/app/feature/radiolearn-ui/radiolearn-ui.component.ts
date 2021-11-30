import {Component, HostListener, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import * as M from "@app/models/templateModel";
import {Material, Role, User} from "@app/models";
import {
  DataParserService,
  PopoutService,
  POPOUT_MODALS,
  PopoutData,
  BackendCallerService,
  AuthenticationService
} from "@app/core";

@Component({
  selector: "app-judge-mat",
  templateUrl: "./radiolearn-ui.component.html",
  styleUrls: ["./radiolearn-ui.component.scss"]
})
export class RadiolearnUiComponent implements OnInit, OnDestroy {

  material: Material;
  categories: M.Category[];
  report = "";
  judgement = "";

  private user: User;

  constructor(private backendCaller: BackendCallerService,
              private route: ActivatedRoute,
              private router: Router,
              private dataParser: DataParserService,
              private popoutService: PopoutService,
              private authenticationService: AuthenticationService) { }

  @HostListener("window:beforeunload", ["$event"])
  onWindowClose(event: Event) {
    this.popoutService.closePopoutModal();
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.getData();
  }

  ngOnDestroy(): void {
    this.popoutService.closePopoutModal();
  }

  getData() {
    this.route.paramMap.subscribe(ps => {
      if (ps.has("id")) {
        const matID = ps.get("id");
        this.backendCaller.getMaterialById(matID).subscribe(res => {
          if (res.material === undefined) {
            window.alert("Der Eintrag mit dieser ID existiert nicht! " +
              "Bitte zur Aufnahmenliste zurückkehren und eines der dort aufgeführten Aufnahmen auswählen.");
          } else {
            this.material = res.material;
            this.categories = this.dataParser.extractCategories(this.material.template.parts, false);
            this.openImagePopout();
          }
        }, err => {
          window.alert(err.message);
        });
      }
    });
  }

  updateText(): void {
    [this.report, this.judgement] = this.dataParser.makeText(this.material.template.parts);
  }

  resetText(): void {
    this.report = "";
    this.judgement = "";
  }

  onClick() {
    setTimeout(() => this.updateText(), 1);
  }

  makeNormal() {
    this.dataParser.makeNormal(this.material.template.parts);
    this.updateText();
    console.log(POPOUT_MODALS["componentInstance"]);
  }

  submit() {
    this.backendCaller.updateMaterial(this.material).subscribe(res => {
      window.alert(res.message);
      this.router.navigateByUrl("/listMat");
    });
  }

  openImagePopout() {
    const restricted = !(this.user.role === Role.Admin || this.user.role === Role.Moderator);
    const modalData: PopoutData = {
      scans: this.material.scans,
      coordinates: this.material.coordinates,
      restricted
    };
    this.popoutService.openPopoutModal(modalData);
  }

}
