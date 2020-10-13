import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import * as M from "../model";

@Component({
  selector: "app-options",
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss", "../layout1/layout1.component.scss"]
})
export class OptionsComponent implements OnInit {

  @Input() parts: M.Category[];
  @Output() clickEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public displayParts() {
    console.log(this.parts);
  }

  public dataUpdate(event: any) {
    this.clickEvent.emit(event);
  }

  public print(input: any) {
    console.log(input);
  }

  // TODO: Add logic for hover click animations etc.
}
