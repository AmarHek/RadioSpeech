import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

import {DataParserService, BackendCallerService, InputParserService, AuthenticationService} from "@app/core";
import {OptionsComponent} from "@app/shared";
import {Template, Category, TopLevel, User, Role, Variable, ColoredText} from "@app/models";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";

interface Layout{
  id: number;
  displayName: string;
}

@Component({
  selector: "app-workspace",
  templateUrl: "./ui-base.component.html",
  styleUrls: ["./ui-base.component.scss"],
})

export class UiBaseComponent implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  values: string[] = [];
  selectedCat: string = "";

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;


  @ViewChild(OptionsComponent)
  private optionsComponent: OptionsComponent;

  layouts: Layout[] = [
    {id: 0, displayName: "Default Layout"},
    {id: 1, displayName: "Expand Categories"}
  ]

  currentLayout = this.layouts[0];

  parts: TopLevel[];
  defaultParts: TopLevel[];

  input = "";
  foundKeywords: ColoredText[] = [];

  categories: Category[];
  report = "";
  judgement = "";

  downJson: SafeUrl;

  user: User;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private dataParser: DataParserService,
              private _location: Location,
              public inputParser: InputParserService,
              private backendCaller: BackendCallerService,
              private sanitizer: DomSanitizer,
              private authenticationService: AuthenticationService) {
  }

  get isModerator() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.Moderator);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add new value
    if (value) {
      this.values.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: string): void {
    const index = this.values.indexOf(fruit);

    if (index >= 0) {
      this.values.splice(index, 1);
    }
  }

  onSelected(cat: string){
    this.selectedCat = cat;
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.getData();
  }

  layoutChanged(newLayout: Layout){
    this.currentLayout = newLayout;
  }

  // gets parts from node server via id in url
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

  // auxiliary function to get parsed json (mostly because of missing excel parser in node)
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
    if(ev.inputType === "deleteContentBackward") {
      this.reset();
    }
    if (this.input[this.input.length - 1] === " ") {
      this.input = this.inputParser.autocorrect(this.input);
    }
    this.inputParser.parseInput(this.input);
    this.assignValues();
    this.foundKeywords = this.inputParser.getColoredText(this.input);
    setTimeout(() => this.updateText(), 5);
  }

  // Assigns all found keywords in inputParser to this.parts
  assignValues() {
    for (const key of this.inputParser.foundClickables) {
      if (key.name === "Rest normal") {
        this.makeNormal();
      } else {
        const foundVariables = this.inputParser.foundVariables.get(key.category + " " + key.name);
        const cat = this.categories.find(c =>
          c.name === key.category
        );
        const sel = cat.selectables.find(s =>
          s.name === key.name || s.name === key.group
        );
        let variables: Variable[];
        if (sel.kind === "box") {
          sel.value = true;
          variables = sel.variables;
        } else {
          sel.value = key.name;
          const option = sel.options.find(o => o.name === key.name);
          variables = option.variables;
        }
        // assign variable values
        if (variables.length > 0 && foundVariables !== undefined) {
          for (const varKey of foundVariables) {
            const vari = variables.find(v => v.id === varKey.id);
            if (vari.kind === "oc") {
              vari.value = varKey.name;
            } else if (vari.kind === "mc") {
              const val = vari.values.find(v => v[0] === varKey.name);
              val[1] = true;
            } else if (varKey.value !== undefined) {
              if (vari.kind === "ratio") {
                vari.numerator = varKey.value[0] as number;
                vari.denominator = varKey.value[1] as number;
              } else if (vari.kind === "text") {
                vari.value = varKey.value as string;
              } else if (vari.kind === "number") {
                vari.value = varKey.value as number;
              } else {
                vari.value = varKey.value as NgbDateStruct;
              }
            }
          }
        }
      }
    }
  }

  makeNormal() {
    this.dataParser.makeNormal(this.parts);
    this.updateText();
  }

  // for when the radiologist finishes: empty parts and input
  // Will not be necessary once the input is streamed
  next() {
    this.reset();
    this.input = "";
  }

  reset() {
    this.parts = JSON.parse(JSON.stringify(this.defaultParts));
    this.categories = this.dataParser.extractCategories(this.parts, false);
    setTimeout(() => this.optionsComponent.initRows(), 1);
    setTimeout(() => this.resetText(), 1);
  }

}
