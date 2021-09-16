import { Component, OnInit } from "@angular/core";
import {BoundingBox, Material} from "../../models/materialModel";
import {BackendCallerService} from "../../services/backend-caller.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {MatDialogService} from "../../services/mat-dialog.service";
import {UploadMaterialComponent} from "../upload-material/upload-material.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: "app-display-material",
  templateUrl: "./list-material.component.html",
  styleUrls: ["./list-material.component.scss"]
})
export class ListMaterialComponent implements OnInit {

  serverUrl = environment.server;
  materials: Material[] = [];
  query: Record<string, unknown>;

  constructor(private backendCaller: BackendCallerService,
              private router: Router,
              private dialogService: MatDialogService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.query = {
      judged: false
    };
    this.getData();
  }

  getData() {
    this.backendCaller.queryMaterials(this.query).subscribe((mats: Material[]) => {
      this.materials = mats;
    });
  }

  reload() {
    this.getData();
  }

  changeQuery(newValue: boolean) {
    this.query = {
      judged: newValue
    };
    this.getData();
  }

  checkBoxes(coordinates: Record<string, BoundingBox[]>): string {

  }

  delete(id: string) {

  }

  openEditor(matID: string) {
    this.router.navigate(["/", "mainMat", matID]).then();
  }

  openUploadDialog() {
    const dialogConfig = this.dialogService.defaultConfig("600px");
    const dialogRef = this.dialog.open(UploadMaterialComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.reload();
    });
  }

}
