import { Component, Input, OnInit } from '@angular/core';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Portfolio } from 'src/app/models/Portfolio';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @Input() portfolio!: Portfolio;
  isOnShowDetails: boolean
  constructor(
    private portfolioService: PortfolioService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.isOnShowDetails = true;
  }

  ngOnInit(): void {
    this.portfolioService.BasicInfoRefreshRequired.subscribe(() => this.getBasicInfo(parseInt(localStorage.getItem("id_portfolio")!)))
  }

  getBasicInfo(idPortfolio: number) {
    this.portfolioService.getBasicInfo(idPortfolio).subscribe({
      next: response => {
        this.portfolio.firstname = response['firstname']
        this.portfolio.lastname = response['lastname']
        this.portfolio.ocupation = response['ocupation']
        this.portfolio.country = response['country']
        this.portfolio.state = response['state']
        this.portfolio.image = response['image']
        this.loaderService.hideLoading()
        this.notificationService.showNotification({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.BASIC_EDIT
        })
      },
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }

    })
  }


  showDetails() {
    this.isOnShowDetails = true
  }
  toggleEditBasicInfo() {
    this.isOnShowDetails = false
  }

}
