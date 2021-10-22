import { Component, OnInit } from "@angular/core";
import {Role, User} from "@app/models";
import {AuthenticationService, UserService} from "@app/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {

  users: User[];


  constructor(private userService: UserService) { }



  ngOnInit(): void {
    this.userService.getAll().subscribe(users => this.users = users);
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
      this.userService.deleteUser(id).subscribe((res) => {
        window.alert(res.message);
      });
    }
  }

}
