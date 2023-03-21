import {EventEmitter, Injectable} from "@angular/core";
import * as G from "@app/models/generator";
import * as M from "@app/models/templateModel";
import {KeyClickable, KeyVariable, Row} from "@app/models";
import {Category, CheckBox, Clickable, Group, Variable} from "@app/models/templateModel";
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

  /**
   * Manages an update via box, by deselecting all exclusions, and triggering the required click event
   * The category can either be passed directly, or be determined via categoryName + list of categories
   */
  updateFromBox(box: CheckBox, clickEvent: EventEmitter<any>, category?: Category, categoryName?: string, categories?: Category[]) {
    if (box.exclusions !== undefined) {
      if (box.exclusions.length > 0) {
        // Rows only contain selectables of their respective row
        // We need to extract the corresponding category with all selectables first
        // row-name contains an additional 0 or 1 at the beginning, so we take the substring
        if (category === undefined){
          // determine category via name and list if none was passed
          category = this.getCategoryByName(categoryName, categories);
        }
        for (const exclusion of box.exclusions) {
          if (exclusion === "Rest") {
            this.deselectRest(category, box.name);
          } else {
            this.deselectByName(category, exclusion);
          }
        }
      }
    }
    clickEvent.emit();
  }

  /**
   * Manages an update via group
   * The group can either be passed directly, or be determined via categoryName + list of categories + group ID
   */
  updateFromGroup(option: string, clickEvent: EventEmitter<any>, group?: Group, categoryName?: string, categories?: Category[], groupID?: string) {
    if(group===undefined){
      group = this.getGroupByID(categoryName, groupID, categories);
    }
    if (group.value === option) {
      // allows deselection of group when clicking active option
      group.value = null;
    }
    clickEvent.emit();
  }

  updateFromVariable(parent: Clickable, clickEvent: EventEmitter<any>, group?: Group, categories?: Category[], categoryName?: string) {
    if (parent.kind === "box") {
      parent.value = true;
    } else {
      if(group===undefined){
        group = this.getGroupByID(categoryName, parent.groupID, categories);
      }
      group.value = parent.name;
    }
    clickEvent.emit();
  }

  getCategoryByName(categoryName: string, categories: M.Category[]): M.Category {
    for (const category of categories) {
      if (category.name === categoryName) {
        return category;
      }
    }
  }

  getGroupByID(categoryName: string, groupID: string, categories: M.Category[]): Group {
    const category: M.Category = this.getCategoryByName(categoryName, categories);
    for (const sel of category.selectables) {
      if (sel.name === groupID) {
        return (sel as Group);
      }
    }
  }

  // functions to deselect specific selectables by name, id etc.
  deselectByName(category: M.Category, name: string) {
    for (const sel of category.selectables) {
      if (sel.name === name) {
        sel.value = false;
        return;
      }
    }
  }

  deselectRest(category: M.Category, name: string) {
    for (const sel of category.selectables) {
      if (sel.name !== name) {
        sel.value = false;
      }
    }
  }
}
