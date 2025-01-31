import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { InventoryComponent } from './components/inventory/inventory.component';
import { OrderComponent } from './components/order/order.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserRoleAssignmentComponent } from './components/user-role-assignment/user-role-assignment.component';
import { CustomerAssignmentComponent } from './components/customer-assignment/customer-assignment.component';
import { ProductAssignmentComponent } from './components/product-assignment/product-assignment.component';
import { OrderAssignmentComponent } from './components/order-assignment/order-assignment.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'inventory', component: InventoryComponent },
      { path: 'order', component: OrderComponent },
      { path: 'user-create', component: UserCreateComponent },
      { path: 'user-role-assignment', component: UserRoleAssignmentComponent },
      { path: 'customer-assignment', component: CustomerAssignmentComponent },
      { path: 'product-assignment', component: ProductAssignmentComponent },
      { path: 'order-assignment', component: OrderAssignmentComponent },
    ],
  },
];
