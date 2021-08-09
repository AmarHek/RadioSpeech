import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";

import * as M from "../../../helper-classes/templateModel";
import {DataParserService} from "../../services/dataParser.service";
import {OptionsComponent} from "../options/options.component";
import {BackendCallerService} from "../../services/backend-caller.service";
import {InputParserService} from "../../services/input-parser.service";
import {Subscription} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Template} from "../../../helper-classes/templateModel";

@Component({
  selector: "app-workspace",
  templateUrl: "./ui-base.component.html",
  styleUrls: ["./ui-base.component.scss"],
})

export class UiBaseComponent implements OnInit {

  parts: M.TopLevel[];
  defaultParts: M.TopLevel[];

  input = "";

  categories: M.Category[];
  report = "";
  judgement = "";

  downJson: SafeUrl;

  @ViewChild(OptionsComponent)
  private optionsComponent: OptionsComponent;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private dataParser: DataParserService,
              private _location: Location,
              private inputParser: InputParserService,
              private backendCaller: BackendCallerService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getData();
  }

  // TODO: Fix double loading of template when reloading the page

  getData() {
    this.route.paramMap.subscribe(ps => {
      if (ps.has("id")) {
        const templateID = ps.get("id");
        this.backendCaller.getTemplateById(templateID).subscribe((template: Template) => {
          if (template === undefined) {
            window.alert("Dieses Dictionary existiert nicht! " +
              "Bitte auf List Seite zurückkehren und eines der dort aufgeführten Dictionaries auswählen.");
          } else {
            this.parts = template.parts;
            this.defaultParts = JSON.parse(JSON.stringify(this.parts));
            this.categories = this.dataParser.extractCategories(this.parts, false);
          }
        });
      }
    });
  }

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

}
