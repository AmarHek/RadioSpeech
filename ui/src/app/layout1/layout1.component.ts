import {Component, OnInit, SimpleChanges} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import * as M from "../model";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {InputParserService} from "../input-parser.service";
import {TextOutputService} from "../text-output.service";
import {DataParserService} from "../dataParser.service";
import {makeNormalCategory} from "../generator";
import {OptionsComponent} from "../options/options.component";
import {Observable} from "rxjs";
// import {DisplayService} from "../display.service";

@Component({
  selector: "app-workspace",
  templateUrl: "./layout1.component.html",
  styleUrls: ["./layout1.component.scss"]
})

export class Layout1Component implements OnInit {

  rawParts: M.TopLevel[] = [];
  parts: M.Category[] = [];
  report: string = "";
  judgement: string = "";

  constructor(private dateParser: NgbDateParserFormatter, private http: HttpClient,
              private route: ActivatedRoute,
              private dataParser: DataParserService,
              private inputParser: InputParserService,
              private textOut: TextOutputService) {
  }

  ngOnInit(): void {
    this.getTopLevel();
    console.log(this.parts);
  }

  // TODO: Maybe add inputParser and update keywords here from parts or rawParts or something
  getTopLevel(): void {
    this.route.paramMap.subscribe(ps => {
      if (ps.get("name")) {
        this.http.post(environment.urlRoot + "get", JSON.stringify(ps.get("name"))).subscribe(
          worked => {
            this.rawParts = worked as any;
            // TODO: Remove this once backend is updated to include "optional" value
            this.parts = this.dataParser.parseRawPartsLayout1(worked as M.TopLevel[]);
          },
          error => window.alert("An unknown error occurred: " + JSON.stringify(error))
        );
      }
    });
  }

  updateText() {
    // console.log("update");
    //this.report = "It worked";
    //this.judgement = "But did it really?";
  }

  onClick(event: any){
    this.updateText();
  }

  reset(){
    this.parts = JSON.parse(JSON.stringify(this.dataParser.defaultParts));
    console.log(this.parts);
  }

  test() {
    this.dataParser.defaultParts[0].selectables[0].value = "Thorax p.a.";
  }

  ngDoCheck(): void {
    this.updateText();
  }

  onInput(ev) {
    console.log("event");
    console.log(ev);
    const inp = (document.getElementById("input") as HTMLTextAreaElement).value;
    let dif: string;
    console.log("inp", inp);
    console.log("dif", dif);
  }

  refreshPage() {
    window.location.reload();
  }

  makeNormal() {
    for (const category of this.parts) {
      makeNormalCategory(category);
    }
    console.log(this.parts);
    // let input = (document.getElementById('input') as HTMLTextAreaElement).value;
    // this.myText.report = this.inputParser.parseInput(input + " rest normal");
    // this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), input );
  }

}
