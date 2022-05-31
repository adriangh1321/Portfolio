import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Portfolio } from '../models/Portfolio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl: string = "http://localhost:8080/v1/portfolios"
  private token:string=localStorage.getItem('auth_token')!

  // private _refreshRequired = new Subject<void>()
  private _aboutMeRefreshRequired = new Subject<void>()
  private _basicInfoRefreshRequired = new Subject<void>()

  // get RefreshRequired() {
  //   return this._refreshRequired;
  // }

  get AboutMeRefreshRequired(){
    return this._aboutMeRefreshRequired;
  }
  get BasicInfoRefreshRequired(){
    return this._basicInfoRefreshRequired;
  }

  constructor(private http: HttpClient) { }

  getMeByToken(): Observable<Portfolio> {
    const url = `${this.apiUrl}/me`
    let header = new HttpHeaders().set(
      "Authorization",
    `Bearer ${this.token}`
    );
    return this.http.get<Portfolio>(url,{headers:header}).pipe(
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
        localStorage.setItem("id_portfolio", response.id.toString())

        return response
      }))
  }

  // getPortfolioById(id: number): Observable<Portfolio> {
  //   const url = `${this.apiUrl}/${id}`
  //   return this.http.get<Portfolio>(url).pipe(
  //     map(response => {
  //       response.experiences.forEach(experience => {
  //         if (experience.startDate !== null) {
  //           experience.startDate = moment(experience.startDate, 'YYYY-MM-DD').toDate()
  //         }

  //         if (experience.endDate !== null) {
  //           experience.endDate = moment(experience.endDate, 'YYYY-MM-DD').toDate()
  //         }
  //       })
  //       response.educations.forEach(education => {
  //         if (education.startDate !== null) {
  //           education.startDate = moment(education.startDate, 'YYYY-MM-DD').toDate()
  //         }

  //         if (education.endDate !== null) {
  //           education.endDate = moment(education.endDate, 'YYYY-MM-DD').toDate()
  //         }
  //       })

  //       return response
  //     }))
  // }

  // updatePortfolio(id: number, portfolio: Portfolio): Observable<void> {
  //   const url = `${this.apiUrl}/${id}`
  //   return this.http.put<void>(url, portfolio).pipe(
  //     tap(() => {
  //       this.RefreshRequired.next()
  //     })
  //   );
  // }

  updateAboutMe(id: number, aboutMe: any): Observable<void> {
    const url = `${this.apiUrl}/${id}/aboutMe`
    return this.http.patch<void>(url, aboutMe).pipe(
      tap(() => {
        this.AboutMeRefreshRequired.next()
      })
    );
  }
  
  getAboutMe(id:number):Observable<any>{
    const url = `${this.apiUrl}/${id}/aboutMe`
    return this.http.get<any>(url)
  }

  patchBasicInfo(id:number,basicInfo:any):Observable<any>{
    const url = `${this.apiUrl}/${id}`
    return this.http.patch<void>(url, basicInfo).pipe(
      tap(() => {
        this.BasicInfoRefreshRequired.next()
      })
    );
  }

  getBasicInfo(id:number):Observable<any>{
    const url = `${this.apiUrl}/${id}/basicInfo`
    return this.http.get<any>(url)
  }

}

