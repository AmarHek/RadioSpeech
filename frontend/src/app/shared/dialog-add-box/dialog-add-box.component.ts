import {Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogAddGroupComponent} from "@app/shared/dialog-add-group/dialog-add-group.component";
import {DialogListVariablesComponent} from "@app/shared/dialog-list-variables/dialog-list-variables.component";
import {CheckBox} from "@app/models";

@Component({
  selector: 'app-dialog-add-box',
  templateUrl: './dialog-add-box.component.html',
  styleUrls: ['./dialog-add-box.component.css']
})
export class DialogAddBoxComponent implements OnInit {

  checkBox: CheckBox = null;

  @ViewChildren('inputField') inputField: QueryList<ElementRef>;
  constructor(public dialogRef: MatDialogRef<DialogAddGroupComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data !== null) {
      this.checkBox = data.group;
      // this.fields = this.group.options.map(option => option.name);
    } else {
      this.checkBox = {keys: [], normal: false, text: "", value: false, variables: [], kind: "box", name: ""};
    }
  }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.checkBox.name = this.inputField.first.nativeElement.value;
    this.dialogRef.close(this.checkBox)
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  openListVariableDialog() {
    const dialogData = {
      name: this.inputField.first.nativeElement.value,
      variables: this.checkBox.variables,
    };

    this.dialog.open(DialogListVariablesComponent, {
      width: '600px',
      data: dialogData,
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.checkBox.variables = result;
    });
  }
}
