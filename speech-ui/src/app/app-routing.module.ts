import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './base-components/login/login.component';
import { ListComponent } from "./base-components/list/list.component";
import { UiBaseComponent } from "./main/ui-base/ui-base.component";
import { ListMaterialComponent } from "./material/list-material/list-material.component";
import { JudgeMatComponent } from "./material/judge-mat/judge-mat.component";
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/user';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "list",
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "main/:id",
    component: UiBaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "listMat",
    component: ListMaterialComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "mainMat/:id",
    component: JudgeMatComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "learn",
    component: ListMaterialComponent,
    canActivate: [AuthGuard]
  },
  {path: "**", redirectTo: "/list"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
