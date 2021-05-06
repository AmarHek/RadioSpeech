import {Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Location } from "@angular/common";
import { ViewChild } from "@angular/core";

import { environment } from "../../environments/environment";
import * as M from "../../helper-classes/radio_model";
import {DataParserService} from "../services/dataParser.service";
import {OptionsComponent} from "../options/options.component";
import { DictManagerService } from "../services/dict-manager.service";
import { InputParserRadioService } from "../services/input-parser-radio.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-workspace",
  templateUrl: "./radiology.component.html",
  styleUrls: ["./radiology.component.scss"],
})

export class RadiologyComponent implements OnInit, OnDestroy {

  parts: M.TopLevel[];
  defaultParts: M.TopLevel[];

  input = "";

  categories: M.Category[];
  report = "";
  judgement = "";

  // for node server
  private textSub: Subscription;
  routeName: string;

  @ViewChild(OptionsComponent)
  private optionsComponent: OptionsComponent;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private dataParser: DataParserService,
              private _location: Location,
              private inputParser: InputParserRadioService,
              private dictManager: DictManagerService) {
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    // this.textSub.unsubscribe();
  }

  // for migration to nodejs server
  getDataNode() {
    this.route.paramMap.subscribe(ps => {
      if (ps.has("name")) {
        this.routeName = ps.get("name");
        this.dictManager.getList();
        this.textSub = this.dictManager.getListUpdateListener()
        .subscribe((list: any) => {
          this.parts = list.find((d) => d.name === this.routeName);
          if (this.parts === undefined) {
            window.alert("Dieses Dictionary existiert nicht! Bitte auf List Seite zurückkehren und eines der dort aufgeführten Dictionaries auswählen.");
          } else {
            this.defaultParts = JSON.parse(JSON.stringify(this.parts));
          }
        });
      }
    });
  }

  getData() {
    this.route.paramMap.subscribe(ps => {
      if (ps.get("name")) {
        this.http.post(environment.urlRootRadio + "get", JSON.stringify(ps.get("name"))).subscribe(
          worked => {
            this.parts = this.dataParser.convertModel(worked as any, true);
            this.defaultParts = JSON.parse(JSON.stringify(this.parts));
            this.categories = this.dataParser.extractCategories(this.parts, false);
            this.inputParser.init(this.parts);
          },
          error => window.alert("An unknown error occurred: " + JSON.stringify(error))
        );
      }
    });
  }

  updateText(): void {
    [this.report, this.judgement] = this.dataParser.makeText(this.parts);
  }

  resetText(): void {
    this.report = "";
    this.judgement = "";
  }

  onClick() {
    setTimeout(() => this.updateText(), 1);
  }

  onInput(ev) {
    if (this.input[this.input.length - 1] === " ") {
      this.input = this.inputParser.autocorrect(this.input);
    }
    this.inputParser.findKeywords(this.input);
  }

  makeNormal() {
    this.dataParser.makeNormal(this.parts);
    this.updateText();
  }

  reset() {
    this.parts = JSON.parse(JSON.stringify(this.defaultParts));
    this.categories = this.dataParser.extractCategories(this.parts, false);
    setTimeout(() => this.optionsComponent.initRows(), 5);
    setTimeout(() => this.resetText(), 5);
  }

  refreshPage() {
    window.location.reload();
  }

  pageBack() {
    this._location.back();
  }

}
