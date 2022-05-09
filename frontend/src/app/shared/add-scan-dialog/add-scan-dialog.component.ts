import {Component, Inject, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BackendCallerService} from "@app/core";

@Component({
  selector: "app-add-scan-dialog",
  templateUrl: "./add-scan-dialog.component.html",
  styleUrls: ["./add-scan-dialog.component.scss"]
})
export class AddScanDialogComponent implements OnInit {

  fileForm: FormGroup;
  uploading = false;
  supportedFileTypes = ["image/png", "image/jpeg", "image/jpg"];


  constructor(private backendCaller: BackendCallerService,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.fileForm = new FormGroup({
      newScan: new FormControl(null, {validators: [Validators.required]})
    });
  }

  fileFilter(file: File): boolean {
    if (!(this.supportedFileTypes.includes(file.type))) {
      window.alert("Die Datei " + file.name + " besitzt ein nicht unterstütztes Dateiformat. " +
        "Bitte nur PNG oder JPEG hochladen.");
      return false;
    }
    return true;
  }

  submit(): void {
    this.uploading = true;
    const formData = new FormData();
    formData.append("scanType", this.data.scanType);
    formData.append("newScan", this.fileForm.get("newScan").value);

    this.backendCaller.addScan(this.data.id, formData);
  }

}
