import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Variable} from '../model';

declare const $: any;

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {

  @Input() variables: Variable[];
  @Output() clickEvent = new EventEmitter<any>()

  selectedVariable: Variable;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: any) {
    console.log(this.clickEvent.emit());
  }

  openModalView(variable: Variable) {
    this.selectedVariable = variable;
    setTimeout(() => $('#variableDialog').modal('show'), 1);
  }

}
