import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { SigUpComponent } from './pages/auth/sign-up/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuestGuard } from './guards/guest.guard';
import { IRoleType } from './interfaces';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminRoleGuard } from './guards/admin-role.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signUp',
    component: SigUpComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          authorities: [IRoleType.admin, IRoleType.user],
          name: 'Dashboard',
          showInSidebar: true
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminRoleGuard],  // Mover `canActivate` aquí
        data: {
          authorities: [IRoleType.admin],
          name: 'Users',
          showInSidebar: true
        }
      },
      {
        path: 'categories',
        component: CategoryComponent,
        data: {
          authorities: [IRoleType.admin, IRoleType.user],
          name: 'Categories',
          showInSidebar: true
        }
      },
      {
        path: 'products',
        component: ProductComponent,
        data: {
          authorities: [IRoleType.admin, IRoleType.user],
          name: 'Products',
          showInSidebar: true
        }
      }
    ],
  },
];
