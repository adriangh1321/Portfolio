import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/Skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl: string = `${environment.baseUrl}/v1/skills`

  private _refreshRequired = new Subject<void>()

  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  updateSkill(id: number, skill: Skill): Observable<void> {
    const url = `${this.apiUrl}/me/${id}`
    return this.http.put<void>(url, skill).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );

  }

  getMeByToken(): Observable<Skill[]> {
    const url = `${this.apiUrl}/me`
    return this.http.get<Skill[]>(url)
  }

  addSkill(skill: any): Observable<void> {
    const url = `${this.apiUrl}/me`
    return this.http.post<void>(url, skill).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }

  deleteSkill(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }

}
