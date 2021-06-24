import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { TimeStampsService } from "../../services/time-stamps.service";
import { DataParserService } from "../../services/dataParser.service";
import { DisplayService } from "../../services/display.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ConfirmDialogComponent, ConfirmDialogModel } from "../confirm-dialog/confirm-dialog.component";
import { Subscription } from "rxjs";
// import { DictManagerService } from "../../gastro-files/dict-manager.service";


@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {

  generators: string[] = [];
  dictSub: Subscription;
  mode = "Radiologie";
  ui: string;
  isLoading: boolean;

  constructor(private http: HttpClient,
    private dataParser: DataParserService,
    private timesService: TimeStampsService,
    private displayService: DisplayService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = false;
    this.setUi();
    this.updateGenerators();
  }

  private setUi(): void {
    this.displayService.getUi().subscribe((value) => {
      this.ui = value;
    });
  }

  removeAlert(genOrId: string) {
    const dialogData = new ConfirmDialogModel(
      "warning",
      "Entfernen bestätigen",
      "Möchten Sie die Schablone '" + genOrId + "' wirklich entfernen?");

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = "400px";
    dialogConfig.data = dialogData;
    dialogConfig.position = { top: "50px" };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.remove(genOrId);
      }
    });
  }

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
  }

  /*
  updateList(): void {

    this.dictManagerService.getList();
    this.dictSub = this.dictManagerService.getListUpdateListener().subscribe((list: N.MyDict[]) => {
      this.dicts = list;
      this.isLoading = false;
      console.log("onInit");
      console.log(this.dicts);
    });
  }

  ngOnDestroy(): void {
    if (this.mode === "Gastroenterologie") {
      this.dictSub.unsubscribe();
    }
  }

  removeDict(id: string): void {
    this.dictManagerService.remove(id);
  } */
}
