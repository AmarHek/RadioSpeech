import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BackendCallerService} from "../../services/backend-caller.service";
import * as M from "../../../helper-classes/templateModel";
import {getFileExtension} from "../../../helper-classes/util";
import {nanoid} from "nanoid";

@Component({
  selector: "app-upload-material",
  templateUrl: "./upload-material.component.html",
  styleUrls: ["./upload-material.component.scss"]
})
export class UploadMaterialComponent implements OnInit {

  uploadForm: FormGroup;
  templates: M.Template[];
  disableSubmit = false;

  constructor(private backendCaller: BackendCallerService) { }

  ngOnInit(): void {
    this.initForm();
    this.updateTemplateList();
  }

  updateTemplateList(): void {
    this.backendCaller.getTemplateList().subscribe((templates) => {
      this.templates = templates;
    });
  }

  initForm() {
    this.uploadForm = new FormGroup({
      mainFiles: new FormControl(),
      lateralFiles: new FormControl(),
      preFiles: new FormControl(),
      mainScans: new FormControl([], {validators: [Validators.required]}),
      lateralScans: new FormControl([]),
      preScans: new FormControl([]),
      parts: new FormControl(null, {validators: [Validators.required]})
    });
  }

  onFileSelect(event, scanType: string) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      if (this.checkFileExtensions(files)) {
        this.uploadForm.get(scanType).setValue(Array.from(files));
        this.checkForm();
      }
    }
  }

  // TODO: Refactor this to make it simpler (i.e. use mimetype instead of checkFileExtension etc.)

  checkFileExtensions(files: File[]): boolean {
    for (const file of files) {
      const extension = getFileExtension(file.name);
      if (!(extension === "png" || extension === "jpeg" || extension === "jpg")) {
        window.alert("Die Datei " + file.name + " besitzt ein nicht unterstütztes Dateiformat. Bitte nur PNG oder JPEG hochladen.");
        return false;
      }
    }
    return true;
  }

  checkForm(): void {
    this.disableSubmit = false;
    const mainFiles = this.uploadForm.get("mainScans").value;
    const lateralFiles = this.uploadForm.get("lateralScans").value;
    const preFiles = this.uploadForm.get("preScans").value;
    if (mainFiles.length > 0) {
      if (lateralFiles.length > 0 && lateralFiles.length !== mainFiles.length) {
        window.alert("Warnung: Anzahl an lateralen Scans entspricht nicht der Anzahl an frontalen Scans.");
        this.disableSubmit = true;
      } else if (preFiles.length > 0 && preFiles.length !== mainFiles.length) {
        window.alert("Warnung: Anzahl an Voraufnahmen entspricht nicht der Anzahl an frontalen Scans.");
        this.disableSubmit = true;
      }
    } else if (lateralFiles.length > 0) {
      if (preFiles.length > 0 && preFiles.length !== lateralFiles.length) {
        window.alert("Warnung: Anzahl an Voraufnahmen entspricht nicht der Anzahl an lateralen Scans.");
        this.disableSubmit = true;
      }
    }
  }

  stringify(dict) {
    return JSON.stringify(dict);
  }

  submit(): void {
    const mainScans = this.uploadForm.get("mainScans").value;
    const lateralScans = this.uploadForm.get("lateralScans").value;
    const preScans = this.uploadForm.get("preScans").value;

    const nFiles = this.uploadForm.get("mainScans").value.length;
    const progress = 0;

    // TODO: Add progress bar

    for (let i = 0; i < nFiles; i++) {
      const formData = new FormData();
      // TODO: Add parts upload (+ syntax check), which overrides the default parts
      formData.append("parts", this.uploadForm.get("parts").value);
      // TODO: Add choice for this later
      formData.append("modality", "xray");
      formData.append("id", nanoid());
      formData.append("mainScan", mainScans[i]);
      if (lateralScans.length > 0) {
        formData.append("lateralScan", lateralScans[i]);
      }
      if (preScans.length > 0) {
        formData.append("preScan", preScans[i]);
      }

      this.backendCaller.addMaterial(formData).subscribe(
      );
    }
    this.initForm();
  }


}
