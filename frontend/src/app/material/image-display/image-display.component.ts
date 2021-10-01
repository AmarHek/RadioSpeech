import {Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {BoundingBox, Image} from "../../models/materialModel";
import {POPOUT_MODAL_DATA, PopoutData} from "../../services/popout.tokens";
import {environment} from "../../../environments/environment";
import {Role, User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {fromEvent} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";

const BOX_LINE_WIDTH = 5;
const DISPLAY_BOX_COLOR = "blue";
const EDIT_BOX_COLOR = "green";

const MAX_IMAGE_HEIGHT = 900;

@Component({
  selector: "app-image-display",
  templateUrl: "./image-display.component.html",
  styleUrls: ["./image-display.component.scss"]
})
export class ImageDisplayComponent implements OnInit, AfterViewInit {

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

  currentScaleFactor = 1.0;
  currentWidth: number;
  currentHeight: number;

  displayBoxes: boolean;
  enableEdit: boolean;
  enableDelete: boolean;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild("drawLayer", {static: false }) drawLayer: ElementRef;
  private drawLayerElement;
  private drawContext: CanvasRenderingContext2D;

  private deleteLayerElement;
  private deleteContext: CanvasRenderingContext2D;
  @ViewChild("deleteLayer", {static: false }) set deleteLayer(layer: ElementRef) {
    if (this.enableDelete) {
      this.deleteLayerElement = layer.nativeElement;
      this.deleteContext = this.deleteLayerElement.getContext("2d");
      this.addDeleteListeners();
    }
  };

  private editLayerElement;
  private editContext: CanvasRenderingContext2D;
  @ViewChild("editLayer", {static: false }) set editLayer(layer: ElementRef) {
    if (this.enableEdit) {
      this.editLayerElement = layer.nativeElement;
      this.editContext = this.editLayerElement.getContext("2d");
      this.rectangleDrawing();
    }
  };

  private user: User;

  constructor(@Inject(POPOUT_MODAL_DATA) public data: PopoutData,
              private authenticationService: AuthenticationService) { }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe(x => this.user = x);

    this.scans = this.data.scans;
    this.coordinates = this.data.coordinates;

    this.displayBoxes = false;
    this.enableEdit = false;
    this.enableDelete = false;

    this.coordinates.main.push({left: 40, top: 50, height: 50, width: 50, label: "test"});
    this.coordinates.main.push({left: 700, top: 500, height: 50, width: 200, label: "test2"});

    this.coordinates.lateral.push({left: 100, top: 100, height: 100, width: 100, label: "test3"});
    this.coordinates.lateral.push({left: 400, top: 400, height: 100, width: 100, label: "test4"});

    this.initMain();
  }

  ngAfterViewInit(): void {
    this.drawLayerElement = this.drawLayer.nativeElement;
    this.drawContext = this.drawLayerElement.getContext("2d");
  }

  initMain() {
    this.currentMode = "main";
    this.setCurrentImage();
    this.setCurrentDimensions();
  }

  setCanvasProperties(context, lineWidth, lineCap, strokeStyle) {
    context.lineWidth = lineWidth;
    context.lineCap = lineCap;
    context.strokeStyle = strokeStyle;
  }

  clearCanvas(layerElement, context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, layerElement.width, layerElement.height);
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
      if (loadedImage.height <= MAX_IMAGE_HEIGHT) {
        this.currentScaleFactor = 1.0;
        this.currentHeight = loadedImage.height;
        this.currentWidth = loadedImage.width;
      } else {
        this.currentScaleFactor = MAX_IMAGE_HEIGHT / loadedImage.height;
        this.currentHeight = MAX_IMAGE_HEIGHT;
        this.currentWidth = loadedImage.width * this.currentScaleFactor;
      }
    };
  }

  changeMode(mode: string) {
    this.currentMode = mode;
    this.enableDelete = false;
    this.setCurrentImage();
    this.setCurrentDimensions();
    if (this.displayBoxes) {
      this.drawBoxes();
    }
  }

  toggleBoxes() {
    this.displayBoxes = !this.displayBoxes;
    this.clearCanvas(this.drawLayerElement, this.drawContext);
    if (this.displayBoxes) {
      this.drawBoxes();
    }
  }

  toggleDelete() {
    if (this.displayBoxes === false) {
      this.toggleBoxes();
    }
    this.enableDelete = !this.enableDelete;
  }

  toggleEditor() {
    this.enableEdit = !this.enableEdit;
  }

  drawBoxes() {
    this.clearCanvas(this.drawLayerElement, this.drawContext);
    const coordinates = this.coordinates[this.currentMode];
    for (const bbox of coordinates) {
      this.drawRect(this.drawContext, bbox, "blue");
      this.addLabel(bbox);
    }
  }

  addDeleteListeners() {
    const coordinates = this.coordinates[this.currentMode];
    const rect = this.drawLayerElement.getBoundingClientRect();
    const parent = this;
    for (const bbox of coordinates) {
      console.log(bbox);
      this.deleteLayerElement.addEventListener("mousemove", (e) => {
        const x = bbox.left * parent.currentScaleFactor;
        const y = bbox.top * parent.currentScaleFactor;
        const w = bbox.width * parent.currentScaleFactor;
        const h = bbox.height * parent.currentScaleFactor;
        if (
          x <= e.clientX - rect.left &&
          e.clientX - rect.left <= x + w &&
          y <= e.clientY - rect.top &&
          e.clientY - rect.top <= y + h
        ) {
          parent.drawRect(this.deleteContext, bbox, "red");
        } else {
          parent.drawRect(this.deleteContext, bbox, "blue");
        }
      });
      this.deleteLayerElement.addEventListener("click", (e) => {
        const x = bbox.left * parent.currentScaleFactor;
        const y = bbox.top * parent.currentScaleFactor;
        const w = bbox.width * parent.currentScaleFactor;
        const h = bbox.height * parent.currentScaleFactor;
        if (
          x <= e.clientX - rect.left &&
          e.clientX - rect.left <= x + w &&
          y <= e.clientY - rect.top &&
          e.clientY - rect.top <= y + h
        ) {
          console.log("It works!");
          parent.removeAlert(bbox);
        }
      });
    }
  }

  removeAlert(bbox: BoundingBox) {
    const result = parent.confirm("Soll diese Box wirklich gelöscht werden?");
    if (result) {
      const idx = this.coordinates[this.currentMode].indexOf(bbox);
      this.coordinates[this.currentMode].splice(idx, 1);
      this.drawBoxes();
      this.enableDelete = false;
    }
  }

  drawRect(context: CanvasRenderingContext2D, bbox: BoundingBox, color: string) {
    this.setCanvasProperties(context, BOX_LINE_WIDTH, "square", color);
    context.beginPath();
    context.rect(
      bbox.left * this.currentScaleFactor,
      bbox.top * this.currentScaleFactor,
      bbox.width * this.currentScaleFactor,
      bbox.height * this.currentScaleFactor);
    context.stroke();
  }

  addLabel(bbox: BoundingBox) {
    this.drawContext.font = "bold 14pt Arial";
    this.drawContext.fillStyle = DISPLAY_BOX_COLOR;
    this.drawContext.fillText(
      bbox.label,
      this.currentScaleFactor * bbox.left,
      this.currentScaleFactor * bbox.top + this.currentScaleFactor * bbox.height
      + BOX_LINE_WIDTH + 20);
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

      this.editContext.clearRect(0, 0, this.editLayerElement.width, this.editLayerElement.height);

      this.editContext.rect(startX, startY, width, height);

      this.editContext.stroke();

    });

  }
}
