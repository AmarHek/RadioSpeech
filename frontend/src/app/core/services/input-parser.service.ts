import { Injectable } from "@angular/core";
import { levenshtein, getAllIndexOf, getNextHighestValue } from "@app/helpers";

import * as M from "../../models/templateModel";
import {KeyVariable, KeyClickable} from "../../models/keyword";

@Injectable({
  providedIn: "root"
})
export class InputParserService {

  clickableKeywords: KeyClickable[] = [];
  varKeyDictionary: Map<string, KeyVariable[]> = new Map<string, KeyVariable[]>();

  lastKeyword: KeyClickable;  // input buffer for last spoken keyword

  foundClickables: KeyClickable[] = [];
  foundVariables: Map<string, KeyVariable[]> = new Map<string, KeyVariable[]>();

  primaryDictionary: Set<string>;

  constructor() {
  }

  init(rootEl: M.TopLevel[]): void {
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

  parseInput(input: string) {
    // Possibly reinitialize when starting
    this.findClickables(input);
    const varText = this.getTextBetweenClickables(input);
    if (varText.length > this.foundClickables.length) {
      // This means that the first variable text is from the previous input
      // if lastKeyword is not null, use that, otherwise use dummy varKey
      // for now just ignore though
      const overText = varText.shift();
    }
    for (let i = 0; i < varText.length; i++) {
      this.findVariableKeywords(varText[i], this.foundClickables[i]);
    }
  }

  // Finds all KeySelectables in an input string
  findClickables(input: string) {
    let foundKeywordsTemp: KeyClickable[] = [];
    for (const keyword of this.clickableKeywords) {
      const positions: number[] = getAllIndexOf(keyword.synonym, input, false);
      if (positions.length >= 1) {
        for (const pos of positions) {
          const keywordWithPos: KeyClickable = JSON.parse(JSON.stringify(keyword));
          keywordWithPos.position = pos;
          foundKeywordsTemp.push(keywordWithPos);
        }
      }
    }
    foundKeywordsTemp = this.filterOverlap(foundKeywordsTemp);
    // Filter duplicates?
    foundKeywordsTemp.sort(this.compareKeywords);
    this.foundClickables = foundKeywordsTemp;
  }

  findVariableKeywords(input: string, keySel: KeyClickable) {
    const relativePosition = keySel.position + keySel.synonym.length + 1;
    const id: string = keySel.category + " " + keySel.name;
    const foundVariablesTemp: KeyVariable[] = [];
    const possibleVariables = this.varKeyDictionary.get(id);

    if (input.length > 0 && possibleVariables !== undefined) {
      const splitters: number[] = this.getSplitters(possibleVariables, input);
      for (const varKey of possibleVariables) {
        if (varKey.kind === "oc" || varKey.kind === "mc") {
          const positions: number[] = getAllIndexOf(varKey.synonym, input, false);
          if (positions.length >= 1) {
            for (const pos of positions) {
              const newVarKey: KeyVariable = JSON.parse(JSON.stringify(varKey));
              if (input.substring(pos - varKey.textBefore.length, pos) === varKey.textBefore) {
                newVarKey.position = pos + relativePosition - varKey.textBefore.length;
              } else {
                newVarKey.position = pos + relativePosition;
              }
              foundVariablesTemp.push(newVarKey);
            }
          }
        } else {
          const positions: number[] = getAllIndexOf(varKey.textBefore, input, false);
          for (const pos of positions) {
            const posValueStart = pos + varKey.textBefore.length;
            let posValueEnd: number;
            if (varKey.textAfter.length === 0) {
              posValueEnd = getNextHighestValue(splitters, posValueStart);
              if (posValueEnd === -1) {
                posValueEnd = input.length;
              } else {
                posValueEnd--;
              }
            } else {
              posValueEnd = input.indexOf(varKey.textAfter, pos);
            }
            const valueString = input.substring(posValueStart, posValueEnd).trim();
            const newVarKey = JSON.parse(JSON.stringify(varKey));
            newVarKey.position = pos;
            newVarKey.value = this.parseValue(valueString, newVarKey.kind);
            foundVariablesTemp.push(newVarKey);
          }
        }
      }
      foundVariablesTemp.sort(this.compareKeywords);
      this.foundVariables.set(id, foundVariablesTemp);
    }
  }

  // Removes all synonyms/keywords that are substrings of another synonym/keyword
  filterOverlap(foundKeywords: KeyClickable[]): KeyClickable[] {
    // filters out keyword synonyms that are substrings of another keyword
    const fKCopy = JSON.parse(JSON.stringify(foundKeywords));
    let toRemove: KeyClickable[] = [];
    for (const keyword of fKCopy) {
      const overlap: KeyClickable[] = fKCopy.filter((kw) =>
        keyword.synonym !== kw.synonym && // do not filter out the same synonym
        keyword.position <= kw.position && // kw must be right of keyword
        kw.position < (keyword.position + keyword.synonym.length) && // kw must be contained within keyword
        kw.synonym.length < keyword.synonym.length // kw must be shorter than keyword
      );
      toRemove = toRemove.concat(overlap);
    }
    for (const removable of toRemove) {
      fKCopy.splice(fKCopy.indexOf(removable), 1);
    }
    return fKCopy;
  }

  getTextBetweenClickables(input: string): string[] {
    const result: string[] = [];

    const splitRight: number[] = [];
    const splitLeft: number[] = [0];

    for (const keyword of this.foundClickables) {
      splitRight.push(keyword.position);
      splitLeft.push(keyword.position + keyword.synonym.length);
    }
    splitRight.push(input.length);

    if (splitRight[0] === 0) {
      splitLeft.shift();
      splitRight.shift();
    }
    for (let i = 0; i < splitLeft.length; i++) {
      result.push(input.substring(splitLeft[i], splitRight[i]).trim());
    }

    return result;
  }

  // sorts keywords based on their position in the input string
  compareKeywords(arg1: KeyClickable | KeyVariable, arg2: KeyClickable | KeyVariable): number {
    if (arg1.position > arg2.position) {
      return 1;
    } else if (arg1.position < arg2.position) {
      return -1;
    } else {
      return 0;
    }
  }

  private initializeKeywords(rootEl: M.TopLevel[]): void {
    let selKeys: KeyClickable[] = [];
    selKeys.push({
      name: "Rest normal",
      synonym: "Rest normal",
      category: "normal",
      position: -1,
      active: false
    });
    for (const el of rootEl) {
      if (el.kind === "category") {
        const tempSelectables: KeyClickable[] = this.getClickableKeywords(el.selectables, el.name);
        selKeys = selKeys.concat(tempSelectables);
        this.extractVariableKeywords(el.selectables, el.name);
      }
    }
    this.clickableKeywords = selKeys;
  }

  private initializeDictionary(): void {
    this.primaryDictionary = new Set<string>();
    for (const selKey of this.clickableKeywords) {
      const split: string[] = selKey.synonym.split(" ");
      split.forEach((word) => this.primaryDictionary.add(word));
    }
    for (const variables of this.varKeyDictionary.values()) {
      for (const varKey of variables) {
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
  }

  // Takes list of Selectables from a category and converts their variables into Keywords and adds them to the varKeyDict
  private extractVariableKeywords(selectables: M.Selectable[], category: string): void {
    let varKeys: KeyVariable[];
    let id: string;
    for (const sel of selectables) {
      if (sel.kind === "box") {
        id = category + " " + sel.name;
        varKeys = this.getVariableKeywords(sel.variables, category, sel.name);
        if (varKeys.length > 0) {
          this.varKeyDictionary.set(id, varKeys);
        }
      } else if (sel.kind === "group") {
        for (const option of sel.options) {
          id = category + " " + option.name;
          varKeys = this.getVariableKeywords(option.variables, category, option.name);
          if (varKeys.length > 0) {
            this.varKeyDictionary.set(id, varKeys);
          }
        }
      }
    }
  }

  // Creates list of Keywords for Selectables from Selectables of category
  private getClickableKeywords(selectables: M.Selectable[], category: string): KeyClickable[] {
    const selKeys: KeyClickable[] = [];
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

  // Takes list of variables and generates Keyword Variables list
  private getVariableKeywords(variables: M.Variable[], category: string, selectable: string): KeyVariable[] {
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

  private getSplitters(varKeys: KeyVariable[], input: string): number[] {
    const splitWords: string[] = [];
    let splitters: number[] = [];
    for (const varKey of varKeys) {
      if (varKey.textBefore.length > 0) {
        splitWords.push(varKey.textBefore);
      }
      if (varKey.synonym !== undefined) {
        splitWords.push(varKey.synonym);
      }
    }
    for (const splitWord of splitWords) {
      splitters = splitters.concat(getAllIndexOf(splitWord, input, true));
    }
    splitters = [...new Set(splitters)].sort();
    return splitters;
  }

  private parseValue(valueString: string, varKind: string) {
    if (varKind === "text") {
      return valueString;
    } else if (varKind === "number") {
      return Number(valueString);
    } else if (varKind === "date") {
      const date = valueString.split(/[.-\/]+/);
      return {year: date[2], month: date[1], day: date[0]};
    } else if (varKind === "ratio") {
      const ratioNumbers = valueString.split(/[\s:\/]+/);
      return [Number(ratioNumbers[0]), Number(ratioNumbers[1])];
    }
  }
}
