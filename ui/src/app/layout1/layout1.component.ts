import {Component, OnInit, SimpleChanges} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Location } from "@angular/common";
import { ViewChild } from "@angular/core";

import { environment } from "../../environments/environment";
import * as M from "../model";
import * as G from "../generator";
import {DataParserService} from "../dataParser.service";
import {OptionsComponent} from "../options/options.component";

@Component({
  selector: "app-workspace",
  templateUrl: "./layout1.component.html",
  styleUrls: ["./layout1.component.scss"],
})

export class Layout1Component implements OnInit {

  parts: M.TopLevel[];
  defaultParts: M.TopLevel[];

  categories: M.Category[];
  report: string = "";
  judgement: string = "";

  @ViewChild(OptionsComponent)
  private optionsComponent: OptionsComponent;

  splitCategories: boolean = false;
  maxCatLength: number = 50; // TODO: Make configurable

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
            this.categories = this.dataParser.extractCategories(this.parts)
          },
          error => window.alert("An unknown error occurred: " + JSON.stringify(error))
        );
      }
    });
  }

  updateText(): void {
    [this.report, this.judgement] = this.dataParser.makeText(this.parts);
  }

  onClick(){
    setTimeout(() => this.updateText(), 1);
  }

  onInput(ev) {
    console.log("event");
    console.log(ev);
    const inp = (document.getElementById("input") as HTMLTextAreaElement).value;
    let dif: string;
    console.log("inp", inp);
    console.log("dif", dif);
  }

  makeNormal() {
    for (const p of this.parts) {
      if(p.kind === "category") {
        G.makeNormalCategory(p);
      }
    }
    setTimeout(() => this.optionsComponent.initButtons(), 1);
    this.updateText();
  }

  reset(){
    this.parts = JSON.parse(JSON.stringify(this.defaultParts));
    setTimeout(() => this.optionsComponent.initButtons(), 1);
  }

  refreshPage() {
    window.location.reload();
  }

  pageBack() {
    this._location.back();
  }

  test() {
    console.log(this.parts);
    console.log(this.optionsComponent.rows);
    console.log(this.optionsComponent.groupValues.get("CG0"));
    console.log(this.optionsComponent.groupValues);
  }

}
