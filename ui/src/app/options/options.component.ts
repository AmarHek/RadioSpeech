import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import * as M from "../model";
import {DataParserService} from "../services/dataParser.service";
import {DisplayService} from "../services/display.service";
import {Clickable, Group} from "../model";

@Component({
  selector: "app-options",
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss"]
})
export class OptionsComponent implements OnInit {

  @Input() categories: M.Category[];

  // TODO Make these configurable

  minRowLength: number = 1;
  maxRowLength: number;
  rows: M.Category[];

  @Output() clickEvent = new EventEmitter<any>();

  constructor(private dataParser: DataParserService,
              private display: DisplayService) { }

  ngOnInit(): void {
    this.setMinRowLength(this.categories);
    this.maxRowLength = this.display.maxRowLength;
    this.initRows();
  }

  public initRows(){
    if (this.minRowLength > this.maxRowLength) {
      window.alert("Die gewählte Reihenlänge von " + this.maxRowLength +
        " ist kleiner als die kleinstmögliche Länge von " + this.minRowLength +
        ". Die Reihenlänge wird auf " + this.minRowLength + " gesetzt.");
      this.maxRowLength = this.minRowLength;
    }
    this.rows = this.dataParser.extractRows(this.categories, this.maxRowLength);
  }

  setMinRowLength(cats: M.Category[]) {
    let minRowLength = 1;
    for (let cat of cats) {
      for (let sel of cat.selectables) {
        if (sel.kind === "group") {
          if (sel.options.length > minRowLength) {
            minRowLength = sel.options.length;
          }
        }
      }
    }
    this.minRowLength = minRowLength;
  }

  public update() {
    this.clickEvent.emit();
  }

  public updateFromVariable(parent: Clickable, group?: Group) {
    if(parent.kind === "box") {
      parent.value = true;
    } else {
      if(group === undefined) {
        Error("Something went wrong here");
      } else {
        group.value = parent.name;
      }
    }
    this.clickEvent.emit();
  }
}
