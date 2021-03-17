import {Component, DoCheck, OnInit} from '@angular/core';
import { faLaptopMedical } from '@fortawesome/free-solid-svg-icons';

import { DisplayService } from '../services/display.service';
import {DictManagerService} from '../services/dict-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  public displayNavbar: boolean;
  public mode: string;
  public ui: string;
  public title: string;

  faUser: any;
  constructor(private displayService: DisplayService,
              private dictManager: DictManagerService) {}

  ngOnInit(): void {
    this.displayNavbar = true;
    this.faUser = faLaptopMedical;
    this.setMode();
    this.setTitle();
    this.setUi();
  }

  ngDoCheck(): void {
    // TODO: change, so the value is based on class
    this.displayService.updateDisplay();
    this.displayNavbar = this.displayService.displayHeader;
  }

  private setMode(): void {
    this.mode = this.displayService.getModeLong();
  }

  private setTitle(): void {
    this.title = this.displayService.getTitle();
  }

  private setUi(): void {
    this.ui = this.displayService.getUi();
    console.log(this.ui);
  }

  cycleMode(): void {
    this.displayService.cycleMode();
    setTimeout(() => {
      this.refreshView();
    }, 50);
  }

  cycleUi(): void {
    this.displayService.cycleUI();
    setTimeout(() => {
      this.refreshView();
    }, 50);
  }

  setNewMode(new_mode: string): void {
    this.displayService.setMode(new_mode);
    setTimeout(() => {
      this.refreshView();
    }, 100);
  }

  setNewUi(new_ui: string): void {
    this.displayService.setUi(new_ui);
    setTimeout(() => {
      this.refreshView();
    }, 100);
  }

  refreshView(): void {
    this.setMode();
    this.setTitle();
    this.setUi();
    this.dictManager.setMode();
    /*setTimeout(() => {
      window.location.reload();
    }, 100);*/
  }
}
