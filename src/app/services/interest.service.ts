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
    const url = `${this.apiUrl}/me/${id}`
    return this.http.put<void>(url, interest).pipe(
      tap(() => {
        this.InterestsRefreshRequired.next()
      })
    );

  }

  getMeByToken(): Observable<Interest[]> {
    const url = `${this.apiUrl}/me`
    return this.http.get<Interest[]>(url)
  }

  addInterest(interest: any): Observable<void> {
    const url = `${this.apiUrl}/me`
    return this.http.post<void>(url, interest).pipe(
      tap(() => {
        this.InterestsRefreshRequired.next()
      })
    );
  }

  deleteInterest(id: number): Observable<void> {
    const url = `${this.apiUrl}/me/${id}`
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.InterestsRefreshRequired.next()
      })
    );
  }
}
