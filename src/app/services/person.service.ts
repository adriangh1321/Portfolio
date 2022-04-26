import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import {HttpClient,HttpHandler} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl:string="http://localhost:5001/persons"

  constructor(private http: HttpClient ) { }

  getPersonById(id:number):Observable<Person>{
    const url=`${this.apiUrl}/${id}`
    return this.http.get<Person>(url)
  }
}
