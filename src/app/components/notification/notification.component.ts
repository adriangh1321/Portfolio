import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationType } from 'src/app/enums/NotificationType';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/Notification';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  
  notification$:Observable<Notification>=this.notificationService.notification$()

  notificationType=NotificationType

  constructor(private notificationService:NotificationService) { }
  
  ngOnInit(): void {
    
   this.notification$.subscribe((notification)=> {
    console.log("este es el notificador")
    console.log(notification)
    setTimeout(() => {
    this.notification$=this.notificationService.notification$()
  }, 3000)})
  }
 

  close(){
    this.notification$=this.notificationService.notification$()
  }



}
