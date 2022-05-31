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
}
