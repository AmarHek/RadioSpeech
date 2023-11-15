import {Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogAddGroupComponent} from "@app/shared/dialog-add-group/dialog-add-group.component";
import {DialogAddVariableComponent} from "@app/shared/dialog-add-variable/dialog-add-variable.component";

@Component({
  selector: 'app-dialog-list-variables',
  templateUrl: './dialog-list-variables.component.html',
  styleUrls: ['./dialog-list-variables.component.css']
})
export class DialogListVariablesComponent implements OnInit {

  @ViewChildren('inputField') inputFields: QueryList<ElementRef>;

  constructor(public dialogRef: MatDialogRef<DialogAddGroupComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

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

  openVariableDialog() {
    this.dialog.open(DialogAddVariableComponent, {
      width: '600px',
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      // // todo fix name
      // const group: Group = {kind: "group", name: "group_name", options: []};
      // result.forEach(option_name => {
      //   group.options.push({kind: "option", name: option_name, text: "", normal: false, variables: [], keys: []});
      // })
      // this.categories.find(cat => cat.name === this.selectedCat).selectables.push(group);
      // this.optionsComponent.initRows(this.categories)
    });
  }

  removeField(index: number): void {
    this.fields.splice(index, 1);
  }

}
