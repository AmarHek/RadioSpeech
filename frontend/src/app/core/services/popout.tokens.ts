import { InjectionToken } from "@angular/core";
import {Annotation, BoundingBox, Image} from "@app/models";

export interface PopoutData {
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
  restricted?: boolean;
}

export const POPOUT_MODAL_DATA = new InjectionToken<PopoutData>("POPOUT_MODAL_DATA");

export const POPOUT_MODALS = {
};
