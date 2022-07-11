import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class BasicInfoComponent implements OnInit, OnDestroy {
  @Input() portfolio!: Portfolio;
  isOnShowDetails: boolean
  subscription: Subscription = new Subscription
  constructor(
    private portfolioService: PortfolioService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.isOnShowDetails = true;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const s1$ = this.portfolioService.BasicInfoRefreshRequired.subscribe(() => this.getBasicInfo(parseInt(localStorage.getItem("id_portfolio")!)))
    this.subscription.add(s1$)
  }

  getBasicInfo(idPortfolio: number) {
    const s2$ = this.portfolioService.getBasicInfo(idPortfolio).subscribe({
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
    this.subscription.add(s2$)
  }


  showDetails() {
    this.isOnShowDetails = true
  }
  toggleEditBasicInfo() {
    this.isOnShowDetails = false
  }

}
