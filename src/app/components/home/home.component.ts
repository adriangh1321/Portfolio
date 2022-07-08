import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profiles:Profile[]
  constructor(private portfolioService:PortfolioService,
    private route: ActivatedRoute,) { 
    this.profiles=[]
  }

  ngOnInit(): void {
    this.route.params.subscribe(data=>this.profiles = this.route.snapshot.data["profiles"])

    // this.portfolioService.getProfiles().subscribe({
    //   next:profiles=>this.profiles=profiles,
    //   error:error=>{throw error}
    // })
  }

}
