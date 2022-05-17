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
  positionEnd: number; // for easier processing later when making ColoredText
}

export interface ColoredText {
  text: string;
  color: string;
}

export class InputChip{
  content: string;
  color: ChipColors;
  clickable: KeyClickable;
  constructor(content: string, color: ChipColors, clickable: KeyClickable) {
    this.content = content;
    this.color = color;
    this.clickable = clickable;
  }
}

export enum ChipColors {
  RED = "mat-chip-red",
  GREEN = "mat-chip-green",
  YELLOW = "mat-chip-yellow"
}
