import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {BackendCallerService} from "@app/core";
import {fileValidator, getFileExtension} from "@app/helpers";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {

  uploadForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<UploadComponent>,
              private formBuilder: FormBuilder,
              private backendCaller: BackendCallerService) { }

  // convenience getter for easy access to form fields
  get fc() {
    return this.uploadForm.controls;
  }

  get file() {
    return this.uploadForm.get("file");
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      file: new FormControl(null, {validators: [Validators.required]})
    }, {
      validator: fileValidator("file")
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.uploadForm.get("file").setValue(event.target.files[0]);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.uploadForm.invalid) {
      return;
    } else {
      const extension = getFileExtension(this.uploadForm.value.file.name);
      const timestamp = new Date(this.uploadForm.value.file.lastModified);
      const postData = new FormData();
      postData.append("name", this.uploadForm.value.name);
      postData.append("file", this.uploadForm.value.file);
      postData.append("timestamp", timestamp.toUTCString());
      if (extension === "xlsx") {
        this.backendCaller.addTemplateFromExcel(postData)
          .subscribe((res) => {
          window.alert(res.message);
          this.uploadForm.reset();
          this.close();
        });
      } else if (extension === "json") {
        this.backendCaller.addTemplateFromJSON(postData)
          .subscribe((res) => {
          window.alert(res.message);
          this.uploadForm.reset();
          this.close();
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
