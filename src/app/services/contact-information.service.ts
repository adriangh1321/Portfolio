import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ContactInformation } from '../models/ContactInformation';

@Injectable({
  providedIn: 'root'
})
export class ContactInformationService {

  private apiUrl: string = "https://portfolio-argprograma.herokuapp.com/v1/contactInformations"

  private _contactInformationRefreshRequired = new Subject<number>()

  get ContactInformationRefreshRequired() {
    return this._contactInformationRefreshRequired;
  }

  constructor(private http: HttpClient) { }

  getById(id:number):Observable<ContactInformation>{
    const url = `${this.apiUrl}/${id}`
    return this.http.get<ContactInformation>(url);
  }
  
  updateContactInformation(id: number, contactInformation: ContactInformation): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, contactInformation).pipe(
      tap(() => {
        this.ContactInformationRefreshRequired.next(id)
      })
    );
  }
}
