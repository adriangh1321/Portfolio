import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class AboutComponent implements OnInit,OnDestroy {
  @Input() aboutMe: string;
  isOnShowDetails: boolean = true
  subscription:Subscription=new Subscription

  constructor(
    private portfolioService: PortfolioService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.aboutMe = ''
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const s1$=this.portfolioService.AboutMeRefreshRequired.subscribe(() => this.getAboutMe())
    this.subscription.add(s1$)
  }

  getAboutMe() {
    const s2$=this.portfolioService.getAboutMe().subscribe({
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
    this.subscription.add(s2$)
  }

  showDetails() {
    this.isOnShowDetails = true
  }
  toggleEditAboutMe() {
    this.isOnShowDetails = false
  }


}
