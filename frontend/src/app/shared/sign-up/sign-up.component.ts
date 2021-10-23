import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "@app/models";
import {UserService} from "@app/core";
import {mustMatch} from "@app/helpers";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitted = false;
  error = "";

  roles = [Role.User, Role.Moderator, Role.Admin];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  // convenience getter for easy access to form fields
  get sc() {
    return this.signUpForm.controls;
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPass: ["", [Validators.required]],
      role: [Role.User, [Validators.required]]
    }, {
      validator: mustMatch("password", "confirmPass")
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    } else {
      this.userService.signUp(this.sc["username"].value, this.sc["password"].value, this.sc["role"].value)
        .subscribe(
          res => {
            window.alert(res.message);
            this.error = "";
            this.signUpForm.reset();
            this.submitted = false;
          },
          err => {
            this.error = err;
          }
        );
    }
  }

}
