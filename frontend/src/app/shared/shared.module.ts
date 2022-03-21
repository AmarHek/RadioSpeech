import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ChangeUsernameComponent } from "./change-username/change-username.component";
import { ConfirmDialogComponent } from "@app/shared/confirm-dialog/confirm-dialog.component";
import { FeedbackDialogComponent } from "./feedback-dialog/feedback-dialog.component";
import { InputDialogComponent } from "./input-dialog/input-dialog.component";
import { ImageDisplayComponent } from "./image-display/image-display.component";
import { ImageDisplayStudentComponent } from "./image-display-student/image-display-student.component";
import { InputModalComponent } from "@app/shared/inputModal/inputModal.component";
import { OptionsComponent } from "@app/shared/options/options.component";
import { RadiolearnErrorsComponent } from "./radiolearn-errors/radiolearn-errors.component";
import { RadiolearnOptionsComponent } from "./radiolearn-options/radiolearn-options.component";
import { ReportComponent } from "@app/shared/report/report.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { UploadComponent } from "@app/shared/upload/upload.component";
import { UploadMaterialComponent } from "@app/shared/upload-material/upload-material.component";
import { VariablesComponent } from "@app/shared/variables/variables.component";


@NgModule({
  declarations: [
    ChangeUsernameComponent,
    ChangePasswordComponent,
    ConfirmDialogComponent,
    FeedbackDialogComponent,
    InputDialogComponent,
    ImageDisplayComponent,
    ImageDisplayStudentComponent,
    InputModalComponent,
    OptionsComponent,
    RadiolearnOptionsComponent,
    RadiolearnErrorsComponent,
    ReportComponent,
    SignUpComponent,
    UploadComponent,
    UploadMaterialComponent,
    VariablesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    MatProgressBarModule,
    NgbModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule
  ],
  exports: [
    ChangeUsernameComponent,
    ChangePasswordComponent,
    ConfirmDialogComponent,
    FeedbackDialogComponent,
    InputDialogComponent,
    ImageDisplayComponent,
    ImageDisplayStudentComponent,
    InputModalComponent,
    OptionsComponent,
    RadiolearnOptionsComponent,
    RadiolearnErrorsComponent,
    ReportComponent,
    SignUpComponent,
    UploadComponent,
    UploadMaterialComponent,
    VariablesComponent
  ]
})
export class SharedModule { }
