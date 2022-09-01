import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class InterestsComponent implements OnInit, OnDestroy {
  @Input() interests: Interest[];
  notification: any
  subscription: Subscription = new Subscription

  constructor(
    private interestService: InterestService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.interests = []
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const s1$ = this.interestService.InterestsRefreshRequired.subscribe(() => this.getInterests())
    const s2$ = this.notificationService.RequestNotification.subscribe(notification => this.notification = notification)
    this.subscription.add(s1$)
    this.subscription.add(s2$)
  }

  getInterests() {
    const s3$ = this.interestService.getMeByToken().subscribe({
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
    this.subscription.add(s3$)
  }

  addInterest() {
    this.loaderService.showLoading()
    const newInterest: any = { name: "New", image: "./assets/img/new-interest.jpg", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!) }
    const s4$ = this.interestService.addInterest(newInterest).subscribe({
      next: data => {
        this.notificationService.requestNotification({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.INTER_ADD
        })
      },
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
    })
    this.subscription.add(s4$)
  }
}
