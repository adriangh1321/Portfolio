import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Portfolio } from '../models/Portfolio';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl: string = "http://localhost:5001/portfolios"

  private _refreshRequired = new Subject<void>()

  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  getPortfolioById(id: number): Observable<Portfolio> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Portfolio>(url)
  }

  updatePortfolio(id: number, portfolio: Portfolio): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, portfolio).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }
  
}

