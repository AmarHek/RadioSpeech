/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2, Input, OnChanges, SimpleChanges
} from "@angular/core";

import {environment} from "@env/environment";
import {Annotation, BoundingBox, Category, Image} from "@app/models";
import {BackendCallerService, ImageDisplayService, MatDialogService} from "@app/core";
import {fromEvent} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {AnnotationPopupComponent} from "@app/shared/annotation-popup/annotation-popup.component";

const BOX_LINE_WIDTH = 5;

@Component({
  selector: "app-image-display-student",
  templateUrl: "./image-display-student.component.html",
  styleUrls: ["./image-display-student.component.scss"]
})
export class ImageDisplayStudentComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() scans: {
    id: string;
    mainScan: Image;
    lateralScan?: Image;
    preScan?: Image;
  };
  @Input() annotations: {
    main: Annotation[];
    lateral: Annotation[];
    pre: Annotation[];
  };

  annotationsStudent: {
    main: Annotation[];
    lateral: Annotation[];
    pre: Annotation[];
  };

  @Input() showCommentButton: boolean;

  @Input() isMobile: boolean;
  @Input() drawMode: boolean;
  @Input() categories: Category[];

  imageUrl = environment.images;

  // state variables for current display
  currentMode: string;
  currentScanUrl: string;
  currentScaleFactor = 1.0;
  currentWidth: number;
  currentHeight: number;
  currentTooltip = "";

  // state variables for canvas layers
  displayBoxes: boolean = false;
  enableZoom: boolean;

  startX = 0;
  startY = 0;
  width = 0;
  height = 0;

  tempBoxes: {
    main: BoundingBox[];
    lateral: BoundingBox[];
    pre: BoundingBox[];
  };

  // Zoom lens
  lensSize = 140;
  maxLensSize = 240;

  @ViewChild("boxLayer", {static: false}) drawLayer: ElementRef;
  private drawLayerElement;
  private drawContext: CanvasRenderingContext2D;

  @ViewChild("labelLayer", {static: false}) labelLayer: ElementRef;
  private labelLayerElement;
  private labelContext: CanvasRenderingContext2D;

  @ViewChild("tempLayer", {static: false}) tempLayer: ElementRef;
  private tempLayerElement;
  private tempContext: CanvasRenderingContext2D;

  private hoverLayerElement;
  private hoverContext: CanvasRenderingContext2D;

  private editLayerElement;
  private editContext: CanvasRenderingContext2D;

  private enableEdit: boolean = true;

  @ViewChild("editLayer", {static: false}) set editLayer(layer: ElementRef) {
    if (this.enableEdit) {
      this.editLayerElement = layer.nativeElement;
      this.editContext = this.editLayerElement.getContext("2d")
      this.rectangleDrawing()
    }
  }

  @ViewChild("hoverLayer", {static: false}) set hoverLayer(layer: ElementRef) {
    if (this.displayBoxes) {
      this.hoverLayerElement = layer.nativeElement;
      this.hoverContext = this.hoverLayerElement.getContext("2d");
      this.setHoverListeners();
    }
  };

  @ViewChild("tipDiv", {static: false}) tipDiv: ElementRef;
  private tipDivElement;

  @ViewChild("sourceImage") sourceImage: ElementRef;
  private zoomDivElement;
  private zoomLayerElement;
  private lensElement;

  @ViewChild("lensContainer") set zoom(container: ElementRef) {
    if (this.enableZoom) {
      const containerElement = container.nativeElement;
      this.zoomDivElement = containerElement.children[0];
      this.lensElement = containerElement.children[1];
      this.zoomLayerElement = containerElement.children[2];
      this.imageZoom();
    }
  }

  constructor(private backendCaller: BackendCallerService,
              private renderer: Renderer2,
              private dialog: MatDialog,
              private dialogService: MatDialogService,
              private imageDisplayService: ImageDisplayService) {
  }

  ngOnInit(): void {
    this.tempBoxes = {
      main: [],
      lateral: [],
      pre: []
    };
    this.annotationsStudent = {
      main: [],
      lateral: [],
      pre: []
    };
    this.displayBoxes = false;
    // this.enableEdit = false;

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

  clearCanvas() {
    this.drawContext.clearRect(0, 0, this.drawLayerElement.width, this.drawLayerElement.height);
    this.labelContext.clearRect(0, 0, this.labelLayerElement.width, this.labelLayerElement.height);
  }

  clearData() {
    this.annotationsStudent = {
      main: [],
      lateral: [],
      pre: []
    };
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

      this.imageDisplayService.setCanvasProperties(this.editContext, 5, "square", "green");
      this.editContext.beginPath();
      this.editContext.clearRect(0, 0, this.editLayerElement.width, this.editLayerElement.height);
      this.editContext.rect(this.startX, this.startY, this.width, this.height);
      this.editContext.stroke();
    });
  }

  setCurrentImage() {
    const filename = this.scans[this.currentMode + "Scan"].filename;
    this.currentScanUrl = this.imageUrl + this.scans.id + "/" + filename;
  }

  deleteLastTempBox() {
    this.tempBoxes[this.currentMode].pop()
    this.drawTempBoxes()
  }

  setCurrentDimensions() {
    this.imageDisplayService.computeCanvasDimensions(this.currentScanUrl, (h, w, s) => {
      this.currentHeight = h;
      this.currentWidth = w;
      this.currentScaleFactor = s;
    });
  }

  changeMode(mode: string) {
    this.clearCanvas()
    this.currentMode = mode;
    this.enableZoom = false;
    this.setCurrentImage();
    this.setCurrentDimensions();
    if (this.displayBoxes) {
      setTimeout(() => this.drawBoxesSolution(), 5);
      this.setHoverListeners();
    }
    setTimeout(() => this.drawBoxesStudent(this.displayBoxes), 5)
  }


  toggleBoxes() {
    this.displayBoxes = !this.displayBoxes;
    this.clearCanvas();
    if (this.displayBoxes) {
      this.drawBoxesSolution();
    }
  }

  toggleZoom() {
    this.enableZoom = !this.enableZoom;
  }

  zoomIn(increment: number) {
    this.lensSize += increment;
    this.lensSize = Math.min(this.lensSize, this.maxLensSize);
    this.imageZoom();
  }

  checkBoxes() {
    this.toggleBoxes()
    this.drawBoxesStudent(true)
  }

  drawBoxesSolution() {
    const annotations = this.annotations[this.currentMode];
    for (const annotation of annotations) {
      let color = this.imageDisplayService.displayBoxColor[annotations.indexOf(annotation)]
      for (const bbox of annotation.boxes) {
        if (this.drawMode) {
          // overwrite annotation color with feedback color (red / yellow / green) when in draw mode
          color = this.feedbackColorForSolutionBox(annotation, bbox)
        }
        this.imageDisplayService.drawRect(this.drawContext, bbox, this.currentScaleFactor, color, this.drawMode, color);
      }
      this.imageDisplayService.addLabelToContext(this.labelContext, annotation, this.currentScaleFactor, color,
        annotation.boxes[0], annotations, this.drawMode);
    }
  }

  drawBoxesStudent(feedbackColor = false) {
    const annotations = this.annotationsStudent[this.currentMode];
    for (const annotation of annotations) {
      let color = this.imageDisplayService.displayBoxColor[annotations.indexOf(annotation)]
      for (const bbox of annotation.boxes) {
        if (feedbackColor) {
          color = this.feedbackColorForStudentBox(annotation, bbox)
        }
        this.imageDisplayService.drawRect(this.drawContext, bbox, this.currentScaleFactor, color);
      }
      this.imageDisplayService.addLabelToContext(this.labelContext, annotation, this.currentScaleFactor,
        color, annotation.boxes[0], annotations);
    }
  }

  feedbackColorForSolutionBox(solutionAnnotation, solutionBox) {
    let feedbackColors = ["rgba(255,0,0, 0.3)", "rgba(255,196,0,0.3)", "rgb(0,189,0, 0.3)"]
    let maxIoU = 0
    this.annotationsStudent[this.currentMode].forEach(studentAnnotation => {
      if (!studentAnnotation.label.includes(solutionAnnotation.label)) {
        return
      }
      studentAnnotation.boxes.forEach(studentBox => {
        let r1: Rectangle = {
          x1: studentBox.left,
          y1: studentBox.top,
          x2: studentBox.left + studentBox.width,
          y2: studentBox.top + studentBox.height
        }
        let r2: Rectangle = {
          x1: solutionBox.left,
          y1: solutionBox.top,
          x2: solutionBox.left + solutionBox.width,
          y2: solutionBox.top + solutionBox.height
        }
        let iou = this.calculateIoU(r1, r2)
        maxIoU = Math.max(iou, maxIoU)
      })
    })

    if (maxIoU > 0.5) {
      return feedbackColors[2]
    }

    if (maxIoU > 0.2) {
      return feedbackColors[1]
    }

    return feedbackColors[0]
  }

  feedbackColorForStudentBox(drawnAnnotation, drawnBox) {
    let feedbackColors = ["rgba(255,0,0,1)", "rgba(255,196,0,1)", "rgb(0,189,13)"]
    let maxIoU = 0
    this.annotations[this.currentMode].forEach(correctAnnotation => {
      if (!correctAnnotation.label.includes(drawnAnnotation.label)) {
        return
      }
      correctAnnotation.boxes.forEach(solutionBox => {
        let r1: Rectangle = {
          x1: solutionBox.left,
          y1: solutionBox.top,
          x2: solutionBox.left + solutionBox.width,
          y2: solutionBox.top + solutionBox.height
        }
        let r2: Rectangle = {
          x1: drawnBox.left,
          y1: drawnBox.top,
          x2: drawnBox.left + drawnBox.width,
          y2: drawnBox.top + drawnBox.height
        }
        let iou = this.calculateIoU(r1, r2)
        maxIoU = Math.max(iou, maxIoU)
      })
    })

    if (maxIoU > 0.5) {
      return feedbackColors[2]
    }

    if (maxIoU > 0.2) {
      return feedbackColors[1]
    }

    return feedbackColors[0]
  }


  setHoverListeners() {
    if (this.isMobile) return
    const annotations = this.annotations[this.currentMode];
    const rect = this.hoverLayerElement.getBoundingClientRect();

    const parent = this;
    this.hoverLayerElement.removeEventListener("mousemove", toolTip);
    this.hoverLayerElement.addEventListener("mousemove", toolTip);

    function toolTip(e) {
      let hit = false;
      let mouseX = e.clientX - rect.left
      let mouseY = e.clientY - rect.top
      for (const annotation of annotations) {
        if (annotation.comment?.length > 0) {
          const x = parent.currentScaleFactor * annotation.labelLeft;
          const y = parent.currentScaleFactor * annotation.labelTop + BOX_LINE_WIDTH + 20;
          const h = 30; // approx. height of 18pt font size
          const w = parent.labelContext.measureText(annotation.label).width;

          const isWithinWidth = mouseX >= x && mouseX <= x + w;
          const isWithinHeight = mouseY >= y - h && mouseY <= y;
          if (isWithinWidth && isWithinHeight) {
            // TODO Compute corner coordinates of tooltip based on position in image
            parent.showToolTip(mouseX, mouseY + 20, annotation.comment);
            hit = true;
          }
        }
      }
      if (!hit) {
        parent.hideToolTip();
      }
    }
  }

  showAllComments() {
    for (const annotation of this.annotations[this.currentMode]) {
      if (annotation.comment?.length > 0) {
        this.showToolTip(annotation.labelLeft * this.currentScaleFactor, annotation.labelTop * this.currentScaleFactor + 30, annotation.comment)
      }
    }
  }

  showToolTip(x, y, text) {
    this.currentTooltip = text;
    this.renderer.setStyle(this.tipDivElement, "top", y + "px");
    this.renderer.setStyle(this.tipDivElement, "left", x + "px");

  }

  hideToolTip() {
    this.renderer.setStyle(this.tipDivElement, "left", "-800px");
  }

  imageZoom() {
    this.imageDisplayService.setImageZoomEventListeners(this.sourceImage.nativeElement,
      this.lensElement, this.lensSize, this.zoomLayerElement, this.zoomDivElement);
  }

  saveTempBox() {
    if (this.width === 0 && this.height === 0) return
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
    this.annotationDialog()
  }

  annotationDialog() {
    const categories = this.categories
    const dialogConfig = this.dialogService.defaultConfig("300px", {categories});
    const dialogRef = this.dialog.open(AnnotationPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.saveNewAnnotation(dialogResult)
      } else {
        //dialog has been cancelled
        this.deleteLastTempBox()
      }
    });
  }

  saveNewAnnotation(label) {
    // gather all necessary data
    const boxes = this.tempBoxes[this.currentMode];
    if (boxes.length == 0) return;
    const labelCoordinates = this.getLabelCoordinates(boxes);

    // push new annotation to array of proper mode
    this.annotationsStudent[this.currentMode].push({
      boxes,
      label: label,
      comment: "",
      labelLeft: labelCoordinates[0],
      labelTop: labelCoordinates[1]
    });

    // update state and empty buffer variables
    this.tempBoxes[this.currentMode] = [];
    this.tempContext.clearRect(0, 0, this.tempLayerElement.width, this.tempLayerElement.height);
    this.drawBoxesStudent()
  }

  drawTempBoxes() {
    this.tempContext.clearRect(0, 0, this.tempLayerElement.width, this.tempLayerElement.height);
    const boxes = this.tempBoxes[this.currentMode];
    for (const box of boxes) {
      this.imageDisplayService.drawRect(this.tempContext, box, this.currentScaleFactor, "blue");
    }
  }

  private fixNegativeCoordinates() {
    // in case the box is drawn from bottom right to top left: adjust negative width and height
    if (this.width < 0) {
      this.width = -this.width;
      this.startX = this.startX - this.width;
    }
    if (this.height < 0) {
      this.height = -this.height;
      this.startY = this.startY - this.height;
    }
  }

  getLabelCoordinates(boxes: BoundingBox[]): [number, number] {
    // Idea: Identify most left and bottom coordinate from all boxes and hope it won't look weird
    let labelX = 5000; // start very far right
    let labelY = 0; // start at the top
    for (const box of boxes) {
      let boxBottomY = box.top + box.height
      if (labelY < boxBottomY) {
        labelY = boxBottomY;
      }
      if (labelX > box.left) {
        labelX = box.left;
      }
    }
    return [labelX, labelY];
  }


  calculateIntersection(rect1: Rectangle, rect2: Rectangle): number {
    const xOverlap = Math.max(0, Math.min(rect1.x2, rect2.x2) - Math.max(rect1.x1, rect2.x1));
    const yOverlap = Math.max(0, Math.min(rect1.y2, rect2.y2) - Math.max(rect1.y1, rect2.y1));
    return xOverlap * yOverlap;
  }

  calculateUnion(rect1: Rectangle, rect2: Rectangle): number {
    const rect1Area = (rect1.x2 - rect1.x1) * (rect1.y2 - rect1.y1);
    const rect2Area = (rect2.x2 - rect2.x1) * (rect2.y2 - rect2.y1);
    return rect1Area + rect2Area - this.calculateIntersection(rect1, rect2);
  }

  calculateIoU(rect1: Rectangle, rect2: Rectangle): number {
    const intersection = this.calculateIntersection(rect1, rect2);
    const union = this.calculateUnion(rect1, rect2);
    return intersection / union;
  }

}

interface Rectangle {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
