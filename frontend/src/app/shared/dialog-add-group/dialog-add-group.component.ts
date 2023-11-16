import {Component, ElementRef, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogListVariablesComponent} from "@app/shared/dialog-list-variables/dialog-list-variables.component";
import {Group} from "@app/models";

@Component({
  selector: 'app-dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.css']
})
export class DialogAddGroupComponent implements OnInit {
  @ViewChildren('inputField') inputFields: QueryList<ElementRef>;

  group: Group = null;
  constructor(public dialogRef: MatDialogRef<DialogAddGroupComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data !== null) {
      this.group = data.group;
      // this.fields = this.group.options.map(option => option.name);
    } else {
      this.group = {kind: "group", name: "group_name", options: []};
      for (let i = 0; i < 2; i++) {
        this.group.options.push({kind: "option", name: "", text: "", normal: false, variables: [], keys: []});
      }
    }
  }

  ngOnInit(): void {
  }


  addTextField(): void {
    this.group.options.push({kind: "option", name: "", text: "", normal: false, variables: [], keys: []});
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  // checks if at least two options are filled in, to allow confirmation of dialog
  checkAtLeastTwoFilled(): boolean {
    let count = 0;
    for (let i = 0; i < this.group.options.length; i++) {
      if (this.group.options[i] !== null && this.group.options[i].name.length > 0) {
        count++;
      }
    }
    return count >= 2;
  }
  onCancel(): void {
    this.dialogRef.close()
  }

  onConfirm(): void {
    this.dialogRef.close(this.group)
  }

  openListVariablesDialog(name: string) {
    const dialogData = {
      name: name,
      variables: this.group.options.find(option => option.name === name).variables
    };
    this.dialog.open(DialogListVariablesComponent, {
      width: '600px',
      data: dialogData
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.group.options.find(option => option.name === name).variables = result;
    });
  }

  removeField(index: number): void {
    this.group.options.splice(index, 1);
  }
}