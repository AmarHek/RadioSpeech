import {Template} from "./template.model";

export interface DoctorReport{
  template: Template;
  timestampStart: number;
  duration: number;
  imageID: string;
  layoutID: number;
  mode: string;
  report: string;
  pseudonym: string;
}




