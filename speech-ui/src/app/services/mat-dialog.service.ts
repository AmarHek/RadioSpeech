import { Injectable } from "@angular/core";
import {MatDialogConfig} from "@angular/material/dialog";

@Injectable({
  providedIn: "root"
})
export class MatDialogService {

  constructor() { }

  defaultConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    return dialogConfig;
  }
}
