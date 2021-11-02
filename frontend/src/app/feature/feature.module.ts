import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {MatCheckboxModule} from "@angular/material/checkbox";

import { SharedModule } from "@app/shared/shared.module";
import { JudgeMatComponent } from "@app/feature/judge-mat/judge-mat.component";
import { ListComponent } from "@app/feature/list/list.component";
import { ListMaterialComponent } from "@app/feature/list-material/list-material.component";
import { UiBaseComponent } from "@app/feature/ui-base/ui-base.component";
import { AccountManagementComponent } from "./account-management/account-management.component";
import { AdminComponent } from "@app/feature/admin/admin.component";
import { RadiolearnComponent } from "./radiolearn/radiolearn.component";
import { RadiolearnViewComponent } from "./radiolearn-view/radiolearn-view.component";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    JudgeMatComponent,
    ListComponent,
    ListMaterialComponent,
    UiBaseComponent,
    AccountManagementComponent,
    AdminComponent,
    RadiolearnComponent,
    RadiolearnViewComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatButtonModule
    ],
  exports: [
    JudgeMatComponent,
    ListComponent,
    ListMaterialComponent,
    UiBaseComponent,
    AccountManagementComponent,
    AdminComponent,
    RadiolearnComponent,
    RadiolearnViewComponent
  ]
})
export class FeatureModule { }
