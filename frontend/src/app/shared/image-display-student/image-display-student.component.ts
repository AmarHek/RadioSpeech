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
import {BackendCallerService, ImageDisplayService} from "@app/core";

const BOX_LINE_WIDTH = 5;
const DISPLAY_BOX_COLOR = ["rgba(170,110,40,1)", "rgba(128,128,0,1)", "rgba(0,128, 128,1)",
  "rgba(230,25,75,1)", "rgba(245,130,48,1)", "rgba(255,255,25,1)", "rgba(210,245,60,1)", "rgba(60,180,75,1)",
  "rgba(70,240,240,1)", "rgba(0,130,200,1)", "rgba(145,30,180,1)", "rgba(240,50,230,1)", "rgba(128,128,128,1)",
  "rgba(250,190,212,1)", "rgba(255,215,180,1)", "rgba(255,250,200,1)", "rgba(170,255,195,1)", "rgba(128,0,0,1)",
  "rgba(220,190,255,1)", "rgba(0,0,0,1)"];

const MAX_IMAGE_HEIGHT = 800;
let MAX_IMAGE_WIDTH = 950;

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

  @Input() isMobile: boolean

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

  @ViewChild("boxLayer", {static: false }) drawLayer: ElementRef;
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
              private imageDisplayService: ImageDisplayService) { }

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

  clearCanvas() {
    this.drawContext.clearRect(0, 0, this.drawLayerElement.width, this.drawLayerElement.height);
    this.labelContext.clearRect(0, 0, this.labelLayerElement.width, this.labelLayerElement.height);
  }

  setCurrentImage() {
    const filename = this.scans[this.currentMode + "Scan"].filename;
    this.currentScanUrl = this.imageUrl + this.scans.id + "/" + filename;
  }

  setCurrentDimensions() {
    this.imageDisplayService.computeCanvasDimensions(this.currentScanUrl, (h, w, s) => {
      this.currentHeight = h;
      this.currentWidth = w;
      this.currentScaleFactor = s;
    });
  }

  changeMode(mode: string) {
    this.currentMode = mode;
    this.enableZoom = false;
    this.setCurrentImage();
    this.setCurrentDimensions();
    if (this.displayBoxes) {
      this.drawBoxes();
    }
    if (this.enableHover) {
      this.setHoverListeners();
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
        this.imageDisplayService.drawRect(this.drawContext, bbox,
          this.currentScaleFactor, annotations.indexOf(annotation));
      }
      this.imageDisplayService.addLabelToContext(this.labelContext, annotation, this.currentScaleFactor,
        annotations.indexOf(annotation));
    }
  }

  setHoverListeners() {
    const annotations = this.annotations[this.currentMode];
    const rect = this.hoverLayerElement.getBoundingClientRect();

    const parent = this;
    this.hoverLayerElement.removeEventListener("mousemove", toolTip);
    this.hoverLayerElement.addEventListener("mousemove", toolTip);
    function toolTip(e) {
      let hit = false;
      for (const annotation of annotations) {
        if (annotation.comment !== undefined) {
          if (annotation.comment.length > 0) {
            const x = parent.currentScaleFactor * annotation.labelLeft;
            const y = parent.currentScaleFactor * annotation.labelTop + BOX_LINE_WIDTH + 20;
            const h = 30; // approx. height of 18pt font size
            const w = parent.labelContext.measureText(annotation.label).width;
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
        parent.hideToolTip();
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
    const img = this.sourceImage.nativeElement as HTMLImageElement;
    // calculate ratio between result div and lens
    const cx = this.zoomDivElement.offsetWidth / this.lensElement.offsetWidth;
    const cy = this.zoomDivElement.offsetHeight / this.lensElement.offsetHeight;
    // Set background properties for the result div
    this.zoomDivElement.style.backgroundImage = "url('" + img.src + "')";
    this.zoomDivElement.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    // Remove previous EventListeners, important for mode change
    this.zoomLayerElement.removeEventListener("mousemove", (e) => {
      this.imageDisplayService.imageZoomOnMousemove(e, cx, cy, img, this.lensElement, this.lensSize,
        this.zoomLayerElement,
        this.zoomDivElement)
    });
    // Execute a function when someone moves the cursor over the image or the lens
    this.zoomLayerElement.addEventListener("mousemove", (e) => {
      this.imageDisplayService.imageZoomOnMousemove(e, cx, cy, img, this.lensElement, this.lensSize,
        this.zoomLayerElement,
        this.zoomDivElement)
    });
  }

}
