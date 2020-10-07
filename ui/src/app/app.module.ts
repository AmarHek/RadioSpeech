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
import { SortCategoriesPipe } from './sort-categories.pipe';
import { ReportComponent } from './report/report.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WorkspaceComponent } from './workspace/workspace.component';
import { OptionsComponent } from './options/options.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    UploadComponent,
    ListComponent,
    SortCategoriesPipe,
    ReportComponent,
    WorkspaceComponent,
    OptionsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: 'workspace/:name', component: WorkspaceComponent},
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
