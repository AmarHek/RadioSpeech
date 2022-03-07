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

import { ConfirmDialogComponent } from "@app/shared/confirm-dialog/confirm-dialog.component";
import { InputModalComponent } from "@app/shared/inputModal/inputModal.component";
import { OptionsComponent } from "@app/shared/options/options.component";
import { ReportComponent } from "@app/shared/report/report.component";
import { UploadComponent } from "@app/shared/upload/upload.component";
import { UploadMaterialComponent } from "@app/shared/upload-material/upload-material.component";
import { VariablesComponent } from "@app/shared/variables/variables.component";
import { ImageDisplayComponent } from "@app/shared/image-display/image-display.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ChangeUsernameComponent } from "./change-username/change-username.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { RadiolearnErrorsComponent } from "./radiolearn-errors/radiolearn-errors.component";
import { FeedbackModalComponent } from "./feedback-modal/feedback-modal.component";
import { RadiolearnOptionsComponent } from './radiolearn-options/radiolearn-options.component';
import { InlineImageDisplayComponent } from './inline-image-display/inline-image-display.component';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    InputModalComponent,
    OptionsComponent,
    ReportComponent,
    UploadComponent,
    UploadMaterialComponent,
    VariablesComponent,
    ImageDisplayComponent,
    SignUpComponent,
    ChangePasswordComponent,
    ChangeUsernameComponent,
    RadiolearnErrorsComponent,
    FeedbackModalComponent,
    RadiolearnOptionsComponent,
    InlineImageDisplayComponent
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
    MatIconModule
  ],
  exports: [
    ConfirmDialogComponent,
    InputModalComponent,
    OptionsComponent,
    ReportComponent,
    UploadComponent,
    UploadMaterialComponent,
    VariablesComponent,
    ImageDisplayComponent,
    SignUpComponent,
    ChangeUsernameComponent,
    ChangePasswordComponent,
    FeedbackModalComponent,
    RadiolearnOptionsComponent,
    RadiolearnErrorsComponent
  ]
})
export class SharedModule { }
