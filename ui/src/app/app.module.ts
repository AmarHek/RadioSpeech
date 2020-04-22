import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { TextComponent } from './text/text.component';
import { UploadComponent } from './upload/upload.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    UploadComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: 'text/:name', component: TextComponent   },
        { path: 'upload',     component: UploadComponent },
        { path: 'list',       component: ListComponent   },
        { path: '**', redirectTo: '/upload' },
      ],
      { useHash: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
