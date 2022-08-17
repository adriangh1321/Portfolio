import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profiles:Profile[]
  nickname!:string;
  constructor(
    private portfolioService:PortfolioService,
    private loaderService:LoaderService,
    private route: ActivatedRoute,
    private router:Router,
    private authService:AuthService) { 
      
    this.profiles=[]
  }

  ngOnInit(): void {
    this.nickname=this.authService.getNickname();
    
    this.route.data.subscribe(data=>{
      console.log(data)
      
      this.profiles = this.route.snapshot.data["profiles"]
    this.loaderService.hideLoading()})


  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

}
