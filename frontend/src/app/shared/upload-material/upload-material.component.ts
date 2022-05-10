import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {nanoid} from "nanoid";
import {MatDialogRef} from "@angular/material/dialog";

import * as M from "@app/models/templateModel";
import {BackendCallerService, FilesSortingService} from "@app/core";

@Component({
  selector: "app-upload-material",
  templateUrl: "./upload-material.component.html",
  styleUrls: ["./upload-material.component.scss"]
})
export class UploadMaterialComponent implements OnInit {

  uploadForm: FormGroup;
  radiolearnTemplate: M.Template;

  mainFlags: boolean[] = [];
  lateralRedFlags: boolean[] = [];
  lateralYellowFlags: boolean[] = [];
  preRedFlags: boolean[] = [];
  preYellowFlags: boolean[] = [];

  ignoreFlags = false;

  supportedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
  progress = 0;
  uploading = false;
  messages: string[] = [];

  constructor(private backendCaller: BackendCallerService,
              private dialogRef: MatDialogRef<UploadMaterialComponent>,
              private filesSorter: FilesSortingService) { }

  ngOnInit(): void {
    this.initForm();
    this.filesSorter.setIdentifier("");
    this.backendCaller.getTemplateByName("Radiolearn").subscribe(res => {
      this.radiolearnTemplate = res.template;
      console.log(this.radiolearnTemplate);
    }, err => {
      console.log(err.message);
    });
  }

  initForm() {
    this.uploadForm = new FormGroup({
      mainScans: new FormControl([], {validators: [Validators.required]}),
      lateralScans: new FormControl([]),
      preScans: new FormControl([])
    });
  }

  stringify(dict) {
    return JSON.stringify(dict);
  }

  updateIdentifier(id: string) {
    this.ignoreFlags = false;
    this.filesSorter.setIdentifier(id);
    this.flagFiles();
  }

  setIgnoreFlags(id: string) {
    if (this.ignoreFlags) {
      this.setAllFlagsToTrue();
    } else {
      this.filesSorter.setIdentifier(id);
      this.flagFiles();
    }
  }

  onFileSelect(event, scanType: string) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      if (this.fileFilter(files)) {
        this.uploadForm.get(scanType).setValue(Array.from(files));
        this.flagFiles();
      }
    }
  }

  fileFilter(files: File[]): boolean {
    for (const file of files) {
      if (!(this.supportedFileTypes.includes(file.type))) {
        window.alert("Die Datei " + file.name + " besitzt ein nicht unterstütztes Dateiformat. " +
          "Bitte nur PNG oder JPEG hochladen.");
        return false;
      }
    }
    return true;
  }

  flagFiles(): void {
    const mainFiles: File[] = this.uploadForm.get("mainScans").value;
    const lateralFiles: File[] = this.uploadForm.get("lateralScans").value;
    const preFiles: File[] = this.uploadForm.get("preScans").value;

    this.mainFlags = this.filesSorter.identifierSearch(mainFiles);
    this.lateralRedFlags = this.filesSorter.identifierSearch(lateralFiles);
    this.preRedFlags = this.filesSorter.identifierSearch(preFiles);

    this.lateralYellowFlags = this.filesSorter.fileMatchSearch(mainFiles, lateralFiles);
    this.preYellowFlags = this.filesSorter.fileMatchSearch(mainFiles, preFiles);
  }

  setAllFlagsToTrue(): void {
    for (let i = 0; i < this.mainFlags.length; i++) {
      this.mainFlags[i] = true;
    }
    for (let i = 0; i < this.lateralRedFlags.length; i++) {
      this.lateralRedFlags[i] = true;
      this.lateralYellowFlags[i] = true;
    }
    for (let i = 0; i < this.preRedFlags.length; i++) {
      this.preRedFlags[i] = true;
      this.preYellowFlags[i] = true;
    }
  }

  submit(): void {
    this.uploading = true;
    let choice = true;
    if (this.mainFlags.includes(false) || this.lateralYellowFlags.includes(false) || this.lateralRedFlags.includes(false)
    || this.preYellowFlags.includes(false) || this.preRedFlags.includes(false)) {
      choice = window.confirm("Eine oder mehre Dateien konnten nicht korrekt zugeordnet werden. " +
        "Diese werden beim Upload ignoriert. Sind Sie sicher, dass Sie fortfahren möchten?");
    }

    if (choice) {
      const mainScans = this.uploadForm.get("mainScans").value;
      const lateralScans = this.uploadForm.get("lateralScans").value;
      const preScans = this.uploadForm.get("preScans").value;

      const fileTuples: [File, File, File][] = this.filesSorter.getFileTuples(mainScans, lateralScans, preScans);

      for (const fileTuple of fileTuples) {
        const formData = new FormData();
        const id = nanoid();
        formData.append("modality", "xray");
        formData.append("id", id);
        formData.append("template", JSON.stringify(this.radiolearnTemplate));
        formData.append("mainScan", fileTuple[0]);
        formData.append("lateralScan", fileTuple[1]);
        formData.append("preScan", fileTuple[2]);

        this.backendCaller.addMaterial(formData).subscribe( result => {
          this.progress += 100/(fileTuples.length);
          if (result.success === false || result.success === undefined) {
            this.messages.push(id + ": " + result.message);
          }
          if (fileTuples.indexOf(fileTuple) === fileTuples.length - 1 && this.messages.length === 0) {
            setTimeout(() => this.close(), 1000);
          }
        }, err => {
          this.progress += 100/(fileTuples.length);
          this.messages.push(id + ": " + err);
          console.log(err);
          if (fileTuples.indexOf(fileTuple) === fileTuples.length - 1 && this.messages.length === 0) {
            setTimeout(() => this.close(), 10000);
          }
        });
      }
    } else {
      this.uploading = false;
    }

  }

  close() {
    this.dialogRef.close();
  }

}
