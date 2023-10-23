import {CommonModule} from "@angular/common";
import {NgModule, Optional, SkipSelf} from "@angular/core";
import {
  AuthenticationService,
  BackendCallerService,
  DataParserService,
  DisplayService,
  FilesSortingService,
  ImageDisplayService,
  InputParserService,
  MatDialogService,
  UserService
} from "@app/core";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    BackendCallerService,
    DataParserService,
    DisplayService,
    FilesSortingService,
    ImageDisplayService,
    InputParserService,
    MatDialogService,
    UserService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if(core) {
      throw new Error("No");
    }
  }
}
