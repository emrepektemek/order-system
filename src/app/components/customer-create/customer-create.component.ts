import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../../services/customer.service';

@Component({
  selector: 'app-customer-create',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css',
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.createCustomerForm();
  }

  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  createCustomer() {
    let customerModel = Object.assign({}, this.customerForm.value);

    this.customerService.add(customerModel).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.customerForm.reset();
      },
      (responseError) => {
        if (responseError.error.ValidationErrors) {
          this.toastrService.error(
            responseError.error.ValidationErrors[0].ErrorMessage
          );
        } else {
          this.toastrService.error(responseError.error);
        }
      }
    );
  }
}
