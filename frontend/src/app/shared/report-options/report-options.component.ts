import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";

import {DataParserService} from "@app/core";
import {Group, Row} from "@app/models";

import * as M from "@app/models/templateModel";

@Component({
  selector: "app-report-options",
  templateUrl: "./report-options.component.html",
  styleUrls: ["./report-options.component.scss"]
})

export class ReportOptionsComponent implements OnInit {

  @Input() categories: M.Category[];
  @Output() clickEvent = new EventEmitter<any>();
  @Input() layoutId: number;
  @Input() selectedCat: string;
  @Input() selectedSelectableID: string;

  // TODO Make maxRowLength configurable

  maxRowLength: number;
  width: number;
  rows: Row[];

  constructor(private dataParser: DataParserService) { }

  ngOnInit(): void {
    this.maxRowLength = 5;
    this.determineWidth();
    this.initRows();
  }

  initRows() {
    this.rows = this.dataParser.extractRows(this.categories, this.maxRowLength);
  }

  update(sel: M.Selectable, option?: string, categoryName?: string) {
    if (sel.kind === "group") {
      if (sel.value === option) {
        sel.value = null;
      }
    } else if (sel.kind === "box" && sel.exclusions !== undefined) {
      if (sel.exclusions.length > 0) {
        // Rows only contain selectables of their respective row
        // We need to extract the corresponding category with all selectables first
        // row-name contains an additional 0 or 1 at the beginning, so we take the substring
        const category = this.getCategoryByName(categoryName);
        for (const exclusion of sel.exclusions) {
          if (exclusion === "Rest") {
            this.deselectRest(category, sel.name);
          } else {
            this.deselectByName(category, exclusion);
          }
        }
      }
    }
    this.clickEvent.emit();
  }

  updateFromBox(sel: M.CheckBox, categoryName: string) {
    if (sel.exclusions.length > 0) {
      // Rows only contain selectables of their respective row
      // We need to extract the corresponding category with all selectables first
      // row-name contains an additional 0 or 1 at the beginning, so we take the substring
      const category = this.getCategoryByName(categoryName);
      for (const exclusion of sel.exclusions) {
        if (exclusion === "Rest") {
          this.deselectRest(category, sel.name);
        } else {
          this.deselectByName(category, exclusion);
        }
      }
    }
    this.clickEvent.emit();
  }

  getGroupByID(categoryName: string, groupID: string): Group {
    for (const category of this.categories) {
      if (category.name === categoryName) {
        for (const sel of category.selectables) {
          if (sel.name === groupID) {
            return (sel as Group);
          }
        }
      }
    }
  }

  debug(categoryName: string, groupID: string) {
    for (const category of this.categories) {
      if (category.name === categoryName) {
        for (const sel of category.selectables) {
          if (sel.name === groupID) {
            console.log(sel);
          }
        }
      }
    }
  }

  deselectByName(category: M.Category, name: string) {
    for (const sel of category.selectables) {
      if (sel.name === name) {
        sel.value = false;
        return;
      }
    }
  }

  deselectRest(category: M.Category, name) {
    for (const sel of category.selectables) {
      if (sel.name !== name) {
        sel.value = false;
      }
    }
  }

  getCategoryByName(catName: string): M.Category {
    for (const cat of this.categories) {
      if (cat.name === catName) {
        return cat;
      }
    }
  }


  updateFromVariable(parent: M.Clickable, group?: M.Group) {
    if (parent.kind === "box") {
      parent.value = true;
    } else {
      if (group === undefined) {
        Error("Something went wrong here");
      } else {
        group.value = parent.name;
      }
    }
    this.clickEvent.emit();
  }

  private determineWidth() {
    this.width = 88 / this.maxRowLength;
  }
}
