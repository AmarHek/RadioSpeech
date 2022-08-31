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

  // Update Methods (all bound to click and emit clickEvents)

  updateFromGroup(categoryName: string, groupID: string, option: string) {
    const group: Group = this.getGroupByID(categoryName, groupID);
    if (group.value === option) {
      group.value = null;
    }
    this.clickEvent.emit();
  }

  updateFromBox(categoryName: string, box: M.CheckBox) {
    if (box.exclusions !== undefined) {
      if (box.exclusions.length > 0) {
        // Rows only contain selectables of their respective row
        // We need to extract the corresponding category with all selectables first
        // row-name contains an additional 0 or 1 at the beginning, so we take the substring
        const category = this.getCategoryByName(categoryName);
        for (const exclusion of box.exclusions) {
          if (exclusion === "Rest") {
            this.deselectRest(category, box.name);
          } else {
            this.deselectByName(category, exclusion);
          }
        }
      }
    }
    this.clickEvent.emit();
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

  // getter methods for groups and categories

  getCategoryByName(categoryName: string): M.Category {
    for (const category of this.categories) {
      if (category.name === categoryName) {
        return category;
      }
    }
  }

  getGroupByID(categoryName: string, groupID: string): Group {
    const category: M.Category = this.getCategoryByName(categoryName);
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

  private determineWidth() {
    this.width = 88 / this.maxRowLength;
  }
}
