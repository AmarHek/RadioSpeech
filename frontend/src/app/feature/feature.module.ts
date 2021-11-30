import { SharedModule } from "@app/shared/shared.module";
import { RadiolearnUiComponent } from "@app/feature/radiolearn-ui/radiolearn-ui.component";
import { ListComponent } from "@app/feature/list/list.component";
import { RadiolearnListComponent } from "@app/feature/radiolearn-list/radiolearn-list.component";
import { UiBaseComponent } from "@app/feature/ui-base/ui-base.component";
import { AccountManagementComponent } from "./account-management/account-management.component";
import { AdminComponent } from "@app/feature/admin/admin.component";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    RadiolearnUiComponent,
    ListComponent,
    RadiolearnListComponent,
    UiBaseComponent,
    AccountManagementComponent,
    AdminComponent
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
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
    RadiolearnUiComponent,
    ListComponent,
    RadiolearnListComponent,
    UiBaseComponent,
    AccountManagementComponent,
    AdminComponent
  ]
})
export class FeatureModule { }
