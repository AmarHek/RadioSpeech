import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import * as M from "@app/models/templateModel";
import {DataParserService} from "@app/core";

@Component({
  selector: "app-radiolearn-options",
  templateUrl: "./radiolearn-options.component.html",
  styleUrls: ["./radiolearn-options.component.scss"]
})
export class RadiolearnOptionsComponent implements OnInit {

  @Input() categories: M.Category[];
  @Input() paramMapID: string; // for detecting changes
  @Output() clickEvent = new EventEmitter<any>();
  @Input() selectedCat: string;

  @Input() report: string;
  @Input() judgment: string;

  // TODO Make these configurable

  constructor() { }

  ngOnInit(): void {
  }

  update(sel: M.Selectable, option?: string) {
    if (sel.kind === "group") {
      if (sel.value === option) {
        sel.value = null;
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

}
