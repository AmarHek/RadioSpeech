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
  public mode: string;
  public title: string;

  faUser: any;
  constructor(private displayService: DisplayService,
              private dictManager: DictManagerService) {

  }

  ngOnInit(): void {
    this.displayNavbar = true;
    this.faUser = faLaptopMedical;
    this.setMode();
    this.setTitle();
  }

  private setMode(): void {
    this.mode = this.displayService.getCurrentModeLong();
  }

  private setTitle(): void {
    this.title = this.displayService.getCurrentTitle();
  }

  cycleMode(): void {
    this.displayService.cycleMode();
    setTimeout(() => {
      this.refreshView();
    }, 50);
  }

  setNewMode(index: number): void {
    this.displayService.setMode(index);
    setTimeout(() => {
      this.refreshView();
    }, 100);
  }

  refreshView(): void {
    this.setMode();
    this.setTitle();
    this.dictManager.setMode();
  }

  ngDoCheck(): void {
    // TODO: change, so the value is based on class
    this.displayService.updateDisplay();
    this.displayNavbar = this.displayService.displayHeader;
  }

}
