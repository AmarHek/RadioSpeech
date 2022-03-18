import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { AppComponent } from "./app.component";
import { FeatureModule } from "@app/feature/feature.module";
import { ViewModule } from "@app/view/view.module";
import { SharedModule } from "@app/shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import {JwtInterceptor, ErrorInterceptor, APP_DATE_FORMATS, AppDateAdapter} from "@app/helpers";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      FeatureModule,
      SharedModule,
      ViewModule,
    ],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
