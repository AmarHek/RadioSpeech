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
import {Annotation, BoundingBox, Image} from "@app/models";
import {BackendCallerService} from "@app/core";

const BOX_LINE_WIDTH = 5;
const DISPLAY_BOX_COLOR = ["rgba(170,110,40,1)", "rgba(128,128,0,1)", "rgba(0,128, 128,1)",
  "rgba(230,25,75,1)", "rgba(245,130,48,1)", "rgba(255,255,25,1)", "rgba(210,245,60,1)", "rgba(60,180,75,1)",
  "rgba(70,240,240,1)", "rgba(0,130,200,1)", "rgba(145,30,180,1)", "rgba(240,50,230,1)", "rgba(128,128,128,1)",
  "rgba(250,190,212,1)", "rgba(255,215,180,1)", "rgba(255,250,200,1)", "rgba(170,255,195,1)", "rgba(128,0,0,1)",
  "rgba(220,190,255,1)", "rgba(0,0,0,1)"];

const MAX_IMAGE_HEIGHT = 800;
const MAX_IMAGE_WIDTH = 950;

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
    main:     Annotation[];
    lateral:  Annotation[];
    pre:      Annotation[];
  };

  imageUrl = environment.images;

  // state variables for current display
  currentMode: string;
  currentScanUrl: string;
  currentScaleFactor = 1.0;
  currentWidth: number;
  currentHeight: number;
  currentTooltip = "";

  // state variables for canvas layers
  displayBoxes: boolean;
  enableZoom: boolean;
  enableHover: boolean;

  // Zoom lens
  lensSize = 200;
  maxLensSize = 250;

  // tooltip size
  maxTipWidth = 300;

  @ViewChild("drawLayer", {static: false }) drawLayer: ElementRef;
  private drawLayerElement;
  private drawContext: CanvasRenderingContext2D;

  @ViewChild("labelLayer", {static: false }) labelLayer: ElementRef;
  private labelLayerElement;
  private labelContext: CanvasRenderingContext2D;

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
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.displayBoxes = false;

    this.initMain();
  }

  ngAfterViewInit(): void {
    this.drawLayerElement = this.drawLayer.nativeElement;
    this.drawContext = this.drawLayerElement.getContext("2d");
    this.labelLayerElement = this.labelLayer.nativeElement;
    this.labelContext = this.labelLayerElement.getContext("2d");
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
    this.enableZoom = false;
    this.setCurrentImage();
    this.setCurrentDimensions();
    if (this.displayBoxes) {
      this.drawBoxes();
    }
  }

  toggleBoxes() {
    this.displayBoxes = !this.displayBoxes;
    this.enableHover = !this.enableHover;
    this.clearCanvas();
    if (this.displayBoxes) {
      this.drawBoxes();
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
    // TODO Correctness display
    this.labelContext.font = "bold 15pt Arial";
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

  private imageZoom() {
    const img = this.sourceImage.nativeElement as HTMLImageElement;
    // calculate ratio between result div and lens
    const cx = this.zoomDivElement.offsetWidth / this.lensElement.offsetWidth;
    const cy = this.zoomDivElement.offsetHeight / this.lensElement.offsetHeight;
    // Set background properties for the result div
    this.zoomDivElement.style.backgroundImage = "url('" + img.src + "')";
    this.zoomDivElement.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
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
      // set lens display / zoomDiv position
      // first get center coordinates of the lens
      const centerX = x + parent.lensSize / 2;
      const centerY = y + parent.lensSize / 2;
      // then use zoomDiv Size (hard coded) to compute top and left TODO: Make non hard-coded
      let zoomDivX = centerX - 125;
      let zoomDivY = centerY - 125;
      // apply constraints on position: not less than 0 and not more than image height and width
      zoomDivX = Math.max(0, zoomDivX);
      zoomDivX = Math.min(zoomDivX, img.width - 250);
      zoomDivY = Math.max(0, zoomDivY);
      zoomDivY = Math.min(zoomDivY, img.height - 250);
      parent.zoomDivElement.style.left = zoomDivX + "px";
      parent.zoomDivElement.style.top = zoomDivY + "px";
      // Display what the lens "sees":
      parent.zoomDivElement.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
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

}
