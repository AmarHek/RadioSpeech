import {Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogAddGroupComponent} from "@app/shared/dialog-add-group/dialog-add-group.component";
import {DialogAddVariableComponent} from "@app/shared/dialog-add-variable/dialog-add-variable.component";
import {Variable} from "@app/models";

@Component({
  selector: 'app-dialog-list-variables',
  templateUrl: './dialog-list-variables.component.html',
  styleUrls: ['./dialog-list-variables.component.css']
})
export class DialogListVariablesComponent implements OnInit {

  @ViewChildren('inputField') inputFields: QueryList<ElementRef>;

  variables: Variable[] = null;

  constructor(public dialogRef: MatDialogRef<DialogAddGroupComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data !== null) {
      this.variables = data.variables;
    } else {
      this.variables = [];
    }
  }

  ngOnInit(): void {
  }

  fields: string[] = [null, null];
  onCancel(): void {
    this.dialogRef.close()
  }

  onConfirm(): void {
    const fieldValues = this.inputFields.map(field => field.nativeElement.value);
    this.dialogRef.close(fieldValues)
  }

  openAddVariableDialog() {
    this.dialog.open(DialogAddVariableComponent, {
      width: '600px',
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.variables.push(result);
    });
  }

  removeField(index: number): void {
    this.variables.splice(index, 1);
  }

}
