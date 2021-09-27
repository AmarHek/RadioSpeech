import { Component, OnInit, Inject } from "@angular/core";
import {BoundingBox, Image} from "../../models/materialModel";
import {POPOUT_MODAL_DATA, PopoutData} from "../../services/popout.tokens";
import {environment} from "../../../environments/environment";
import {getImageDimensions} from "../../helpers/util";

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

  constructor(@Inject(POPOUT_MODAL_DATA) public data: PopoutData) { }

  ngOnInit(): void {
    this.scans = this.data.scans;
    this.coordinates = this.data.coordinates;
    this.setCurrentImage("mainScan");

  }

  setCurrentImage(mode: string) {
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

  test() {

  }
}
