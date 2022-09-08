import { Injectable } from "@angular/core";
import {Annotation, BoundingBox} from "@app/models";
import {DisplayService} from "@app/core";

@Injectable({
  providedIn: "root"
})
export class ImageDisplayService {

  maxImageHeight = 750;
  maxImageWidth = 890;

  boxLineWidth = 5;
  displayBoxColor = ["rgba(170,110,40,1)", "rgba(128,128,0,1)", "rgba(0,128, 128,1)",
    "rgba(230,25,75,1)", "rgba(245,130,48,1)", "rgba(255,255,25,1)", "rgba(210,245,60,1)", "rgba(60,180,75,1)",
    "rgba(70,240,240,1)", "rgba(0,130,200,1)", "rgba(145,30,180,1)", "rgba(240,50,230,1)", "rgba(128,128,128,1)",
    "rgba(250,190,212,1)", "rgba(255,215,180,1)", "rgba(255,250,200,1)", "rgba(170,255,195,1)", "rgba(128,0,0,1)",
    "rgba(220,190,255,1)", "rgba(0,0,0,1)"];

  constructor(private displayService: DisplayService) {
    this.displayService.isMobile.subscribe((isMobile) => {
      if (isMobile) {
        this.maxImageWidth = window.innerWidth - 2;
      }
    });
  }

  computeCanvasDimensions(imgUrl: string, callback) {
    const img = new Image();
    img.src = imgUrl;

    let height: number;
    let width: number;
    let scaleFactor: number;

    img.onload = (event) => {
      const loadedImage = event.currentTarget as HTMLImageElement;
      height = loadedImage.height;
      width = loadedImage.width;
      scaleFactor = 1.0;

      // First check by height
      if (height >= this.maxImageHeight) {
        scaleFactor = this.maxImageHeight / loadedImage.height;
        height = this.maxImageHeight;
        width = loadedImage.width * scaleFactor;
      }

      // Then check by width
      if (width >= this.maxImageWidth) {
        scaleFactor = scaleFactor * this.maxImageWidth / width;
        width = this.maxImageWidth;
        height = scaleFactor * loadedImage.height;
      }

      callback(height, width, scaleFactor);
    };
  }

  setCanvasProperties(context, lineWidth, lineCap, strokeStyle) {
    context.lineWidth = lineWidth;
    context.lineCap = lineCap;
    context.strokeStyle = strokeStyle;
  }

  drawRect(context: CanvasRenderingContext2D, bbox: BoundingBox, scaleFactor: number, color: string) {
    this.setCanvasProperties(context, this.boxLineWidth, "square", color);
    context.beginPath();
    context.rect(
      bbox.left * scaleFactor,
      bbox.top * scaleFactor,
      bbox.width * scaleFactor,
      bbox.height * scaleFactor);
    context.stroke();
  }

  addLabelToContext(context: CanvasRenderingContext2D, annotation: Annotation, scaleFactor: number, color: string) {
    context.font = "bold 15pt Arial";
    context.fillStyle = color;
    context.strokeStyle = "black";
    context.lineWidth = 0.3;

    let finalLabel: string = annotation.label;
    if (annotation.comment !== undefined) {
      if (annotation.comment.length > 0) {
        finalLabel = annotation.label + "**";
      }
    }

    context.fillText(
      finalLabel,
      scaleFactor * annotation.labelLeft,
      scaleFactor * annotation.labelTop + this.boxLineWidth + 20);
    context.strokeText(
      finalLabel,
      scaleFactor * annotation.labelLeft,
      scaleFactor * annotation.labelTop
      + this.boxLineWidth + 20);
  }

  // adds event listeners to given elements
  setImageZoomEventListeners(img: HTMLImageElement, lensElement, lensSize, zoomLayerElement, zoomDivElement) {
    // calculate ratio between result div and lens
    const cx = zoomDivElement.offsetWidth / lensElement.offsetWidth;
    const cy = zoomDivElement.offsetHeight / lensElement.offsetHeight;
    // Set background properties for the result div
    zoomDivElement.style.backgroundImage = "url('" + img.src + "')";
    zoomDivElement.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    // Remove previous EventListeners, important for mode change

    lensElement.removeEventListener("mousemove", (e) => {
      this.imageZoomOnMousemove(e, cx, cy, img, lensElement, lensSize,
        zoomLayerElement,
        zoomDivElement);
    });
    zoomLayerElement.removeEventListener("mousemove", (e) => {
      this.imageZoomOnMousemove(e, cx, cy, img, lensElement, lensSize,
        zoomLayerElement,
        zoomDivElement);
    });

    // Execute a function when someone moves the cursor over the image or the lens
    lensElement.addEventListener("mousemove", (e) => {
      this.imageZoomOnMousemove(e, cx, cy, img, lensElement, lensSize,
        zoomLayerElement,
        zoomDivElement);
    });
    zoomLayerElement.addEventListener("mousemove", (e) => {
      this.imageZoomOnMousemove(e, cx, cy, img, lensElement, lensSize,
        zoomLayerElement,
        zoomDivElement);
    });
  }

  // event listener function for image zoom using divs
  imageZoomOnMousemove(event, cx, cy,
                       img: HTMLImageElement, lensElement, lensSize, zoomLayerElement, zoomDivElement) {
    let x;
    let y;
    // Prevent any other actions that may occur when moving over the image
    event.preventDefault();
    // Get the cursor's x and y positions:
    const pos = this.getCursorPosInImage(event, img);
    // Calculate the position of the lens:
    x = pos.x - (lensElement.offsetWidth / 2);
    y = pos.y - (lensElement.offsetHeight / 2);
    // Prevent the lens from being positioned outside the image:
    if (x > img.width - lensElement.offsetWidth) {
      x = img.width - lensElement.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lensElement.offsetHeight) {
      y = img.height - lensElement.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }

    // Set the position of the lens:
    lensElement.style.left = x + "px";
    lensElement.style.top = y + "px";

    // set lens display / zoomDiv position
    // first get center coordinates of the lens
    const centerX = x + lensSize / 2;
    const centerY = y + lensSize / 2;

    // then use zoomDiv Size (hard coded) to compute top and left TODO: Make non hard-coded
    let zoomDivX = centerX - 125;
    let zoomDivY = centerY - 125;

    // apply constraints on position: not less than 0 and not more than image height and width
    zoomDivX = Math.max(0, zoomDivX);
    zoomDivX = Math.min(zoomDivX, img.width - 250);
    zoomDivY = Math.max(0, zoomDivY);
    zoomDivY = Math.min(zoomDivY, img.height - 250);

    zoomDivElement.style.left = zoomDivX + "px";
    zoomDivElement.style.top = zoomDivY + "px";
    // Display what the lens "sees":
    zoomDivElement.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }

  // returns the cursor coordinates within an image
  getCursorPosInImage(event, img: HTMLImageElement) {
    let x: number;
    let y: number;
    // Get the x and y positions of the image
    const a = img.getBoundingClientRect();
    // Calculate the cursor's x and y coordinates, relative to the image:
    x = event.pageX - a.left;
    y = event.pageY - a.top;
    // Consider any page scrolling
    x = x - window.scrollX;
    y = y - window.scrollY;
    return {x, y};
  }

}
