import { Component, OnInit, Inject } from '@angular/core';
import {BoundingBox, Image} from "../../../helper-classes/materialModel";
import {POPOUT_MODAL_DATA, PopoutData} from "../../services/popout.tokens";
import {environment} from "../../../environments/environment";
import {getImageDimensions} from "../../../helper-classes/util";

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {

  serverUrl = environment.server;

  currentScanUrl: string;
  currentMode: string;
  currentWidth: number;
  currentHeight: number;

  scans: {
    id: string;
    mainScan: Image;
    lateralScan?: Image;
    preScan?: Image;
  }


  coordinates: {
    main: BoundingBox[];
    lateral: BoundingBox[];
    pre: BoundingBox[];
  }

  constructor(@Inject(POPOUT_MODAL_DATA) public data: PopoutData) { }

  ngOnInit(): void {
    this.scans = this.data.scans;
    this.coordinates = this.data.coordinates;

    this.currentMode = "main";
    this.setCurrentScan(this.scans.mainScan.filename);
  }

  setCurrentScan(filename: string) {
    this.currentScanUrl = this.serverUrl + this.scans.id + "/" + filename;
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

  changeImage() {

  }

}
