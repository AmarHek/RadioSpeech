import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";

import {HeaderComponent} from "@app/view/header/header.component";
import {LoginComponent} from "@app/view/login/login.component";
import {RadiospeechWelcomeComponent} from "@app/view/radiospeech-welcome/radiospeech-welcome.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    RadiospeechWelcomeComponent
  ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule
    ],
  exports: [
    HeaderComponent,
    LoginComponent,
    RadiospeechWelcomeComponent
  ]
})
export class ViewModule { }
