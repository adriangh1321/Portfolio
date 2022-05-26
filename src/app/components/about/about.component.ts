import { Component, Input, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Input() aboutMe: string;
  isOnShowDetails: boolean = true

  constructor(private portfolioService: PortfolioService) {
    this.aboutMe = ''
  }

  ngOnInit(): void {
    this.portfolioService.AboutMeRefreshRequired.subscribe(() => this.getAboutMe(parseInt(localStorage.getItem("id_portfolio")!)))
  }

  getAboutMe(idPortfolio: number) {
    this.portfolioService.getAboutMe(idPortfolio).subscribe(response => this.aboutMe = response['aboutMe'])
  }

  showDetails() {
    this.isOnShowDetails = true
  }
  toggleEditAboutMe() {
    this.isOnShowDetails = false
  }


}
