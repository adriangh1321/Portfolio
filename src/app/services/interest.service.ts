import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Interest } from '../models/Interest';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  private apiUrl: string = `${environment.baseUrl}/v1/interests`

  private _interestsRefreshRequired = new Subject<void>()

  get InterestsRefreshRequired() {
    return this._interestsRefreshRequired;
  }

  constructor(private http: HttpClient) { }

  updateInterest(id: number, interest: Interest): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, interest).pipe(
      tap(() => {
        this.InterestsRefreshRequired.next()
      })
    );

  }

  getInterestsByPortfolioId(idPortfolio: number): Observable<Interest[]> {
    let params = new HttpParams().set('portfolioId', idPortfolio)
    return this.http.get<Interest[]>(this.apiUrl, { params: params })     
  }

  addInterest(interest: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, interest).pipe(
      tap(() => {
        this.InterestsRefreshRequired.next()
      })
    );
  }

  deleteInterest(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.InterestsRefreshRequired.next()
      })
    );
  }
}
