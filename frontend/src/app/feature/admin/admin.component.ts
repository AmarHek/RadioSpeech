import {Component, ComponentRef, OnInit, ViewChild} from "@angular/core";
import {Role, User} from "@app/models";
import {AuthenticationService, UserService} from "@app/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {

  users: User[];

  // @ViewChild("signUp") signUp: ComponentRef<>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  changeRole(id: string) {
    // TODO
  }

  deleteUser(id: string) {
    const result = window.confirm("Sicher, dass Sie den User löschen möchten?");
    if (result) {
      this.userService.deleteUser(id)
        .subscribe(
          (res) => {
          window.alert(res.message);
          this.getUserList();
        },
          err => window.alert(err));
    }
  }

}
