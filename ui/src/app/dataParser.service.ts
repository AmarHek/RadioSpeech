import { Injectable } from "@angular/core";
import * as M from "./model";
import * as G from "./generator";

@Injectable({
  providedIn: "root"
})

export class DataParserService {

  constructor() {}

  extractCategories(parts: M.TopLevel[]): M.Category[] {
    const res = [];
    for(const el of parts) {
      if (el.kind === "category"){
        const parsed = this.parseOptionalCategory(el.name);
        res.push({
            kind: "category",
            name: parsed[0],
            optional: parsed[1],
            selectables: el.selectables,
            data: el.data,
        });
      }
    }
    return res;
  }

  parseVariableText(categories: M.Category[]): M.Category[] {
    return [];
  }

  parseOptionalCategory(category: string): [string, boolean] {
    if(category.includes("<", 0)){
      return [category.substring(1, category.length), true];
    } else {
      return [category, false];
    }
  }

  // Takes list of categories to transform them into list of rows without groups, only singular buttons
  extractRows(categories: M.Category[], maxRowLength: number, splitGroups: boolean): M.CategoryRow[] {
    let rows: M.CategoryRow[] = [];

    for(let category of categories) {
      let buttons = this.extractButtons(category);
      let rowLengths = this.getRowLengths(category, maxRowLength, splitGroups);
      let position = 0;
      for(let [index, row] of rowLengths.entries()) {
        let tmp_buttons = buttons.slice(position, position+row)
        rows.push({
          kind: "category",
          name: category.name,
          optional: category.optional,
          number: index,
          buttons: tmp_buttons
        });
        position += row;
      }
    }

    return rows;
  }

  extractButtons(category: M.Category): M.Clickable[] {
    let buttons: M.Clickable[] = [];
    for(let sel of category.selectables) {
      if(sel.kind === "box") {
        buttons.push({
          kind:      "box",
          name:      sel.name,
          value:     sel.value,
          variables: sel.variables
        });
      } else if(sel.kind === "group") {
        for(let option of sel.options) {
          buttons.push({
            kind: "option",
            name: option.name,
            groupName: sel.name,
            variables: option.variables
          })
        }
      }
    }
    return buttons;
  }

  // computes, how many rows a category needs and how long each row is, returns as an array
  getRowLengths(category: M.Category, maxRowLength: number, splitGroups: boolean): Array<number> {
    // TODO: Currently only works sequentially as per data structure, possibly allow/implement reordering of buttons
    let rowLengths = [];
    let rowCounter = 0;
    for(let sel of category.selectables) {
      if(sel.kind == "box") {
        rowCounter += 1;
        if(rowCounter === maxRowLength || category.selectables.indexOf(sel) === (category.selectables.length - 1)) {
          rowLengths.push(rowCounter);
          rowCounter = 0;
        }
      } else if(sel.kind == "group") {
        if(splitGroups) {
          for(let opt of sel.options) {
            rowCounter += 1;
            if(rowCounter === maxRowLength) {
              rowLengths.push(rowCounter);
              rowCounter = 0;
            }
          }
          if(category.selectables.indexOf(sel) === (category.selectables.length - 1)) {
            rowLengths.push(rowCounter);
            rowCounter = 0;
          }
        } else {
          if(sel.options.length > maxRowLength){
            Error("One or more radio button groups are longer than max elements allowed in one row. " +
              "Either allow split or change data structure.");
          } else {
            if(rowCounter + sel.options.length > maxRowLength){
              rowLengths.push(rowCounter);
              rowCounter = sel.options.length;
              if(rowCounter === maxRowLength || category.selectables.indexOf(sel) === (category.selectables.length - 1)) {
                rowLengths.push(rowCounter);
                rowCounter = 0;
              }
            } else {
              rowCounter += sel.options.length;
              if(rowCounter === maxRowLength || category.selectables.indexOf(sel) === (category.selectables.length - 1)) {
                rowLengths.push(rowCounter);
                rowCounter = 0;
              }
            }
          }
        }
      }
    }
    return rowLengths;
  }

  // extracts group identifiers and corresponding values for ngModel application
  extractGroups(categories: M.Category[]): Map<string,string> {
    let groupValues: Map<string, string> = new Map();
    for (let category of categories) {
      for (let sel of category.selectables) {
        if(sel.kind === "group") {
          console.log(sel.name, sel.value);
          groupValues.set(sel.name, sel.value);
        }
      }
    }
    return groupValues;
  }

  // TODO
  extractKeywords(parts: M.Category[]) {
  //  for (const part of parts){
  //    for (const keyword of part.data.bau){
  //      this.keywords.push(keyword);
  //    }
  //  }
  }

  makeText(parts: M.TopLevel[]) {
    const [suppressedNormal, suppressedJudgement] = G.getSuppressedConditionalIds(parts);
    const normalExtractor: M.TextExtractor = G.normalExtractor();
    const judgementExtractor: M.TextExtractor = G.judgementExtractor();

    let report = G.makeText(parts, normalExtractor, suppressedNormal);
    let judgement = G.makeText(parts, judgementExtractor, suppressedJudgement);

    return [report, judgement];
  }


}
