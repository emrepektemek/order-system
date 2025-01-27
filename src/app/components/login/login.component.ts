import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginFrom = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginFrom.valid) {
      console.log(this.loginFrom.value);
    }
  }
}
