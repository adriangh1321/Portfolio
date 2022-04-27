import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Person } from '../models/Person';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl: string = "http://localhost:5001/persons"

  private _refreshRequired = new Subject<void>()

  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  getPersonById(id: number): Observable<Person> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Person>(url)
  }

  updatePerson(id: number, person: Person): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, person).pipe(
      tap(() => {
        this.RefreshRequired.next()
      })
    );
  }
}

