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

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  selectedGender: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
    this.authService.register(registerModel).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        console.log(response);
      },
      (responseError) => {
        this.toastrService.error(
          responseError.error.ValidationErrors[0].ErrorMessage
        );
      }
    );
  }
}
