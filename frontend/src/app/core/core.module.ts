import {NgModule, Optional, SkipSelf} from "@angular/core";
import { CommonModule } from "@angular/common";
import {AuthenticationService, BackendCallerService, DataParserService, DisplayService,
        FilesSortingService, InputParserService, MatDialogService, PopoutService, UserService} from "@app/core";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthenticationService, BackendCallerService, DataParserService, DisplayService,
  FilesSortingService, InputParserService, MatDialogService, PopoutService, UserService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if(core) {
      throw new Error("No");
    }
  }
}
