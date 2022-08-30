import {Clickable} from "@app/models/templateModel";

export interface Row {
  kind: "category";
  name: string;
  hidden: boolean;
  optional?: boolean;
  clickables: Clickable[];
}
