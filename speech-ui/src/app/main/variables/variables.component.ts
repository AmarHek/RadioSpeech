import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Variable} from "../../../helper-classes/model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {InputModalComponent} from "./inputModal/inputModal.component";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {displayableQuotient} from "../../../helper-classes/util";

@Component({
  selector: "app-variables",
  templateUrl: "./variables.component.html",
  styleUrls: ["./variables.component.scss"]
})
export class VariablesComponent implements OnInit {

  @Input() variables: Variable[];
  @Input() parentText: string;
  @Input() parentActive: boolean;

  @Output() clickEvent = new EventEmitter<any>();

  hasButtonBeenClickedOnce: Map<string, boolean> = new Map();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initButtonClickedMap();
  }

  initButtonClickedMap() {
    for (const variable of this.variables) {
      if (variable.kind === "text" || variable.kind === "number" ||
        variable.kind === "date" || variable.kind === "ratio") {
        this.hasButtonBeenClickedOnce[variable.id] = false;
      }
    }
  }

  defaultConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    return dialogConfig;
  }

  parseButtonText(variable: Variable) {
    if (!this.hasButtonBeenClickedOnce[variable.id] || !this.parentActive) {
      return ".....";
    } else if (variable.kind === "text" || variable.kind === "number") {
      return variable.value;
    } else if (variable.kind === "date") {
      return variable.value.day + "." + variable.value.month + "." + variable.value.year;
    } else if (variable.kind === "ratio") {
      return displayableQuotient(variable.numerator,
        variable.denominator, variable.fractionDigits);
    }
  }

  clicked(variable: Variable, value?: string) {
    if (variable.kind === "oc") {
      if (variable.value === value) {
        variable.value = null;
      }
    }
    this.clickEvent.emit();
  }

  async submit(variable: Variable) {
    const response = await this.modalInput(variable);
    if (response) {
      this.hasButtonBeenClickedOnce[variable.id] = true;
      this.clickEvent.emit();
    }
  }

  modalInput(variable: Variable) {
    const dialogConfig = this.defaultConfig();

    dialogConfig.data = {
      kind: variable.kind,
      textBefore: variable.textBefore,
      textAfter: variable.textAfter,
      parentText: this.parentText,
    };
    if (variable.kind === "ratio") {
      dialogConfig.data["denominator"] = variable.denominator;
      dialogConfig.data["numerator"] = variable.numerator;
      dialogConfig.data["fractionDigits"] = variable.fractionDigits;
    } else if (variable.kind === "text" || variable.kind === "number") {
      dialogConfig.data["value"] = variable.value;
    } else if (variable.kind === "date") {
      dialogConfig.data["value"] = variable.value.year.toString() + "-" +
        variable.value.month.toString() + "-" + variable.value.day.toString();
    }

    const dialogRef = this.dialog.open(InputModalComponent, dialogConfig);

    return dialogRef.afterClosed()
      .toPromise()
      .then(response => {
        if (!response) {
          return Promise.resolve(false);
        } else {
          this.assignValues(variable, response);
          return Promise.resolve(true);
        }
      }
    );
  }

  assignValues(variable: Variable, input): void {
    // TODO: check if response is valid
    if (variable.kind === "text") {
        variable.value = input.text;
    } else if (variable.kind === "date") {
      variable.value = (input.date as NgbDateStruct);
    } else if (variable.kind === "number") {
      variable.value = input.number as number;
    } else if (variable.kind === "ratio") {
      variable.numerator = input.numerator as number;
      variable.denominator = input.denominator as number;
    }
  }



}
