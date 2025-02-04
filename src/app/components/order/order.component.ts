import { Component, OnInit } from '@angular/core';
import { OrderReportModel } from './../../models/orderReportModel';
import { CommonModule } from '@angular/common';
import { OrderReportState } from './../../store/order-report.state';

import { take } from 'rxjs';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  orderReports: OrderReportModel[] = [];
  dataLoaded: boolean = false;

  constructor(private orderReportState: OrderReportState) {}

  ngOnInit(): void {
    this.orderReportState.orderReports$.pipe(take(1)).subscribe((reports) => {
      this.orderReports = reports;
      this.dataLoaded = true;
    });
  }
}
