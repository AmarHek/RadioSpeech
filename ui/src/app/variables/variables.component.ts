import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Variable, Selectable} from '../model';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";

declare const $: any;

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {

  @Input() variables: Variable[];
  @Input() parent: Selectable;
  @Output() clickEvent = new EventEmitter<any>()

  selectedVariable: Variable; // = {kind: "oc", id: "test", textBefore: "", textAfter: "", data: {}, values: []};

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick(event: any) {
    console.log(this.clickEvent.emit());
  }

  openModalView(variable: Variable) {
    this.selectedVariable = variable;
    console.log(this.selectedVariable);
    setTimeout(() => $('#variableDialog').modal('show'), 10);
  }

  openDialog(variable: Variable) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ModalComponent, dialogConfig);
  }

}
