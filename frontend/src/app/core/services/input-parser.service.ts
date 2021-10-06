import { Injectable } from "@angular/core";
import { levenshtein } from "../../helpers/util";
import { getAllIndexOf } from "../../helpers/util";

import * as M from "../../models/templateModel";
import {KeyVariable, KeySelectable} from "../../models/keyword";

@Injectable({
  providedIn: "root"
})
export class InputParserService {

  selectableKeywords: KeySelectable[] = [];
  variableKeywords: KeyVariable[] = [];
  varKeyDictionary: Map<string, KeyVariable[]>;

  lastKeyword: KeySelectable;  // input buffer for last spoken keyword

  foundKeywords: KeySelectable[] = [];
  foundVariables: Map<string, KeyVariable[]> = new Map<string, KeyVariable[]>();

  primaryDictionary: Set<string>;

  constructor() {}

  init(rootEl: M.TopLevel[]): void {
    this.varKeyDictionary = new Map<string, KeyVariable[]>();
    this.initializeKeywords(rootEl);
    this.initializeDictionary();
  }

  autocorrect(inputString: string): string {
    const possibleWords: string[] = Array.from(this.primaryDictionary);
    const inputSplit = inputString.split(" ");
    inputSplit.forEach((word, idx) => {
      const distances: number[] = possibleWords.map((possibleWord) =>
        levenshtein(word.toLowerCase(), possibleWord.toLocaleLowerCase()));
      if (!distances.includes(0)) {
        if (word.length >= 3 && word.length < 8) {
          if (distances.includes(1)) {
            const replacement = distances.indexOf(1);
            inputSplit[idx] = possibleWords[replacement];
          }
        } else if (word.length >= 8) {
          if (distances.includes(1)) {
            const replacement = distances.indexOf(1);
            inputSplit[idx] = possibleWords[replacement];
          } else if (distances.includes(2)) {
            const replacement = distances.indexOf(2);
            inputSplit[idx] = possibleWords[replacement];
          }
        }
      }
    });
    return inputSplit.join(" ");
  }

  // Takes list of Selectables from a category and converts their variables into Keywords and adds them to the varKeyDict
  extractVariableKeywords(selectables: M.Selectable[], category: string): void {
    let varKeys: KeyVariable[];
    let id: string;
    for (const sel of selectables) {
      if (sel.kind === "box") {
        id = category + sel.name;
        varKeys = this.getVariableKeywords(sel.variables, category, sel.name);
        if (varKeys.length > 0) {
          this.varKeyDictionary.set(id, varKeys);
        }
      } else if (sel.kind === "group") {
        for (const option of sel.options) {
          id = category + option.name;
          varKeys = this.getVariableKeywords(option.variables, category, option.name);
          if (varKeys.length > 0) {
            this.varKeyDictionary.set(id, varKeys);
          }
        }
      }
    }
  }

  // Takes list of variables and generates Keyword Variables list
  getVariableKeywords(variables: M.Variable[], category: string, selectable: string): KeyVariable[] {
    const varKeys: KeyVariable[] = [];
    for (const variable of variables) {
      if (variable.kind === "oc" || variable.kind === "mc") {
        for (let i = 0; i < variable.values.length; i++) {
          let name: string;
          if (variable.kind === "mc") {
            name = variable.values[i][0];
          } else {
            name = variable.values[i];
          }
          for (const key of variable.keys[i]) {
            varKeys.push({
              category,
              selectable,
              id: variable.id,
              kind: variable.kind,
              name,
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
          category,
          selectable,
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

  // Finds all KeySelectables in an input string
  findKeywords(input: string) {
    let foundKeywordsTemp: KeySelectable[] = [];
    for (const keyword of this.selectableKeywords) {
      const positions: number[] = getAllIndexOf(keyword.synonym, input, false);
      if (positions.length >= 1) {
        for (const pos of positions) {
          const keywordWithPos: KeySelectable = JSON.parse(JSON.stringify(keyword));
          keywordWithPos.position = pos;
          foundKeywordsTemp.push(keywordWithPos);
        }
      }
    }
    foundKeywordsTemp = this.filterOverlap(foundKeywordsTemp);
    foundKeywordsTemp.sort(this.compareKeywords);
    this.foundKeywords = foundKeywordsTemp;
  }

  findVariableKeywords(input: string, keySel: KeySelectable, relativePosition: number) {
    const id: string = keySel.category + keySel.synonym;
    const foundVariablesTemp: KeyVariable[] = [];
    const possibleVariables = this.varKeyDictionary.get(id);
    for (const varKey of possibleVariables) {
      if (varKey.kind === "oc" || varKey.kind === "mc") {
        const positions: number[] = getAllIndexOf(varKey.synonym, input, false);
        if (positions.length >= 1) {
          for (const pos of positions) {
            const varKeyWithPos: KeyVariable = JSON.parse(JSON.stringify(varKey));
            varKeyWithPos.position = pos + relativePosition;
            foundVariablesTemp.push(varKeyWithPos);
          }
        }
      } else if (varKey.kind === "text" || varKey.kind === "number") {
        if (varKey.textAfter.length > 0) {
          const posVar = input.indexOf(varKey.textBefore);
          const posValueStart = posVar + varKey.textBefore.length;
          const posValueEnd = input.indexOf(varKey.textAfter);
          const value = input.substring(posValueStart, posValueEnd).trim();

        }
      } else if (varKey.kind === "ratio") {

      } else if (varKey.kind === "date") {

      }
    }
    foundVariablesTemp.sort(this.compareKeywords);
    this.varKeyDictionary.set(id, foundVariablesTemp);
  }

  // Removes all synonyms/keywords that are substrings of another synonym/keyword
  filterOverlap(foundKeywords: KeySelectable[]): KeySelectable[] {
    // filters out keyword synonyms that are substrings of another keyword
    const fKCopy = JSON.parse(JSON.stringify(foundKeywords));
    let toRemove: KeySelectable[] = [];
    for (const keyword of fKCopy) {
      const overlap: KeySelectable[] = fKCopy.filter((kw) =>
        keyword.synonym !== kw.synonym &&
        keyword.position <= kw.position &&
        kw.position < (keyword.position + keyword.synonym.length));
      toRemove = toRemove.concat(overlap);
    }
    for (const removable of toRemove) {
      fKCopy.splice(fKCopy.indexOf(removable), 1);
    }
    return fKCopy;
  }

  // sorts keywords based on their position in the input string
  compareKeywords(arg1: KeySelectable | KeyVariable, arg2: KeySelectable | KeyVariable): number {
    if (arg1.position > arg2.position) {
      return 1;
    } else if (arg1.position < arg2.position) {
      return -1;
    } else {
      return 0;
    }
  }

  splitInputFromKeywords(input: string): string[][] {
    const result: string[] = [];
    const resultWithoutKeywords: string[] = [];
    let lastPosition = 0;
    let tempString: string;
    for (const keyword of this.foundKeywords) {
      if (keyword.position > lastPosition) {
        tempString = input.substring(lastPosition, keyword.position).trim();
        if (tempString.length > 0) {
          result.push(tempString);
          resultWithoutKeywords.push(tempString);
        }
      }
      tempString = input.substring(keyword.position, keyword.position + keyword.synonym.length).trim();
      if (tempString.length > 0) {
        result.push(tempString);
      }
      lastPosition = keyword.position + keyword.synonym.length;
    }
    return [result, resultWithoutKeywords];
  }

  private initializeKeywords(rootEl: M.TopLevel[]): void {
    let selKeys: KeySelectable[] = [];
    for (const el of rootEl) {
      if (el.kind === "category") {
        const tempSelectables: KeySelectable[] = this.getSelectableKeywords(el.selectables, el.name);
        selKeys = selKeys.concat(tempSelectables);
        this.extractVariableKeywords(el.selectables, el.name);
      }
    }
    this.selectableKeywords = selKeys;
  }

  private initializeDictionary(): void {
    this.primaryDictionary = new Set<string>();
    this.primaryDictionary.add("Rest");
    this.primaryDictionary.add("normal");
    for (const selKey of this.selectableKeywords) {
      const split: string[] = selKey.synonym.split(" ");
      split.forEach((word) => this.primaryDictionary.add(word));
    }
    for (const varKey of this.variableKeywords) {
      if (varKey.synonym) {
        const split: string[] = varKey.synonym.split(" ");
        split.forEach((word) => this.primaryDictionary.add(word));
      }
      if (varKey.textAfter) {
        const split: string[] = varKey.textAfter.split(" ");
        split.forEach((word) => this.primaryDictionary.add(word));
      }
      if (varKey.textBefore) {
        const split: string[] = varKey.textBefore.split(" ");
        split.forEach((word) => this.primaryDictionary.add(word));
      }
    }
  }

  // Creates list of Keywords for Selectables from Selectables of category
  private getSelectableKeywords(selectables: M.Selectable[], category: string): KeySelectable[] {
    const selKeys: KeySelectable[] = [];
    for (const sel of selectables) {
      if (sel.kind === "box") {
        for (const synonym of sel.keys) {
          selKeys.push({
            name: sel.name,
            synonym,
            category,
            position: -1,
            active: false
          });
        }
      } else if (sel.kind === "group") {
        for (const option of sel.options) {
          for (const synonym of option.keys) {
            selKeys.push({
              name: option.name,
              synonym,
              category,
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

}
