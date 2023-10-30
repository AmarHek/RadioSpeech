import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {environment} from "@env/environment";
import {getUUID} from "@app/helpers/localStorageHelper";

@Component({
  selector: "app-radiospeech-welcome",
  templateUrl: "./radiospeech-welcome.component.html",
  styleUrls: ["./radiospeech-welcome.component.scss"]
})
export class RadiospeechWelcomeComponent implements OnInit {

  assetsUrl = environment.assets;

  private UUID = "undefined";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.UUID = getUUID();
  }

  openEditor(matID: string) {
    this.router.navigate(["/", "radiolearn", "main", matID]).then();
  }
}
