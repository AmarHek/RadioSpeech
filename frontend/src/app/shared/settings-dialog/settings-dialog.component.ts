import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  color_mode?: string = "standard"
  language?: string = "german"
  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>) { }

  close_dialog(){
    this.dialogRef.close()
  }

  save_settings(){
    this.close_dialog()
  }
  ngOnInit(): void {
  }

}
