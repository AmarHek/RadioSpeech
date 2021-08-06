import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataParserService } from "../../services/dataParser.service";
import { DisplayService } from "../../services/display.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ConfirmDialogComponent, ConfirmDialogModel } from "../confirm-dialog/confirm-dialog.component";
import {BackendCallerService} from "../../services/backend-caller.service";
import {Template} from "../../../helper-classes/templateModel";


@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {

  templates: Template[] = [];
  isLoading: boolean;

  constructor(private http: HttpClient,
              private dataParser: DataParserService,
              private displayService: DisplayService,
              private dialog: MatDialog,
              private backendCaller: BackendCallerService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.update();
  }

  removeAlert(id: string) {
    const dialogData = new ConfirmDialogModel(
      "warning",
      "Entfernen bestätigen",
      "Möchten Sie die Schablone '" + id + "' wirklich entfernen?");

    const dialogConfig = new MatDialogConfig();
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

  update(): void {
    this.backendCaller.getTemplateList().subscribe((templates) => {
      this.templates = templates;
      console.log(templates);
      this.isLoading = false;
    });
  }

  remove(id: string): void {
    this.backendCaller.deleteTemplate(id).subscribe(res => {
      console.log(res);
    });
  }
}
