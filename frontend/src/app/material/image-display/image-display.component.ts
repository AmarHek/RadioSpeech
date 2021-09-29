import {Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {BoundingBox, Image} from "../../models/materialModel";
import {POPOUT_MODAL_DATA, PopoutData} from "../../services/popout.tokens";
import {environment} from "../../../environments/environment";
import {Role, User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";

const BOX_LINE_WIDTH = 3;
const DISPLAY_BOX_COLOR = "blue";
const EDIT_BOX_COLOR = "green";

@Component({
  selector: "app-image-display",
  templateUrl: "./image-display.component.html",
  styleUrls: ["./image-display.component.scss"]
})
export class ImageDisplayComponent implements OnInit, AfterViewInit {

  @ViewChild("drawLayer", {static: false }) drawLayer: ElementRef;
  @ViewChild("editLayer", {static: false }) editLayer: ElementRef;

  serverUrl = environment.server;
  scans: {
    id: string;
    mainScan: Image;
    lateralScan?: Image;
    preScan?: Image;
  };
  coordinates: {
    main: BoundingBox[];
    lateral: BoundingBox[];
    pre: BoundingBox[];
  };
  currentMode: string;
  currentScanUrl: string;
  currentWidth: number;
  currentHeight: number;

  displayBoxes: boolean;
  enableEdit: boolean;

  private drawLayerElement;
  private editLayerElement;
  private context: CanvasRenderingContext2D;

  private user: User;

  constructor(@Inject(POPOUT_MODAL_DATA) public data: PopoutData,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.user.subscribe(x => this.user = x);

    this.scans = this.data.scans;
    this.coordinates = this.data.coordinates;

    this.coordinates.main.push({left: 40, top: 50, height: 50, width: 50, label: "test"});
    this.coordinates.main.push({left: 20, top: 500, height: 50, width: 50, label: "test2"});

    this.changeMode("main");
  }

  ngAfterViewInit() {
    this.drawLayerElement = this.drawLayer.nativeElement;
    this.context = this.drawLayerElement.getContext("2d");
  }

  changeMode(mode: string) {
    this.currentMode = mode;

    this.setCurrentImage();
    this.setCurrentDimensions();

    if (this.displayBoxes) {
      this.drawBoxes();
    }
  }

  setCurrentImage() {
    const filename = this.scans[this.currentMode + "Scan"].filename;
    this.currentScanUrl = this.serverUrl + this.scans.id + "/" + filename;
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

  toggleBoxes() {
    this.displayBoxes = !this.displayBoxes;
    if (this.displayBoxes) {
      this.drawBoxes();
    } else {
      this.clearCanvas();
    }
  }

  clearCanvas() {
    // this.drawLayerElement = this.drawLayer.nativeElement;
    // this.context = this.drawLayerElement.getContext("2d");
    this.context.clearRect(0, 0, this.drawLayerElement.width, this.drawLayerElement.height);
  }

  drawBoxes() {
    this.clearCanvas();
    // this.drawLayerElement = this.drawLayer.nativeElement;
    // this.context = this.drawLayerElement.getContext("2d");
    const coordinates = this.coordinates[this.currentMode];
    for (const bbox of coordinates) {
      this.drawRect(bbox);
      this.addLabel(bbox);
    }
  }

  drawRect(bbox: BoundingBox) {
    this.context.beginPath();
    this.context.rect(bbox.left, bbox.top, bbox.width, bbox.height);
    this.context.lineWidth = BOX_LINE_WIDTH;
    this.context.strokeStyle = DISPLAY_BOX_COLOR;
    this.context.stroke();
  }

  addLabel(bbox: BoundingBox) {
    this.context.font = "bold 14pt Arial";
    this.context.fillStyle = DISPLAY_BOX_COLOR;
    this.context.fillText(bbox.label, bbox.left, bbox.top + bbox.height + 20);
  }

  enableEditor() {
    this.enableEdit = !this.enableEdit;
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }
}
