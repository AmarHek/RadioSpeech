import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

import {environment} from "@env/environment";
import {BoundingBox, Material} from "@app/models";
import {BackendCallerService, MatDialogService} from "@app/core";
import {UploadMaterialComponent, ConfirmDialogComponent, ConfirmDialogModel} from "@app/shared";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: "app-display-material",
  templateUrl: "./list-material.component.html",
  styleUrls: ["./list-material.component.scss"]
})
export class ListMaterialComponent implements OnInit {

  imageUrl = environment.backend + "images/";
  materials: Material[] = [];
  showJudged = false;

  collectionSize = 0;
  pageSize = 10;
  page = 1;

  constructor(private backendCaller: BackendCallerService,
              private router: Router,
              private dialogService: MatDialogService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData().then();
  }

  getData() {
    this.backendCaller.listByJudged(this.showJudged, (this.page -1) * this.pageSize, this.pageSize)
      .subscribe(res => {
      this.materials = res.materials.reverse();
    }, err => {
      window.alert(err.message);
    });
  }

  getLength() {
    this.backendCaller.getDocCount(this.showJudged).subscribe(res => {
      console.log("Count: ", res.count);
      this.collectionSize = res.count;
    }, err => {
      console.log(err);
      window.alert(err.message);
    });
  }

  async loadData() {
    await this.getLength();
    this.getData();
  }

  changePage(event) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData().then();
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
          window.alert(res.message);
          this.getData();
        }, err => {
          window.alert(err.message);
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
      this.getData();
    });
  }

  loadRandom() {
    this.backendCaller.getRandomByJudged(this.showJudged).subscribe(res => {
      this.openEditor(res.material._id);
    }, err => {
      window.alert(err.message);
    });
  }

}
