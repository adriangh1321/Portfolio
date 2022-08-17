import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent,Event } from '@angular/router';
import { filter } from 'rxjs';
import { NotificationType } from './enums/NotificationType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  isLoading:boolean;
  mySubscription;
 
  
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

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         // Trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
      }
    }); 
  }
 
  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  switchLoader(event:boolean){
    this.isLoading=event;
  }
}