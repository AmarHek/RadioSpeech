import {Template} from "./templateModel";
import {Pathology} from "@app/models/pathologyModel";

export interface BoundingBox {
  left: number;
  top: number;
  height: number;
  width: number;
}

export interface Annotation {
  boxes: BoundingBox[];
  label: string;
  correct: boolean;
  labelLeft: number;
  labelTop: number;
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
  annotations: {
    main:         Annotation[];
    lateral:      Annotation[];
    pre:          Annotation[];
  };
  modality:       string;
  template:       Template;
  pathologies:    string[];
  judged:         boolean;
}

