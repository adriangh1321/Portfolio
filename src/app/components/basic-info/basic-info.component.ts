import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @Input() portfolio!: Portfolio;
  isOnShowDetails: boolean
  constructor(private portfolioService: PortfolioService) {
    this.isOnShowDetails = true;
  }

  ngOnInit(): void {
    this.portfolioService.BasicInfoRefreshRequired.subscribe(() => this.getBasicInfo(parseInt(localStorage.getItem("id_portfolio")!)))
  }

  getBasicInfo(idPortfolio: number) {
    this.portfolioService.getBasicInfo(idPortfolio).subscribe(response => {
      this.portfolio.firstname = response['firstname']
      this.portfolio.lastname = response['lastname']
      this.portfolio.ocupation = response['ocupation']
      this.portfolio.country = response['country']
      this.portfolio.state = response['state']
      this.portfolio.image = response['image']
    })
  }


  showDetails() {
    this.isOnShowDetails = true
  }
  toggleEditBasicInfo() {
    this.isOnShowDetails = false
  }

}
