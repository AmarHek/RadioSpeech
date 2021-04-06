import { Injectable } from "@angular/core";
import {ParserBasisService} from "./parser-basis.service";
import * as M from "../../helper-classes/radio_model";
import {KeyVariable, KeySelectable} from "../../helper-classes/keyword";

@Injectable({
  providedIn: "root"
})
export class InputParserRadioService {

  selectableKeywords: KeySelectable[] = [];
  variableKeywords: KeyVariable[] = [];
  varKeyDictionary: Map<string, KeyVariable>;

  startingTime: Date;
  end = false;
  start = false;
  end0 = false;
  globalPos: number;

  constructor() {
  }

  initializeKeywords(rootEl: M.TopLevel[]): void {
    let selKeys: KeySelectable[] = [];
    let varKeys: KeyVariable[] = [];
    for (const el of rootEl) {
      if (el.kind === "category") {
        const tempSels: KeySelectable[] = this.getSelectableKeywords(el.selectables, el.name);
        selKeys = selKeys.concat(tempSels);
        const tempVars: KeyVariable[] = this.extractVariableKeywords(el.selectables, el.name);
        varKeys = varKeys.concat(tempVars);
      }
    }
    this.selectableKeywords = selKeys;
    this.variableKeywords = varKeys;
  }

  // Creates list of Keywords for Selectables from Selectables of category
  getSelectableKeywords(selectables: M.Selectable[], category: string): KeySelectable[] {
    const selKeys: KeySelectable[] = [];
    for (const sel of selectables) {
      if (sel.kind === "box") {
        for (const synonym of sel.keys) {
          selKeys.push({
            name: sel.name,
            synonym: synonym,
            category: category,
            position: -1,
            active: false
          });
        }
      } else if (sel.kind === "group") {
        for (const option of sel.options) {
          for (const synonym of option.keys) {
            selKeys.push({
              name: option.name,
              synonym: synonym,
              category: category,
              group: sel.name,
              position: -1,
              active: false
            });
          }
        }
      }
    }

    return selKeys;
  }

  // Takes list of Selectables from a category and converts their variables into Keywords
  extractVariableKeywords(selectables: M.Selectable[], category: string): KeyVariable[] {
    let varKeys: KeyVariable[] = [];
    for (const sel of selectables) {
      if (sel.kind === "box") {
        varKeys = varKeys.concat(this.getVariableKeywords(sel.variables, category, sel.name));
      } else if (sel.kind === "group") {
        for (const option of sel.options) {
          varKeys = varKeys.concat(this.getVariableKeywords(option.variables, category, option.name));
        }
      }
    }
    return varKeys;
  }

  // Takes list of variables and generates Keyword Variables list
  getVariableKeywords(variables: M.Variable[], category: string, selectable: string): KeyVariable[] {
    const varKeys: KeyVariable[] = [];
    for (const variable of variables) {
      if (variable.kind === "oc" || variable.kind === "mc") {
        for (let i = 0; i < variable.values.length; i++) {
          let name: string;
          variable.kind === "mc" ? name = variable.values[i][0] : name = variable.values[i];
          for (const key of variable.keys[i]) {
            varKeys.push({
              category: category,
              selectable: selectable,
              id: variable.id,
              kind: variable.kind,
              name: name,
              synonym: key,
              textBefore: variable.textBefore,
              textAfter: variable.textAfter,
              position: -1,
              active: false
              });
          }
        }
      } else {
        varKeys.push({
          category: category,
          selectable: selectable,
          id: variable.id,
          kind: variable.kind,
          textBefore: variable.textBefore,
          textAfter: variable.textAfter,
          position: -1,
          active: false
        });
      }
    }

    return varKeys;
  }

}
