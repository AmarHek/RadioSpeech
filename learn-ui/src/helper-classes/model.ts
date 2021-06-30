import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import * as M from "./old_model";

export type Selectable = CheckBox | Group;

export interface TextExtractor {
  ofCheckbox(c: CheckBox): string | undefined;
  ofOption(o: Option): string | undefined;
  ofEnumeration(e: Enumeration): string | undefined;
  ofBlock(e: Block): string | undefined;
  ofConditional(c: Conditional): string | undefined;
}

// Selectable classes, lower than category

export interface CheckBox {
  kind:           "box";
  name:           string;
  value:          boolean;
  text:           string;
  conditionalId?: string;
  judgementText?: string;
  normal:         boolean;
  variables:      Variable[];
  enumeration?:   string;
  keys:           string[];
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
  keys:           string[];
}

export interface Template {
  id: string;
  name: string;
  parts: TopLevel[];
}

export type TopLevel = Category | Block | Enumeration | Conditional;

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

export interface Conditional {
  kind:           "conditional";
  precondition:   Literal[][];
  normalText?:    string;
  judgementText?: string;
}

export interface Literal {
  id:      string;
  negated: boolean;
}

// Variable types

export type Variable = VariableOC | VariableMC | VariableText | VariableNumber | VariableDate | VariableRatio;

export interface VariableCommon {
  id:         string;
  textBefore: string;
  textAfter:  string;
  // TODO: Refactor because only OC and MC need keys (aka synonyms)
  keys?:      string[][];
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

export function convertSelectables(oldSels: M.Selectable[]): Selectable[] {
  const newSels: Selectable[] = [];
  for (const oldSel of oldSels) {
    let newSel: Selectable;
    if (oldSel.kind === "box") {
      newSel = convertCheckBox(oldSel);
    } else if (oldSel.kind === "group") {
      newSel = convertGroup(oldSel);
    }
    newSels.push(newSel);
  }
  return newSels;
}

export function convertCheckBox(oldBox: M.CheckBox): CheckBox {
  const newVariables: Variable[] = convertVariables(oldBox.variables);
  const keywords: string[] = splitKeywords(oldBox.data["bau"][0], ";");
  return {
    kind: oldBox.kind,
    name: oldBox.name,
    value: oldBox.value,
    text: oldBox.text,
    judgementText: oldBox.judgementText,
    enumeration: oldBox.enumeration,
    normal: oldBox.normal,
    variables: newVariables,
    keys: keywords
  };
}

export function convertGroup(oldGroup: M.Group): Group {
  const newOpts: Option[] = [];
  for (const oldOpt of oldGroup.options) {
    newOpts.push(convertOption(oldOpt));
  }
  return {
    kind: oldGroup.kind,
    name: oldGroup.name,
    options: newOpts,
    value: oldGroup.value
  };
}

export function convertOption(oldOpt: M.Option): Option {
  const newVariables: Variable[] = convertVariables(oldOpt.variables);
  const keys: string[] = splitKeywords(oldOpt.data["bau"][0], ";");
  return {
    kind: oldOpt.kind,
    name: oldOpt.name,
    text: oldOpt.text,
    judgementText: oldOpt.judgementText,
    normal: oldOpt.normal,
    variables: newVariables,
    keys: keys
  };
}

export function convertBlock(oldBlock: M.Block): Block {
  return {
    kind: oldBlock.kind,
    text: oldBlock.text,
    judgementText: oldBlock.judgementText
  };
}

export function convertEnum(oldEnum: M.Enumeration): Enumeration {
  return {
    kind: oldEnum.kind,
    text: oldEnum.text,
    judgementText: oldEnum.judgementText,
    id: oldEnum.id
  };
}

export function convertCond(oldCond: M.Conditional): Conditional {
  return {
    kind: oldCond.kind,
    precondition: oldCond.precondition,
    normalText: oldCond.normalText,
    judgementText: oldCond. judgementText
  };
}

export function convertCategory(oldCat: M.Category): Category {
  const newSels = convertSelectables(oldCat.selectables);
  return {
    kind: oldCat.kind,
    name: oldCat.name,
    optional: oldCat.optional,
    selectables: newSels
  };
}

export function convertVariables(oldVars: M.Variable[]): Variable[] {
  const newVars: Variable[] = [];
  for (const variable of oldVars) {
    newVars.push(convertVariable(variable));
  }
  return newVars;
}

export function convertVariable(oldVar: M.Variable): Variable {
  let newVar: Variable;

  if (oldVar.kind === "oc") {
    const keys: string[][] = splitKeywordsArray(oldVar.data["syn"][0], "/", ";");
    newVar = {
      kind: oldVar.kind,
      id: oldVar.id,
      textBefore: oldVar.textBefore,
      textAfter: oldVar.textAfter,
      keys: keys,
      value: oldVar.value,
      values: oldVar.values
    };
  } else if (oldVar.kind === "mc") {
    const keys: string[][] = splitKeywordsArray(oldVar.data["syn"][0], ";", ",");
    newVar = {
      kind: oldVar.kind,
      id: oldVar.id,
      textBefore: oldVar.textBefore,
      textAfter: oldVar.textAfter,
      keys: keys,
      values: oldVar.values
    };
  } else if (oldVar.kind === "text") {
    newVar = {
      kind: oldVar.kind,
      id: oldVar.id,
      textBefore: oldVar.textBefore,
      textAfter: oldVar.textAfter,
      keys: null,
      value: oldVar.value
    };
  } else if (oldVar.kind === "number") {
    newVar = {
      kind: oldVar.kind,
      id: oldVar.id,
      textBefore: oldVar.textBefore,
      textAfter: oldVar.textAfter,
      keys: null,
      value: oldVar.value
    };
  } else if (oldVar.kind === "date") {
    newVar = {
      kind: oldVar.kind,
      id: oldVar.id,
      textBefore: oldVar.textBefore,
      textAfter: oldVar.textAfter,
      keys: null,
      value: oldVar.value
    };
  } else if (oldVar.kind === "ratio") {
    newVar = {
      kind: oldVar.kind,
      id: oldVar.id,
      textBefore: oldVar.textBefore,
      textAfter: oldVar.textAfter,
      keys: null,
      numerator: oldVar.numerator,
      denominator: oldVar.denominator,
      fractionDigits: oldVar.fractionDigits
    };
  }

  return newVar;
}

export function splitKeywords(keywords: string, splitter: string): string[] {
  if (keywords) {
    return keywords.split(splitter);
  } else {
    return null;
  }
}

export function splitKeywordsArray(keys: string, optionSplitter: string, synonymSplitter: string): string[][] {
  const result: string[][] = [];
  const variableSplit: string[] = splitKeywords(keys, optionSplitter);
  if (variableSplit) {
    for (const varSynonyms of variableSplit) {
      const synSplit: string[] = splitKeywords(varSynonyms, synonymSplitter);
      synSplit.map(key => key.trim());
      result.push(synSplit);
    }
  } else {
    return null;
  }
  return result;
}
