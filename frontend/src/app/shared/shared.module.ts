import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ConfirmDialogComponent} from "@app/shared/confirm-dialog/confirm-dialog.component";
import {InputModalComponent} from "@app/shared/inputModal/inputModal.component";
import {OptionsComponent} from "@app/shared/options/options.component";
import {ReportComponent} from "@app/shared/report/report.component";
import {UploadMaterialComponent} from "@app/shared/upload-material/upload-material.component";
import {UploadComponent} from "@app/shared/upload/upload.component";
import {VariablesComponent} from "@app/shared/variables/variables.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ChangeUsernameComponent} from "./change-username/change-username.component";
import {FeedbackDialogComponent} from "./feedback-dialog/feedback-dialog.component";
import {ImageDisplayStudentComponent} from "./image-display-student/image-display-student.component";
import {ImageDisplayComponent} from "./image-display/image-display.component";
import {InputDialogComponent} from "./input-dialog/input-dialog.component";
import {RadiolearnErrorsComponent} from "./radiolearn-errors/radiolearn-errors.component";
import {RadiolearnOptionsComponent} from "./radiolearn-options/radiolearn-options.component";
import {SignUpComponent} from "./sign-up/sign-up.component";


@NgModule({
  declarations: [
    ChangePasswordComponent,
    ChangeUsernameComponent,
    ConfirmDialogComponent,
    FeedbackDialogComponent,
    ImageDisplayComponent,
    ImageDisplayStudentComponent,
    InputDialogComponent,
    InputModalComponent,
    OptionsComponent,
    RadiolearnErrorsComponent,
    RadiolearnOptionsComponent,
    ReportComponent,
    SignUpComponent,
    UploadComponent,
    UploadMaterialComponent,
    VariablesComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    ChangePasswordComponent,
    ChangeUsernameComponent,
    ConfirmDialogComponent,
    FeedbackDialogComponent,
    ImageDisplayComponent,
    ImageDisplayStudentComponent,
    InputDialogComponent,
    InputModalComponent,
    OptionsComponent,
    RadiolearnErrorsComponent,
    RadiolearnOptionsComponent,
    ReportComponent,
    SignUpComponent,
    UploadComponent,
    UploadMaterialComponent,
    VariablesComponent
  ]
})
export class SharedModule { }
