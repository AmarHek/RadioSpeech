import {Template} from "./template.model";

export interface Pathology {
  name: string;
  present: boolean;
}

export interface BoundingBox {
  left: number;
  top: number;
  height: number;
  width: number;
}

export interface Annotation {
  boxes: BoundingBox[];
  pathology: Pathology;
  correct: boolean;
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
  }
  coordinates: {
    main:         Annotation[];
    lateral:      Annotation[];
    pre:          Annotation[]
  }
  modality:       string;
  template:       Template;
  pathologies:    Pathology[];
  judged:         boolean;
}




