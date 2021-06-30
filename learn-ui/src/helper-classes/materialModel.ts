import * as M from "./model";

export interface Pathology {
  name: string;
  present: boolean;
}

export interface Material {
  id:             string;
  img: {
    data:           string;
    contentType:    string;
  };
  modality:       string;
  report:         string;
  parts:          M.TopLevel[];
  defaultParts:   M.TopLevel[];
  pathologies:    Pathology[];

}

