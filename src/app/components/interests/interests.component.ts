import { Component, Input, OnInit } from '@angular/core';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Interest } from 'src/app/models/Interest';
import { InterestService } from 'src/app/services/interest.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  @Input() interests: Interest[];
  notification: any

  constructor(
    private interestService: InterestService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.interests = []
  }

  ngOnInit(): void {
    this.interestService.InterestsRefreshRequired.subscribe(() => this.getInterests(parseInt(localStorage.getItem("id_portfolio")!)))
    this.notificationService.RequestNotification.subscribe(notification => this.notification = notification)
  }

  getInterests(idPortfolio: number) {
    this.interestService.getInterestsByPortfolioId(idPortfolio).subscribe({
      next: interests => {
        this.interests = interests
        this.loaderService.hideLoading()
        this.notificationService.showNotification(this.notification)
      },
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
    })
  }

  addInterest() {
    this.loaderService.showLoading()
    const newInterest: any = { name: "New", image: "./assets/img/new-interest.jpg", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!) }
    this.interestService.addInterest(newInterest).subscribe({
      next: data => { this.notificationService.requestNotification({
        type:NotificationType.SUCCESS,
        message:NotificationMessage.INTER_ADD
      })},
      error: error => { 
        this.loaderService.hideLoading()
        throw error
      }
    })
  }
}
