import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from './auth.guard';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateUserGuard } from './createUser.guard';
import { ListUsersGuard } from './listUsers.guard';

const routes: Routes = [
  {
    path: "login-page",
    component: LoginComponent
  },
  {
    path: "user-list",
    component: UserListComponent,
    canActivate: [ListUsersGuard],
    canDeactivate: [ListUsersGuard]
  },
  {
    path: "user-create",
    component: CreateUserComponent,
    canActivate: [CreateUserGuard],
    canDeactivate: [CreateUserGuard]
  },
  { 
    path: 'edit-user/:id', 
    component: EditUserComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
