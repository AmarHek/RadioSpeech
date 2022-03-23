import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {HeaderComponent} from "@app/view/header/header.component";
import {LoginComponent} from "@app/view/login/login.component";
import {RadiolearnWelcomeComponent} from "@app/view/radiolearn-welcome/radiolearn-welcome.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    RadiolearnWelcomeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    RadiolearnWelcomeComponent
  ]
})
export class ViewModule { }
