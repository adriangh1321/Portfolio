import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading:boolean;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.isLoading=false;
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

    this.authService.login(this.loginForm.getRawValue())
  }
  

  get m() {
    return this.loginForm.controls;
  }

  showLoader(event:boolean){
    this.isLoading=event;
  }

}
