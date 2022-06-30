import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PortfolioService } from './portfolio.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = `${environment.baseUrl}/v1/auth`

  constructor(private http: HttpClient, private router: Router, private portfolioService: PortfolioService) { }

  login(login: any) {
    
    const url = `${this.apiUrl}/login`
    return this.http.post<any>(url, login).pipe(map((resp)=>localStorage.setItem('auth_token', resp.jwt)))
    
    
    // subscribe({
    //   next: resp => {
    //     localStorage.setItem('auth_token', resp.jwt);
    //     this.router.navigate(['profile'])
    //   },
    //   error: error => {
    //     alert("Incorrect user/password");
    //     console.log(error)
    //   }


    // })

  }

  getAuthorizationToken(): string {
    return localStorage.getItem('auth_token')!;
  }

  isLoggedIn(): boolean {
    const token = this.getAuthorizationToken(); // get token from local storage
    if (token == null) {
      return false;
    }
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return parsedPayload.exp > Date.now() / 1000; // check if token is expired

  }

  register(register: any) {
    // this.router.navigate(['#'])
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')


    const url = `${this.apiUrl}/register`
    return this.http.post<any>(url, register, { headers }).subscribe({
      next: resp => {
        this.router.navigate(['profile'])
        localStorage.setItem('auth_token', resp.jwt);

      },
      error: error => {
        alert("There was an errror while registering the user");
        console.log(error)
      }
    })
  }

  logout() {
    localStorage.removeItem('auth_token')
    this.router.navigate(['login'])

  }


}
