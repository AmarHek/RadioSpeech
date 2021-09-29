import {Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {BoundingBox, Image} from "../../models/materialModel";
import {POPOUT_MODAL_DATA, PopoutData} from "../../services/popout.tokens";
import {environment} from "../../../environments/environment";
import {Role, User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {fromEvent} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";

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
  private drawContext: CanvasRenderingContext2D;
  private editContext: CanvasRenderingContext2D;

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
    this.drawContext = this.drawLayerElement.getContext("2d");
    this.editLayerElement = this.editLayer.nativeElement;
    this.editContext = this.editLayerElement.getContext("2d");
  }

  changeMode(mode: string) {
    this.currentMode = mode;

    this.setCurrentImage();
    this.setCurrentDimensions();

    this.clearCanvas();
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
    this.clearCanvas();
    if (this.displayBoxes) {
      this.drawBoxes();
    }
  }

  clearCanvas() {
    this.drawContext.clearRect(0, 0, this.drawLayerElement.width, this.drawLayerElement.height);
  }

  drawBoxes() {
    const coordinates = this.coordinates[this.currentMode];
    for (const bbox of coordinates) {
      this.drawRect(bbox);
      this.addLabel(bbox);
    }
  }

  drawRect(bbox: BoundingBox) {
    this.drawContext.beginPath();
    this.drawContext.rect(bbox.left, bbox.top, bbox.width, bbox.height);
    this.setCanvasProperties(this.drawContext, BOX_LINE_WIDTH, "square", DISPLAY_BOX_COLOR);
    this.drawContext.stroke();
  }

  addLabel(bbox: BoundingBox) {
    this.drawContext.font = "bold 14pt Arial";
    this.drawContext.fillStyle = DISPLAY_BOX_COLOR;
    this.drawContext.fillText(bbox.label, bbox.left, bbox.top + bbox.height + 20);
  }

  enableEditor() {
    this.enableEdit = !this.enableEdit;
    if (this.enableEdit) {
      this.rectangleDrawing();
    } else {
      this.editLayerElement.replaceWith(this.editLayerElement.cloneNode(true));
      this.editContext = this.editLayerElement.getContext("2d");
    }
  }

  rectangleDrawing() {

    // first coordinates when clicked
    let startX = 0;
    let startY = 0;

    const rect = this.editLayerElement.getBoundingClientRect();

    fromEvent(this.editLayerElement, "mousedown")
      .pipe(
        switchMap((e: MouseEvent) => {

          startX = e.clientX - rect.left;
          startY = e.clientY - rect.top;

          return fromEvent(this.editLayerElement, "mousemove").pipe(

            takeUntil(fromEvent(this.editLayerElement, "mouseup")),
            takeUntil(fromEvent(this.editLayerElement, "mouseleave"))
          );

        })
      ).subscribe((event: MouseEvent) => {

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const width = x - startX;
      const height = y - startY;


      this.setCanvasProperties(this.editContext, BOX_LINE_WIDTH, "square", EDIT_BOX_COLOR);

      this.editContext.beginPath();

      // if I comment this line, the rectangles will stay, but they
      // won't be clear, making multiples rectangles inside the
      // main rectangle
      this.editContext.clearRect(0,0, this.editLayerElement.width, this.editLayerElement.height);

      this.editContext.rect(startX, startY, width, height);

      this.editContext.stroke();

    });

  }

  setCanvasProperties(context, lineWidth, lineCap, strokeStyle) {
    context.lineWidth = lineWidth;
    context.lineCap = lineCap;
    context.strokeStyle = strokeStyle;
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }
}
