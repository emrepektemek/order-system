import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { RouterModule } from '@angular/router';

import { InventoryService } from './../../services/inventory.service';
import { InventoryReportState } from '../../store/inventory-report.state';

import { OrderService } from './../../services/order.service';
import { OrderReportState } from '../../store/order-report.state';

import { UserService } from '../../services/user.service';
import { UserState } from '../../store/user.state';

import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { CategoryState } from '../../store/category.state';

import { CategoryService } from './../../services/category.service';
import { UserForCustomerState } from '../../store/user-for-customer.state';

import { ProductService } from '../../services/product.service';
import { ProductState } from '../../store/product.state';

import { CustomerService } from '../../services/customer.service';
import { CustomerState } from '../../store/Customer.state';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SidebarComponent, RouterModule, CommonModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  dataLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private inventoryService: InventoryService,
    private inventoryReportState: InventoryReportState,
    private orderService: OrderService,
    private orderReportState: OrderReportState,
    private userService: UserService,
    private userSate: UserState,
    private categoryService: CategoryService,
    private categoryState: CategoryState,
    private userForCustomerState: UserForCustomerState,
    private producService: ProductService,
    private productState: ProductState,
    private customervice: CustomerService,
    private customerState: CustomerState
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    forkJoin({
      inventory: this.inventoryService.getReports(),
      orders: this.orderService.getReports(),
      users: this.userService.getUsers(),
      categories: this.categoryService.getAll(),
      usersCustomer: this.userService.getUsersForCustomer(),
      products: this.producService.getAll(),
      customers: this.customervice.getAll(),
    }).subscribe(
      ({
        inventory,
        orders,
        users,
        categories,
        usersCustomer,
        products,
        customers,
      }) => {
        this.inventoryReportState.setInventoryReports(inventory.data);
        this.orderReportState.setOrderReports(orders.data);
        this.userSate.setUsers(users.data);
        this.categoryState.setCategories(categories.data);
        this.userForCustomerState.setUsersForCustomer(usersCustomer.data);
        this.productState.setProduct(products.data);
        this.customerState.setCustomer(customers.data);
        this.dataLoaded = true;
      }
    );
  }

  logout() {
    this.authService.logout();
    this.userSate.clearUsers();
    this.orderReportState.clearOrderReports();
    this.inventoryReportState.clearInventoryReports();
    this.userForCustomerState.clearUsersForCustomer();
    this.productState.clearProduct();
    this.customerState.clearCustomer();
    this.router.navigate(['/login']);
    this.toastrService.info('Logged out');
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
