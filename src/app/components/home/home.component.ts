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
    private categoryState: CategoryState
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
    }).subscribe(({ inventory, orders, users, categories }) => {
      this.inventoryReportState.setInventoryReports(inventory.data);
      this.orderReportState.setOrderReports(orders.data);
      this.userSate.setUsers(users.data);
      this.categoryState.setCategories(categories.data);
      this.dataLoaded = true;
    });
  }

  logout() {
    this.authService.logout();
    this.userSate.clearUsers();
    this.orderReportState.clearOrderReports();
    this.inventoryReportState.clearInventoryReports();
    this.router.navigate(['/login']);
    this.toastrService.info('Logged out');
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
