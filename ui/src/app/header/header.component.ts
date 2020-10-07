import { Component, OnInit } from '@angular/core';
import {faLaptopMedical} from "@fortawesome/free-solid-svg-icons";
import { DisplayService } from "../display.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public displayNavbar: boolean;

  faUser: any;
  constructor(private displayService: DisplayService) {

  }

  ngOnInit(): void {
    this.displayNavbar = true;
    this.faUser = faLaptopMedical;
  }

  ngDoCheck(): void {
    // TODO: change, so the value is based on class
    this.displayService.updateDisplay();
    this.displayNavbar = this.displayService.displayHeader;
  }

}
