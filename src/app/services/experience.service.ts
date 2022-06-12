import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experience } from '../models/Experience';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {


  private apiUrl: string = `${environment.baseUrl}/v1/experiences`

  private _refreshRequired = new Subject<void>()
 

  get RefreshRequired() {
    return this._refreshRequired;
  }
  

  constructor(private http: HttpClient) { }

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
    return this.http.get<Experience[]>(this.apiUrl, { params: params }).pipe(
      map(response => {
        response.forEach(experience => {
          if (experience.startDate !== null) {
            experience.startDate = moment(experience.startDate, 'YYYY-MM-DD').toDate()
          }

          if (experience.endDate !== null) {
            experience.endDate = moment(experience.endDate, 'YYYY-MM-DD').toDate()
          }

        })
        
        return response
      }))
  }

  addExperience(experience: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, experience).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }

  deleteExperience(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }

}
