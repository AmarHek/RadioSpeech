import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "app/core/helpers";
import {Role} from "app/core/models";

import {AdminComponent} from "@app/admin";
import {AccountManagementComponent} from "@app/account-management";
import {LoginComponent} from "@app/view";
import {RadiospeechWelcomeComponent} from "@app/view/radiospeech-welcome/radiospeech-welcome.component";
import {PendingChangesGuard} from "@app/core/guards/pending-changes.guard";
import {TemplateEditorComponent} from "@app/template-editor";
import {TemplateListComponent} from "@app/template-manager";
import {MainInterfaceComponent} from "@app/main-interface";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: RadiospeechWelcomeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.ExternalUser, Role.Moderator, Role.Admin, Role.demoUser, Role.tester] }
  },
  {
    path: "list",
    component: TemplateListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.ExternalUser, Role.Moderator, Role.Admin, Role.demoUser, Role.tester] }
  },
  {
    path: "main/:id",
    component: MainInterfaceComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.ExternalUser, Role.Moderator, Role.Admin, Role.demoUser, Role.tester] }
  },
  {
    path: "edit/:id",
    component: TemplateEditorComponent,
    canActivate: [AuthGuard],
    canDeactivate: [PendingChangesGuard],
    data: { roles: [Role.User, Role.ExternalUser, Role.Moderator, Role.Admin, Role.demoUser, Role.tester] }
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "manageAccount",
    component: AccountManagementComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Moderator, Role.User]}
  },
  {path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
