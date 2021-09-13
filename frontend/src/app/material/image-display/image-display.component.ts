import { Component, OnInit, Inject } from '@angular/core';
import {BoundingBox, Image} from "../../models/materialModel";
import {POPOUT_MODAL_DATA, PopoutData} from "../../services/popout.tokens";
import {environment} from "../../../environments/environment";
import {getImageDimensions} from "../../helpers/util";

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {

  serverUrl = environment.server;

  image_id: string;
  images: Image[];

  possibleModes: string[];
  currentMode: string;

  currentScanUrl: string;
  currentWidth: number;
  currentHeight: number;

  coordinates: {
    main: BoundingBox[];
    lateral: BoundingBox[];
    pre: BoundingBox[];
  }

  constructor(@Inject(POPOUT_MODAL_DATA) public data: PopoutData) { }

  ngOnInit(): void {
    this.image_id = this.data.scans.id;
    this.initScansAndModes();

    this.currentMode = this.possibleModes[0];
    this.setCurrentImage(this.images[0].filename);

    this.coordinates = this.data.coordinates;
  }

  initScansAndModes() {
    this.images = [this.data.scans.mainScan];
    this.possibleModes = ["main"];
    if (this.data.scans.lateralScan !== undefined) {
      this.images.push(this.data.scans.lateralScan);
      this.possibleModes.push("lateral");
    }
    if (this.data.scans.preScan !== undefined) {
      this.images.push(this.data.scans.preScan);
      this.possibleModes.push("pre");
    }
  }

  setCurrentImage(filename: string) {
    this.currentScanUrl = this.serverUrl + this.image_id + "/" + filename;
    this.setCurrentDimensions();
  }

  setCurrentDimensions() {
    let img = new Image();
    img.src = this.currentScanUrl;
    img.onload = (event) => {
      let loadedImage = event.currentTarget as HTMLImageElement;
      this.currentWidth = loadedImage.width;
      this.currentHeight = loadedImage.height;
    }
  }

  changeImageLeft() {
    if (this.possibleModes.length > 1) {
      const index = this.possibleModes.indexOf(this.currentMode);
      const nextIndex = (index === 0) ? (this.possibleModes.length - 1) : (index - 1);
      this.currentMode = this.possibleModes[nextIndex];
      this.setCurrentImage(this.images[nextIndex].filename)
    }
  }

  changeImageRight() {
    if (this.possibleModes.length > 1) {
      const index = this.possibleModes.indexOf(this.currentMode);
      const nextIndex = (index + 1) % this.possibleModes.length;
      this.currentMode = this.possibleModes[nextIndex];
      this.setCurrentImage(this.images[nextIndex].filename)
    }
  }

  test() {
    this.coordinates.main.push({
      left: 25,
      top:  25,
      height: 25,
      width:  25,
      label: "test"
    });
  }
}
