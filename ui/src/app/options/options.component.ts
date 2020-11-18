import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import * as M from "../model";
import {DataParserService} from "../dataParser.service";
import {DisplayService} from "../display.service";

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
    this.maxRowLength = this.display.maxRowLength;
    this.initRows();
  }

  public initRows(){
    console.log(this.categories);
    this.setMinRowLength(this.categories);
    let rowLength
    if (this.minRowLength > this.maxRowLength) {
      rowLength = this.minRowLength;
      window.alert("Die gewählte Reihenlänge von " + this.maxRowLength +
        " ist kleiner als die kleinstmögliche Länge von " + this.minRowLength +
        ". Die Reihenlänge wird auf " + this.minRowLength + " gesetzt.");
    }
    else {
      rowLength = this.maxRowLength;
    }
    this.rows = this.dataParser.extractRows(this.categories, rowLength);
    console.log(this.rows);
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

  public displayParts() {
    console.log(this.categories);
  }

  public update(event: any) {
    console.log(event);
    this.clickEvent.emit();
  }

  public print(input: any) {
    console.log(input);
  }

  // TODO: Add logic for hover click animations etc.
}
