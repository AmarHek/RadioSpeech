import { Injectable } from "@angular/core";
import * as O from "../../helpers/old_model";
import * as G from "../../models/generator";
import * as M from "../../models/templateModel";

@Injectable({
  providedIn: "root"
})

export class DataParserService {

  constructor() {}

  convertModel(parts: O.TopLevel[], parseOptional: boolean): M.TopLevel[] {
    const newParts: M.TopLevel[] = [];
    for (const part of parts) {
      if (part.kind === "block") {
        newParts.push(M.convertBlock(part));
      } else if (part.kind === "enumeration") {
        newParts.push(M.convertEnum(part));
      } else if (part.kind === "category") {
        let newPart = M.convertCategory(part);
        if (parseOptional) {
          newPart = this.parseOptionalCategory(newPart);
        }
        newParts.push(newPart);
      }
    }
    return newParts;
  }

  extractCategories(parts: M.TopLevel[], parseOptional: boolean): M.Category[] {
    const res: M.Category[] = [];
    for (const el of parts) {
      if (el.kind === "category") {
        if (parseOptional) {
          const parsedCat = this.parseOptionalCategory(el);
          res.push(parsedCat);
        } else {
          res.push(el);
        }
      }
    }
    return res;
  }

  parseOptionalCategory(cat: M.Category): M.Category {
    const parsedName = this.parseCategoryTitle(cat.name);
    return {
      kind: cat.kind,
      name: parsedName[0],
      optional: parsedName[1],
      selectables: cat.selectables
    };
  }

  parseCategoryTitle(catName: string): [string, boolean] {
    if (catName.includes("<", 0)) {
      return [catName.substring(1, catName.length), true];
    } else {
      return [catName, false];
    }
  }

  // Takes list of categories to transform them into list of rows without groups, only singular buttons
  extractRows(categories: M.Category[], maxRowLength: number): M.Category[] {
    let rows: M.Category[] = [];

    for (const category of categories) {
      const splits = this.getSplits(category, maxRowLength);
      const split_cats = this.splitCategory(category, splits);
      rows = rows.concat(split_cats);
    }

    return rows;
  }

  splitCategory(category: M.Category, splits: number[]) {
    // let n_categories = Math.ceil(category.selectables.length / splitLength);
    const res: M.Category[] = [];

    let pos = 0;
    for (const split of splits) {
      let name: string;
      //information of category name necessary for all rows, for expand layout, so 1 / 0 indicate shown or not shown
      if (pos === 0) {
        //1 => show this category name
        name = "1"+category.name;
      } else {
        //0 => don't show this category name as its the n-th row for a category
        name = "0"+category.name;
      }
      let temp_sels: M.Selectable[] = [];
      temp_sels = category.selectables.slice(pos, pos + split);
      res.push({
        kind: "category",
        name: name,
        optional: category.optional,
        selectables: temp_sels
      });
      pos += split;
    }

    return res;
  }

  getSplits(category: M.Category, maxRowLength: number): number[] {
    // Variation of getRowLengths: returns the number of selectables per row instead of number of options
    const rowSplits = [];
    let currentSplit = 0;
    let rowCounter = 0;
    for (const sel of category.selectables) {
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

      if (category.selectables.indexOf(sel) === (category.selectables.length - 1) && currentSplit !== 0) {
        rowSplits.push(currentSplit);
      }
    }
    return rowSplits;
  }

  // extracts group identifiers and corresponding values for ngModel application
  extractGroups(categories: M.Category[]): Map<string, string> {
    const groupValues: Map<string, string> = new Map();
    for (const category of categories) {
      for (const sel of category.selectables) {
        if (sel.kind === "group") {
          console.log(sel.name, sel.value);
          groupValues.set(sel.name, sel.value);
        }
      }
    }
    return groupValues;
  }

  makeText(parts: M.TopLevel[]) {
    const [suppressedNormal, suppressedJudgement] = G.getSuppressedConditionalIds(parts);
    const normalExtractor: M.TextExtractor = G.normalExtractor();
    const judgementExtractor: M.TextExtractor = G.judgementExtractor();

    const report = G.makeText(parts, normalExtractor, suppressedNormal);
    const judgement = G.makeText(parts, judgementExtractor, suppressedJudgement);

    return [report, judgement];
  }

  makeNormal(parts: M.TopLevel[]) {
    for (const p of parts) {
      if (p.kind === "category") {
        G.makeNormalCategory(p);
      }
    }
  }
}
