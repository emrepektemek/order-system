import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { RouterModule } from '@angular/router';

import { InventoryService } from './../../services/inventory.service';
import { InventoryReportState } from '../../store/inventory-report.state';
import { CommonModule } from '@angular/common';

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
    private inventoryReportState: InventoryReportState
  ) {}
  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.inventoryService.getReports().subscribe((response) => {
      this.inventoryReportState.setInventoryReports(response.data);
      this.dataLoaded = true;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastrService.info('Çıkış Yapıldı');
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
