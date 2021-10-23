import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "@app/core";

@Component({
  selector: "app-change-username",
  templateUrl: "./change-username.component.html",
  styleUrls: ["./change-username.component.css"]
})
export class ChangeUsernameComponent implements OnInit {

  @Input() userID: string;
  changeForm: FormGroup;
  submitted = false;
  error = "";

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  get f() {
    return this.changeForm.controls;
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      newUsername: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.changeForm.invalid) {
      return;
    } else {
      this.userService.changeUsername(this.userID,
        this.changeForm["newUsername"].value,
        this.changeForm["password"].value)
        .subscribe(
          res => {
            window.alert(res.message);
            this.error = "";
            this.changeForm.reset();
            this.submitted = false;
          },
          err => {
            this.error = err;
          }
        );
    }
  }

}
