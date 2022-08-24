import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BackendCallerService, RadiolearnService} from "@app/core";
import {environment} from "@env/environment";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {getUUID} from "@app/helpers/uuidHelper";

@Component({
  selector: "app-radiolearn-welcome",
  templateUrl: "./radiolearn-welcome.component.html",
  styleUrls: ["./radiolearn-welcome.component.scss"]
})
export class RadiolearnWelcomeComponent implements OnInit, OnDestroy {

  assetsUrl = environment.assets;

  destroyed = new Subject<void>()
  currentScreenSize: string
  isMobile = false
  private UUID: string = "undefined"

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(
    private radiolearnService: RadiolearnService,
    private router: Router,
    private backendCaller: BackendCallerService,
    private breakPointObserver: BreakpointObserver
) {
    breakPointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(takeUntil(this.destroyed)).subscribe(result =>{
      for (const query of Object.keys(result.breakpoints)){
        if(result.breakpoints[query]){
          this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown'
          this.isMobile = this.currentScreenSize == 'Small' || this.currentScreenSize == 'XSmall'
        }
      }
    })
  }

ngOnInit(): void {
    this.UUID = getUUID()
  }

  detailedMode() {
    this.radiolearnService.detailedMode = true;
    this.loadUnused("deep")
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
        window.alert("Aktuell keine Aufnahmen vorhanden.")
      } else {
        this.openEditor(res.material._id);
      }
    }, err => {
      window.alert(err);
    });
  }

  loadUnused(mode: string){
    this.backendCaller.getUnusedMaterial(this.UUID, mode).subscribe(res => {
      console.log(res);
      if (res.material === null) {
        window.alert("Keine weiteren Befunde verfügbar");
      } else {
        this.router.navigate(["/", "radiolearn", "main", res.material._id]);
      }
    }, err => {
      if(err == "no-unused-materials"){
        console.log("No unused materials left")
        window.alert("No unused materials left")
      }else {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
  }

}
