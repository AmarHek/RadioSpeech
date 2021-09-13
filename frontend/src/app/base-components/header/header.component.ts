import {Component, DoCheck, OnInit} from "@angular/core";
import { faLaptopMedical } from "@fortawesome/free-solid-svg-icons";

import { DisplayService } from "../../services/display.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Role, User} from "../../models/user";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, DoCheck {


  public displayNavbar: boolean;
  public ui: string;
  public title = "RadioSpeech";

  private user: User;

  faUser: any;
  constructor(private displayService: DisplayService,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.displayNavbar = true;
    this.faUser = faLaptopMedical;
  }

  ngDoCheck(): void {
    this.displayService.updateDisplay();
    this.displayNavbar = this.displayService.displayHeader;
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }

}
