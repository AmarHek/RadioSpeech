import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-add-box',
  templateUrl: './dialog-add-box.component.html',
  styleUrls: ['./dialog-add-box.component.css']
})
export class DialogAddBoxComponent implements OnInit {

  @ViewChildren('inputField') inputField: QueryList<ElementRef>;
  constructor(public dialogRef: MatDialogRef<DialogAddBoxComponent>) { }

  ngOnInit(): void {
  }

  onConfirm(value: string): void {
    this.dialogRef.close(value)
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
