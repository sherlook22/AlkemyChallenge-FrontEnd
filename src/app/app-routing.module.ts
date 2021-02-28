import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoggedinGuard } from './services/loggedin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedinGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LoggedinGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
