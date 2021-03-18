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
  constructor(private displayService: DisplayService) {}

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
    this.displayService.getMode().subscribe((value) => {
      this.mode = value;
    });
  }

  private setTitle(): void {
    this.displayService.getTitle().subscribe((value) => {
      this.title = value;
    });
  }

  private setUi(): void {
    this.displayService.getUi().subscribe((value) => {
      this.ui = value;
    });
    console.log(this.ui);
  }

  cycleMode(): void {
    this.displayService.cycleMode();
  }

  cycleUi(): void {
    this.displayService.cycleUI();
  }

  setNewMode(new_mode: string): void {
    this.displayService.setMode(new_mode);
  }

  setNewUi(new_ui: string): void {
    this.displayService.setUi(new_ui);
  }

}
