import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = "http://localhost:8080/v1/auth"

  constructor(private http: HttpClient, private router: Router) { }

  login(login: any) {
    const url = `${this.apiUrl}/login`
    return this.http.post<any>(url, login).subscribe({
      next: resp => {
        this.router.navigate(['profile'])
        localStorage.setItem('auth_token', resp.jwt);

      },
      error: error => {
        alert("Incorrect user/password");
        console.log(error)
      }
    })

  }

  getAuthorizationToken(): string {
    return localStorage.getItem('auth_token')!;
  }

  isLoggedIn():boolean {
    const token = this.getAuthorizationToken(); // get token from local storage
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return parsedPayload.exp > Date.now() / 1000; // check if token is expired

  }

 
}
