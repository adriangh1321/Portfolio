import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {

  @Input() banner!: string;
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
    const s1$ = this.portfolioService.BannerRefreshRequired.subscribe(() => this.getBanner())
    this.subscription.add(s1$)
  }

  getBanner() {
    const s2$ = this.portfolioService.getBanner().subscribe({
      next: response => {
        this.banner = response['banner']
        this.loaderService.hideLoading()
        this.notificationService.showNotification({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.BANNER_EDIT
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
  toggleEditBanner() {
    this.isOnShowDetails = false
  }

}
