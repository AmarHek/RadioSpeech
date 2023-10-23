import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {DisplayService} from "@app/core";
import {environment} from "@env/environment";
import {getUUID} from "@app/helpers/localStorageHelper";

@Component({
  selector: "app-radiospeech-welcome",
  templateUrl: "./radiospeech-welcome.component.html",
  styleUrls: ["./radiospeech-welcome.component.scss"]
})
export class RadiospeechWelcomeComponent implements OnInit {

  assetsUrl = environment.assets;

  isMobile = false;
  private UUID = "undefined";

  constructor(
    private router: Router,
    private displayService: DisplayService,
) {  }

  ngOnInit(): void {
    this.UUID = getUUID();
    this.displayService.isMobile.subscribe(res => {
       this.isMobile = res;
    });
  }

  openEditor(matID: string) {
    this.router.navigate(["/", "radiolearn", "main", matID]).then();
  }
}
