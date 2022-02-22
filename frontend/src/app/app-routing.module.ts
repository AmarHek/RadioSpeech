import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent, AdminComponent } from "@app/view";
import {
  ListComponent,
  UiBaseComponent,
  RadiolearnListComponent,
  RadiolearnUiComponent,
  AccountManagementComponent,
  FeedbackDisplayComponent
} from "@app/feature";
import { AuthGuard } from "@app/helpers";
import { Role } from "@app/models";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "list",
    component: ListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.ExternalUser, Role.Moderator, Role.Admin] }
  },
  {
    path: "main/:id",
    component: UiBaseComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.ExternalUser, Role.Moderator, Role.Admin] }
  },
  {
    path: "radiolearn/list",
    component: RadiolearnListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.ExternalUser, Role.Moderator, Role.Admin] }
  },
  {
    path: "radiolearn/main/:id",
    component: RadiolearnUiComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.ExternalUser, Role.Moderator, Role.Admin] }
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
  {path: "**", redirectTo: "/list"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
