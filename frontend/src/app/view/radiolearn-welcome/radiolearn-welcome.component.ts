import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BackendCallerService, DisplayService, RadiolearnService} from "@app/core";
import {environment} from "@env/environment";
import {getResetCounter, getUUID} from "@app/helpers/uuidHelper";
import {MatDialog} from "@angular/material/dialog";
import {DialogNoMaterialsComponent} from "@app/feature/dialog-no-materials/dialog-no-materials.component";

@Component({
  selector: "app-radiolearn-welcome",
  templateUrl: "./radiolearn-welcome.component.html",
  styleUrls: ["./radiolearn-welcome.component.scss"]
})
export class RadiolearnWelcomeComponent implements OnInit {

  assetsUrl = environment.assets;

  isMobile = false;
  private UUID = "undefined";

  constructor(
    private radiolearnService: RadiolearnService,
    private router: Router,
    private backendCaller: BackendCallerService,
    private displayService: DisplayService,
    private dialog: MatDialog
) {  }

  ngOnInit(): void {
    this.UUID = getUUID();
    this.displayService.isMobile.subscribe(res => {
       this.isMobile = res;
       console.log(this.isMobile);
    });
  }

  detailedMode() {
    this.radiolearnService.detailedMode = true;
    this.loadUnused("deep");
  }

  simpleMode() {
    this.radiolearnService.detailedMode = false;
    this.loadUnused("shallow");
  }

  openEditor(matID: string) {
    this.router.navigate(["/", "radiolearn", "main", matID]).then();
  }

  loadUnused(mode: string){
    this.backendCaller.getUnusedMaterial(this.UUID, mode, getResetCounter()).subscribe(res => {
      console.log(res);
      if (res.material === null) {
        window.alert("Keine weiteren Befunde verfügbar");
      } else {
        this.router.navigate(["/", "radiolearn", "main", res.material._id]);
      }
    }, err => {
      if(err === "no-unused-materials"){
        this.dialog.open(DialogNoMaterialsComponent)
      }else {
        console.log(err);
      }
    });
  }

}
