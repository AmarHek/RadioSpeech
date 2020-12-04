import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Variable, Selectable} from '../model';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {

  @Input() variables: Variable[];
  @Input() parentText: string;

  @Output() clickEvent = new EventEmitter<any>()

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  defaultConfig(): MatDialogConfig {
    // TODO: Auf Service auslagern

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    return dialogConfig;
  }

  parseButtonText(value) {
    if (typeof value === "string" || typeof value === "number") {
      return value
    } else {
      return "test"
    }
  }

  submit(variable: Variable) {
    if(variable.kind !== "oc" && variable.kind !== "mc") {
      this.modalInput(variable);
    }
    this.clickEvent.emit();
  }

  modalInput(variable: Variable) {
    const dialogConfig = this.defaultConfig();

    dialogConfig.data = {
      kind: variable.kind,
      textBefore: variable.textBefore,
      textAfter: variable.textAfter,
      parentText: this.parentText
    }
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.assignValues(variable, data)
    );
  }

  assignValues(variable: Variable, input: any): void {
    if(input !== undefined) {
      if (variable.kind === "ratio") {
        variable.numerator = input.numerator;
        variable.denominator = input.denominator;
      } else if(variable.kind === "date" || variable.kind === "number" || variable.kind === "text"){
        variable.value = input.value;
      }
    }
  }

}
