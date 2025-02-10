import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { OrderApproveState } from '../../store/order-approve.state';
import { OrderApproveRejectModel } from '../../models/orderApproveUpdateModel';
import { OrderService } from '../../services/order.service';

declare var bootstrap: any;

@Component({
  selector: 'app-order-approve',
  imports: [CommonModule],
  templateUrl: './order-approve.component.html',
  styleUrl: './order-approve.component.css',
})
export class OrderApproveComponent implements OnInit {
  orderId: number = 0;
  userId: string | null = null;
  isApproved: boolean = true;
  acceptModalElement: any;
  rejectModalElement: any;

  dataUpdated: boolean = true;

  constructor(
    private toastrService: ToastrService,
    public orderApproveState: OrderApproveState,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.acceptModalElement = new bootstrap.Modal(
      document.getElementById('acceptModal')!
    );

    this.rejectModalElement = new bootstrap.Modal(
      document.getElementById('rejectModal')!
    );

    this.userId = localStorage.getItem('userId');

    console.log(this.orderApproveState.orderApproves$);
  }

  openAcceptModal() {
    this.acceptModalElement.show();
  }
  openRejectModal(orderId: number) {
    this.orderId = orderId;
    this.isApproved = false;
    this.rejectModalElement.show();
  }

  acceptOrder() {}

  rejectOrder() {
    this.dataUpdated = false;

    let rejectObject: OrderApproveRejectModel = {
      id: this.orderId,
      isApproved: this.isApproved,
      lastUpdatedUserId: this.userId,
    };

    this.orderService.approveReject(rejectObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);

        this.orderApproveState.delete(this.orderId);

        this.rejectModalElement.hide();
        this.dataUpdated = true;
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
        this.rejectModalElement.hide();

        this.dataUpdated = true;
      }
    );
  }
}
