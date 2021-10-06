import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./view/login/login.component";
import { ListComponent } from "./feature/list/list.component";
import { UiBaseComponent } from "./feature/ui-base/ui-base.component";
import { ListMaterialComponent } from "./feature/list-material/list-material.component";
import { JudgeMatComponent } from "./feature/judge-mat/judge-mat.component";
import { AuthGuard } from "./helpers/auth.guard";
import { Role } from "./models/user";
import {AdminComponent} from "./view/admin/admin.component";

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
