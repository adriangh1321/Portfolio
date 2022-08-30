import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';

import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../models/Education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiUrl: string = `${environment.baseUrl}/v1/educations`

  private _refreshRequired = new Subject<void>()

  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  updateEducation(id: number, education: Education): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, education).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );

  }

  addEducation(education: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, education).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }

  getMeByToken(): Observable<Education[]> {
    const url = `${this.apiUrl}/me`
    return this.http.get<Education[]>(url).pipe(
      map(response => {
        response.forEach(education => {
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

  deleteEducation(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }
}
