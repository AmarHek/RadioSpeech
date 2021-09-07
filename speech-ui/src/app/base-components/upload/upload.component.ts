import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BackendCallerService} from "../../services/backend-caller.service";
import {getFileExtension} from "../../../helper-classes/util";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  name = "";
  months: string[] = ["Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"];
  mode: string;

  showWarning = false;

  uploadForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<UploadComponent>,
              private backendCaller: BackendCallerService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.uploadForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      file: new FormControl(null, {validators: [Validators.required]}),
      filename: new FormControl(null, {validators: [Validators.required]})
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.checkFileExtension(file);
      this.uploadForm.get("file").setValue(file);
    }
  }

  checkFileExtension(file: File) {
    this.showWarning = false;
    const extension = getFileExtension(file.name);
    if (!(extension === "xlsx" || extension === "json")) {
      this.showWarning = true;
    }
  }

  upload() {
    const extension = getFileExtension(this.uploadForm.value.file.name);
    const postData = new FormData();
    postData.append("name", this.uploadForm.value.name);
    postData.append("file", this.uploadForm.value.file);
    if (extension === "xlsx") {
      // this.templateManager.addExcel(postData);
    } else if (extension === "json") {
      this.backendCaller.addTemplateFromJSON(postData).subscribe((res) => {
        window.alert(res.message);
      });
    } else {
      window.alert("Nicht unterstützter Dateityp! Datei muss .xlsx oder .json sein.");
    }
    this.uploadForm.reset();
  }

  close() {
    this.dialogRef.close(false);
  }

  /*
  upload(): void {
    this.timesService.addTimeStamp(new Date());
    const reader = new FileReader();
    reader.readAsDataURL((document.getElementById("uploadFile") as HTMLInputElement).files[0]);
    reader.onload = () => {
      const dat = new Date();
      const base64 = (reader.result as string).replace(/^.*?base64,/, "");
      const data = { name: this.name + " " + dat.getDate() + " " + this.months[dat.getMonth()] + " " + dat.getFullYear() , data: base64 };
      this.http.post(environment.urlRootScala + "upload", data, { "observe": "response" } ).subscribe((result) => {
        window.alert("Upload Erfolgreich");
        this.router.navigate(["list"]);

      }, (error) => {
        if (error instanceof ErrorEvent) {
          window.alert("an unknown error has occurred");
        } else {
          window.alert("parsing failure: " + (error as any).error);
        }
      });
    };
    reader.onerror = (error) => {
      window.alert("The following error occurred:\n" + error);
    };
  }
*/
}
