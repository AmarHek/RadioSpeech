import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

declare const $: any;

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  text: string = "";
  judgement: string = "";
  modalVariables: Variable[] = [];

  parts: TopLevel[] = [];

  constructor(private dateParser: NgbDateParserFormatter, private http: HttpClient, private route: ActivatedRoute) {
    route.paramMap.subscribe(ps => {
      if (ps.get('name')) {
        http.post(environment.urlRoot + 'get', JSON.stringify(ps.get('name'))).subscribe(
          worked => { this.parts = worked as any },
          error => window.alert("An unknown error occured: " + JSON.stringify(error))
        );
      }
    });
  }

  makeText(): void {
    const [suppressedNormal, suppressedJudgement] = getSuppressedConditionalIds(this.parts);

    const normalExtractor: TextExtractor = new class {
      ofCheckbox(c: CheckBox): string | undefined { return c.text; }
      ofOption(o: Option): string | undefined { return o.text; }
      ofEnumeration(e: Enumeration): string | undefined { return e.text; }
      ofBlock(b: Block): string | undefined { return b.text; }
      ofConditional(c: Conditional): string | undefined { return c.normalText; }
    }

    const judgementExtractor: TextExtractor = new class {
      ofCheckbox(c: CheckBox): string | undefined { return c.judgementText; }
      ofOption(o: Option): string | undefined { return o.judgementText; }
      ofEnumeration(e: Enumeration): string | undefined { return e.judgementText; }
      ofBlock(b: Block): string | undefined { return b.judgementText; }
      ofConditional(c: Conditional): string | undefined { return c.judgementText; }
    }

    const makeText = (parts: TopLevel[], extractor: TextExtractor, suppressed: string[]): string => {
      return parts.map(c => {
        if (c.kind === "category") {
          return getTexts(c.selectables, suppressed, extractor).map(t => expandVariablesInString(t, parts)).join("")
        } else if (c.kind === "block") {
          return extractor.ofBlock(c) || "";
        } else if (c.kind === "enumeration") {
          return makeEnumeration(c, parts, extractor);
        } else if (c.kind === "conditional") {
          if (checkConditional(c, parts)) {
            const data = extractor.ofConditional(c);
            if (data) {
              return expandVariablesInString(data, parts);
            } else {
              return "";
            }
          }
        } else {
          throw new Error("unkonwn top level kind");
        }
      }).join("");
    }

    this.text = makeText(this.parts, normalExtractor, suppressedNormal);
    this.judgement = makeText(this.parts, judgementExtractor, suppressedJudgement);
  }

  copyText(id: string): void {
    (document.getElementById(id) as HTMLInputElement).select();
    document.execCommand('copy');
  }

  makeNormal(): void {
    for (const p of this.parts) {
      if (p.kind === "category") {
        makeNormalCategory(p);
      }
    }
    this.makeText();
  }

  clicked(clicked: Clickable, parent?: Group): void {
    if (clicked.kind === "box" && clicked.variables.length > 0 && !clicked.value) {
      $('#variableDialog').modal('show');
      this.modalVariables = clicked.variables;
    } else if (clicked.kind === "option" && clicked.variables.length > 0 && parent && parent.value !== clicked.name) {
      $('#variableDialog').modal('show');
      this.modalVariables = clicked.variables;
    }
    setTimeout(() => this.makeText(), 0);
  }

  endVariableSelection(): void {
    this.makeText();
  }

  saveDialog(): void {
    localStorage.setItem("emptyDialog", JSON.stringify(JSON.parse(this.text)));
    this.parts = JSON.parse(this.text);
    this.text = "";
  }

}

function getSuppressedConditionalIds(data: TopLevel[]): string[][] {
  const suppressedNormal: string[] = [];
  const suppressedJudgement: string[] = [];

  for (const topLevel of data) {
    if (topLevel.kind === "conditional") {
      if (checkConditional(topLevel, data)) {
        for (const anded of topLevel.precondition) {
          for (const literal of anded) {
            if (!literal.negated) {
              if (topLevel.normalText) {
                suppressedNormal.push(literal.id);
              }
              if (topLevel.judgementText) {
                suppressedJudgement.push(literal.id);
              }
            }
          }
        }
      }
    }
  }

  return [suppressedNormal, suppressedJudgement];
}

function checkConditional(c: Conditional, data: TopLevel[]): boolean {
  outer:
  for (let anded of c.precondition) {
    for (let literal of anded) {
      if (isClicked(literal.id, data) == literal.negated) {
        continue outer;
      }
    }
    return true;
  }
  return false;
}

function isClicked(clickableId: string, data: TopLevel[]): boolean {
  for (const category of data.filter(p => p.kind === "category").map(c => c as Category)) {
    for (const selectable of category.selectables) {
      if (selectable.kind === 'box') {
        if (selectable.value && selectable.conditionalId === clickableId) {
          return true;
        }
      } else {
        for (const option of selectable.options) {
          if (option.conditionalId === clickableId && selectable.value === option.name) {
            return true;
          }
        }
      }
    }
  }

  return false;
}


function getTexts(ss: Selectable[], suppressed: string[], textExtractor: TextExtractor): string[] {
  const ret: string[] = [];

  for (const s of ss) {
    if (s.kind === "box" && s.value && !s.enumeration && (!s.conditionalId || suppressed.indexOf(s.conditionalId) == -1)) {
      const result = textExtractor.ofCheckbox(s);
      if (result) {
        ret.push(result);
      }
    } else if (s.kind === "group") {
      for (const o of s.options) {
        if (s.value === o.name && (!o.conditionalId || suppressed.indexOf(o.conditionalId) == -1)) {
          const result = textExtractor.ofOption(o);
          if (result) {
            ret.push(result);
          }
        }
      }
    }
  }

  return ret;
}

function expandVariablesInString(s: string, data: TopLevel[]): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const lookup: (string) => string = (name) => {
    if (name === "%Gestern%") {
      return makeDateString(yesterday);
    } else if (name === "%Heute%") {
      return makeDateString(today);
    } else if (name === "%Morgen%") {
      return makeDateString(tomorrow);
    }
    const vars = allVariables(data);
    const matching = vars.find(v => "%" + v.id + "%" === name);
    if (matching) {
      return textOfVariable(matching) || "-";
    } else {
      return "-";
    }
  }

  return s.replace(/%[^%]+%/g, lookup);
}

function makeDateString(d: Date): string {
  return d.toLocaleDateString("de-DE", { year: 'numeric', month: 'numeric', day: 'numeric' });
}

function allVariables(data: TopLevel[]): Variable[] {
  let vars: Variable[] = [];

  for (const c of data) {
    if (c.kind === "category") {
      for (const sel of c.selectables) {
        if (sel.kind === "box" && sel.value) {
          vars = vars.concat(sel.variables);
        } else if (sel.kind === "group") {
          for (const o of sel.options) {
            if (sel.value === o.name) {
              vars = vars.concat(o.variables);
            }
          }
        }
      }
    }
  }

  return vars;
}

function textOfVariable(v: Variable): string | undefined {
  if (v.kind === "oc") {
    return v.value;
  } else if (v.kind === "mc") {
    return v.values.filter(v => v[1]).map(v => v[0]).join(", ");
  } else if (v.kind === "text") {
    return v.value;
  } else if (v.kind === "number") {
    return "" + v.value;
  } else if (v.kind === "date") {
    return v.value.day + "." + v.value.month + "." + v.value.year;
  } else if (v.kind === "ratio") {
    return (v.numerator / v.denominator).toLocaleString("de-DE", { maximumFractionDigits: v.fractionDigits });
  }

  return assertUnreachable(v);
}

function makeNormalCategory(c: Category): void {
  if (hasSelection(c)) return;

  for (const entry of c.selectables) {
    if (entry.kind === "box") {
      if (entry.normal) {
        entry.value = true;
      }
    } else if (entry.kind === "group") {
      for (const o of entry.options) {
        if (o.normal) {
          entry.value = o.name;
        }
      }
    }
  }
}

function hasSelection(c: Category): boolean {
  for (const entry of c.selectables) {
    if (entry.kind === "box" && entry.value) {
      return true;
    } else if (entry.kind === "group" && entry.value) {
      return true;
    }
  }

  return false;
}

function makeEnumeration(e: Enumeration, data: TopLevel[], textExtractor: TextExtractor): string {
  const items: string[] = getRelevantEnumerationItems(e.id, data, textExtractor);
  if (items.length === 0) {
    return "";
  } else if (items.length === 1) {
    return textExtractor.ofEnumeration(e) + items[0];
  } else if (items.length === 2) {
    return textExtractor.ofEnumeration(e) + items[0] + " und " + items[1];
  } else if (items.length > 2) {
    return textExtractor.ofEnumeration(e) + items.slice(0, items.length - 1).join(", ") + " und " + items[items.length - 1];
  }
}

function getRelevantEnumerationItems(id: string, data: TopLevel[], textExtractor: TextExtractor): string[] {
  const items: string[] = [];

  for (const p of data) {
    if (p.kind === "category") {
      for (const s of p.selectables) {
        if (s.kind === "box") {
          if (s.value && s.enumeration === id) {
            const result = textExtractor.ofCheckbox(s);
            if (result) {
              items.push(expandVariablesInString(result, data));
            }
          }
        }
      }
    }
  }

  return items;
}

function assertUnreachable(x: never): never {
  throw new Error("should not be reachable: " + x);
}

type Selectable = CheckBox | Group;
type Clickable  = CheckBox | Option;

export interface TextExtractor {
  ofCheckbox(c: CheckBox): string | undefined;
  ofOption(o: Option): string | undefined;
  ofEnumeration(e: Enumeration): string | undefined;
  ofBlock(e: Block): string | undefined;
  ofConditional(c: Conditional): string | undefined;
}

export interface CheckBox {
  kind:           "box";
  name:           string;
  value:          boolean;
  text:           string;
  judgementText?: string;
  conditionalId?: string;
  normal:         boolean;
  variables:      Variable[];
  enumeration?:   string;
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
}

type TopLevel = Category | Block | Enumeration | Conditional;

export interface Category {
  kind: "category";
  name: string;
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
  kind:           "conditional"
  precondition:   Literal[][];
  normalText?:    string;
  judgementText?: string;
}

export interface Literal {
  id:      string;
  negated: boolean;
}

type Variable = VariableOC | VariableMC | VariableText | VariableNumber | VariableDate | VariableRatio

export interface VariableCommon {
  id:         string;
  textBefore: string;
  textAfter:  string;
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
