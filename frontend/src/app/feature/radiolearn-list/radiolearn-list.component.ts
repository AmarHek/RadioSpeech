import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService, BackendCallerService, MatDialogService, RadiolearnService} from "@app/core";
import {Material, Role, User} from "@app/models";
import {ConfirmDialogComponent, ConfirmDialogModel, UploadMaterialComponent} from "@app/shared";
import {AddScanDialogComponent} from "@app/shared/add-scan-dialog/add-scan-dialog.component";

import {environment} from "@env/environment";

@Component({
  selector: "app-display-material",
  templateUrl: "./radiolearn-list.component.html",
  styleUrls: ["./radiolearn-list.component.scss"]
})
export class RadiolearnListComponent implements OnInit {

  imageUrl = environment.images;
  materials: Material[] = [];

  showJudged = false;
  pathology = "";

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
    this.getCountAndData();
  }

  getCountAndData() {
    this.backendCaller.getDocCount(this.showJudged, this.pathology).subscribe(res => {
      console.log("Count: ", res.count);
      this.collectionSize = res.count;
      this.getData();
    }, err => {
      console.log(err);
      window.alert(err.message);
    });
  }

  setPathology(newPathology: string) {
    this.pathology = newPathology;
    this.radiolearnService.currentPathology = newPathology;
    this.getCountAndData();
  }

  getData(reverse = true) {
    if (reverse) {
      // for reverse: skip number is total docCount - pageSize * current page
      let skip = this.collectionSize - this.page * this.pageSize;
      let length = this.pageSize;
      if (skip < 0) {
        length = length + skip;
        skip = 0;
      }
      this.backendCaller.listByQuery(skip, length,
        this.showJudged, this.pathology)
        .subscribe(res => {
          // then reverse the resulting list
          this.materials = res.materials.reverse();
        }, err => {
          window.alert(err.message);
        });
    } else {
      const skip = (this.page - 1) * this.pageSize;
      this.backendCaller.listByQuery(skip, this.pageSize,
        this.showJudged, this.pathology)
        .subscribe(res => {
          this.materials = res.materials;
        }, err => {
          window.alert(err.message);
        });
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
          this.getCountAndData();
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
      this.getCountAndData();
    });
  }

  openAddScanDialog(id: string, scanType: string) {
    const dialogConfig = this.dialogService.defaultConfig("600px", {id, scanType});
    const dialogRef = this.dialog.open(AddScanDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.getCountAndData();
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
