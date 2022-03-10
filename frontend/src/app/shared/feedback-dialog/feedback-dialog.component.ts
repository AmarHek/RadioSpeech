import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendCallerService} from "@app/core";
import {Feedback} from "@app/models";

@Component({
  selector: "app-feedback-dialog",
  templateUrl: "./feedback-dialog.component.html",
  styleUrls: ["./feedback-dialog.component.scss"]
})
export class FeedbackDialogComponent implements OnInit {

  feedbackForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<FeedbackDialogComponent>,
              private formBuilder: FormBuilder,
              private backendCaller: BackendCallerService,
              @Inject(MAT_DIALOG_DATA) public data) { }

  get fc() {
    return this.feedbackForm.controls;
  }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      comment: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(10)]
      })
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.feedbackForm.invalid) {
      console.log(this.fc.comment);
      return;
    } else {
      const feedback: Feedback = {
        userID: this.data.userID,
        materialID: this.data.materialID,
        comment: this.feedbackForm.value.comment
      };
      this.backendCaller.addFeedback(feedback).subscribe(res => {
        window.alert(res.message);
        this.feedbackForm.reset();
        this.close();
      }, err => {
        console.error(err.message);
        this.feedbackForm.reset();
        this.close();
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
