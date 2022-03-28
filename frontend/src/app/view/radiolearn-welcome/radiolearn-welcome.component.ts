import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BackendCallerService, RadiolearnService} from "@app/core";

@Component({
  selector: "app-radiolearn-welcome",
  templateUrl: "./radiolearn-welcome.component.html",
  styleUrls: ["./radiolearn-welcome.component.css"]
})
export class RadiolearnWelcomeComponent implements OnInit {

  constructor(
    private radiolearnService: RadiolearnService,
    private router: Router,
    private backendCaller: BackendCallerService
  ) { }

  ngOnInit(): void {
  }

  detailedMode() {
    this.radiolearnService.detailedMode = true;
    this.loadRandom()
  }

  simpleMode() {
    this.radiolearnService.detailedMode = false;
    this.loadRandom()
  }

  openEditor(matID: string) {
    this.router.navigate(["/", "radiolearn", "main", matID]).then();
  }

  loadRandom() {
    this.backendCaller.getRandom(true, "").subscribe(res => {
      this.openEditor(res.material._id);
    }, err => {
      window.alert(err);
    });
  }

}
