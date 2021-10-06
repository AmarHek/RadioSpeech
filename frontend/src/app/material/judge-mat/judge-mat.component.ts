import {Component, HostListener, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import * as M from "../../core/models/templateModel";
import {Material} from "../../core/models/materialModel";
import {DataParserService} from "../../core/services/dataParser.service";
import {PopoutService} from "../../core/services/popout.service";
import {POPOUT_MODALS, PopoutData} from "../../core/services/popout.tokens";
import {BackendCallerService} from "../../core/services/backend-caller.service";

@Component({
  selector: "app-judge-mat",
  templateUrl: "./judge-mat.component.html",
  styleUrls: ["./judge-mat.component.scss"]
})
export class JudgeMatComponent implements OnInit, OnDestroy {

  material: Material;
  categories: M.Category[];
  report = "";
  judgement = "";

  constructor(private backendCaller: BackendCallerService,
              private route: ActivatedRoute,
              private router: Router,
              private dataParser: DataParserService,
              private popoutService: PopoutService) { }

  @HostListener("window:beforeunload", ["$event"])
  onWindowClose(event: Event) {
    this.popoutService.closePopoutModal();
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.popoutService.closePopoutModal();
  }

  getData() {
    this.route.paramMap.subscribe(ps => {
      if (ps.has("id")) {
        const matID = ps.get("id");
        this.backendCaller.getMaterialById(matID).subscribe((material: Material) => {
          if (material === undefined) {
            window.alert("Der Eintrag mit dieser ID existiert nicht! " +
              "Bitte zur Aufnahmenliste zurückkehren und eines der dort aufgeführten Aufnahmen auswählen.");
          } else {
            this.material = material;
            this.categories = this.dataParser.extractCategories(this.material.template.parts, false);
            this.openImagePopout();
          }
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
    const modalData: PopoutData = {
      scans: this.material.scans,
      coordinates: this.material.coordinates
    };
    this.popoutService.openPopoutModal(modalData);
  }

}
