import * as M from "./templateModel";

export interface Pathology {
  name: string;
  present: boolean;
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

export interface BoundingBox {
  left: number;
  top: number;
  height: number;
  width: number;
  label: string;
}
