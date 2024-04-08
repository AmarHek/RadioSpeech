import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";

import {DataParserService} from "@app/core";
import {Row} from "@app/core/models";

import * as M from "@app/core/models/templateModel";

@Component({
  selector: "app-options",
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss"]
})

export class OptionsComponent implements OnInit {

  @Input() categories: M.Category[];
  @Output() clickEvent = new EventEmitter<any>();
  @Input() layoutId: number;
  @Input() selectedCat: string;
  @Input() selectedSelectableID: string;

  // TODO Make maxRowLength configurable

  maxRowLength: number;
  width: number;
  rows: Row[];

  constructor(public dataParser: DataParserService) { }

  ngOnInit(): void {
    this.maxRowLength = 5;
    this.determineWidth();
    this.initRows(this.categories);
  }

  initRows(changedCategories) {
    this.categories = changedCategories;
    this.rows = this.dataParser.extractRows(this.categories, this.maxRowLength);
  }

  private determineWidth() {
    this.width = 88 / this.maxRowLength;
  }
}
