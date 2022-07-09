import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/LoginResponse';
import { User } from '../models/User';
import { PortfolioService } from './portfolio.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = `${environment.baseUrl}/v1/auth`
  private _userRequest = new Subject<User>()
  private _logoutRequired=new Subject<void>()

  constructor(private http: HttpClient, private router: Router, private portfolioService: PortfolioService) { }

  get LogoutRequired(){
    return this._logoutRequired
  }

  public userRequired$() {
    return this._userRequest.asObservable()
  }


  login(login: any): Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`
    return this.http.post<LoginResponse>(url, login).pipe(
      map((resp) => {
        localStorage.setItem('auth_token', resp.jwt)
        localStorage.setItem('nickname', resp.user.nickname)
        return resp
      }),
      tap(resp => this._userRequest.next(resp.user))
    )
  }

  getAuthorizationToken(): string {
    return localStorage.getItem('auth_token')!;
  }

  getNickname(): string {
    return localStorage.getItem('nickname')!;
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

  register(register: any): Observable<LoginResponse> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')

    const url = `${this.apiUrl}/register`
    return this.http.post<LoginResponse>(url, register, { headers }).pipe(
      map((resp) => {
        localStorage.setItem('auth_token', resp.jwt)
        localStorage.setItem('nickname', resp.user.nickname)
        return resp
      }),
      tap(resp => this._userRequest.next(resp.user)))
  }

  logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('nickname')
    localStorage.removeItem('id_portfolio')
    this.emitLogout()
    this.router.navigate(['login'])

  }

  getMeUser():Observable<User>{
    const url = `${this.apiUrl}/me`
    return this.http.get<User>(url)
  }

  emitUser(user:User){
    this._userRequest.next(user)
  }

  emitLogout(){
    this._logoutRequired.next()
  }


}
