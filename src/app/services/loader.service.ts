import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loaderRequired=new Subject<boolean>()
  get LoaderRequired(){
    return this._loaderRequired;
  }
  constructor() { }
  

  showLoading(){
    this.LoaderRequired.next(true);
  }

  hideLoading(){
    this.LoaderRequired.next(false);
  }
}
