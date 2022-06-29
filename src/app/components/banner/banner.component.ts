import { Component, Input, OnInit } from '@angular/core';
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
export class BannerComponent implements OnInit {

  @Input() banner!: string;
  isOnShowDetails: boolean
  constructor(
    private portfolioService: PortfolioService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.isOnShowDetails = true;
  }

  ngOnInit(): void {
    this.portfolioService.BannerRefreshRequired.subscribe(() => this.getBanner())
  }

  getBanner() {
    this.portfolioService.getBanner().subscribe({
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
  }


  showDetails() {
    this.isOnShowDetails = true
  }
  toggleEditBanner() {
    this.isOnShowDetails = false
  }

}
