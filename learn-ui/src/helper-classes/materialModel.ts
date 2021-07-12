import * as M from "./model";

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
  modality:       string;
  parts:          M.TopLevel[];
  pathologies:    Pathology[];
  judged:         boolean;
}

