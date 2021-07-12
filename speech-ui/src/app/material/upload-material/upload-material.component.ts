import { Component, OnInit } from "@angular/core";
import {MaterialManagerService} from "../../services/material-manager.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TemplateManager} from "../../services/template-manager.service";
import * as M from "../../../helper-classes/model";
import {Template} from "../../../helper-classes/model";
import {getFileExtension} from "../../../helper-classes/util";

@Component({
  selector: "app-upload-material",
  templateUrl: "./upload-material.component.html",
  styleUrls: ["./upload-material.component.scss"]
})
export class UploadMaterialComponent implements OnInit {

  constructor(private materialManager: MaterialManagerService,
              private templateManager: TemplateManager) { }

  uploadForm: FormGroup;
  templates: M.Template[];
  disableSubmit = false;

  ngOnInit(): void {
    this.initForm();
    this.updateTemplateList();
  }

  private updateTemplateList(): void {
    this.templateManager.getList();
    this.templateManager.getListUpdateListener().subscribe((list: Template[]) => {
      this.templates = list;
    });
  }

  private initForm() {
    this.uploadForm = new FormGroup({
      "mainScans": new FormControl([], {validators: [Validators.required]}),
      "lateralScans": new FormControl([]),
      "preScans": new FormControl([]),
      "parts": new FormControl(null, {validators: [Validators.required]})
    });
  }

  onFileSelect(event, scanType: string) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      if (this.checkFileExtensions(files)) {
        this.uploadForm.get(scanType).setValue(files);
        this.checkForm();
      }
    }
  }

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

  stringify(json: JSON) {
    return JSON.stringify(json);
  }

  

}
