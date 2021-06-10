import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {ExportPackageGeneratorService} from "../../services/export-package-generator.service";

@Component({
  selector: "app-upload-modal",
  templateUrl: "./upload-modal.component.html",
  styleUrls: ["./upload-modal.component.css"]
})
export class UploadModalComponent implements OnInit {

  @ViewChild("file") file;
  public files: Set<File> = new Set();

  constructor(private exportPackageGenerator: ExportPackageGeneratorService) { }

  ngOnInit(): void {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
    console.log(files);
  }

}
