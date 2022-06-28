import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactInformation } from '../models/ContactInformation';

@Injectable({
  providedIn: 'root'
})
export class ContactInformationService {

  private apiUrl: string = `${environment.baseUrl}/v1/contactInformations`

  private _contactInformationRefreshRequired = new Subject<number>()
  private _contactInformationRequired=new Subject<ContactInformation>()


  get ContactInformationRefreshRequired() {
    return this._contactInformationRefreshRequired;
  }
  contactInformationRequired$(){
    return this._contactInformationRequired.asObservable()
  }

  constructor(private http: HttpClient) { }

  getById(id:number):Observable<ContactInformation>{
    const url = `${this.apiUrl}/${id}`
    return this.http.get<ContactInformation>(url).pipe(
      tap((contactInformation)=>this.emitContactInformation(contactInformation))
    );
  }
  
  updateContactInformation(id: number, contactInformation: ContactInformation): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<void>(url, contactInformation).pipe(
      tap(() => {
        this.ContactInformationRefreshRequired.next(id)
      })
    );
  }

  emitContactInformation(contactInformation:ContactInformation){
    console.log(contactInformation)
    this._contactInformationRequired.next(contactInformation)
  }
}
