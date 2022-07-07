import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/LoginResponse';

import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private router: Router) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Error: Invalid input')
    }
    this.loaderService.showLoading()
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (resp) => {
        this.router.navigate(['profile',resp.user.nickname])},
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
    }
      
    )
  }


  get m() {
    return this.loginForm.controls;
  }

  showLoader(event: boolean) {
    this.isLoading = event;
  }

}
