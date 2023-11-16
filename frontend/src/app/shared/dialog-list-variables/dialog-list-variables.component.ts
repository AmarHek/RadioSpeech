import {Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogAddGroupComponent} from "@app/shared/dialog-add-group/dialog-add-group.component";
import {DialogAddVariableComponent} from "@app/shared/dialog-add-variable/dialog-add-variable.component";
import {Variable, VariableMC, VariableOC} from "@app/models";

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

  textForVariableOC(variable: VariableOC) {
    let result = "One Choice: ";
    result += variable.textBefore + " ";
    result += variable.values.join(" / ")
    result += " " + variable.textAfter;
    return result
  }

  textForVariableMC(variable: VariableMC) {
    let result = "Multiple Choice: ";
    result += variable.textBefore + " ";
    let value_name_string = variable.values.map(value_name => value_name[0]).join(" | ")
    result += value_name_string
    result += " " + variable.textAfter;
    return result
  }

  fields: string[] = [null, null];

  onCancel(): void {
    this.dialogRef.close()
  }

  onConfirm(): void {
    this.dialogRef.close(this.variables)
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
