import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

import {environment} from "@env/environment";
import {BoundingBox, Material} from "@app/models";
import {BackendCallerService, MatDialogService} from "@app/core";
import {UploadMaterialComponent, ConfirmDialogComponent, ConfirmDialogModel} from "@app/shared";

@Component({
  selector: "app-display-material",
  templateUrl: "./list-material.component.html",
  styleUrls: ["./list-material.component.scss"]
})
export class ListMaterialComponent implements OnInit {

  serverUrl = environment.backend;
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
    const res: string[] = [];
    if (coordinates.main.length > 0) {
      res.push("Hauptaufnahme");
    }
    if (coordinates.lateral.length > 0) {
      res.push("Lateralaufnahme");
    }
    if (coordinates.pre.length > 0) {
      res.push("Voraufnahme");
    }

    if (res.length > 0) {
      return res.join(", ");
    } else {
      return "Keiner Aufnahme";
    }

  }

  delete(objectID: string, scanID: string) {
    const dialogData = new ConfirmDialogModel(
      "warning",
      "Entfernen bestätigen",
      "Möchten Sie diesen Eintrag wirklich entfernen?");

    const dialogConfig = this.dialogService.defaultConfig("400px", dialogData);
    dialogConfig.position = { top: "50px" };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.backendCaller.deleteMaterial(objectID, scanID).subscribe(res => {
          window.alert("Eintrag erfolgreich gelöscht.");
          this.getData();
        });
      }
    });
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
