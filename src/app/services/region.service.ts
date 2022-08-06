import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/Country';
import { Region } from '../models/Region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl: string = `${environment.baseUrl}/v1/regions`
 

  constructor(private http: HttpClient) { }

  getAllByCountry(idCountry: number) {
    const url = `${this.apiUrl}/country/${idCountry}`
    return this.http.get<Region[]>(url)
  }

  
}
