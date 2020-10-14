import {Component, OnInit, SimpleChanges} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Location } from "@angular/common";

import { environment } from "../../environments/environment";
import * as M from "../model";
import * as G from "../generator";
import {DataParserService} from "../dataParser.service";

@Component({
  selector: "app-workspace",
  templateUrl: "./layout1.component.html",
  styleUrls: ["./layout1.component.scss"]
})

export class Layout1Component implements OnInit {

  parts: M.TopLevel[];
  defaultParts: M.TopLevel[];

  categories: M.Category[];
  report: string = "";
  judgement: string = "";

  maxCatLength: number = 6; // TODO: Make configurable

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private dataParser: DataParserService,
              private _location: Location) {
  }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges(change: SimpleChanges){
    console.log(change)
  }

  getData() {
    this.route.paramMap.subscribe(ps => {
      if (ps.get("name")) {
        this.http.post(environment.urlRoot + "get", JSON.stringify(ps.get("name"))).subscribe(
          worked => {
            this.parts = worked as any;
            this.defaultParts = JSON.parse(JSON.stringify(worked))
            this.categories = this.dataParser.parseLayout1(this.parts, this.maxCatLength)
          },
          error => window.alert("An unknown error occurred: " + JSON.stringify(error))
        );
      }
    });
  }

  makeNormal() {
    for (const p of this.parts) {
      if(p.kind === "category") {
        G.makeNormalCategory(p);
      }
    }
    // let input = (document.getElementById('input') as HTMLTextAreaElement).value;
    // this.myText.report = this.inputParser.parseInput(input + " rest normal");
    // this.textOut.colorTextInput(JSON.parse(JSON.stringify(this.diseases)), input );
  }

  //updateText(): void {
  //  // TODO: Datenstruktur anpassen (Categories separat von conditionals, enums, Blöcken etc?)
  //  const [suppressedNormal, suppressedJudgement] = G.getSuppressedConditionalIds(this.rawParts);
  //  const normalExtractor: M.TextExtractor = G.normalExtractor()
  //  const judgementExtractor: M.TextExtractor = G.judgementExtractor();
//
  //  this.report = G.makeText(this.rawParts, normalExtractor, suppressedNormal);
  //  this.judgement = G.makeText(this.rawParts, judgementExtractor, suppressedJudgement);
//
  //  console.log(this.report);
  //  console.log(this.judgement);
  //}

  onClick(){
    // this.updateText();
  }

  onInput(ev) {
    console.log("event");
    console.log(ev);
    const inp = (document.getElementById("input") as HTMLTextAreaElement).value;
    let dif: string;
    console.log("inp", inp);
    console.log("dif", dif);
  }

  reset(){
    this.parts = JSON.parse(JSON.stringify(this.defaultParts));
  }

  refreshPage() {
    window.location.reload();
  }

  pageBack() {
    this._location.back();
  }

  test() {
    console.log(this.parts);
  }

}
