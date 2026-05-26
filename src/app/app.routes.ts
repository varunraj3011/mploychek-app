import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Admin } from './admin/admin';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login',     component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'admin',     component: Admin,     canActivate: [authGuard] },
  { path: '',          redirectTo: 'login',  pathMatch: 'full' }
];