import { Component, OnInit } from '@angular/core';
import { faLaptopMedical } from "@fortawesome/free-solid-svg-icons";

import { DisplayService } from "../services/display.service";
import {DictManagerService} from "../services/dict-manager.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public displayNavbar: boolean;
  public currentMode: string;
  public title: string;
  private titles: Map<string, string>;

  faUser: any;
  constructor(private displayService: DisplayService,
              private dictManager: DictManagerService) {

  }

  ngOnInit(): void {
    this.setTitles();
    this.setTitle();
    this.displayNavbar = true;
    this.faUser = faLaptopMedical;
    // TODO
    this.currentMode = this.dictManager.getMode();
  }

  private setTitles() {
    this.titles.set("Radiologie", "RadioSpeech");
    this.titles.set("Gastroenterologie", "EndoSpeech");
  }

  private setTitle() {
    this.title = this.titles.get(this.currentMode);
  }

  switchMode(): void {
    this.dictManager.switchMode();
    this.displayService.switchLayout();
    this.currentMode = this.dictManager.getMode();
    this.setTitle();
  }

  ngDoCheck(): void {
    // TODO: change, so the value is based on class
    this.displayService.updateDisplay();
    this.displayNavbar = this.displayService.displayHeader;
  }

}
