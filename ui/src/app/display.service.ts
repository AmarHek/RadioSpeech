import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  public displayHeader: boolean;

  constructor(private router: Router) {
    this.displayHeader = true;
  }

  public updateDisplay(){
    this.displayHeader = !this.router.url.includes("workspace");
  }
}
