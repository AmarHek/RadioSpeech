import {ActivatedRoute} from "@angular/router";
import {Category, CheckBox, Group, Option, Role, Template, User} from "@app/models";
import {Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {ComponentCanDeactivate} from "@app/guards/pending-changes.guard";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {DialogAddGroupComponent} from "@app/shared/dialog-add-group/dialog-add-group.component";
import {
  AuthenticationService,
  BackendCallerService,
  DataParserService,
} from "@app/core";
import {InputMaterialHandlerComponent} from "@app/feature/input-material-handler/input-material-handler.component";
import {DialogAddBoxComponent} from "@app/shared/dialog-add-box/dialog-add-box.component";
import {DialogAddCategoryComponent} from "@app/shared/dialog-add-category/dialog-add-category.component";
import {ReportEditOptionsComponent} from "@app/shared/report-edit-options/report-edit-options.component";
import {ConfirmDialogComponent} from "@app/shared";

@Component({
  selector: "app-report-edit",
  templateUrl: "./report-edit.component.html",
  styleUrls: ["./report-edit.component.scss"],
})

export class ReportEditComponent implements OnInit, ComponentCanDeactivate {

  @ViewChild("chipInput") chipInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild(InputMaterialHandlerComponent) private inputMaterialHandlerComponent: InputMaterialHandlerComponent;
  @ViewChild(ReportEditOptionsComponent) private optionsComponent: ReportEditOptionsComponent;

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

  edit(elementToEdit) {
    if (elementToEdit.kind === "option") {
      this.editGroup(elementToEdit)
    }
    if (elementToEdit.kind === "box") {
      this.editCheckBox(elementToEdit)
    }
  }


  getData() {
    this.route.paramMap.subscribe(ps => {
      if (!ps.has("id")) return;
      const templateID = ps.get("id");
      this.backendCaller.getTemplateById(templateID).subscribe((template: Template) => {
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


  addCategory() {
    let dialogData = {
      categoryNames: this.categories.map(cat => cat.name),
      categoryName: null
    };
    this.dialog.open(DialogAddCategoryComponent, {
      data: dialogData,
      width: '350px',
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      let newCat: Category = {kind: "category", name: result, optional: false, selectables: []};
      this.categories.push(newCat);
      this.optionsComponent.initRows(this.categories)
    });
  }

  renameCategory(name: string) {
    let dialogData = {
      categoryNames: this.categories.map(cat => cat.name),
      categoryName: name
    };
    this.dialog.open(DialogAddCategoryComponent, {
      data: dialogData,
      width: '350px',
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.categories.find(cat => cat.name === name).name = result;
      this.optionsComponent.initRows(this.categories)
    });
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

  editGroup(option: Option) {
    // find corresponding group
    let group = this.categories.find(cat => cat.name === this.selectedCat).selectables.find(sel => sel.name === option.groupID) as Group;
    let dialogData = {
      groupToEdit: JSON.parse(JSON.stringify(group))
    };
    this.dialog.open(DialogAddGroupComponent, {
      width: '630px',
      data: dialogData
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      // replace group with edited result
      let category = this.categories.find(cat => cat.name === this.selectedCat);
      let index = category.selectables.findIndex(sel => sel.name === group.name);
      category.selectables[index] = result;
      this.optionsComponent.initRows(this.categories)
    });

  }

  removeElement(elementToRemove) {
    let message = `Soll die Checkbox "${elementToRemove.name}" wirklich gelöscht werden?`
    if (elementToRemove.kind == "option") {
      // get all option names of this group:
      let group = this.categories.find(cat => cat.name === this.selectedCat).selectables.find(sel => sel.name === elementToRemove.groupID) as Group;
      let optionNames = group.options.map(opt => opt.name);
      //concatenate them in a stirng
      let optionNamesString = optionNames.join(", ");
      // Use template literals for multi-line string
      message = `Soll die gesamte Gruppe (${optionNamesString}) wirklich gelöscht werden? Um einzelne Optionen zu löschen, bearbeiten Sie die Gruppe.`;
    }

    this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        type: "warning",
        title: "Löschen bestätigen",
        message: message
      }
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      if (result === true) {
        let category = this.categories.find(cat => cat.name === this.selectedCat);
        let index = category.selectables.findIndex(sel => sel.name === elementToRemove.name);
        category.selectables.splice(index, 1);
        this.optionsComponent.initRows(this.categories)
      }
    });
  }

  addCheckBox() {
    this.dialog.open(DialogAddBoxComponent, {
      width: '630px',
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      let box: CheckBox = result as CheckBox
      this.categories.find(cat => cat.name === this.selectedCat).selectables.push(box);
      this.optionsComponent.initRows(this.categories)
    });
  }

  editCheckBox(boxToEdit: CheckBox) {
    let dialogData = {
      boxToEdit: JSON.parse(JSON.stringify(boxToEdit))
    };
    this.dialog.open(DialogAddBoxComponent, {
      width: '630px',
      data: dialogData
    }).afterClosed().subscribe(result => {
      if (result === undefined) return;
      // replace box with edited result
      let category = this.categories.find(cat => cat.name === this.selectedCat);
      let index = category.selectables.findIndex(box => box.name === boxToEdit.name);
      category.selectables[index] = result;
      this.optionsComponent.initRows(this.categories)
    });
  }


}
