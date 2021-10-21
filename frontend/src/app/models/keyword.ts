import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface KeyClickable {
  name: string;
  synonym: string;
  category: string;
  group?: string;
  position: number;
  nVariables: number;
}

export interface KeyVariable {
  category?: string;
  selectable: string;
  id: string;
  kind: string;
  name?: string;
  synonym?: string;
  value?: string | [number, number] | NgbDateStruct | number;
  textBefore: string;
  textAfter: string;
  position: number;
}

export interface ColoredText {
  text: string;
  color: string;
}
