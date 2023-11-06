import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.css']
})
export class DialogAddGroupComponent implements OnInit {
  @ViewChildren('inputField') inputFields: QueryList<ElementRef>;
  constructor(public dialogRef: MatDialogRef<DialogAddGroupComponent>) { }

  ngOnInit(): void {
  }
  fields: string[] = [null, null];

  addTextField(): void {
    this.fields.push(null);
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  onConfirm(): void {
    const fieldValues = this.inputFields.map(field => field.nativeElement.value);
    this.dialogRef.close(fieldValues)
  }

  removeField(index: number): void {
    this.fields.splice(index, 1);
  }
}
