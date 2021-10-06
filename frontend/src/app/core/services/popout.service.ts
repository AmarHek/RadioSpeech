import { ComponentPortal, DomPortalOutlet, PortalInjector } from "@angular/cdk/portal";
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from "@angular/core";

import {POPOUT_MODAL_DATA, POPOUT_MODALS} from "./popout.tokens";
import { ImageDisplayComponent } from "@app/shared";


@Injectable()
export class PopoutService {
  styleSheetElement;

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef
  ) {
  }

  openPopoutModal(data) {
    const windowInstance = this.openOnce(
      "assets/modal/popout.html",
      "MODAL_POPOUT"
    );

    // Wait for window instance to be created
    setTimeout(() => {
      this.createCDKPortal(data, windowInstance);
    }, 1000);
  }

  openOnce(url, target) {
    // Open a blank "target" window
    // or get the reference to the existing "target" window
    const winRef = window.open("", target, "", true);
    // If the "target" window was just opened, change its url
    if (winRef.location.href === "about:blank") {
      winRef.location.href = url;
    }
    return winRef;
  }

  createCDKPortal(data, windowInstance) {
    if (windowInstance) {
      // Create a PortalOutlet with the body of the new window document
      const outlet = new DomPortalOutlet(windowInstance.document.body,
        this.componentFactoryResolver, this.applicationRef, this.injector);

      // Copy stylesheet link from parent window
      this.styleSheetElement = this.getStyleSheetElement();
      windowInstance.document.head.appendChild(this.styleSheetElement);

      this.styleSheetElement.onload = () => {
        // Clear popout modal content
        windowInstance.document.body.innerText = "";
        // Create an injector with modal data
        const injector = this.createInjector(data);
        // Attach the portal
        windowInstance.document.title = "Image Display";
        const componentInstance = this.attachContainer(outlet, injector);

        POPOUT_MODALS["windowInstance"] = windowInstance;
        POPOUT_MODALS["outlet"] = outlet;
        POPOUT_MODALS["componentInstance"] = componentInstance;
      };
    }
  }

  isPopoutWindowOpen() {
    return POPOUT_MODALS["windowInstance"] && !POPOUT_MODALS["windowInstance"].closed;
  }

  focusPopoutWindow() {
    POPOUT_MODALS["windowInstance"].focus();
  }

  closePopoutModal() {
    if (POPOUT_MODALS["windowInstance"]) {
      POPOUT_MODALS["windowInstance"].close();
    }
  }

  attachContainer(outlet, injector) {
    const containerPortal = new ComponentPortal(ImageDisplayComponent, null, injector);
    const containerRef: ComponentRef<ImageDisplayComponent> = outlet.attach(containerPortal);
    return containerRef.instance;
  }

  createInjector(data): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(POPOUT_MODAL_DATA, data);
    return new PortalInjector(this.injector, injectionTokens);
  }

  getStyleSheetElement() {
    const styleSheetElement = document.createElement("link");
    document.querySelectorAll("link").forEach(htmlElement => {
      if (htmlElement.rel === "stylesheet") {
        const absoluteUrl = new URL(htmlElement.href).href;
        styleSheetElement.rel = "stylesheet";
        styleSheetElement.href = absoluteUrl;
      }
    });
    return styleSheetElement;
  }
}
