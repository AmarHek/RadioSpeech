import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent, ConfirmDialogModel } from "../confirm-dialog/confirm-dialog.component";
import {BackendCallerService} from "../../services/backend-caller.service";
import {Template} from "../../../helper-classes/templateModel";
import {MatDialogService} from "../../services/mat-dialog.service";
import {UploadComponent} from "../upload/upload.component";


@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {

  templates: Template[] = [];
  isLoading: boolean;

  constructor(private dialog: MatDialog,
              private backendCaller: BackendCallerService,
              private dialogService: MatDialogService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.update();
  }

  update(): void {
    this.backendCaller.getTemplateList().subscribe((templates) => {
      this.templates = templates;
      console.log(templates);
      this.isLoading = false;
    });
  }

  removeAlert(id: string) {
    const dialogData = new ConfirmDialogModel(
      "warning",
      "Entfernen bestätigen",
      "Möchten Sie die Schablone '" + id + "' wirklich entfernen?");

    const dialogConfig = this.dialogService.defaultConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = "400px";
    dialogConfig.data = dialogData;
    dialogConfig.position = { top: "50px" };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.remove(id);
      }
    });
  }

  remove(id: string): void {
    this.backendCaller.deleteTemplate(id).subscribe(res => {
      console.log(res);
      this.update();
    });
  }

  displayDate(date: string | Date): string {
    if (typeof(date) === "string") {
      date = new Date(date);
    }
    return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

  openUploadDialog() {
    const dialogConfig = this.dialogService.defaultConfig();
    const dialogRef = this.dialog.open(UploadComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.update();
    });
  }
}
