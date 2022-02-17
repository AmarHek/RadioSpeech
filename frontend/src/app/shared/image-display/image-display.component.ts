/* eslint-disable @typescript-eslint/member-ordering */

import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  HostListener
} from "@angular/core";
import {fromEvent} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import {environment} from "@env/environment";
import {Annotation, BoundingBox, Image} from "@app/models";
import {ConfirmDialogComponent, ConfirmDialogModel} from "@app/shared";
import {POPOUT_MODAL_DATA, PopoutData, MatDialogService} from "@app/core";

const BOX_LINE_WIDTH = 5;
const DISPLAY_BOX_COLOR = "blue";
const EDIT_BOX_COLOR = "green";
const TEXT_COLOR = "#98FF98";

const MAX_IMAGE_HEIGHT = 900;

@Component({
  selector: "app-image-display",
  templateUrl: "./image-display.component.html",
  styleUrls: ["./image-display.component.scss"]
})
export class ImageDisplayComponent implements OnInit, AfterViewInit {

  serverUrl = environment.backend;
  scans: {
    id: string;
    mainScan: Image;
    lateralScan?: Image;
    preScan?: Image;
  };
  annotations: {
    main:     Annotation[];
    lateral:  Annotation[];
    pre:      Annotation[];
  };
  currentMode: string;
  currentScanUrl: string;

  currentScaleFactor = 1.0;
  currentWidth: number;
  currentHeight: number;

  displayBoxes: boolean;
  boxDisplayConfirmed: boolean;
  enableEdit: boolean;
  enableDelete: boolean;
  enableZoom: boolean;

  // coordinates of the currently drawn box
  startX = 0;
  startY = 0;
  width = 0;
  height = 0;
  tempAnnotations: Annotation[] = []; // currently drawn annotations

  lensSize = 300;

  @HostListener("mousewheel", ["$event"])
  scroll(event: WheelEvent) {
    if(this.enableZoom) {
      const wheelDelta = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
      if (wheelDelta > 0) {
        this.lensSize += 20;
      } else {
        this.lensSize -= 20;
      }
      this.imageZoom();
    }
  }

  @ViewChild("drawLayer", {static: false }) drawLayer: ElementRef;
  private drawLayerElement;
  private drawContext: CanvasRenderingContext2D;

  @ViewChild("labelLayer", {static: false }) labelLayer: ElementRef;
  private labelLayerElement;
  private labelContext: CanvasRenderingContext2D;

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

  @ViewChild("labelDialog") labelDialog: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;

  @ViewChild("sourceImage") sourceImage: ElementRef;
  @ViewChild("zoomDiv") zoomDiv: ElementRef;
  private zoomLayerElement;
  private lensElement;
  @ViewChild("lensContainer") set zoom(container: ElementRef) {
    if (this.enableZoom) {
      const containerElement = container.nativeElement;
      this.zoomLayerElement = containerElement.children[1];
      this.lensElement = containerElement.children[0];
      this.imageZoom();
    }
  }

  private restricted = true;

  constructor(@Inject(POPOUT_MODAL_DATA) public data: PopoutData,
              private dialogService: MatDialogService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.scans = this.data.scans;
    this.annotations = this.data.annotations;

    if (this.data.restricted !== undefined) {
      this.restricted = this.data.restricted;
    }
    this.boxDisplayConfirmed = !this.restricted;
    this.displayBoxes = false;
    this.enableEdit = false;
    this.enableDelete = false;

    this.initMain();
  }

  get isAllowed() {
    return !this.restricted;
  }

  ngAfterViewInit(): void {
    this.drawLayerElement = this.drawLayer.nativeElement;
    this.drawContext = this.drawLayerElement.getContext("2d");
    this.labelLayerElement = this.labelLayer.nativeElement;
    this.labelContext = this.labelLayerElement.getContext("2d");
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

  clearCanvas() {
    this.drawContext.clearRect(0, 0, this.drawLayerElement.width, this.drawLayerElement.height);
    this.labelContext.clearRect(0, 0, this.labelLayerElement.width, this.labelLayerElement.height);
  }

  setCurrentImage() {
    const filename = this.scans[this.currentMode + "Scan"].filename;
    this.currentScanUrl = this.serverUrl + "images/" + this.scans.id + "/" + filename;
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
    this.enableZoom = false;
    this.setCurrentImage();
    this.setCurrentDimensions();
    if (this.displayBoxes) {
      this.drawBoxes();
    }
  }

  toggleBoxes() {
    if (this.boxDisplayConfirmed) {
      this.displayBoxes = !this.displayBoxes;
      this.clearCanvas();
      if (this.enableDelete) {
        this.enableDelete = false;
      }
      if (this.displayBoxes) {
        this.drawBoxes();
      }
    }
  }

  toggleDelete() {
    if (!this.displayBoxes) {
      this.toggleBoxes();
    }
    this.enableDelete = !this.enableDelete;
  }

  toggleEditor() {
    this.enableEdit = !this.enableEdit;
  }

  toggleZoom() {
    this.enableZoom = !this.enableZoom;
    if (this.enableDelete) {
      this.toggleDelete();
    }
    if (this.enableEdit) {
      this.toggleEditor();
    }
  }

  drawBoxes() {
    this.clearCanvas();
    const coordinates = this.annotations[this.currentMode];
    for (const bbox of coordinates) {
      this.drawRect(this.drawContext, bbox, DISPLAY_BOX_COLOR);
      this.addLabel(bbox);
    }
  }

  addDeleteListeners() {
    const coordinates = this.annotations[this.currentMode];
    const rect = this.drawLayerElement.getBoundingClientRect();
    const parent = this;
    for (const bbox of coordinates) {
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
          parent.removeAlert(bbox);
        }
      });
    }
  }

  removeAlert(bbox: BoundingBox) {
    const dialogData = new ConfirmDialogModel(
      "warning",
      "Box löschen bestätigen",
      "Soll diese Box wirklich gelöscht werden?"
    );
    const dialogConfig = this.dialogService.defaultConfig("400px", dialogData);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const idx = this.annotations[this.currentMode].indexOf(bbox);
        this.annotations[this.currentMode].splice(idx, 1);
        this.drawBoxes();
        this.enableDelete = false;
      }
    });
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

  addLabel(annotation: Annotation) {
    this.labelContext.font = "bold 18pt Arial";
    this.labelContext.fillStyle = TEXT_COLOR;
    this.labelContext.strokeStyle = "black";
    this.labelContext.lineWidth = 1;
    this.labelContext.fillText(
      annotation.pathology.name,
      this.currentScaleFactor * annotation.labelLeft,
      this.currentScaleFactor * annotation.labelTop + BOX_LINE_WIDTH + 20);
    this.labelContext.strokeText(
      annotation.pathology.name,
      this.currentScaleFactor * annotation.labelLeft,
      this.currentScaleFactor * annotation.labelTop
      + BOX_LINE_WIDTH + 20);
  }

  rectangleDrawing() {
    let rect = this.editLayerElement.getBoundingClientRect();
    fromEvent(this.editLayerElement, "mousedown")
      .pipe(
        switchMap((e: MouseEvent) => {
          rect = this.editLayerElement.getBoundingClientRect();
          this.startX = e.clientX - rect.left;
          this.startY = e.clientY - rect.top;
          return fromEvent(this.editLayerElement, "mousemove").pipe(
            takeUntil(fromEvent(this.editLayerElement, "mouseup")),
            takeUntil(fromEvent(this.editLayerElement, "mouseleave"))
          );
        })
      ).subscribe((event: MouseEvent) => {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.width = x - this.startX;
      this.height = y - this.startY;

      this.setCanvasProperties(this.editContext, BOX_LINE_WIDTH, "square", EDIT_BOX_COLOR);
      this.editContext.beginPath();
      this.editContext.clearRect(0, 0, this.editLayerElement.width, this.editLayerElement.height);
      this.editContext.rect(this.startX, this.startY, this.width, this.height);
      this.editContext.stroke();
    });
  }

  saveNewBox() {
    if (!(this.width === 0 || this.height === 0)) {
      const dialogConfig = this.dialogService.defaultConfig("470px");
      this.dialogRef = this.dialog.open(this.labelDialog, dialogConfig);
      this.dialogRef.afterClosed().subscribe((val: boolean) => {
        if (val && this.newLabel.length > 0) {
          this.fixNegativeCoordinates();
          this.annotations[this.currentMode].push({
            left: this.startX / this.currentScaleFactor,
            top: this.startY / this.currentScaleFactor,
            height: this.height / this.currentScaleFactor,
            width: this.width / this.currentScaleFactor,
            label: this.newLabel,
          });
          this.editContext.clearRect(0, 0, this.editLayerElement.width, this.editLayerElement.height);
          this.newLabel = "";
          this.width = 0;
          this.height = 0;
          if (this.displayBoxes) {
            this.drawBoxes();
          }
        }
      });
    }
  }

  close() {
    this.newLabel = "";
    this.dialogRef.close(false);
  }

  save() {
    this.dialogRef.close(true);
  }

  private imageZoom() {
    const img = this.sourceImage.nativeElement as HTMLImageElement;
    const result = this.zoomDiv.nativeElement as HTMLDivElement;
    // calculate ratio between result div and lens
    const cx = result.offsetWidth / this.lensElement.offsetWidth;
    const cy = result.offsetHeight / this.lensElement.offsetHeight;
    // Set background properties for the result div
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    // Execute a function when someone moves the cursor over the image or the lens
    this.lensElement.removeEventListener("mousemove", moveLens);
    this.zoomLayerElement.removeEventListener("mousemove", moveLens);
    this.lensElement.addEventListener("mousemove", moveLens);
    this.zoomLayerElement.addEventListener("mousemove", moveLens);

    const parent = this;
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function moveLens(e) {
      let x;
      let y;
      // Prevent any other actions that may occur when moving over the image
      e.preventDefault();
      // Get the cursor's x and y positions:
      const pos = getCursorPos(e);
      // Calculate the position of the lens:
      x = pos.x - (parent.lensElement.offsetWidth / 2);
      y = pos.y - (parent.lensElement.offsetHeight / 2);
      // Prevent the lens from being positioned outside the image:
      if (x > img.width - parent.lensElement.offsetWidth) {
        x = img.width - parent.lensElement.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > img.height - parent.lensElement.offsetHeight) {
        y = img.height - parent.lensElement.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      // Set the position of the lens:
      parent.lensElement.style.left = x + "px";
      parent.lensElement.style.top = y + "px";
      // Display what the lens "sees":
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function getCursorPos(e) {
      let x: number;
      let y: number;
      // Get the x and y positions of the image
      const a = img.getBoundingClientRect();
      // Calculate the cursor's x and y coordinates, relative to the image:
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      // Consider any page scrolling
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x, y};
    }
  }

  private fixNegativeCoordinates() {
    // in case the box is drawn from bottom right to top left: adjust negative width and height
    if (this.width < 0) {
      this.width = - this.width;
      this.startX = this.startX - this.width;
    }
    if (this.height < 0) {
      this.height = - this.height;
      this.startY = this.startY - this.height;
    }
  }
}
