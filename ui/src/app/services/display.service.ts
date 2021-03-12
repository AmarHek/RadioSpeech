import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  // TODO: Do something with layouts so all possible layouts are contained in a list, perhaps dropdown menu

  public displayHeader: boolean;
  public currentMode: string;

  public maxRowLength: number = 6;

  // TODO Auf database auslagern
  private possibleModes: string[] = ["gastro", "radio"];
  private modesLong = {"gastro": "Gastroenterologie", "radio": "Radiologie"}
  private titles = {"gastro": "EndoSpeech", "radio": "RadioSpeech"}

  private layouts

  constructor(private router: Router) {
    this.displayHeader = true;
    this.initMode();
  }

  private initMode() {
    let storageMode = localStorage.getItem("currentMode");
    if(!storageMode || this.possibleModes.includes(storageMode)){
      localStorage.setItem("currentMode", this.possibleModes[0])
    }
    this.currentMode = localStorage.getItem("currentMode");
  }

  public cycleMode() {
    let pos = this.possibleModes.indexOf(this.currentMode)
    let next = (pos + 1) % this.possibleModes.length
    this.currentMode = this.possibleModes[next]
  }

  public setMode(index: number) {
    this.currentMode = this.possibleModes[index];
  }

  public getCurrentMode(): string{
    return this.currentMode;
  }

  public getCurrentTitle(): string{
    return this.titles[this.currentMode]
  }

  public getCurrentModeLong(): string{
    return this.modesLong[this.currentMode]
  }

  public updateDisplay(){
    this.displayHeader = !(this.router.url.includes(this.currentMode));
    console.log(this.displayHeader);
  }

}
