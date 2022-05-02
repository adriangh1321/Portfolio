import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Experience } from '../models/Experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {


  private apiUrl: string = "http://localhost:5001/persons"

  private _refreshRequired = new Subject<void>()

  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  getExperienceById(id: number): Observable<Experience> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Experience>(url)
  }

  updateExperience(id: number, experience: Experience): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, experience).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }



}
