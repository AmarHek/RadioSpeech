import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./base-components/login/login.component";
import { ListComponent } from "./base-components/list/list.component";
import { UiBaseComponent } from "./main/ui-base/ui-base.component";
import { ListMaterialComponent } from "./material/list-material/list-material.component";
import { JudgeMatComponent } from "./material/judge-mat/judge-mat.component";
import { AuthGuard } from "./core/helpers/auth.guard";
import { Role } from "./core/models/user";
import {AdminComponent} from "./base-components/admin/admin.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "list",
    component: ListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.Moderator, Role.Admin] }
  },
  {
    path: "main/:id",
    component: UiBaseComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.Moderator, Role.Admin] }
  },
  {
    path: "listMat",
    component: ListMaterialComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Moderator, Role.Admin] }
  },
  {
    path: "mainMat/:id",
    component: JudgeMatComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Moderator, Role.Admin] }
  },
  {
    path: "radiolearn",
    component: ListMaterialComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.Moderator, Role.Admin] }
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {path: "**", redirectTo: "/list"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
