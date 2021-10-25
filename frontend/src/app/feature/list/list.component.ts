import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import {BackendCallerService, MatDialogService, AuthenticationService} from "@app/core";
import {Template} from "@app/models";
import { ConfirmDialogComponent, ConfirmDialogModel, UploadComponent } from "@app/shared";
import {Role, User} from "@app/models";


@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {

  templates: Template[] = [];
  isLoading: boolean;

  private user: User;

  constructor(private dialog: MatDialog,
              private backendCaller: BackendCallerService,
              private dialogService: MatDialogService,
              private authenticationService: AuthenticationService
  ) { }

  get isMod() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.Moderator);
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.isLoading = true;
    this.update();
  }

  update(): void {
    this.backendCaller.getTemplateList().subscribe((templates) => {
      this.templates = templates;
      this.isLoading = false;
    });
  }

  removeAlert(id: string, name: string) {
    const dialogData = new ConfirmDialogModel(
      "warning",
      "Entfernen bestätigen",
      "Möchten Sie die Schablone '" + name + "' wirklich entfernen?");

    const dialogConfig = this.dialogService.defaultConfig("400px", dialogData);
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
    const dialogConfig = this.dialogService.defaultConfig("470px");
    const dialogRef = this.dialog.open(UploadComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.update();
    });
  }
}
