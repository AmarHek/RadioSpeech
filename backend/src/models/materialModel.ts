import * as M from "./templateModel";
import {Document} from "mongoose";

export interface Pathology {
  name: string;
  present: boolean;
}

export interface BoundingBox {
  left: number;
  top: number;
  height: number;
  width: number;
  label: string;
}


export interface Image {
  data:         string;
  contentType:  string;
}

export interface Material {
  id:             string;
  mainScan: {
    data:           string;
    contentType:    string;
  };
  lateralScan: {
    data:           string;
    contentType:    string;
  };
  preScan: {
    data:           string;
    contentType:    string;
  };
  coordinates?: {
    main?: BoundingBox[];
    lateral?: BoundingBox[];
    pre?: BoundingBox[];
  }
  modality:       string;
  parts:          M.TopLevel[];
  pathologies:    Pathology[];
}




