import { Injectable } from "@angular/core";
import {Router} from "@angular/router";
import {Observable, BehaviorSubject} from "rxjs";

const LAST_UI_STORED = "last_ui_stored";
const NAVBAR_HEADER_TOGGLE = "main";

@Injectable({
  providedIn: "root"
})
export class DisplayService {

  // TODO: Do something with layouts so all possible layouts are contained in a list, perhaps dropdown menu

  public displayHeader: boolean;
  public ui: BehaviorSubject<string>;

  // TODO: make observable
  public maxRowLength = 6;
  public maxTabLength = 5;

  private possibleUIs = ["Scroll"];

  constructor(private router: Router) {
    this.displayHeader = true;
    this.initUI();
  }

  private initUI() {
    let storageUi = localStorage.getItem(LAST_UI_STORED);
    if (!storageUi || !this.possibleUIs.includes(storageUi)) {
      localStorage.setItem(LAST_UI_STORED, this.possibleUIs[0]);
      storageUi = this.possibleUIs[0];
    }
    this.ui = new BehaviorSubject<string>(storageUi);
  }

  public setUi(new_ui: string) {
    if (this.possibleUIs.includes(new_ui)) {
      this.ui.next(new_ui);
      localStorage.setItem(LAST_UI_STORED, new_ui);
    }
  }

  public getUi(): Observable<string> {
    return this.ui.asObservable();
  }

  public cycleUI() {
    const pos = this.possibleUIs.indexOf(this.ui.value);
    const next = (pos + 1) % this.possibleUIs.length;
    this.setUi(this.possibleUIs[next]);
  }

  public updateDisplay() {
    this.displayHeader = !(this.router.url.includes(NAVBAR_HEADER_TOGGLE));
  }

}