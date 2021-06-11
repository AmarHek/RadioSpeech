import { Injectable } from "@angular/core";
import {Router} from "@angular/router";
import {Observable, BehaviorSubject} from "rxjs";

const LAST_MODE_STORED = "last_mode_stored";
const LAST_UI_STORED = "last_ui_stored";

@Injectable({
  providedIn: "root"
})
export class DisplayService {

  // TODO: Do something with layouts so all possible layouts are contained in a list, perhaps dropdown menu

  public displayHeader: boolean;
  public mode: BehaviorSubject<string>;
  public ui: BehaviorSubject<string>;
  public title: BehaviorSubject<string>;

  // TODO: make observable
  public maxRowLength = 6;
  public maxTabLength = 5;

  // TODO Auf database auslagern?
  private possibleModes: string[] = ["Gastroenterologie", "Radiologie"];
  private possibleUIs = {"Gastroenterologie": ["Fortgeschritten", "Hierarchisch"],
                        "Radiologie": ["Scroll"]};
  private titles = {"Gastroenterologie": "EndoSpeech", "Radiologie": "RadioReport"};

  constructor(private router: Router) {
    this.displayHeader = true;
    this.initMode();
    this.initUI();
    this.title = new BehaviorSubject<string>("init");
    this.setTitle();
  }

  private initMode() {
    const storageMode = localStorage.getItem(LAST_MODE_STORED);
    if (!storageMode || !this.possibleModes.includes(storageMode)) {
      localStorage.setItem(LAST_MODE_STORED, this.possibleModes[0]);
    }
    this.mode = new BehaviorSubject<string>(storageMode);
  }

  public setMode(new_mode: string) {
    if (this.possibleModes.includes(new_mode)) {
      this.mode.next(new_mode);
      localStorage.setItem(LAST_MODE_STORED, new_mode);
      this.setUi(this.possibleUIs[this.mode.value][0]);
    }
  }

  public getMode(): Observable<string> {
    return this.mode.asObservable();
  }

  public cycleMode() {
    const pos = this.possibleModes.indexOf(this.mode.value);
    const next = (pos + 1) % this.possibleModes.length;
    this.setMode(this.possibleModes[next]);
  }

  private initUI() {
    // TODO: Bugfix
    const storageUi = localStorage.getItem(LAST_UI_STORED);
    const UIs: string[] = this.possibleUIs[this.mode.value];
    if (!storageUi || !UIs.includes(storageUi)) {
      console.log(UIs);
      console.log(LAST_UI_STORED);
      localStorage.setItem(LAST_UI_STORED, UIs[0]);
    }
    this.ui = new BehaviorSubject<string>(storageUi);
  }

  public setUi(new_ui: string) {
    const UIs: string[] = this.possibleUIs[this.mode.value];
    if (UIs.includes(new_ui)) {
      this.ui.next(new_ui);
      localStorage.setItem(LAST_UI_STORED, new_ui);
    }
  }

  public getUi(): Observable<string> {
    return this.ui.asObservable();
  }

  public cycleUI() {
    const UIs: string[] = this.possibleUIs[this.mode.value];
    const pos = UIs.indexOf(this.ui.value);
    const next = (pos + 1) % UIs.length;
    this.setUi(UIs[next]);
  }

  public setTitle() {
    this.getMode().subscribe((value) => {
      this.title.next(this.titles[value]);
    });
  }

  public getTitle(): Observable<string> {
    return this.title.asObservable();
  }

  public updateDisplay() {
    this.displayHeader = !(this.router.url.includes(this.mode.value));
  }

}
