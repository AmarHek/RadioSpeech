import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {

  @Input() variables;

  constructor() { }

  ngOnInit(): void {
  }

  selected() {

  }



}
