import { Component, OnInit } from '@angular/core';
import { InventoryReportModel } from '../../models/inventoryReportModel';
import { CommonModule } from '@angular/common';

import { InventoryReportState } from '../../store/inventory-report.state';
import { take } from 'rxjs';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
  inventoryReports: InventoryReportModel[] = [];
  dataLoaded: boolean = false;

  constructor(private inventoryReportState: InventoryReportState) {}

  ngOnInit(): void {
    this.inventoryReportState.inventoryReports$
      .pipe(take(1))
      .subscribe((reports) => {
        this.inventoryReports = reports;
        this.dataLoaded = true;
      });
  }
}
