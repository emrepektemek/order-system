import { Component, OnInit } from '@angular/core';
import { InventoryReportModel } from '../../models/inventoryReportModel';
import { InventoryService } from './../../services/inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule],

  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
  inventoryReports: InventoryReportModel[] = [];
  dataLoaded: boolean = false;
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.inventoryService.getReports().subscribe((response) => {
      this.inventoryReports = response.data;
      this.dataLoaded = true;
    });
  }
}
