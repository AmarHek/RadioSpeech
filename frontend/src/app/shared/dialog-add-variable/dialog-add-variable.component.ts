import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {VariableText, VariableOC, VariableMC, VariableCommon, VariableNumber, VariableDate} from "@app/models";


@Component({
  selector: 'app-dialog-add-variable',
  templateUrl: './dialog-add-variable.component.html',
  styleUrls: ['./dialog-add-variable.component.css']
})
export class DialogAddVariableComponent implements OnInit {

  textBefore: string = "";
  textAfter: string = "";

  constructor(public dialogRef: MatDialogRef<DialogAddVariableComponent>) {
  }

  variable_types = ["One Choice", "Multiple Choice", "Text", "Number", "Date"];
  selectedType: string = "One Choice"

  ngOnInit(): void {
  }

  onConfirm() {
    if (this.selectedType === "Text") {
      // create variableOC by getting relevant data from dialog
      let variableText: VariableText = {
        id: "",
        kind: "text",
        textAfter: this.textAfter.trim(),
        textBefore: this.textBefore.trim(),
        value: ""
      };
      this.dialogRef.close(variableText)
    }
  }

  onCancel() {
    this.dialogRef.close()
  }
}
