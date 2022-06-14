import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent,Event } from '@angular/router';
import { filter } from 'rxjs';
import { NotificationType } from './enums/NotificationType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading:boolean;
 
  
  constructor(public router: Router) {
    this.isLoading=false;
    router.events.pipe(
       filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      switch (true) {
        case e instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case e instanceof NavigationEnd: {
          this.isLoading = false;
          break;
        }
      }
    });
  }

  switchLoader(event:boolean){
    this.isLoading=event;
  }
}