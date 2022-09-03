import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public static returned:Subject<any>=new Subject()
  profiles: Profile[]
  nickname!: string;

  doScroll!: boolean

  constructor(
    private portfolioService: PortfolioService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private scrollService: ScrollService) {

    this.profiles = []
    
  }

  ngOnInit(): void {
    this.doScroll=false
    this.scrollService.scrollRequest.subscribe(()=>{
      this.doScroll=true
    })

    this.nickname = this.authService.getNickname();

    this.route.data.subscribe(data => {

      this.profiles = this.route.snapshot.data["profiles"]

      this.loaderService.hideLoading()
      if(this.doScroll){
        this.onView()
      }
    })

    // this.profiles = this.route.snapshot.data["profiles"]

    // this.loaderService.hideLoading()


  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  onView() {
    this.scrollService.scrollTo('profiles-container')
  }

}
