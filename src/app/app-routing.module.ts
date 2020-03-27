import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardGuard } from './guard.guard';


const routes: Routes = [
  {
    path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [GuardGuard]
  }, 
  {
    path: 'login', loadChildren: './login/login.module#LoginModule'
  }, 
  {
    path: 'registration', loadChildren: './registration/registration.module#RegistrationModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 