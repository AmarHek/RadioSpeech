import {ActivatedRoute} from "@angular/router";
import {Category, CheckBox, Group, Role, Template, User} from "@app/models";
import {Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {ComponentCanDeactivate} from "@app/guards/pending-changes.guard";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {ReportOptionsComponent} from "@app/shared";
import {DialogAddGroupComponent} from "@app/shared/dialog-add-group/dialog-add-group.component";
import {
  AuthenticationService,
  BackendCallerService,
  DataParserService,
} from "@app/core";
import {InputMaterialHandlerComponent} from "@app/feature/input-material-handler/input-material-handler.component";
import {DialogAddBoxComponent} from "@app/shared/dialog-add-box/dialog-add-box.component";

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
        console.log(this.categories)
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


  addCategory() {
    let name = window.prompt("Name der neuen Kategorie:");
    if (name === null || name === "") return;
    // only add if name is unique
    if (this.categories.find(cat => cat.name === name) !== undefined) {
      window.alert("Kategorie mit diesem Namen existiert bereits!");
      return;
    }
    let newCat: Category = {kind: "category", name: name, optional: false, selectables: []};
    this.categories.push(newCat);
  }

  moveCategoryUp(name: string) {
    let index = this.categories.findIndex(cat => cat.name === name);
    if (index > 0) {
      let temp = this.categories[index];
      this.categories[index] = this.categories[index - 1];
      this.categories[index - 1] = temp;
    }
  }

  moveCategoryDown(name: string) {
    let index = this.categories.findIndex(cat => cat.name === name);
    if (index < this.categories.length - 1) {
      let temp = this.categories[index];
      this.categories[index] = this.categories[index + 1];
      this.categories[index + 1] = temp;
    }
  }

  removeCategory(name) {
    let index = this.categories.findIndex(cat => cat.name === name);
    this.categories.splice(index, 1);
  }

  editCategory(name) {
    let newName = window.prompt("Neuer Name der Kategorie:");
    if (newName === null || newName === "") return;
    // only add if name is unique
    if (this.categories.find(cat => cat.name === newName) !== undefined) {
      window.alert("Kategorie mit diesem Namen existiert bereits!");
      return;
    }
    this.categories.find(cat => cat.name === name).name = newName;
    this.optionsComponent.initRows(this.categories)
  }

  addGroup() {
    this.dialog.open(DialogAddGroupComponent, {
      width: '630px',
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      // todo fix name
      let group: Group = result as Group
      this.categories.find(cat => cat.name === this.selectedCat).selectables.push(group);
      this.optionsComponent.initRows(this.categories)
    });
  }

  addCheckBox() {
    this.dialog.open(DialogAddBoxComponent, {
      width: '500px',
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      const checkbox: CheckBox = {
        keys: [],
        normal: false,
        text: "",
        value: false,
        variables: [],
        kind: "box",
        name: result
      };
      this.categories.find(cat => cat.name === this.selectedCat).selectables.push(checkbox);
      this.optionsComponent.initRows(this.categories)
    });
  }


}
