import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyProgressBarModule as MatProgressBarModule} from "@angular/material/legacy-progress-bar";
import {MatLegacyRadioModule as MatRadioModule} from "@angular/material/legacy-radio";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatLegacyTooltipModule as MatTooltipModule} from "@angular/material/legacy-tooltip";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatLegacySlideToggleModule as MatSlideToggleModule} from "@angular/material/legacy-slide-toggle";

import {ConfirmDialogComponent} from "@app/shared/confirm-dialog/confirm-dialog.component";
import {InputModalComponent} from "@app/shared/inputModal/inputModal.component";
import {ReportOutputComponent} from "@app/shared/report-output/report-output.component";
import {UploadTemplateComponent} from "@app/shared/upload-template/upload-template.component";
import {VariablesComponent} from "@app/shared/variables/variables.component";

import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ChangeUsernameComponent} from "./change-username/change-username.component";
import {FeedbackDialogComponent} from "./feedback-dialog/feedback-dialog.component";
import {ReportOptionsComponent} from "@app/shared/report-options/report-options.component";

import {InputDialogComponent} from "./input-dialog/input-dialog.component";

import {SignUpComponent} from "./sign-up/sign-up.component";
import { ChangeRoleDialogComponent } from './change-role-dialog/change-role-dialog.component';
import { AnnotationPopupComponent } from './annotation-popup/annotation-popup.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { DialogAddGroupComponent } from './dialog-add-group/dialog-add-group.component';
import { DialogAddBoxComponent } from './dialog-add-box/dialog-add-box.component';
import { DialogAddVariableComponent } from './dialog-add-variable/dialog-add-variable.component';
import { DialogListVariablesComponent } from './dialog-list-variables/dialog-list-variables.component';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import { DialogAddCategoryComponent } from './dialog-add-category/dialog-add-category.component';
import { ReportEditOptionsComponent } from './report-edit-options/report-edit-options.component';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    ChangeUsernameComponent,
    ConfirmDialogComponent,
    FeedbackDialogComponent,
    InputDialogComponent,
    InputModalComponent,
    ReportOutputComponent,
    ReportOptionsComponent,
    SignUpComponent,
    UploadTemplateComponent,
    VariablesComponent,
    ChangeRoleDialogComponent,
    AnnotationPopupComponent,
    SettingsDialogComponent,
    DialogAddGroupComponent,
    DialogAddBoxComponent,
    DialogAddVariableComponent,
    DialogListVariablesComponent,
    DialogAddCategoryComponent,
    ReportEditOptionsComponent,
    ReportEditOptionsComponent
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
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatCardModule,
        MatChipsModule
    ],
  exports: [
    ChangePasswordComponent,
    ChangeUsernameComponent,
    ConfirmDialogComponent,
    FeedbackDialogComponent,
    InputDialogComponent,
    InputModalComponent,
    ReportOptionsComponent,
    ReportOutputComponent,
    SignUpComponent,
    UploadTemplateComponent,
    VariablesComponent,
    ReportEditOptionsComponent,
  ]
})
export class SharedModule { }
