import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  // TODO: Do something with layouts so all possible layouts are contained in a list, perhaps dropdown menu

  public displayHeader: boolean;
  public mode: string;
  public ui: string;

  public maxRowLength = 6;

  // TODO Auf database auslagern
  private possibleModes: string[] = ['gastro', 'radio'];
  private possibleUIs = {'gastro': ['Fortgeschritten', 'Hierarchisch'],
                        'radio': ['Scroll']};
  private modesLong = {'gastro': 'Gastroenterologie', 'radio': 'Radiologie'};
  private titles = {'gastro': 'EndoSpeech', 'radio': 'RadioSpeech'};

  constructor(private router: Router) {
    this.displayHeader = true;
    this.initMode();
    this.initUI();
  }

  private initMode() {
    const storageMode = localStorage.getItem('mode');
    if (!storageMode || !this.possibleModes.includes(storageMode)) {
      localStorage.setItem('mode', this.possibleModes[0]);
    }
    this.mode = storageMode;
  }

  private initUI() {
    const storageUi = localStorage.getItem('ui');
    const UIs: string[] = this.possibleUIs[this.mode];
    if (!storageUi || !UIs.includes(storageUi)) {
      localStorage.setItem('ui', UIs[0]);
    }
    this.ui = storageUi;
  }

  public setMode(new_mode: string) {
    if (this.possibleModes.includes(new_mode)) {
      this.mode = new_mode;
      localStorage.setItem('mode', new_mode);
      this.ui = this.possibleUIs[this.mode][0];
      localStorage.setItem('ui', this.ui);
    }
  }

  public getMode(): string {
    return this.mode;
  }

  public setUi(new_ui: string) {
    const UIs: string[] = this.possibleUIs[this.mode];
    if (UIs.includes(new_ui)) {
      this.ui = new_ui;
      localStorage.setItem('ui', new_ui);
    }
  }

  public getUi(): string {
    return this.ui;
  }

  public cycleMode() {
    const pos = this.possibleModes.indexOf(this.mode);
    const next = (pos + 1) % this.possibleModes.length;
    this.setMode(this.possibleModes[next]);
  }

  public cycleUI() {
    const UIs: string[] = this.possibleUIs[this.mode];
    const pos = UIs.indexOf(this.ui);
    const next = (pos + 1) % UIs.length;
    this.setUi(UIs[next]);
  }


  public getTitle(): string {
    return this.titles[this.mode];
  }

  public getModeLong(): string {
    return this.modesLong[this.mode];
  }

  public updateDisplay() {
    this.displayHeader = !(this.router.url.includes(this.mode));
    console.log(this.displayHeader);
  }

}
