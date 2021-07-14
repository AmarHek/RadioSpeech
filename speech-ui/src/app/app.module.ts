import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from "./app.component";
import { UploadComponent } from "./base-components/upload/upload.component";
import { ListComponent } from "./base-components/list/list.component";
import { ReportComponent } from "./main/report/report.component";
import { UiBaseComponent } from "./main/ui-base/ui-base.component";
import { OptionsComponent } from "./main/options/options.component";
import { HeaderComponent } from "./base-components/header/header.component";
import { VariablesComponent } from "./main/variables/variables.component";
import { InputModalComponent } from "./main/variables/inputModal/inputModal.component";
import { ConfirmDialogComponent } from "./base-components/confirm-dialog/confirm-dialog.component";
// import { EditStructureComponent } from "./edit-structure/edit-structure.component";
// import { DiseaseComponent } from "./edit-structure/disease/disease.component";
// import { VariableComponent } from "./edit-structure/variable/variable.component";
// import { AttributeComponent } from "./edit-structure/attribute/attribute.component";
import {DisplayService} from "./services/display.service";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS, AppDateAdapter} from "../helper-classes/format-datepicker";
import { UploadMaterialComponent } from "./material/upload-material/upload-material.component";
import { DisplayMaterialComponent } from "./material/display-material/display-material.component";
import { JudgeMatComponent } from './material/judge-mat/judge-mat.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ListComponent,
    ReportComponent,
    UiBaseComponent,
    OptionsComponent,
    HeaderComponent,
    VariablesComponent,
    InputModalComponent,
    ConfirmDialogComponent,
    UploadMaterialComponent,
    DisplayMaterialComponent,
    JudgeMatComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {path: "list", component: ListComponent},
        {path: "upload", component: UploadComponent},
        {path: "main/:id", component: UiBaseComponent},
        {path: "uploadMat", component: UploadMaterialComponent},
        {path: "displayMat", component: DisplayMaterialComponent},
        {path: "**", redirectTo: "/upload"},
      ],
      {useHash: true, relativeLinkResolution: "legacy"}
    ),
    FontAwesomeModule
  ],
  providers: [DisplayService,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}],
  bootstrap: [AppComponent]
})
export class AppModule { }
