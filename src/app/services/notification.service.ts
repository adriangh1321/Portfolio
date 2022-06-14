import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notificationSubject$ = new Subject<Notification>()
  constructor(readonly zone: NgZone) { }

  notification$() {
    return this.notificationSubject$.asObservable();
  }

  showNotification(notification: Notification) {
    this.zone.run(()=>this.notificationSubject$.next(notification))
    
  }

}
