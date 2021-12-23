import { Injectable } from "@angular/core";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

import * as M from "@app/models/templateModel";
import {KeyVariable, KeyClickable, ColoredText} from "@app/models";
import { levenshtein, getAllIndexOf, getNextHighestValue, getClickableKeywords,
         getSplitters, parseValue, countUniqueVariableKeywords, getVariableKeywords} from "@app/helpers";

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

  reset() {
    this.foundClickables = [];
    this.foundVariables = new Map<string, KeyVariable[]>();
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

  // wrapper for all functions
  parseInput(input: string) {
    this.reset();
    // Possibly reinitialize when starting
    this.findClickables(input);
    const varText = this.getTextBetweenClickables(input);
    if (varText.length > this.foundClickables.length) {
      // TODO
      // This means that the first variable text is from the previous input
      // if lastKeyword is not null, use that, otherwise use dummy varKey
      // for now just ignore though
      const overText = varText.shift();
    }
    for (let i = 0; i < varText.length; i++) {
      this.findVariableKeywords(varText[i], this.foundClickables[i]);
    }
  }

  // Finds all Clickable Keywords in an input string
  findClickables(input: string) {
    let foundKeywordsTemp: KeyClickable[] = [];
    for (const keyword of this.clickableKeywords) {
      // gets all positions of this keyword within the input
      // finding all keywords (and not just the last) is necessary for proper coloring later
      // and for finding all variables
      const positions: number[] = getAllIndexOf(keyword.synonym, input, false);
      if (positions.length >= 1) {
        for (const pos of positions) {
          const keywordWithPos: KeyClickable = JSON.parse(JSON.stringify(keyword));
          keywordWithPos.position = pos;
          foundKeywordsTemp.push(keywordWithPos);
        }
      }
    }
    // this removes keywords that are substrings of other keywords (e.g. "Aufnahme" and "Aufnahme von heute")
    console.log(foundKeywordsTemp);
    foundKeywordsTemp = this.filterOverlap(foundKeywordsTemp);
    console.log(foundKeywordsTemp);
    foundKeywordsTemp.sort(this.compareKeywords);
    this.foundClickables = foundKeywordsTemp;
  }

  // find all Variable Keywords in input string (typically just a fraction of the entire string)
  findVariableKeywords(input: string, clickKey: KeyClickable) {
    const relativePosition = clickKey.position + clickKey.synonym.length + 1;
    const id: string = clickKey.category + " " + clickKey.name;
    const foundVariablesTemp: KeyVariable[] = [];
    const possibleVariables = this.varKeyDictionary.get(id);

    if (input.length > 0 && possibleVariables !== undefined) {
      const splitters: number[] = getSplitters(possibleVariables, input);
      for (const varKey of possibleVariables) {
        if (varKey.kind === "oc" || varKey.kind === "mc") {
          // gets all positions of this keyword within the input. One keyword is generated per input
          // finding all keywords (and not just the last) is required for proper coloring later
          const positions: number[] = getAllIndexOf(varKey.synonym, input, false);
          if (positions.length >= 1) {
            for (const pos of positions) {
              const newVarKey: KeyVariable = JSON.parse(JSON.stringify(varKey));
              // check if textBefore is present, if textBefore exists, and adjust position
              if (varKey.textBefore.length > 0 &&
                input.substring(pos - varKey.textBefore.length, pos) === varKey.textBefore) {
                newVarKey.position = pos + relativePosition - varKey.textBefore.length;
              } else {
                newVarKey.position = pos + relativePosition;
              }
              // check if textAfter is present, if textBefore exists, and adjust end-position
              if (varKey.textAfter.length > 0 &&
                input.substring(pos + varKey.synonym.length + 1,
                  pos + varKey.synonym.length + 1 + varKey.textAfter.length) === varKey.textAfter) {
                newVarKey.positionEnd = pos + varKey.synonym.length + 1 + varKey.textAfter.length + relativePosition;
              } else {
                newVarKey.positionEnd = pos + varKey.synonym.length + relativePosition;
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
            newVarKey.position = pos + relativePosition;
            // no need to check for existence of textAfter and textBefore since they always need to be present here
            // (if textAfter exists in this case. textBefore must always exist)
            newVarKey.positionEnd = posValueEnd + relativePosition;
            newVarKey.value = parseValue(valueString, newVarKey.kind);
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
    console.log("found:", foundKeywords);
    console.log("remove:", toRemove);
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

  getColoredText(input: string): ColoredText[] {
    const result: ColoredText[] = [];
    // go through each found Clickable and check for variable completion
    for (const clickKey of this.foundClickables) {
      if (clickKey.nVariables > 0) {
        // get variables of clickKey
        const foundVariables: KeyVariable[] = this.foundVariables.get(clickKey.category + " " + clickKey.name);
        //const foundVariables: KeyVariable[] = InputParserService.filterUniqueOptions(
        //  this.foundVariables.get(clickKey.category + " " + clickKey.name));
        // check text Color of clickKey for variable filling
        if (foundVariables !== undefined) {
          const numberFoundUniqueVariables = countUniqueVariableKeywords(foundVariables);
          let color: string;
          // TODO: Think how to handle the coloring. Also text that *could* be a keyword goes unnoticed like this
          // TODO: But do we need feedback for such text or is ignoring sufficient?
          if (clickKey.nVariables === numberFoundUniqueVariables) {
            color = "green";
          } else if (clickKey.nVariables < numberFoundUniqueVariables) {
            color = "yellow";
          } else {
            color = "red";
          }
          // finally, push the result (must be here because variables must come right after to preserve text order
          result.push({
            text: clickKey.synonym,
            color
          });
          // now handle the variables
          for (const varKey of foundVariables) {
            // easy for oc and mc: add textAfter if in substring (orange), add name (lightgreen)
            // and add textAfter if included (orange)
            if (varKey.kind === "mc" || varKey.kind === "oc") {
              const substring = input.substring(varKey.position, varKey.positionEnd);
              if (varKey.textBefore.length > 0 && substring.includes(varKey.textBefore)) {
                result.push({
                  text: varKey.textBefore,
                  color: "orange"
                });
              }
              result.push({
                text: varKey.name,
                color: "lightgreen"
              });
              if (varKey.textAfter.length > 0 && substring.includes(varKey.textAfter)) {
                result.push({
                  text: varKey.textAfter,
                  color: "orange"
                });
              }
            } else {
              // remaining variables are easy: add textBefore, since always present
              // color the value text lightblue if parsing did not work (i.e. value is undefined) otherwise lightgreen
              // add textAfter, if exists
              result.push({
                text: varKey.textBefore,
                color: "orange"
              });
              // check the value
              if (varKey.value === undefined) {
                // if value could not be parsed, just add the text as light blue
                result.push({
                  text: input.substring(varKey.position + 1 + varKey.textBefore.length, varKey.positionEnd),
                  color: "lightblue"
                });
              } else {
                // otherwise parse the values accordingly
                let resultText: string;
                if (varKey.kind === "date") {
                  const value = varKey.value as NgbDateStruct;
                  resultText = value.day + "." + value.month + "." + value.year;
                } else if (varKey.kind === "ratio") {
                  const value = varKey.value as [number, number];
                  resultText = value[0] + "/" + value[1];
                } else {
                  resultText = varKey.value as string;
                }
                result.push({
                  text: resultText,
                  color: "lightgreen"
                });
              }
              // check textAfter
              if (varKey.textAfter.length > 0) {
                result.push({
                    text: varKey.textAfter,
                    color: "orange"
                  }
                );
              }
            }
          }
        }
      } else {
        // no variables means clickKey is immediately green, easiest case
        result.push({
          text: clickKey.synonym,
          color: "green"
        });
      }
    }
    return result;
  }

  private initializeKeywords(rootEl: M.TopLevel[]): void {
    let clickKeys: KeyClickable[] = [];
    clickKeys.push({
      name: "Rest normal",
      synonym: "Rest normal",
      category: "normal",
      position: -1,
      nVariables: 0
    });
    for (const el of rootEl) {
      if (el.kind === "category") {
        const tempSelectables: KeyClickable[] = getClickableKeywords(el.selectables, el.name);
        clickKeys = clickKeys.concat(tempSelectables);
        this.extractVariableKeywords(el.selectables, el.name);
      }
    }
    this.clickableKeywords = clickKeys;
  }

  private initializeDictionary(): void {
    this.primaryDictionary = new Set<string>();
    for (const clickKey of this.clickableKeywords) {
      const split: string[] = clickKey.synonym.split(" ");
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
        varKeys = getVariableKeywords(sel.variables, category, sel.name);
        if (varKeys.length > 0) {
          this.varKeyDictionary.set(id, varKeys);
        }
      } else if (sel.kind === "group") {
        for (const option of sel.options) {
          id = category + " " + option.name;
          varKeys = getVariableKeywords(option.variables, category, option.name);
          if (varKeys.length > 0) {
            this.varKeyDictionary.set(id, varKeys);
          }
        }
      }
    }
  }

}
