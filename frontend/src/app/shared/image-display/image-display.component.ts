/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2, Input, OnChanges, SimpleChanges
} from "@angular/core";
import {fromEvent} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";

import {environment} from "@env/environment";
import {Annotation, BoundingBox, Image, Pathology} from "@app/models";
import {BackendCallerService, MatDialogService} from "@app/core";
import {InputDialogComponent} from "@app/shared/input-dialog/input-dialog.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "@app/shared";

const BOX_LINE_WIDTH = 5;
const DISPLAY_BOX_COLOR = ["rgba(170,110,40,1)", "rgba(128,128,0,1)", "rgba(0,128, 128,1)",
  "rgba(230,25,75,1)", "rgba(245,130,48,1)", "rgba(255,255,25,1)", "rgba(210,245,60,1)", "rgba(60,180,75,1)",
  "rgba(70,240,240,1)", "rgba(0,130,200,1)", "rgba(145,30,180,1)", "rgba(240,50,230,1)", "rgba(128,128,128,1)",
  "rgba(250,190,212,1)", "rgba(255,215,180,1)", "rgba(255,250,200,1)", "rgba(170,255,195,1)", "rgba(128,0,0,1)",
  "rgba(220,190,255,1)", "rgba(0,0,0,1)"];
const DISPLAY_TEMP_BOX_COLOR = "blue";
const EDIT_BOX_COLOR = "green";

const MAX_IMAGE_HEIGHT = 850;
const MAX_IMAGE_WIDTH = 830;

@Component({
  selector: "app-image-display",
  templateUrl: "./image-display.component.html",
  styleUrls: ["./image-display.component.scss"]
})
export class ImageDisplayComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() scans: {
    id: string;
    mainScan: Image;
    lateralScan?: Image;
    preScan?: Image;
  };
  @Input() annotations: {
    main:     Annotation[];
    lateral:  Annotation[];
    pre:      Annotation[];
  };

  imageUrl = environment.images;

  // assets and material
  pathologyList: Pathology[];

  // state variables for current display
  currentMode: string;
  currentScanUrl: string;
  currentScaleFactor = 1.0;
  currentWidth: number;
  currentHeight: number;
  currentTooltip = "";

  // state variables for canvas layers
  displayBoxes: boolean;
  enableEdit: boolean;
  enableDelete: boolean;
  enableZoom: boolean;
  enableHover: boolean;

  // state variable to show warning that no pathology is selected
  warnPathology = false;

  // coordinates of the currently drawn box
  startX = 0;
  startY = 0;
  width = 0;
  height = 0;

  // currently drawn boxes
  tempBoxes: {
    main: BoundingBox[];
    lateral: BoundingBox[];
    pre: BoundingBox[];
  };

  // current chosen Pathology for label
  currentPathology: Pathology;
  currentComment: string;

  // Zoom lens
  lensSize = 200;

  // tooltip size
  maxTipWidth = 300;

  @ViewChild("drawLayer", {static: false }) drawLayer: ElementRef;
  private drawLayerElement;
  private drawContext: CanvasRenderingContext2D;

  @ViewChild("labelLayer", {static: false }) labelLayer: ElementRef;
  private labelLayerElement;
  private labelContext: CanvasRenderingContext2D;

  @ViewChild("tempLayer", {static: false }) tempLayer: ElementRef;
  private tempLayerElement;
  private tempContext: CanvasRenderingContext2D;

  private hoverLayerElement;
  private hoverContext: CanvasRenderingContext2D;
  @ViewChild("hoverLayer", {static: false }) set hoverLayer(layer: ElementRef) {
    if (this.enableHover) {
      this.hoverLayerElement = layer.nativeElement;
      this.hoverContext = this.hoverLayerElement.getContext("2d");
      this.addHoverListeners();
    }
  };

  @ViewChild("tipDiv", {static: false}) tipDiv: ElementRef;
  private tipDivElement;

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

  constructor(private backendCaller: BackendCallerService,
              private renderer: Renderer2,
              private dialogService: MatDialogService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPathologyList();

    this.tempBoxes = {
      main: [],
      lateral: [],
      pre: []
    };

    this.displayBoxes = false;
    this.enableEdit = false;
    this.enableDelete = false;

    this.initMain();
  }

  ngAfterViewInit(): void {
    this.drawLayerElement = this.drawLayer.nativeElement;
    this.drawContext = this.drawLayerElement.getContext("2d");
    this.labelLayerElement = this.labelLayer.nativeElement;
    this.labelContext = this.labelLayerElement.getContext("2d");
    this.tempLayerElement = this.tempLayer.nativeElement;
    this.tempContext = this.tempLayerElement.getContext("2d");
    this.tipDivElement = this.tipDiv.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.scans !== undefined) {
      this.changeMode("main");
    }
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
    this.currentScanUrl = this.imageUrl + this.scans.id + "/" + filename;
  }

  getPathologyList() {
    this.backendCaller.getPathologyList().subscribe(res => {
      this.pathologyList = res.pathologyList;
    }, err => {
      console.log(err);
    });
  }

  setCurrentDimensions() {
    const img = new Image();
    img.src = this.currentScanUrl;
    img.onload = (event) => {
      const loadedImage = event.currentTarget as HTMLImageElement;
      this.currentHeight = loadedImage.height;
      this.currentWidth = loadedImage.width;
      this.currentScaleFactor = 1.0;

      // First check by height
      if (this.currentHeight >= MAX_IMAGE_HEIGHT) {
        this.currentScaleFactor = MAX_IMAGE_HEIGHT / loadedImage.height;
        this.currentHeight = MAX_IMAGE_HEIGHT;
        this.currentWidth = loadedImage.width * this.currentScaleFactor;
      }

      // Then check by width
      if (this.currentWidth >= MAX_IMAGE_WIDTH) {
        this.currentScaleFactor = this.currentScaleFactor * MAX_IMAGE_WIDTH / this.currentWidth;
        this.currentWidth = MAX_IMAGE_WIDTH;
        this.currentHeight = this.currentScaleFactor * loadedImage.height;
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
      this.displayBoxes = false;
      // TODO Bugfix this
      // this.drawBoxes();
    }
    if (this.enableEdit) {
      // TODO Bugfix this
      this.enableEdit = false;
      // this.drawTempBoxes();
    }
  }

  toggleBoxes() {
    this.displayBoxes = !this.displayBoxes;
    this.enableHover = !this.enableHover;
    this.clearCanvas();
    if (this.enableDelete) {
      this.enableDelete = false;
    }
    if (this.displayBoxes) {
      this.drawBoxes();
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
    this.tempContext.clearRect(0, 0, this.tempLayerElement.width, this.tempLayerElement.height);
    if (this.enableDelete) {
      this.drawTempBoxes();
    }
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

  zoomIn(increment: number) {
    this.lensSize += increment;
    this.imageZoom();
  }

  drawBoxes() {
    this.clearCanvas();
    const annotations = this.annotations[this.currentMode];
    for (const annotation of annotations) {
      for (const bbox of annotation.boxes) {
        this.drawRect(this.drawContext, bbox, DISPLAY_BOX_COLOR[annotations.indexOf(annotation)]);
      }
      this.addLabel(annotation, DISPLAY_BOX_COLOR[annotations.indexOf(annotation)]);
    }
  }

  drawTempBoxes() {
    this.tempContext.clearRect(0, 0, this.tempLayerElement.width, this.tempLayerElement.height);
    const boxes = this.tempBoxes[this.currentMode];
    for (const box of boxes) {
      this.drawRect(this.tempContext, box, DISPLAY_TEMP_BOX_COLOR);
    }
  }

  addHoverListeners() {
    const annotations = this.annotations[this.currentMode];
    const rect = this.hoverLayerElement.getBoundingClientRect();

    const parent = this;
    this.hoverLayerElement.addEventListener("mousemove", (e) => {
      let hit = false;
      for (const annotation of annotations) {
        if (annotation.comment !== undefined) {
          if (annotation.comment.length > 0) {
            const x = this.currentScaleFactor * annotation.labelLeft;
            const y = this.currentScaleFactor * annotation.labelTop + BOX_LINE_WIDTH + 20;
            const h = 30; // approx. height of 18pt font size
            const w = this.labelContext.measureText(annotation.label).width;
            if (
              x <= e.clientX - rect.left &&
              e.clientX - rect.left <= x + w &&
              y - h <= e.clientY - rect.top &&
              e.clientY - rect.top <= y
            ) {
              parent.showToolTip(e.clientX - rect.left, e.clientY - rect.top + 20, annotation.comment);
              hit = true;
            }
          }
        }
      }
      if (!hit) {
        this.hideToolTip();
      }
    });
  }

  showToolTip(x, y, text) {
    this.currentTooltip = text;
    this.renderer.setStyle(this.tipDivElement, "top", y + "px");
    this.renderer.setStyle(this.tipDivElement, "left", x + "px");

  }

  hideToolTip() {
    this.renderer.setStyle(this.tipDivElement, "left", "-800px");
  }

  addDeleteListeners() {
    const annotations = this.annotations[this.currentMode];
    const rect = this.drawLayerElement.getBoundingClientRect();
    const parent = this;
    for (const annotation of annotations) {
      const color = DISPLAY_BOX_COLOR[annotations.indexOf(annotation)];
      for (const bbox of annotation.boxes) {
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
            parent.drawRect(this.deleteContext, bbox, color);
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
            parent.removeBoxAlert(annotation, bbox);
          }
        });
      }
    }
  }

  removeBoxAlert(annotation, bbox) {
    const data = new ConfirmDialogModel("warning", "Box löschen?",
      "Soll diese Box wirklich gelöscht werden?");
    const dialogConfig = this.dialogService.defaultConfig("400px", data);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.removeBox(annotation, bbox);
      }
    });
  }

  removeBox(annotation: Annotation, bbox: BoundingBox) {
    const annotIdx = this.annotations[this.currentMode].indexOf(annotation);
    const boxIdx = this.annotations[this.currentMode][annotIdx].boxes.indexOf(bbox);
    this.annotations[this.currentMode][annotIdx].boxes.splice(boxIdx, 1);

    // check if annotation has no boxes left and remove if there are none
    if (this.annotations[this.currentMode][annotIdx].boxes.length === 0) {
      this.annotations[this.currentMode].splice(annotIdx, 1);
    } else {
      // otherwise, compute new label coordinates
      console.log(this.annotations[this.currentMode][annotIdx].boxes);
      const newLabelCoordinates = this.getLabelCoordinates(this.annotations[this.currentMode][annotIdx].boxes);
      this.annotations[this.currentMode][annotIdx].labelLeft = newLabelCoordinates[0];
      this.annotations[this.currentMode][annotIdx].labelTop = newLabelCoordinates[1];
    }

    // disable delete layer and redraw in the end
    this.enableDelete = false;
    this.drawBoxes();
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

  addLabel(annotation: Annotation, color: string) {
    if (annotation.correct) {
      this.labelContext.font = "bold 15pt Arial";
    } else {
      this.labelContext.font = "bold italic 15pt Arial";
    }
    this.labelContext.fillStyle = color;
    this.labelContext.strokeStyle = "black";
    this.labelContext.lineWidth = 0.3;

    let finalLabel: string = annotation.label;
    if (annotation.comment !== undefined) {
      if (annotation.comment.length > 0) {
        finalLabel = annotation.label + "**";
      }
    }

    this.labelContext.fillText(
      finalLabel,
      this.currentScaleFactor * annotation.labelLeft,
      this.currentScaleFactor * annotation.labelTop + BOX_LINE_WIDTH + 20);
    this.labelContext.strokeText(
      finalLabel,
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

  saveTempBox() {
    if (!(this.width === 0 && this.height === 0)) {
      this.fixNegativeCoordinates();
      this.tempBoxes[this.currentMode].push({
        left: this.startX / this.currentScaleFactor,
        top: this.startY / this.currentScaleFactor,
        height: this.height / this.currentScaleFactor,
        width: this.width / this.currentScaleFactor
      });
      this.editContext.clearRect(0, 0, this.editLayerElement.width, this.editLayerElement.height);
      this.width = 0;
      this.height = 0;
      this.drawTempBoxes();
    }
  }

  deleteLastTempBox() {
    this.tempBoxes[this.currentMode].pop();
    this.drawTempBoxes();
  }

  saveNewAnnotation() {
    if (this.currentPathology === undefined) {
      this.warnPathology = true;
    } else {
      // gather all necessary data
      const boxes = this.tempBoxes[this.currentMode];
      if (boxes.length > 0) {
        const labelCoordinates = this.getLabelCoordinates(boxes);

        // push new annotation to array of proper mode
        this.annotations[this.currentMode].push({
          boxes,
          label: this.currentPathology.name,
          comment: this.currentComment,
          labelLeft: labelCoordinates[0],
          labelTop: labelCoordinates[1]
        });

        // update state and empty buffer variables
        this.warnPathology = false;
        this.currentPathology = undefined;
        this.currentComment = undefined;
        this.tempBoxes[this.currentMode] = [];
        this.tempContext.clearRect(0, 0, this.tempLayerElement.width, this.tempLayerElement.height);
        if (this.displayBoxes) {
          this.drawBoxes();
        }
      }
    }
  }

  getLabelCoordinates(boxes: BoundingBox[]): [number, number] {
    // Idea: Identify most left and bottom coordinate from all boxes and hope it won't look weird
    let labelX = 5000; // start very far right
    let labelY = 0; // start at the top
    for (const box of boxes) {
      if (labelY < (box.top + box.height)) {
        labelY = box.top + box.height;
      }
      if (labelX > (box.left)) {
        labelX = box.left;
      }
    }
    return [labelX, labelY];
  }

  openCommentDialog() {
    const data = {
      title: "Annotationen: Kommentar",
      message: "Kommentar eingeben",
      input: this.currentComment
    };
    const dialogConfig = this.dialogService.defaultConfig("400px", data);
    const dialogRef = this.dialog.open(InputDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.length > 0) {
          this.currentComment = dialogResult;
        }
      }
    });
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
