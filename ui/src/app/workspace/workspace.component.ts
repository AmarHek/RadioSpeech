import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as M from '../model'
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {InputParserService} from "../input-parser.service";
import {TextOutputService} from "../text-output.service";
import {DataBuilderService} from "../data-builder.service";
import {Disease} from "../text/Keyword";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})

export class WorkspaceComponent implements OnInit {

  rawParts: M.TopLevel[] = [];
  parts: Array<any> = [];

  constructor(private dateParser: NgbDateParserFormatter, private http: HttpClient,
              private route: ActivatedRoute,
              private dataBuilder: DataBuilderService,
              private inputParser: InputParserService,
              private textOut: TextOutputService) {
  }

  ngOnInit(): void {
    this.getTopLevel();
    // this.dataBuilder.generateDataDict(this.rawParts);
    // this.inputParser.createStartDict(this.parts);
  }

  getTopLevel(){
    this.route.paramMap.subscribe(ps => {
      if (ps.get('name')) {
        this.http.post(environment.urlRoot + 'get', JSON.stringify(ps.get('name'))).subscribe(
          worked => {
            this.rawParts = worked as any;
            // TODO: Remove this once backend is updated to include "optional" value
            this.parts = this.dataBuilder.parseRawParts(this.rawParts);
          },
          error => window.alert("An unknown error occured: " + JSON.stringify(error))
        );
      }
    });
  }

  test(){
    console.log(this.parts);
  }

  onInput(ev) {
    console.log("event");
    console.log(ev);
    let inp = (document.getElementById('input') as HTMLTextAreaElement).value;
    let dif: string;
    console.log("inp", inp);
    console.log("dif", dif);
  }

  refreshPage() {
    window.location.reload();
  }

  makeNormal(){
    for(let el in this.parts){

    }
    // let input = (document.getElementById('input') as HTMLTextAreaElement).value;
    // this.myText.report = this.inputParser.parseInput(input + " rest normal");
    // this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), input );
  }

}
