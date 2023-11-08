import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-add-variable',
  templateUrl: './dialog-add-variable.component.html',
  styleUrls: ['./dialog-add-variable.component.css']
})
export class DialogAddVariableComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddVariableComponent>) { }
  variable_types = ["One Choice", "Multiple Choice", "Text", "Number", "Date"];
  selectedType: string = "One Choice"

  ngOnInit(): void {
  }

  onConfirm(){
    this.dialogRef.close()
  }

  onCancel(){
    this.dialogRef.close()
  }
}
