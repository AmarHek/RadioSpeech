import { Injectable } from "@angular/core";
import * as M from "../../helper-classes/model";
import {KeyVariable, KeySelectable} from "../../helper-classes/keyword";
import { levenshtein } from "../../helper-classes/util";
import { getAllIndexOf } from "../../helper-classes/util";

@Injectable({
  providedIn: "root"
})
export class InputParserRadioService {

  selectableKeywords: KeySelectable[] = [];
  variableKeywords: KeyVariable[] = [];
  varKeyDictionary: Map<string, KeyVariable[]>;

  lastKeyword: KeySelectable;  // input buffer for last spoken keyword

  foundKeywords: KeySelectable[] = [];
  foundVariables: Map<string, KeyVariable[]> = new Map<string, KeyVariable[]>();

  primaryDictionary: Set<string>;

  constructor() {}

  public init(rootEl: M.TopLevel[]): void {
    this.varKeyDictionary = new Map<string, KeyVariable[]>();
    this.initializeKeywords(rootEl);
    this.initializeDictionary();
  }

  public autocorrect(inputString: string): string {
    let result: string;
    const possibleWords: string[] = Array.from(this.primaryDictionary);
    const inputSplitted = inputString.split(" ");
    inputSplitted.forEach((word, idx) => {
      const distances: number[] = possibleWords.map((possibleWord) =>
        levenshtein(word.toLowerCase(), possibleWord.toLocaleLowerCase()));
      if (!distances.includes(0)) {
        if (word.length >= 3 && word.length < 8) {
          if (distances.includes(1)) {
            const replacement = distances.indexOf(1);
            inputSplitted[idx] = possibleWords[replacement];
          }
        } else if (word.length >= 8) {
          if (distances.includes(1)) {
            const replacement = distances.indexOf(1);
            inputSplitted[idx] = possibleWords[replacement];
          } else if (distances.includes(2)) {
            const replacement = distances.indexOf(2);
            inputSplitted[idx] = possibleWords[replacement];
          }
        }
      }
    });
    result = inputSplitted.join(" ");
    return result;
  }

  private initializeKeywords(rootEl: M.TopLevel[]): void {
    let selKeys: KeySelectable[] = [];
    for (const el of rootEl) {
      if (el.kind === "category") {
        const tempSels: KeySelectable[] = this.getSelectableKeywords(el.selectables, el.name);
        selKeys = selKeys.concat(tempSels);
        this.extractVariableKeywords(el.selectables, el.name);
      }
    }
    this.selectableKeywords = selKeys;
    console.log(this.selectableKeywords);
    console.log(this.varKeyDictionary);
  }

  private initializeDictionary(): void {
    this.primaryDictionary = new Set<string>();
    this.primaryDictionary.add("Rest");
    this.primaryDictionary.add("normal");
    for (const selKey of this.selectableKeywords) {
      const splitted: string[] = selKey.synonym.split(" ");
      splitted.forEach((word) => this.primaryDictionary.add(word));
    }
    for (const varKey of this.variableKeywords) {
      if (varKey.synonym) {
        const splitted: string[] = varKey.synonym.split(" ");
        splitted.forEach((word) => this.primaryDictionary.add(word));
      }
      if (varKey.textAfter) {
        const splitted: string[] = varKey.textAfter.split(" ");
        splitted.forEach((word) => this.primaryDictionary.add(word));
      }
      if (varKey.textBefore) {
        const splitted: string[] = varKey.textBefore.split(" ");
        splitted.forEach((word) => this.primaryDictionary.add(word));
      }
    }
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
    const foundVariables_temp: KeyVariable[] = [];
    const possibleVariables = this.varKeyDictionary.get(id);
    for (const varKey of possibleVariables) {
      if (varKey.kind === "oc" || varKey.kind === "mc") {
        const positions: number[] = getAllIndexOf(varKey.synonym, input, false);
        if (positions.length >= 1) {
          for (const pos of positions) {
            const varKeyWithPos: KeyVariable = JSON.parse(JSON.stringify(varKey));
            varKeyWithPos.position = pos + relativePosition;
            foundVariables_temp.push(varKeyWithPos);
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
    foundVariables_temp.sort(this.compareKeywords);
    this.varKeyDictionary.set(id, foundVariables_temp);
  }

  // Removes all synonyms/keywords that are substrings of another synonym/keyword
  filterOverlap(foundKeywords: KeySelectable[]): KeySelectable[] {
    // filters out keyword synonyms that are substrings of another keyword
    const fK_copy = JSON.parse(JSON.stringify(foundKeywords));
    let toRemove: KeySelectable[] = [];
    for (const keyword of fK_copy) {
      const overlap: KeySelectable[] = fK_copy.filter((kw) =>
        keyword.synonym !== kw.synonym &&
        keyword.position <= kw.position &&
        kw.position < (keyword.position + keyword.synonym.length));
      toRemove = toRemove.concat(overlap);
    }
    for (const removable of toRemove) {
      fK_copy.splice(fK_copy.indexOf(removable), 1);
    }
    return fK_copy;
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

  split_input_from_keywords(input: string): string[][] {
    const result: string[] = [];
    const result_without_keywords: string[] = [];
    let lastPosition = 0;
    let temp_string: string;
    for (const keyword of this.foundKeywords) {
      if (keyword.position > lastPosition) {
        temp_string = input.substring(lastPosition, keyword.position).trim();
        if (temp_string.length > 0) {
          result.push(temp_string);
          result_without_keywords.push(temp_string);
        }
      }
      temp_string = input.substring(keyword.position, keyword.position + keyword.synonym.length).trim();
      if (temp_string.length > 0) {
        result.push(temp_string);
      }
      lastPosition = keyword.position + keyword.synonym.length;
    }
    return [result, result_without_keywords];
  }


}
