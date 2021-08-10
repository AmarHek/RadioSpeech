import { Component, OnInit, Inject } from '@angular/core';
import {BoundingBox, Image} from "../../../helper-classes/materialModel";
import {POPOUT_MODAL_DATA, PopoutData} from "../../services/popout.tokens";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {

  serverUrl = environment.server;

  currentScan: Image;

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

    this.currentScan = this.scans.mainScan;
  }

}
