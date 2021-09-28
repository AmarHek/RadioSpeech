import { Component, OnInit, Inject } from "@angular/core";
import {BoundingBox, Image} from "../../models/materialModel";
import {POPOUT_MODAL_DATA, PopoutData} from "../../services/popout.tokens";
import {environment} from "../../../environments/environment";
import {Role, User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: "app-image-display",
  templateUrl: "./image-display.component.html",
  styleUrls: ["./image-display.component.scss"]
})
export class ImageDisplayComponent implements OnInit {

  serverUrl = environment.server;

  scans: {
    id: string;
    mainScan: Image;
    lateralScan?: Image;
    preScan?: Image;
  };

  currentMode: string;

  currentScanUrl: string;
  currentWidth: number;
  currentHeight: number;

  displayBoxes: boolean;

  coordinates: {
    main: BoundingBox[];
    lateral: BoundingBox[];
    pre: BoundingBox[];
  };

  private user: User;

  constructor(@Inject(POPOUT_MODAL_DATA) public data: PopoutData,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.scans = this.data.scans;
    this.coordinates = this.data.coordinates;
    this.setCurrentImage("mainScan");

  }

  setCurrentImage(mode: string) {
    this.currentMode = mode;
    const filename = this.scans[mode].filename;
    this.currentScanUrl = this.serverUrl + this.scans.id + "/" + filename;
    this.setCurrentDimensions();
  }

  setCurrentDimensions() {
    const img = new Image();
    img.src = this.currentScanUrl;
    img.onload = (event) => {
      const loadedImage = event.currentTarget as HTMLImageElement;
      this.currentWidth = loadedImage.width;
      this.currentHeight = loadedImage.height;
    };
  }

  toggleBoxDisplay() {
    this.displayBoxes = !this.displayBoxes;
  }

  startEditor() {

  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }
}
