import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { LoaderService } from 'src/app/services/loader.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profiles:Profile[]
  constructor(private portfolioService:PortfolioService,private loaderService:LoaderService,
    private route: ActivatedRoute,
    private router:Router) { 
    this.profiles=[]
  }

  ngOnInit(): void {
    
    this.route.data.subscribe(data=>{
      console.log(data)
      
      this.profiles = this.route.snapshot.data["profiles"]
    this.loaderService.hideLoading()})


  }

}
