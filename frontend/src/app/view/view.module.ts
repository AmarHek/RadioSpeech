import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterModule } from "@angular/router";

import { AdminComponent } from "@app/view/admin/admin.component";
import { HeaderComponent } from "@app/view/header/header.component";
import { LoginComponent } from "@app/view/login/login.component";


@NgModule({
  declarations: [
    HeaderComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    AdminComponent,
    LoginComponent
  ]
})
export class ViewModule { }
