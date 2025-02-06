import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserOperationClaimService } from '../../services/userOperationClaimService';
import { UserOperationClaimModel } from '../../models/userOperationClaimModel';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit {
  registerForm: FormGroup;

  selectedGender: string = '';

  dataAdd: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userOperationClaimService: UserOperationClaimService,
    private toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [''],
      gender: [''],
    });
  }

  selectGender(gender: string): void {
    this.selectedGender = gender;
    this.registerForm.patchValue({ gender });
  }

  register() {
    let registerModel = Object.assign({}, this.registerForm.value);
    this.dataAdd = false;
    this.authService.register(registerModel).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.registerForm.reset();

        this.dataAdd = true;
      },
      (responseError) => {
        this.dataAdd = true;
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
