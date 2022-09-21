import {Template} from "./template.model";

export interface BoundingBox {
  left: number;
  top: number;
  height: number;
  width: number;
}

export interface Annotation {
  boxes: BoundingBox[];
  label: string;
  comment?: string;
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
    id:           string;
    mainScan:     Image;
    lateralScan?: Image;
    preScan?:     Image;
  }
  annotations: {
    main:         Annotation[];
    lateral:      Annotation[];
    pre:          Annotation[]
  }
  modality:             string;
  deepDocTemplate:      Template;
  shallowDocTemplate:   Template;
  timestamp:            number;
  lastModified?:        number;
  judged:               boolean;
}

export interface UsageData {
  materialID: string;
  deepDocTemplate: Template;
  shallowDocTemplate: Template;
  mode: string;
  timestamp: number;
  duration: number;
  ogMaterial: Material;
  resetCounter: number;
}

export interface Participant {
  UUID: string;
  usageList: UsageData[]
}




