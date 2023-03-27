import {Component, Input, OnInit} from '@angular/core';
import * as M from "@app/models/templateModel";
import {Material} from "@app/models";

@Component({
  selector: 'app-radiolearn-options-shallow',
  templateUrl: './radiolearn-options-shallow.component.html',
  styleUrls: ['./radiolearn-options-shallow.component.css']
})
export class RadiolearnOptionsShallowComponent implements OnInit {

  @Input() material: Material;
  @Input() userMode: boolean;
  @Input() shallowCategories: M.Category[];
  @Input() deepCategories: M.Category[];
  @Input() selectedSelectableID: string;

  constructor() { }

  updateFromParent(selectable){
    // todo: forward to data parser
    return
  }

  updateFromVariable(selectable){
    // todo: forward to data parser
    return
  }

  ngOnInit(): void {
  }

}
