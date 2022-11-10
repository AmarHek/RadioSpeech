import { Injectable } from "@angular/core";
import * as G from "@app/models/generator";
import * as M from "@app/models/templateModel";
import {KeyClickable, KeyVariable, Row} from "@app/models";
import {Variable} from "@app/models/templateModel";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

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

  assignValuesFromInputParser(categories: M.Category[], foundClickables: KeyClickable[],
                              foundVariablesMap: Map<string, KeyVariable[]>) {
    for (const key of foundClickables) {
      if (key.name === "Rest normal") {
        this.makeNormal(categories);
        continue;
      }

      const foundVariables = foundVariablesMap.get(key.category + " " + key.name);
      const cat = categories.find(c =>
        c.name === key.category
      );
      const sel = cat.selectables.find(s =>
        s.name === key.name || s.name === key.group
      );
      let variables: Variable[];
      if (sel.kind === "box") {
        sel.value = true;
        variables = sel.variables;
      } else {
        sel.value = key.name;
        const option = sel.options.find(o => o.name === key.name);
        variables = option.variables;
      }
      // assign variable values
      if (variables.length <= 0 || foundVariables === undefined) {
        continue;
      }

      for (const varKey of foundVariables) {
        const variable = variables.find(v => v.id === varKey.id);
        if (variable.kind === "oc") {
          variable.value = varKey.name;
        } else if (variable.kind === "mc") {
          const val = variable.values.find(v => v[0] === varKey.name);
          val[1] = true;
        } else if (varKey.value !== undefined) {
          if (variable.kind === "text") {
            variable.value = varKey.value as string;
          } else if (variable.kind === "number") {
            variable.value = varKey.value as number;
          } else {
            variable.value = varKey.value as NgbDateStruct;
          }
        }
      }
    }
  }
}
