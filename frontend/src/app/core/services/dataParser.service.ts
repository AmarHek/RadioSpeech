import { Injectable } from "@angular/core";
import * as G from "@app/models/generator";
import * as M from "@app/models/templateModel";
import {Row} from "@app/models";

@Injectable({
  providedIn: "root"
})

export class DataParserService {

  constructor() {}

  extractCategories(parts: M.TopLevel[]): M.Category[] {
    const res: M.Category[] = [];
    for (const el of parts) {
      if (el.kind === "category") {
        res.push(el);
      }
    }
    return res;
  }

  // Takes template-list of categories to transform them into template-list of rows without groups, only singular buttons
  extractRows(categories: M.Category[], maxRowLength): Row[] {
    let rows: Row[] = [];

    for (const category of categories) {
      // const splits = this.getSplits(category, maxRowLength);
      const splitCats = this.splitCategoryIntoRows(category, maxRowLength);
      rows = rows.concat(splitCats);
    }

    return rows;
  }

  splitCategoryIntoRows(category: M.Category, maxRowLength: number): Row[] {
    const rows: Row[] = [];
    let row: Row = this.createNewRow(category, false);

    for (const sel of category.selectables) {
      // separate between boxes and groups, boxes are easier to handle
      if (sel.kind === "box") {
        row.clickables.push(sel);
        if (row.clickables.length === maxRowLength) {
          rows.push(row);
          row = this.createNewRow(category, true);
        }
      } else if (sel.kind === "group") {
        for (const option of sel.options) {
          option.groupID = sel.name;
          row.clickables.push(option);
          if (row.clickables.length === maxRowLength) {
            rows.push(row);
            row = this.createNewRow(category, true);
          }
        }
      }
    }
    // push the last row if it is shorter than maxRowLength
    if (row.clickables.length > 0) {
      rows.push(row);
    }

    return rows;
  }

  createNewRow(category: M.Category, hidden: boolean): Row {
    return {
      kind: "category",
      name: category.name,
      hidden,
      optional: category.optional,
      clickables: []
    };
  }

  createNewRowOption(option: M.Option, groupID: string) {
    return {
      kind: "option",
      name: option.name,
      groupID,
      variables: option.variables
    };
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
    const normalExtractor: M.TextExtractor = G.normalExtractor();
    const judgementExtractor: M.TextExtractor = G.judgementExtractor();

    console.log(normalExtractor);
    console.log(judgementExtractor);

    const report = G.makeText(parts, normalExtractor);
    const judgement = G.makeText(parts, judgementExtractor);

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
