import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Experience } from '../models/Experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {


  private apiUrl: string = "http://localhost:8080/v1/experiences"

  private _refreshRequired = new Subject<void>()

  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  // getExperienceById(id: number): Observable<Experience> {
  //   const url = `${this.apiUrl}/${id}`
  //   return this.http.get<Experience>(url)
  // }

  updateExperience(id: number, experience: Experience): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, experience).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );

  }

  getExperiencesByPortfolioId(idPortfolio: number): Observable<Experience[]> {
    let params = new HttpParams().set('portfolioId', idPortfolio)
    return this.http.get<Experience[]>(this.apiUrl, { params: params })
  }

  addExperience(experience:any): Observable<void> {
    return this.http.post<void>(this.apiUrl, experience).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }

}
