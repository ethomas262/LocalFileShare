import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component'
import { AuthGuardLogin } from './services/auth.guard'
export const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: '', component: LoginComponent },
  { path: 'main-app', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuardLogin] },
];