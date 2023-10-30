import { Injectable } from "@angular/core";
import {Router} from "@angular/router";

const NAVBAR_HEADER_TOGGLE_1 = "main";
const NAVBAR_HEADER_TOGGLE_2 = "login";

@Injectable({
  providedIn: "root"
})
export class DisplayService {

  // TODO: Do something with layouts so all possible layouts are contained in a template-list, perhaps dropdown menu
  displayHeader: boolean;
  title: string;

  constructor(private router: Router) {
    this.displayHeader = true;
  }

  update() {
    this.updateDisplay();
  }

  private updateDisplay() {
    this.displayHeader = !(this.router.url.includes(NAVBAR_HEADER_TOGGLE_1) ||
      this.router.url.includes(NAVBAR_HEADER_TOGGLE_2));
  }
}
