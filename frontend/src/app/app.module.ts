import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";

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
import { DisplayService } from "./services/display.service";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { APP_DATE_FORMATS, AppDateAdapter } from "./helpers/format-datepicker";
import { UploadMaterialComponent } from "./material/upload-material/upload-material.component";
import { ListMaterialComponent } from "./material/list-material/list-material.component";
import { JudgeMatComponent } from "./material/judge-mat/judge-mat.component";
import { ImageDisplayComponent } from "./material/image-display/image-display.component";
import { PopoutService } from "./services/popout.service";
import { LoginComponent } from "./base-components/login/login.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatTooltipModule } from "@angular/material/tooltip";
import { fakeBackendProvider } from "./helpers/fake-backend";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import {AppRoutingModule} from "./app-routing.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";
// import { EditStructureComponent } from "./edit-structure/edit-structure.component";
// import { DiseaseComponent } from "./edit-structure/disease/disease.component";
// import { VariableComponent } from "./edit-structure/variable/variable.component";
// import { AttributeComponent } from "./edit-structure/attribute/attribute.component";

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
    ListMaterialComponent,
    JudgeMatComponent,
    ImageDisplayComponent,
    LoginComponent,
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
        AppRoutingModule,
        FontAwesomeModule,
        CommonModule,
        MatRadioModule,
        MatTooltipModule,
        MatProgressBarModule
    ],
  providers: [DisplayService, PopoutService,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
