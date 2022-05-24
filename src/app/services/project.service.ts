import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl: string = "http://localhost:8080/v1/projects"

  private _refreshRequired = new Subject<void>()

  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  updateProject(id: number, project: Project): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, project).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );

  }

  getProjectsByPortfolioId(idPortfolio: number): Observable<Project[]> {
    let params = new HttpParams().set('portfolioId', idPortfolio)
    return this.http.get<Project[]>(this.apiUrl, { params: params })
  }

  addProject(project: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, project).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }

  deleteProject(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }

}
