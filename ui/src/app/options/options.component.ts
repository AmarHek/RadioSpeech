import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import * as M from "../model";
import {DataParserService} from "../dataParser.service";
import {CheckBoxButton} from "../model";

@Component({
  selector: "app-options",
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss"]
})
export class OptionsComponent implements OnInit {

  @Input() categories: M.Category[];
  showBorders: Map<string, boolean> = new Map();

  // TODO Make these configurable
  maxRowLength: number = 6;
  splitGroups: boolean = false; // whether to separate radio buttons from the same group if maxRowLength is exceeded

  rows: M.CategoryRow[];
  groupValues: Map<string, string>;

  @Output() clickEvent = new EventEmitter<any>();

  constructor(private dataParser: DataParserService) { }

  ngOnInit(): void {
    this.initButtons();

    // console.log(this.groupValues);
    // this.setBorders();
    // console.log(this.showBorders);
  }

  public initButtons(){
    console.log(this.categories);
    this.rows = this.dataParser.extractRows(this.categories, this.maxRowLength, this.splitGroups)
    this.groupValues = this.dataParser.extractGroups(this.categories);
    console.log(this.groupValues);
    console.log(this.rows);
  }

  public displayParts() {
    console.log(this.categories);
  }

  public update(event: any, category: string,  button: M.Clickable) {
    setTimeout(() => this.updateCategories(category, button), 1);
    this.clickEvent.emit();
  }

  private updateCategories(category: string, button: M.Clickable){
    for(let cat of this.categories) {
      if(cat.name === category) {
        if (button.kind === "box") {
          for (let sel of cat.selectables) {
            if (sel.name === button.name) {
              console.log(button.name)
              console.log(button.value)
              sel.value = button.value;
            }
          }
        }
        else {
          for (let sel of cat.selectables) {
            if (sel.name === button.groupName) {
              sel.value = button.name;
            }
          }
        }
      }
    }
  }

  public print(input: any) {
    console.log(input);
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

  // TODO: Add logic for hover click animations etc.
}
