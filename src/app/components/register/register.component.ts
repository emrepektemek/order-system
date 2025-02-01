import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { UserOperationClaimService } from '../../services/userOperationClaimService';

import { ToastrService } from 'ngx-toastr';

import { Router, RouterLink } from '@angular/router';
import { UserOperationClaimModel } from '../../models/userOperationClaimModel';
import { response } from 'express';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  selectedGender: string = '';
  //createdUserId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userOperationClaimService: UserOperationClaimService,
    private toastrService: ToastrService,
    private router: Router
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
    this.authService.register(registerModel).subscribe(
      (response) => {
        this.toastrService.info(response.message);

        let userOperationClaim: UserOperationClaimModel = {
          userId: response.data.id,
          operationClaimId: 4,
        };

        this.userOperationClaimService.add(userOperationClaim).subscribe(
          (response) => {
            console.log(response);
            //this.toastrService.info(response.message);
            this.router.navigate(['/login']);
          },
          (responseError) => {
            console.log();
            this.toastrService.error(
              'Could not assign you a role, please contact admin'
            );
          }
        );
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
