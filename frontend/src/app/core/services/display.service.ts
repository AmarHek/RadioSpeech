import { Injectable } from "@angular/core";
import {Router} from "@angular/router";

const NAVBAR_HEADER_TOGGLE_1 = "main";
const NAVBAR_HEADER_TOGGLE_2 = "login";

@Injectable({
  providedIn: "root"
})
export class DisplayService {

  // TODO: Do something with layouts so all possible layouts are contained in a list, perhaps dropdown menu

  public displayHeader: boolean;

  constructor(private router: Router) {
    this.displayHeader = true;
  }

  public updateDisplay() {
    this.displayHeader = !(this.router.url.includes(NAVBAR_HEADER_TOGGLE_1) ||
      this.router.url.includes(NAVBAR_HEADER_TOGGLE_2));
  }

}
