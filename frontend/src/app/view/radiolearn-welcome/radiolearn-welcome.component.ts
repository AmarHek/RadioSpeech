import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BackendCallerService, RadiolearnService} from "@app/core";
import {environment} from "@env/environment";

@Component({
  selector: "app-radiolearn-welcome",
  templateUrl: "./radiolearn-welcome.component.html",
  styleUrls: ["./radiolearn-welcome.component.scss"]
})
export class RadiolearnWelcomeComponent implements OnInit {

  assetsUrl = environment.assets;

  constructor(
    private radiolearnService: RadiolearnService,
    private router: Router,
    private backendCaller: BackendCallerService
  ) { }

  ngOnInit(): void {
  }

  detailedMode() {
    this.radiolearnService.detailedMode = true;
    this.loadRandom();
  }

  simpleMode() {
    this.radiolearnService.detailedMode = false;
    this.loadRandom();
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

}
