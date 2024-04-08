import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {MatMenuModule} from "@angular/material/menu";

import {
  InputMaterialHandlerComponent,
  InputModalComponent,
  OptionsComponent,
  ReportComponent,
  MainInterfaceComponent,
  VariablesComponent
} from "@app/main-interface/";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    InputMaterialHandlerComponent,
    InputModalComponent,
    OptionsComponent,
    ReportComponent,
    MainInterfaceComponent,
    VariablesComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    MatListModule,
    MatChipsModule
  ],
  exports: [
    MainInterfaceComponent,
    VariablesComponent
  ]
})
export class MainInterfaceModule { }
