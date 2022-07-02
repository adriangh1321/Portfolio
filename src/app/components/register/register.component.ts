import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { onlyWhitespace } from 'src/app/validators/WhitespaceValidatorDirective';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
     private formBuilder: FormBuilder,
     private router: Router,
     private loaderService:LoaderService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]],
      nickname: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(4),Validators.pattern(/^\S*$/)]]
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert('Error: Invalid input')
    }
    this.loaderService.showLoading()
    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next:resp=>this.router.navigate(['profile']),
      error:error=>{
        this.loaderService.hideLoading()
        throw error}
    })
  }
  

  get m() {
    return this.registerForm.controls;
  }


}
