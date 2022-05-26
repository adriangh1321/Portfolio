import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Portfolio } from '../models/Portfolio';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Experience } from '../models/Experience';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl: string = "http://localhost:8080/v1/portfolios"

  private _refreshRequired = new Subject<void>()

  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  getPortfolioById(id: number): Observable<Portfolio> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Portfolio>(url).pipe(
      map(response => {
        response.experiences.forEach(experience => {
          if (experience.startDate !== null) {
            experience.startDate = moment(experience.startDate, 'YYYY-MM-DD').toDate()
          }

          if (experience.endDate !== null) {
            experience.endDate = moment(experience.endDate, 'YYYY-MM-DD').toDate()
          }
        })
        response.educations.forEach(education => {
          if (education.startDate !== null) {
            education.startDate = moment(education.startDate, 'YYYY-MM-DD').toDate()
          }

          if (education.endDate !== null) {
            education.endDate = moment(education.endDate, 'YYYY-MM-DD').toDate()
          }
        })

        return response
      }))
  }

  updatePortfolio(id: number, portfolio: Portfolio): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, portfolio).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }

  updateAboutMe(id: number, aboutMe: any): Observable<void> {
    const url = `${this.apiUrl}/${id}/aboutMe`
    return this.http.patch<void>(url, aboutMe).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }
  
  getAboutMe(id:number):Observable<any>{
    const url = `${this.apiUrl}/${id}/aboutMe`
    return this.http.get<any>(url)
  }

}

