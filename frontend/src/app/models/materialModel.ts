import * as M from "./templateModel";
import {Template} from "./templateModel";

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
  filename: string;
  mimetype: string;
}

export interface Material {
  _id:            string;
  scans: {
    id: string;
    mainScan: Image;
    lateralScan?: Image;
    preScan?: Image;
  };
  coordinates: {
    main:         BoundingBox[];
    lateral:      BoundingBox[];
    pre:          BoundingBox[];
  };
  modality:       string;
  template:       Template;
  pathologies:    Pathology[];
  judged:         boolean;
}
