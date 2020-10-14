import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import * as M from "../model";
import {Observable} from "rxjs";

@Component({
  selector: "app-options",
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss", "../layout1/layout1.component.scss"]
})
export class OptionsComponent implements OnInit {

  @Input() categories: M.Category[];
  showBorders: Map<string, boolean> = new Map();
  @Output() clickEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.setBorders();
    console.log(this.showBorders);
  }

  private setBorders() {
    for(let cat of this.categories){
      const activatedBorder = this.activateBorder(cat);
      this.showBorders.set(cat.name, activatedBorder);
    }
  }

  private activateBorder(cat: M.Category): boolean {
    let counter: number = 0;
    for(let sel of cat.selectables) {
      if(sel.kind === "group"){
        counter += 1;
      }
    }
    console.log(counter);
    return counter > 1;
  }

  public displayParts() {
    console.log(this.categories);
  }

  public dataUpdate(event: any) {
    this.clickEvent.emit(event);
  }

  public print(input: any) {
    console.log(input);
  }



  // TODO: Add logic for hover click animations etc.
}
