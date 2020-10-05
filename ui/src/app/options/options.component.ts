import {Component, Input, OnInit} from '@angular/core';
import * as M from '../model';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss', '../workspace/workspace.component.scss']
})
export class OptionsComponent implements OnInit {

  @Input() parts: M.TopLevel[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.parts);
  }

  displayParts(){
    console.log(this.parts)
  }


}
