import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentCompany } from '../models/CurrentCompany';

@Injectable({
  providedIn: 'root'
})
export class CurrentCompanyService {

  private apiUrl: string = `${environment.baseUrl}/v1/currentCompanies`

  private _currentCompanyRefreshRequired = new Subject<void>()

  get CurrentCompanyRefreshRequired() {
    return this._currentCompanyRefreshRequired;
  }

  constructor(private http: HttpClient) { }

  getMeByToken():Observable<CurrentCompany>{
    const url = `${this.apiUrl}/me`
    return this.http.get<CurrentCompany>(url);
  }
  
  updateCurrentCompany(currentCompany: CurrentCompany): Observable<void> {
    const url = `${this.apiUrl}/me`
    return this.http.put<void>(url, currentCompany).pipe(
      tap(() => {
        this.CurrentCompanyRefreshRequired.next()
      })
    );
  }
}
