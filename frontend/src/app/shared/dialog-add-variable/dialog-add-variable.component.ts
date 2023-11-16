import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VariableText, VariableOC, VariableMC, VariableCommon, VariableNumber, VariableDate} from "@app/models";
import {FormControl} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";


@Component({
  selector: 'app-dialog-add-variable',
  templateUrl: './dialog-add-variable.component.html',
  styleUrls: ['./dialog-add-variable.component.css']
})
export class DialogAddVariableComponent implements OnInit {

  textBefore: string = "";
  textAfter: string = "";

  optionControl = new FormControl('');
  options: string[] = [];
  title = "Variable hinzufügen"

  @ViewChild('optionInput') optionInput: ElementRef<HTMLInputElement>;


  constructor(public dialogRef: MatDialogRef<DialogAddVariableComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data != null && data.variable_to_edit !== null) {
      this.title = "Variable bearbeiten"
      console.log(data.variable_to_edit)
      this.textBefore = data.variable_to_edit.textBefore;
      this.textAfter = data.variable_to_edit.textAfter;
      if (data.variable_to_edit.kind === "oc") {
        this.selectedType = "One Choice"
        this.options = data.variable_to_edit.values;
      } else if (data.variable_to_edit.kind === "mc") {
        this.selectedType = "Multiple Choice"
        this.options = data.variable_to_edit.values.map(value_name => value_name[0]);
      } else if (data.variable_to_edit.kind === "text") {
        this.selectedType = "Text"
      }
    }
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  variable_types = ["One Choice", "Multiple Choice", "Text", "Number", "Date"];
  selectedType: string = "One Choice"

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.options.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.optionControl.setValue(null);
  }

  remove(option: string): void {
    const index = this.options.indexOf(option);
    if (index >= 0) {
      this.options.splice(index, 1);
    }
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

    if (this.selectedType === "One Choice") {
      // create variableOC by getting relevant data from dialog
      let variableOC: VariableOC = {
        values: this.options,
        id: "",
        kind: "oc",
        textAfter: this.textAfter.trim(),
        textBefore: this.textBefore.trim(),
        value: ""
      };
      this.dialogRef.close(variableOC)
    }

    if (this.selectedType === "Multiple Choice") {
      // create variableOC by getting relevant data from dialog
      let values = [];
      this.options.forEach(option => {
        values.push([option, false]);
      })

      let variableMC: VariableMC = {
        values: values,
        id: "",
        kind: "mc",
        textAfter: this.textAfter.trim(),
        textBefore: this.textBefore.trim(),
      };
      this.dialogRef.close(variableMC)
    }
  }

  onCancel() {
    this.dialogRef.close()
  }
}
