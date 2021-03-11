import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  // TODO: Do something with layouts so all possible layouts are contained in a list, perhaps dropdown menu

  public displayHeader: boolean;
  public currentLayout: string;

  public maxRowLength: number = 6;
  private layouts: string[] = ["gastro", "radio"];

  constructor(private router: Router) {
    this.displayHeader = true;
    this.setCurrentLayout();
  }

  private setCurrentLayout() {
    // TODO: Maybe change it so you pick local storage from component and give it to setCurrentLayout as parameter
    if(!localStorage.getItem("currentLayout")){
      localStorage.setItem("currentLayout", this.layouts[0])
    }
    this.currentLayout = localStorage.getItem("currentLayout");
  }

  public switchLayout() {
    let pos = this.layouts.indexOf(this.currentLayout)
    let next = (pos + 1) % this.layouts.length
    this.currentLayout = this.layouts[next]
  }

  public getCurrentLayout(): string{
    return this.currentLayout;
  }

  public updateDisplay(){
    this.displayHeader = !(this.router.url.includes(this.currentLayout));
  }

}
