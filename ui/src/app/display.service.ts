import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  public displayHeader: boolean;
  public currentLayout: number = 1;
  public maxRowLength: number = 6;
  private layouts: Map<number, string>;

  constructor(private router: Router) {
    this.displayHeader = true;
    this.layouts = new Map();
    this.layouts.set(1, "radiology");
  }

  public updateDisplay(){
    this.displayHeader = !this.router.url.includes("radiology");
  }

  public getCurrentLayout(): string{
    return this.layouts.get(this.currentLayout);
  }
}
