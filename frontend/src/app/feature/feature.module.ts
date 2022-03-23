import {CommonModule} from "@angular/common";

import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {AdminComponent} from "@app/feature/admin/admin.component";
import {FeedbackDisplayComponent} from "@app/feature/feedback-display/feedback-display.component";
import {ListComponent} from "@app/feature/list/list.component";
import {RadiolearnListComponent} from "@app/feature/radiolearn-list/radiolearn-list.component";
import {RadiolearnUiComponent} from "@app/feature/radiolearn-ui/radiolearn-ui.component";
import {UiBaseComponent} from "@app/feature/ui-base/ui-base.component";
import {SharedModule} from "@app/shared/shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AccountManagementComponent} from "./account-management/account-management.component";


@NgModule({
  declarations: [
    AccountManagementComponent,
    AdminComponent,
    FeedbackDisplayComponent,
    ListComponent,
    RadiolearnListComponent,
    RadiolearnUiComponent,
    UiBaseComponent
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
    SharedModule
  ],
  exports: [
    AccountManagementComponent,
    AdminComponent,
    FeedbackDisplayComponent,
    ListComponent,
    RadiolearnListComponent,
    RadiolearnUiComponent,
    UiBaseComponent
  ]
})
export class FeatureModule { }
