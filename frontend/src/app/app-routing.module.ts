import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {
  AccountManagementComponent,
  AdminComponent,
  FeedbackDisplayComponent,
  TemplateListComponent,
  ReportUiComponent
} from "@app/feature";
import {AuthGuard} from "@app/helpers";
import {Role} from "@app/models";

import {LoginComponent} from "@app/view";
import {RadiospeechWelcomeComponent} from "@app/view/radiospeech-welcome/radiospeech-welcome.component";
import {PendingChangesGuard} from "@app/guards/pending-changes.guard";

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
    component: ReportUiComponent,
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
  {
    path: "feedback",
    component: FeedbackDisplayComponent,
    canActivate: [AuthGuard],
    data: { role: [Role.Admin, Role.Moderator]}
  },
  {path: "deepspeech",
   redirectTo: "deepspeech/login"},
  {path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
