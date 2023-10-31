import {Template} from "./template.model";

export interface DoctorReport{
  template: Template;
  timestamp: number;
  duration: number;
  imageID: string;
  layoutID: number;
  mode: string;
  report: string;
  pseudonym: string;
}




