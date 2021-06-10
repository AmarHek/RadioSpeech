import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import * as M from "../../../helper-classes/radio_model";
import {DataParserService} from "../../services/dataParser.service";
import {DisplayService} from "../../services/display.service";
import {Clickable, Group} from "../../../helper-classes/old_model";

@Component({
  selector: "app-options",
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss"]
})
export class OptionsComponent implements OnInit {

  @Input() categories: M.Category[];

  // TODO Make these configurable

  minRowLength = 1;
  maxRowLength: number;
  width: number;
  rows: M.Category[];

  @Output() clickEvent = new EventEmitter<any>();

  constructor(private dataParser: DataParserService,
              private display: DisplayService) { }

  ngOnInit(): void {
    this.setMinRowLength(this.categories);
    this.maxRowLength = this.display.maxRowLength;
    this.determineWidth();
    this.initRows();
  }

  public initRows() {
    if (this.minRowLength > this.maxRowLength) {
      window.alert("Die gewählte Reihenlänge von " + this.maxRowLength +
        " ist kleiner als die kleinstmögliche Länge von " + this.minRowLength +
        ". Die Reihenlänge wird auf " + this.minRowLength + " gesetzt.");
      this.maxRowLength = this.minRowLength;
    }
    this.rows = this.dataParser.extractRows(this.categories, this.maxRowLength);
  }

  private determineWidth() {
    this.width = 88 / this.maxRowLength;
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

  public update(sel: M.Selectable, option?: string) {
    if (sel.kind === "group") {
      if (sel.value === option) {
        sel.value = null;
      }
    }
    this.clickEvent.emit();
  }

  public updateFromVariable(parent: Clickable, group?: Group) {
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
