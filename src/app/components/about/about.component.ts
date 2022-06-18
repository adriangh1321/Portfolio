import { Component, Input, OnInit } from '@angular/core';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Input() aboutMe: string;
  isOnShowDetails: boolean = true

  constructor(
    private portfolioService: PortfolioService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.aboutMe = ''
  }

  ngOnInit(): void {
    this.portfolioService.AboutMeRefreshRequired.subscribe(() => this.getAboutMe(parseInt(localStorage.getItem("id_portfolio")!)))
  }

  getAboutMe(idPortfolio: number) {
    this.portfolioService.getAboutMe(idPortfolio).subscribe({
      next: data => {
        this.aboutMe = data.aboutMe
        this.loaderService.hideLoading()
        this.notificationService.showNotification({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.ABOUT_EDIT
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
  toggleEditAboutMe() {
    this.isOnShowDetails = false
  }


}
