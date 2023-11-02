import {ActivatedRoute} from "@angular/router";
import {Category, Role, Template, User} from "@app/models";
import {Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {ComponentCanDeactivate} from "@app/guards/pending-changes.guard";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {ReportOptionsComponent} from "@app/shared";
import {
  AuthenticationService,
  BackendCallerService,
  DataParserService,
} from "@app/core";
import {InputMaterialHandlerComponent} from "@app/feature/input-material-handler/input-material-handler.component";

@Component({
  selector: "app-report-edit",
  templateUrl: "./report-edit.component.html",
  styleUrls: ["./report-edit.component.scss"],
})

export class ReportEditComponent implements OnInit, ComponentCanDeactivate {

  @ViewChild("chipInput") chipInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild(InputMaterialHandlerComponent) private inputMaterialHandlerComponent: InputMaterialHandlerComponent;
  @ViewChild(ReportOptionsComponent) private optionsComponent: ReportOptionsComponent;

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.sessionData.length <= this.savedSessionData;
  }

  // UI related
  selectedCat = "undefined";
  selectedSelectableID = "";

  // Model
  categories: Category[];
  defaultCategories: Category[];

  //Data collection
  template: Template = undefined;
  sessionData = [];
  savedSessionData = 0;

  private user: User;

  get isTester() {
    return this.user && (this.user.role === Role.Admin || this.user.role === Role.tester);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  constructor(private route: ActivatedRoute,
              private dataParser: DataParserService,
              private backendCaller: BackendCallerService,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService
  ) {
  }

  // INITIALIZATION
  ngOnInit() {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.getData();
  }

  // gets parts from node server via id in url
  getData() {
    this.route.paramMap.subscribe(ps => {
      console.log("subscribing")
      if (!ps.has("id")) return;
      const templateID = ps.get("id");
      console.log("template id is " + templateID);
      this.backendCaller.getTemplateById(templateID).subscribe((template: Template) => {
        console.log("got template from backend")
        if (template === undefined) {
          window.alert("Dieses Dictionary existiert nicht! " +
            "Bitte auf List Seite zurückkehren und eines der dort aufgeführten Dictionaries auswählen.");
          return;
        }
        // prepare data
        this.template = template;
        this.categories = this.dataParser.extractCategories(template.parts);
        this.defaultCategories = JSON.parse(JSON.stringify(this.categories));
        // prepare UI
        this.selectedCat = this.categories[0].name;
      });
    });
  }

  // DATA
  onCategorySelected(cat: string) {
    this.selectedCat = cat;
    this.selectedSelectableID = "";
  }

  // resets categories, and re-initializes the options rows, with the new array reference
  resetMaterial() {
    this.categories = JSON.parse(JSON.stringify(this.defaultCategories));
    setTimeout(() => this.optionsComponent.initRows(this.categories), 5);
  }

  moveCatUp(name){
    let index = this.categories.findIndex(cat => cat.name === name);
    if(index > 0){
      let temp = this.categories[index];
      this.categories[index] = this.categories[index-1];
      this.categories[index-1] = temp;
    }
  }

  moveCatDown(name){
    let index = this.categories.findIndex(cat => cat.name === name);
    if(index < this.categories.length-1){
      let temp = this.categories[index];
      this.categories[index] = this.categories[index+1];
      this.categories[index+1] = temp;
    }
  }

  removeCat(name){
    let index = this.categories.findIndex(cat => cat.name === name);
    this.categories.splice(index, 1);
  }
}
