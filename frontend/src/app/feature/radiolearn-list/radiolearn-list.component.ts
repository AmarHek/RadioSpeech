import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

import {environment} from "@env/environment";
import {BoundingBox, Material, Role, User} from "@app/models";
import {AuthenticationService, BackendCallerService, MatDialogService, RadiolearnService} from "@app/core";
import {UploadMaterialComponent, ConfirmDialogComponent, ConfirmDialogModel} from "@app/shared";

@Component({
  selector: "app-display-material",
  templateUrl: "./radiolearn-list.component.html",
  styleUrls: ["./radiolearn-list.component.scss"]
})
export class RadiolearnListComponent implements OnInit {

  imageUrl = environment.backend + "images/";
  materials: Material[] = [];

  showJudged = false;
  pathology = "";
  possiblePathologies = ["Cardiomegaly", "Enlarged Cardiomediastinum", "Pleural Effusion"];

  collectionSize = 0;
  pageSize = 10;
  page = 1;

  private user: User;

  constructor(private backendCaller: BackendCallerService,
              private router: Router,
              private dialogService: MatDialogService,
              private dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private radiolearnService: RadiolearnService) { }

  get isMod() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.Moderator);
  }

  async ngOnInit() {
    await this.authenticationService.user.subscribe((x) => {
      this.user = x;
      this.showJudged = !this.isMod;
    });
    if (this.isMod) {
      this.loadData().then();
    }
  }

  async loadData() {
    await this.getLength();
    this.getData();
  }

  setPathology(newPathology: string) {
    this.pathology = newPathology;
    this.radiolearnService.currentPathology = newPathology;
    this.loadData().then();
  }

  getData() {
    this.backendCaller.listByQuery((this.page - 1) * this.pageSize, this.pageSize,
      this.showJudged, this.pathology)
      .subscribe(res => {
        this.materials = res.materials.reverse();
        }, err => {
          window.alert(err.message);
      });
  }

  getLength() {
    this.backendCaller.getDocCount(this.showJudged, this.pathology).subscribe(res => {
        console.log("Count: ", res.count);
        this.collectionSize = res.count;
      }, err => {
        console.log(err);
        window.alert(err.message);
    });
  }

  checkBoxes(coordinates: Record<string, BoundingBox[]>) {
    return this.radiolearnService.checkBoxes(coordinates);
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
    this.router.navigate(["/", "radiolearn", "main", matID]).then();
  }

  openUploadDialog() {
    const dialogConfig = this.dialogService.defaultConfig("600px");
    const dialogRef = this.dialog.open(UploadMaterialComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  loadRandom() {
      this.backendCaller.getRandom(this.showJudged, this.pathology).subscribe(res => {
        this.openEditor(res.material._id);
      }, err => {
        window.alert(err);
      });
  }

}
