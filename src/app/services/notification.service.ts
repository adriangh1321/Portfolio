import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly _notificationSubject$ = new Subject<Notification>()
  private readonly _requestNotificacion$ = new Subject<Notification>()
  constructor(readonly zone: NgZone) { }

  notification$() {
    return this._notificationSubject$.asObservable();
  }
  get RequestNotification() {
    return this._requestNotificacion$
  }

  showNotification(notification: Notification) {
    this.zone.run(()=>this._notificationSubject$.next(notification))
  }
  requestNotification(notification: Notification) {
    this._requestNotificacion$.next(notification)
  }



}
