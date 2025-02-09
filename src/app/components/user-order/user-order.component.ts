import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductState } from '../../store/product.state';
import { Customer } from '../../models/customer';
import { CustomerState } from '../../store/Customer.state';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-order',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.css',
})
export class UserOrderComponent implements OnInit {
  userId: number = 0;
  customerId: number = 0;
  customerAddress: string = '';
  selectedQuantity: number = 0;
  quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  orderForm: FormGroup;
  dataAdd: boolean = true;

  products: Product[] = [];
  customers: Customer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private productState: ProductState,
    private customerState: CustomerState,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    this.createOrderForm();
    let userId = localStorage.getItem('userId');

    this.userId = Number(userId);

    this.productState.products$.subscribe((product) => {
      this.products = product;
    });

    this.customerState.customers$.subscribe((customer) => {
      this.customers = customer;
    });

    this.setCustomer();
  }

  createOrderForm() {
    this.orderForm = this.formBuilder.group({
      customerId: [0, [Validators.required]],
      productId: [0, [Validators.required]],
    });
  }

  setCustomer() {
    const selectedCustomer = this.customers.find(
      (customer) => customer.userId === this.userId
    );

    if (selectedCustomer) {
      this.customerId = selectedCustomer.id;
      this.customerAddress = selectedCustomer.address;
    }
  }

  selectQuantity(quantity: number) {
    this.selectedQuantity = quantity;
  }

  createOrder() {
    let orderModel = Object.assign({}, this.orderForm.value, {
      customerId: this.customerId,
      quantity: this.selectedQuantity,
      shippingAddress: this.customerAddress,
      createdUserId: this.userId,
    });

    if (this.customerId == 0) {
      this.toastrService.error(
        'Please contact customer representative. You are not currently defined as a customer'
      );
    }

    this.dataAdd = false;

    this.orderService.add(orderModel).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.orderForm.setValue({
          customerId: 0,
          productId: 0,
        });
        this.selectQuantity(0);
        this.dataAdd = true;
      },
      (responseError) => {
        this.dataAdd = true;
        if (responseError.error.ValidationErrors) {
          this.toastrService.error(
            responseError.error.ValidationErrors[0].ErrorMessage
          );
        } else {
          this.toastrService.error(responseError.error.message);
        }
      }
    );
  }
}
