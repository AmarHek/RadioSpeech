import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BackendCallerService, DisplayService, RadiolearnService} from "@app/core";
import {environment} from "@env/environment";
import {getUUID} from "@app/helpers/uuidHelper";

@Component({
  selector: "app-radiolearn-welcome",
  templateUrl: "./radiolearn-welcome.component.html",
  styleUrls: ["./radiolearn-welcome.component.scss"]
})
export class RadiolearnWelcomeComponent implements OnInit {

  assetsUrl = environment.assets;

  currentScreenSize: string;
  isMobile = false;
  private uuid = "undefined";

  constructor(
    private radiolearnService: RadiolearnService,
    private router: Router,
    private backendCaller: BackendCallerService,
    private displayService: DisplayService,
) {  }

  ngOnInit(): void {
    this.uuid = getUUID();
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

  loadRandom() {
    this.backendCaller.getRandom(true).subscribe(res => {
      if (res.material === null || res.material === undefined) {
        window.alert("Aktuell keine Aufnahmen vorhanden.");
      } else {
        this.openEditor(res.material._id);
      }
    }, err => {
      window.alert(err);
    });
  }

  loadUnused(mode: string){
    this.backendCaller.getUnusedMaterial(this.uuid, mode).subscribe(res => {
      console.log(res);
      if (res.material === null) {
        window.alert("Keine weiteren Befunde verfügbar");
      } else {
        this.router.navigate(["/", "radiolearn", "main", res.material._id]);
      }
    }, err => {
      if(err === "no-unused-materials"){
        console.log("No unused materials left");
        window.alert("No unused materials left");
      }else {
        console.log(err);
      }
    });
  }

}
