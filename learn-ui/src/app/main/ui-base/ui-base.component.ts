import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";

import {environment} from "../../../environments/environment";
import * as M from "../../../helper-classes/model";
import {DataParserService} from "../../services/dataParser.service";
import {OptionsComponent} from "../options/options.component";
import {TemplateManager} from "../../services/template-manager.service";
import {InputParserRadioService} from "../../services/input-parser-radio.service";
import {Subscription} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: "app-workspace",
  templateUrl: "./ui-base.component.html",
  styleUrls: ["./ui-base.component.scss"],
})

export class UiBaseComponent implements OnInit, OnDestroy {

  parts: M.TopLevel[];
  defaultParts: M.TopLevel[];

  input = "";

  categories: M.Category[];
  report = "";
  judgement = "";

  downJson: SafeUrl;

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
              private templateManager: TemplateManager,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    this.textSub.unsubscribe();
  }

  // TODO: Fix double loading of template when reloading the page

  getData() {
    this.route.paramMap.subscribe(ps => {
      if (ps.has("id")) {
        this.routeName = ps.get("id");
        this.templateManager.getList();
        this.textSub = this.templateManager.getListUpdateListener()
        .subscribe((list: any) => {
          console.log("sub");
          const template = list.find((d) => d.id === this.routeName);
          if (template === undefined) {
            window.alert("Dieses Dictionary existiert nicht! " +
              "Bitte auf List Seite zurückkehren und eines der dort aufgeführten Dictionaries auswählen.");
          } else if (!this.parts) {
            this.parts = template.parts;
            this.defaultParts = JSON.parse(JSON.stringify(this.parts));
            this.categories = this.dataParser.extractCategories(this.parts, false);
          }
        });
      }
    });
  }

  /*
  getData() {
    this.route.paramMap.subscribe(ps => {
      if (ps.get("name")) {
        this.http.post(environment.urlRootScala + "get", JSON.stringify(ps.get("name"))).subscribe(
          worked => {
            this.parts = this.dataParser.convertModel(worked as any, true);
            this.defaultParts = JSON.parse(JSON.stringify(this.parts));
            this.categories = this.dataParser.extractCategories(this.parts, false);
            this.inputParser.init(this.parts);
            console.log(this.parts);
            this.generateDownloadJson(this.parts);
          },
          error => window.alert("An unknown error occurred: " + JSON.stringify(error))
        );
      }
    });
  }*/

  generateDownloadJson(jsonData) {
    const json = JSON.stringify(jsonData);
    this.downJson = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));
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
    const [split_input, split_reduced_input] = this.inputParser.split_input_from_keywords(this.input);
    console.log(split_input);
    console.log(split_reduced_input);
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