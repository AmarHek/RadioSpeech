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
import { GastroComponent } from "./gastro/gastro.component";
import { UploadComponent } from "./upload/upload.component";
import { ListComponent } from "./list/list.component";
import { SortCategoriesPipe } from "./pipes/sort-categories.pipe";
import { ReportComponent } from "./report/report.component";
import { RadiologyComponent } from "./radiology/radiology.component";
import { OptionsComponent } from "./options/options.component";
import { HeaderComponent } from "./header/header.component";
import { VariablesComponent } from "./variables/variables.component";
import { InputModalComponent } from './variables/inputModal/inputModal.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditStructureComponent } from './edit-structure/edit-structure.component';

@NgModule({
  declarations: [
    AppComponent,
    GastroComponent,
    UploadComponent,
    ListComponent,
    SortCategoriesPipe,
    ReportComponent,
    RadiologyComponent,
    OptionsComponent,
    HeaderComponent,
    VariablesComponent,
    InputModalComponent,
    ConfirmDialogComponent,
    EditStructureComponent
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
        { path: 'radio/:name', component: RadiologyComponent},
        { path: 'gastro/:name', component: GastroComponent   },
        { path: 'upload',     component: UploadComponent },
        { path: 'list',       component: ListComponent   },
        { path: 'edit/:name', component: EditStructureComponent},
        { path: '**', redirectTo: '/upload' },
      ],
      { useHash: true, relativeLinkResolution: 'legacy' }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
