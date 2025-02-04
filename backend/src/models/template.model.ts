export interface Template {
    _id: string;
    name: string;
    kind: "deepDoc" | "shallowDoc";
    timestamp: number;
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

export type Selectable = CheckBox | Group;

export interface CheckBox {
    kind:           "box";
    name:           string;
    value:          boolean;
    text:           string;
    conditionalId?: string;
    judgementText?: string;
    normal:         boolean;
    exclusions?:    string[];
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

export type Variable = VariableOC | VariableMC | VariableText | VariableNumber | VariableDate;

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

interface NgbDateStruct {
    year: number,
    month: number,
    day: number
}
