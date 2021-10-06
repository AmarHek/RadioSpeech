import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

import {DataParserService, BackendCallerService, InputParserService} from "@app/core";
import {OptionsComponent} from "@app/shared";
import {Template, Category, TopLevel} from "@app/models";

@Component({
  selector: "app-workspace",
  templateUrl: "./ui-base.component.html",
  styleUrls: ["./ui-base.component.scss"],
})

export class UiBaseComponent implements OnInit {

  @ViewChild(OptionsComponent)
  private optionsComponent: OptionsComponent;

  parts: TopLevel[];
  defaultParts: TopLevel[];

  input = "";
  foundKeywords = "";

  categories: Category[];
  report = "";
  judgement = "";

  downJson: SafeUrl;

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
    this.foundKeywords = "Detected keywords go here";
  }

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
            this.inputParser.init(this.defaultParts);
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
    const [splitInput, splitReducedInput] = this.inputParser.splitInputFromKeywords(this.input);
    console.log(splitInput);
    console.log(splitReducedInput);
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
