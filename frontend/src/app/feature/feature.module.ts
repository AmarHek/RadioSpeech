import {CommonModule} from "@angular/common";

import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {AdminComponent} from "@app/feature/admin/admin.component";
import {FeedbackDisplayComponent} from "@app/feature/feedback-display/feedback-display.component";
import {TemplateListComponent} from "@app/feature/template-list/template-list.component";
import {RadiolearnListComponent} from "@app/feature/radiolearn-list/radiolearn-list.component";
import {RadiolearnUiComponent} from "@app/feature/radiolearn-ui/radiolearn-ui.component";
import {ReportUiComponent} from "@app/feature/report-ui/report-ui.component";
import {SharedModule} from "@app/shared/shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AccountManagementComponent} from "./account-management/account-management.component";

import {} from "jasmine";


@NgModule({
  declarations: [
    AccountManagementComponent,
    AdminComponent,
    FeedbackDisplayComponent,
    TemplateListComponent,
    RadiolearnListComponent,
    RadiolearnUiComponent,
    ReportUiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  exports: [
    AccountManagementComponent,
    AdminComponent,
    FeedbackDisplayComponent,
    TemplateListComponent,
    RadiolearnListComponent,
    RadiolearnUiComponent,
    ReportUiComponent
  ]
})
export class FeatureModule { }
