import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl: string = `${environment.baseUrl}/v1/countries`
 

  constructor(private http: HttpClient) { }

  getAll():Observable<Country[]>{
    return this.http.get<Country[]>(this.apiUrl)
  }
}
