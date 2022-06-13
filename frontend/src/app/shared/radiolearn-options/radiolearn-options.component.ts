import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import * as M from "@app/models/templateModel";

@Component({
  selector: "app-radiolearn-options",
  templateUrl: "./radiolearn-options.component.html",
  styleUrls: ["./radiolearn-options.component.scss"]
})
export class RadiolearnOptionsComponent implements OnInit, OnChanges {

  @Input() categories: M.Category[];
  @Input() paramMapID: string; // for detecting changes
  @Input() selectedCat: string;
  @Output() nextCat = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  update(selectable: M.Selectable, option?: string, category?: M.Category) {
    if (selectable.kind === "group") {
      if (selectable.value === option) {
        selectable.value = null;
      }
    } else if (selectable.kind === "box" && selectable.exclusions !== undefined) {
      if (selectable.exclusions.length > 0) {
        for (const exclusion of selectable.exclusions) {
          if (exclusion === "Rest") {
            this.deselectRest(category, selectable.name);
          } else {
            this.deselectByName(category, exclusion);
          }
        }
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
  }

  getSelectedCatIndex() {
    if (this.categories !== undefined) {
      for (const category of this.categories) {
        if (category.name === this.selectedCat) {
          return this.categories.indexOf(category);
        }
      }
    }
  }

  nextCategory() {
    const idx = this.getSelectedCatIndex();
    const nextIdx = Math.min(idx + 1, this.categories.length - 1);
    this.nextCat.emit(this.categories[nextIdx].name);
  }

  previousCategory() {
    const idx = this.getSelectedCatIndex();
    const nextIdx = Math.max(idx - 1, 0);
    this.nextCat.emit(this.categories[nextIdx].name);
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

}
