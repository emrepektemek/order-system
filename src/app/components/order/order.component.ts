import { Component, OnInit } from '@angular/core';
import { OrderReportModel } from '../../models/orderReportModel';
import { OrderService } from './../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CommonModule],

  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  orderReports: OrderReportModel[] = [];
  dataLoaded: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.orderService.getReports().subscribe((response) => {
      this.orderReports = response.data;
      this.dataLoaded = true;
    });
  }
}
