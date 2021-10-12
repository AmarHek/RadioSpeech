import {Component, DoCheck, OnInit} from "@angular/core";
import { faLaptopMedical } from "@fortawesome/free-solid-svg-icons";

import { DisplayService, AuthenticationService } from "@app/core";
import {Role, User} from "@app/models";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, DoCheck {


  displayNavbar: boolean;
  title = "RadioSpeech";
  faUser: any;

  private user: User;

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

  get isMod() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.Moderator);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }

}
