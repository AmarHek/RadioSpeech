import { InjectionToken } from "@angular/core";
import {BoundingBox, Image} from "../../models/materialModel";

export interface PopoutData {
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
}

export const POPOUT_MODAL_DATA = new InjectionToken<PopoutData>("POPOUT_MODAL_DATA");

export const POPOUT_MODALS = {
}
