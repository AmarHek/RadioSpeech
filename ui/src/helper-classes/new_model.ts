import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { assertNever, flatMap } from './util';

export type Selectable = CheckBox;
export type Clickable  = CheckBox | Option;

export interface Data {
[name: string]: string[];
}

export interface TextExtractor {
  ofCheckbox(c: CheckBox): string | undefined;
  ofOption(o: Option): string | undefined;
  ofEnumeration(e: Enumeration): string | undefined;
  ofBlock(e: Block): string | undefined;
  ofConditional(c: Conditional): string | undefined;
}

export interface CheckBox {
  kind:           'box';
  name:           string[];
  text:           string;
  judgementText: string;
  normal:         boolean;
  variables:      Variable[];
  choiceGroup: string;
  listGroup: string;
}

export interface Group {
  kind:    'group';
  name:    string;
  options: Option[];
  value?:  string;
  data:    Data;
}

export interface Option {
  kind:           'option';
  name:           string;
  text:           string;
  conditionalId?: string;
  judgementText?: string;
  normal:         boolean;
  variables:      Variable[];
  data:           Data;
}

export class myDict {
  id: string;
  dict: Array<TopLevel>;
  name: string;
}

export type TopLevel = Category | Disease;

export interface Disease {
  kind: 'disease';
  name: string;
  categories: Category[];
}

export interface Category {
  kind: 'category';
  name: string;
  condition: string;
  selectables: Selectable[];
}

export interface Block {
  kind: 'block';
  text?: string;
  judgementText?: string;
  data: Data;
}

export interface Enumeration {
  kind:           'enumeration';
  text:           string;
  judgementText?: string;
  id:             string;
  data:           Data;
}

export interface Conditional {
  kind:           'conditional';
  precondition:   Literal[][];
  normalText?:    string;
  judgementText?: string;
  data:           Data;
}

export interface Literal {
  id:      string;
  negated: boolean;
}

export type Variable = VariableOC | VariableMC | VariableText | VariableNumber | VariableDate | VariableRatio;

export interface VariableCommon {
  textBefore: string;
  textAfter:  string;
  data:       Data;
}

export interface VariableOC {
  kind:   'oc';
  value?: string;
  values: string[];
}

export interface VariableMC extends VariableCommon {
  kind:   'mc';
  values: [string, boolean][];
}

export interface VariableText {
  kind:  'text';
  unit: string;
  textBefore: string;
  textAfter:  string;
}

export interface VariableNumber extends VariableCommon {
  kind:  'number';
  value: number;
}

export interface VariableDate extends VariableCommon {
  kind:  'date';
  value: NgbDateStruct;
}

export interface VariableRatio extends VariableCommon {
  kind:           'ratio';
  numerator:      number;
  denominator:    number;
  fractionDigits: number;
}

/* export function resolve(varId: string, structure: TopLevel[]): Variable | undefined {
  for (let tl of structure) {
    switch (tl.kind) {
      case 'block': continue;
      case 'enumeration': continue;
      case 'conditional': continue;
      case 'category': {
        const result = resolveCategory(varId, tl);
        if (result) {
          return result;
        } else {
          continue;
        }
      }
      default: assertNever(tl);
    }
  }
} */

/* export function resolveCategory(varId: string, c: Category): Variable | undefined {
  return flatMap(c.selectables, variablesOfSelectable).find(v => v.id === varId);
} */

/* function variablesOfSelectable(s: Selectable): Variable[] {
  switch (s.kind) {
    case 'box': return s.variables;
    case 'group': return flatMap(s.options, o => o.variables);
    default: return assertNever(s);
  }
} */


export class Vars {
  anzahlVar = 0;
  varTypes: Array<string> = [];
}

export class Atts {
  anzahlAtt = 0;
  myVars: Array<Vars> = [];
}

export class Cats {
  anzahlCat = 0;
  myAtts: Array<Atts> = [];
}

