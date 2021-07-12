import { Component, OnInit } from "@angular/core";
import {Form, FormArray, FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MaterialManagerService} from "../../services/material-manager.service";

@Component({
  selector: "app-upload-material",
  templateUrl: "./upload-material.component.html",
  styleUrls: ["./upload-material.component.css"]
})
export class UploadMaterialComponent implements OnInit {

  uploadForm: FormGroup;

  pathologies: ["No Finding",  "Enlarged Cardiomediastinum", "Cardiomegaly", "Lung Lesion", "Lung Opacity", "Edema", "Consolidation",
    "Pneumonia", "Atelectasis", "Pneumothorax", "Pleural Effusion", "Pleural Other"];


  constructor(
    private materialManager: MaterialManagerService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.initPathologies();
  }

  private initForm() {
    this.uploadForm = this.fb.group({
      "imageFile": this.fb.control(null, {validators: Validators.required}),
      "reportFile": this.fb.control(null, {validators: Validators.required}),
      "partsFile": this.fb.control(null, {validators: Validators.required}),
      "defaultFile": this.fb.control(null, {validators: Validators.required}),
      "modality": this.fb.control(null, {validators: [Validators.required, Validators.minLength(3)]}),
      "pathologies": this.fb.array([false, false, false, false, false, false, false, false, false, false, false, false])
    });
  }

  onSubmit() {
    console.log(this.uploadForm);
  }

}
