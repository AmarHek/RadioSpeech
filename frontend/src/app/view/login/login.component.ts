import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import {AuthenticationService} from "@app/core/services/authentication.service";
import {Role} from "@app/models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(["/"]).then();
    }
  }

  // convenience getter for easy access to form fields
  get fc() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.fc.username.value, this.fc.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // get return url from query parameters or default to home page
          this.redirectUser(data.role);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  redirectUser(userRole) {
    if (userRole === Role.User || userRole === Role.ExternalUser) {
      this.router.navigate(["/home"]);
    } else if (userRole === Role.Moderator) {
      this.router.navigate(["/list"]);
    } else if (userRole === Role.Admin) {
      this.router.navigate(["/admin"]);
    }
  }

}
