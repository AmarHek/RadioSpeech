import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogAddGroupComponent} from "@app/shared/dialog-add-group/dialog-add-group.component";
import {DialogListVariablesComponent} from "@app/shared/dialog-list-variables/dialog-list-variables.component";

@Component({
  selector: 'app-dialog-add-box',
  templateUrl: './dialog-add-box.component.html',
  styleUrls: ['./dialog-add-box.component.css']
})
export class DialogAddBoxComponent implements OnInit {

  @ViewChildren('inputField') inputField: QueryList<ElementRef>;
  constructor(public dialogRef: MatDialogRef<DialogAddGroupComponent>,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  onConfirm(value: string): void {
    this.dialogRef.close(value)
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  openVariableDialog() {
    const dialogData = {
      name: this.inputField.first.nativeElement.value,
    };

    this.dialog.open(DialogListVariablesComponent, {
      width: '600px',
      data: dialogData,
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
}
