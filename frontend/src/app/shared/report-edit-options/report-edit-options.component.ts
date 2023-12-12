import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";

import {DataParserService} from "@app/core";
import {Row} from "@app/models";

import * as M from "@app/models/templateModel";

@Component({
  selector: "report-edit-options",
  templateUrl: "./report-edit-options.component.html",
  styleUrls: ["./report-edit-options.component.scss"]
})

export class ReportEditOptionsComponent implements OnInit {

  @Input() categories: M.Category[];
  @Output() clickEvent = new EventEmitter<any>();
  @Input() layoutId: number;
  @Input() selectedCat: string;
  @Input() selectedSelectableID: string;

  @Output() editClickEvent = new EventEmitter<any>();
  @Output() removeClickEvent = new EventEmitter<any>();


  // TODO Make maxRowLength configurable

  maxRowLength: number;
  width: number;
  rows: Row[];
  hoveredRow = -1;
  hoveredColumn = -1;
  hoveredGroupID = "";

  constructor(public dataParser: DataParserService) { }

  ngOnInit(): void {
    this.maxRowLength = 5;
    this.determineWidth();
    this.initRows(this.categories);
  }

  initRows(changedCategories: any) {
    this.categories = changedCategories;
    this.rows = this.dataParser.extractRows(this.categories, this.maxRowLength);
  }

  edit(elementToEdit: any){
    this.editClickEvent.emit(elementToEdit)
  }

  remove(elementToRemove: any){
    this.removeClickEvent.emit(elementToRemove)
  }

  private determineWidth() {
    this.width = 88 / this.maxRowLength;
  }
}

