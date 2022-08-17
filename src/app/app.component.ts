import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, Event } from '@angular/router';
import { filter } from 'rxjs';
import { NotificationType } from './enums/NotificationType';
import { Meta } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  isLoading: boolean;
  mySubscription;


  constructor(public router: Router, private metaService: Meta) {
    this.isLoading = false;
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

  ngOnInit() {
    let height =window.visualViewport.height;
    let width = window.visualViewport.width;
    this.metaService.updateTag({
      name: 'viewport',
      content: `height=${height}, width=${width}, initial-scale=1.0`
    },
      `name='viewport'`
    );
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  switchLoader(event: boolean) {
    this.isLoading = event;
  }
}