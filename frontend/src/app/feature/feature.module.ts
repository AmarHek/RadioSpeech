import { SharedModule } from "@app/shared/shared.module";
import { RadiolearnUiComponent } from "@app/feature/radiolearn-ui/radiolearn-ui.component";
import { ListComponent } from "@app/feature/list/list.component";
import { RadiolearnListComponent } from "@app/feature/radiolearn-list/radiolearn-list.component";
import { UiBaseComponent } from "@app/feature/ui-base/ui-base.component";
import { AccountManagementComponent } from "./account-management/account-management.component";
import { AdminComponent } from "@app/feature/admin/admin.component";
import {FeedbackDisplayComponent} from "@app/feature/feedback-display/feedback-display.component";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    RadiolearnUiComponent,
    ListComponent,
    RadiolearnListComponent,
    UiBaseComponent,
    AccountManagementComponent,
    AdminComponent,
    FeedbackDisplayComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatChipsModule,
        MatListModule,
        MatMenuModule
    ],
  exports: [
    RadiolearnUiComponent,
    ListComponent,
    RadiolearnListComponent,
    UiBaseComponent,
    AccountManagementComponent,
    AdminComponent,
    FeedbackDisplayComponent
  ]
})
export class FeatureModule { }
