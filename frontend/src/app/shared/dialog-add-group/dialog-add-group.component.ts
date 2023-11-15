import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogListVariablesComponent} from "@app/shared/dialog-list-variables/dialog-list-variables.component";

@Component({
  selector: 'app-dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.css']
})
export class DialogAddGroupComponent implements OnInit {
  @ViewChildren('inputField') inputFields: QueryList<ElementRef>;

  constructor(public dialogRef: MatDialogRef<DialogAddGroupComponent>,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  fields: string[] = ["", ""];

  addTextField(): void {
    this.fields.push("");
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  // checks if at least two options are filled in, to allow confirmation of dialog
  checkAtLeastTwoFilled(): boolean {
    let count = 0;
    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i] !== null && this.fields[i].length > 0) {
        count++;
      }
    }
    return count >= 2;
  }
  onCancel(): void {
    this.dialogRef.close()
  }

  onConfirm(): void {
    const fieldValues = this.inputFields.map(field => field.nativeElement.value);
    this.dialogRef.close(fieldValues)
  }

  openVariableDialog() {
    this.dialog.open(DialogListVariablesComponent, {
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
