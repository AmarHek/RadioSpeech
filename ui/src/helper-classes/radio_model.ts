import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export type Selectable = CheckBox | Group;

// Selectable classes, lower than category

export interface CheckBox {
  kind:           "box";
  name:           string;
  value:          boolean;
  text:           string;
  judgementText?: string;
  normal:         boolean;
  variables:      Variable[];
  enumeration?:   string;
  synonyms:       string[];
}

export interface Group {
  kind:    "group";
  name:    string;
  options: Option[];
  value?:  string;
}

export interface Option {
  kind:           "option";
  name:           string;
  text:           string;
  conditionalId?: string;
  judgementText?: string;
  normal:         boolean;
  variables:      Variable[];
  synonyms:       string[];
}

export type TopLevel = Category | Block | Enumeration;

// Main data management and display class

export interface Category {
  kind: "category";
  name: string;
  optional?: boolean;
  selectables: Selectable[];
}

export interface Block {
  kind: "block";
  text?: string;
  judgementText?: string;
}

export interface Enumeration {
  kind:           "enumeration";
  text:           string;
  judgementText?: string;
  id:             string;
}

// Variable types

export type Variable = VariableOC | VariableMC | VariableText | VariableNumber | VariableDate | VariableRatio;

export interface VariableCommon {
  id:         string;
  textBefore: string;
  textAfter:  string;
  synonyms:   string[];
}

export interface VariableOC extends VariableCommon {
  kind:   "oc";
  value?: string;
  values: string[];
}

export interface VariableMC extends VariableCommon {
  kind:   "mc";
  values: [string, boolean][];
}

export interface VariableText extends VariableCommon {
  kind:  "text";
  value: string;
}

export interface VariableNumber extends VariableCommon {
  kind:  "number";
  value: number;
}

export interface VariableDate extends VariableCommon {
  kind:  "date";
  value: NgbDateStruct;
}

export interface VariableRatio extends VariableCommon {
  kind:           "ratio";
  numerator:      number;
  denominator:    number;
  fractionDigits: number;
}

