import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { TimeStampsService } from "../../services/time-stamps.service";
import { DataParserService } from "../../services/dataParser.service";
import { DisplayService } from "../../services/display.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ConfirmDialogComponent, ConfirmDialogModel } from "../confirm-dialog/confirm-dialog.component";
import { Subscription } from "rxjs";
import {TemplateManager} from "../../services/template-manager.service";
import {Template} from "../../../helper-classes/model";


@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnDestroy {

  templates: Template[] = [];
  templateSub: Subscription;
  mode = "Radiologie";
  ui: string;
  isLoading: boolean;

  constructor(private http: HttpClient,
              private dataParser: DataParserService,
              private timesService: TimeStampsService,
              private displayService: DisplayService,
              private dialog: MatDialog,
              private templateManager: TemplateManager
  ) { }

  ngOnInit() {
    this.isLoading = false;
    this.setUi();
    this.update();
  }

  private setUi(): void {
    this.displayService.getUi().subscribe((value) => {
      this.ui = value;
    });
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
/*
  remove(generator: string): void {
    this.http.post(environment.urlRootScala + "remove", JSON.stringify(generator)).subscribe(
      result => { this.updateGenerators(); },
      error => window.alert("unknown error: " + JSON.stringify(error))
    );
  }

  updateGenerators(): void {
    this.http.post(environment.urlRootScala + "list", "").subscribe(
      result => {
        this.generators = result as any;
      },
      error => window.alert("unknown error: " + JSON.stringify(error))
    );
  }*/

  update(): void {
    this.templateManager.getList();
    this.templateSub = this.templateManager.getListUpdateListener().subscribe((list: Template[]) => {
      this.templates = list;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.templateSub.unsubscribe();
  }

  remove(id: string): void {
    this.templateManager.remove(id);
  }
}
