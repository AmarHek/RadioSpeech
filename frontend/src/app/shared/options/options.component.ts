import {Component, Input, OnInit, Output, EventEmitter, OnChanges} from "@angular/core";

import {DataParserService} from "@app/core";

import * as M from "@app/models/templateModel";

@Component({
  selector: "app-options",
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss"]
})
export class OptionsComponent implements OnInit, OnChanges {

  @Input() categories: M.Category[];
  @Input() paramMapID: string; // for detecting changes
  @Output() clickEvent = new EventEmitter<any>();
  @Input() layoutId: number;
  @Input() selectedCat: string;

  // TODO Make these configurable

  minRowLength = 1;
  maxRowLength: number;
  width: number;
  rows: M.Category[];

  constructor(private dataParser: DataParserService) { }

  ngOnInit(): void {
    this.setMinRowLength(this.categories);
    this.maxRowLength = 6;
    this.determineWidth();
    this.initRows();
  }

  initRows() {
    if (this.minRowLength > this.maxRowLength) {
      window.alert("Die gewählte Reihenlänge von " + this.maxRowLength +
        " ist kleiner als die kleinstmögliche Länge von " + this.minRowLength +
        ". Die Reihenlänge wird auf " + this.minRowLength + " gesetzt.");
      this.maxRowLength = this.minRowLength;
    }
    this.rows = this.dataParser.extractRows(this.categories, this.maxRowLength);
  }

  ngOnChanges() {
    // this.initRows();
  }

  setMinRowLength(cats: M.Category[]) {
    let minRowLength = 1;
    for (const cat of cats) {
      for (const sel of cat.selectables) {
        if (sel.kind === "group") {
          if (sel.options.length > minRowLength) {
            minRowLength = sel.options.length;
          }
        }
      }
    }
    this.minRowLength = minRowLength;
  }

  update(sel: M.Selectable, option?: string, category?: M.Category) {
    if (sel.kind === "group") {
      if (sel.value === option) {
        sel.value = null;
      }
    } else if (sel.kind === "box" && sel.exclusions !== undefined) {
      if (sel.exclusions.length > 0) {
        for (const exclusion of sel.exclusions) {
          this.deselectByName(category, exclusion);
        }
      }
    }
    this.clickEvent.emit();
  }

  deselectByName(category: M.Category, name: string) {
    for (const sel of category.selectables) {
      if (sel.name === name) {
        sel.value = false;
        return;
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
