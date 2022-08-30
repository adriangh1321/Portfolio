import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private _scrollRequest = new Subject<void>()
  constructor() { }

  get scrollRequest() {
    return this._scrollRequest.asObservable()
  }

  scrollEmit() {
    this._scrollRequest.next();
  }

  scrollTo(id: string) {
    let element = document.getElementById(id);
    if (element !== null) {
      element.scrollIntoView();
    }
  }
}
