import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  private _buttonRequired = new BehaviorSubject<boolean>(false)

  constructor(private zone:NgZone) { }

  public buttonRequired$() {
    return this._buttonRequired.asObservable()
  }

  activateButton(){
    this._buttonRequired.next(true)
  }

  disableButton(){
   this._buttonRequired.next(false)
  }




}
