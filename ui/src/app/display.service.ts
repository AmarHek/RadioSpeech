import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  public displayHeader: boolean;
  public currentLayout: number = 1;
  private layouts: Map<number, string>;

  constructor(private router: Router) {
    this.displayHeader = true;
    this.layouts = new Map();
    this.layouts.set(1, "layout1");
  }

  public updateDisplay(){
    this.displayHeader = !this.router.url.includes("layout1");
  }

  public getCurrentLayout(): string{
    return this.layouts.get(this.currentLayout);
  }
}
