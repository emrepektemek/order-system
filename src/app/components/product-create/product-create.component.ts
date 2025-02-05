import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ProductService } from './../../services/product.service';

import { sizeMap } from '../../constants/size-map';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule, CommonModule],

  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit {
  selectedSize: number = 0;
  productForm: FormGroup;
  sizes = sizeMap;
  dataAdd: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.createProductForm();
  }

  selectSize(size: number): void {
    this.selectedSize = size;
    this.productForm.patchValue({ size });
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      categoryId: [0, [Validators.required]],
      productName: ['', [Validators.required]],
      unitPrice: [0.0, [Validators.required]],
      size: [0, [Validators.required]],
      description: [''],
    });
  }

  createProduct() {
    let productModel = Object.assign({}, this.productForm.value);

    this.dataAdd = false;

    this.productService.add(productModel).subscribe(
      (response) => {
        console.log(response);
        this.toastrService.info(response.message);
        this.productForm.reset();
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

  getSizeName(role: number): string {
    return this.sizes[role] || this.sizes[0];
  }
}
