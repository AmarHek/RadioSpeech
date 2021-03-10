import { Injectable } from "@angular/core";
import * as M from "../../model-files/model";
import * as G from "../../model-files/generator";

@Injectable({
  providedIn: "root"
})

export class DataParserService {

  maxRowLength: number = 6;
  minRowLength: number;

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

  parseOptionalCategory(category: string): [string, boolean] {
    if(category.includes("<", 0)){
      return [category.substring(1, category.length), true];
    } else {
      return [category, false];
    }
  }

  // Takes list of categories to transform them into list of rows without groups, only singular buttons
  extractRows(categories: M.Category[], maxRowLength: number): M.Category[] {
    let rows: M.Category[] = [];

    for(let category of categories) {
      let splits = this.getSplits(category, maxRowLength);
      let split_cats = this.splitCategory(category, splits)
      rows = rows.concat(split_cats);
    }

    return rows;
  }

  splitCategory(category: M.Category, splits: number[]){
    // let n_categories = Math.ceil(category.selectables.length / splitLength);
    let res: M.Category[] = [];

    let pos = 0;
    for(let split of splits){
      let name: string;
      if(pos === 0){
        name = category.name
      } else {
        name = "";
      }
      let temp_sels: M.Selectable[] = [];
      temp_sels = category.selectables.slice(pos, pos+split);
      res.push({
        kind: "category",
        name: name,
        optional: category.optional,
        selectables: temp_sels,
        data: category.data,
      });
      pos += split;
    }

    return res;
  }

  getSplits(category: M.Category, maxRowLength: number): number[] {
    // Variation of getRowLengths: returns the number of selectables per row instead of number of options
    let rowSplits = [];
    let currentSplit = 0;
    let rowCounter = 0;
    for(let sel of category.selectables) {
      if (rowCounter >= maxRowLength) {
        rowSplits.push(currentSplit);
        currentSplit = 0;
        rowCounter = 0;
      }

      if (sel.kind === "box") {
        rowCounter += 1;
        currentSplit += 1;
      } else if (sel.kind === "group") {
        if (rowCounter + sel.options.length > maxRowLength) {
          rowSplits.push(currentSplit);
          rowCounter = sel.options.length;
          currentSplit = 1;
        } else {
          rowCounter += sel.options.length;
          currentSplit += 1;
        }
      }

      if (category.selectables.indexOf(sel) === (category.selectables.length - 1) && currentSplit != 0) {
        rowSplits.push(currentSplit);
      }
    }
    return rowSplits;
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
