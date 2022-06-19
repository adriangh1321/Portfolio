import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Interest } from 'src/app/models/Interest';
import { InterestService } from 'src/app/services/interest.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-interest-details',
  templateUrl: './interest-details.component.html',
  styleUrls: ['./interest-details.component.css']
})
export class InterestDetailsComponent implements OnInit {
  @Input() interest: Interest;

  @Output() onToggleEditInterest = new EventEmitter()
  constructor(
    private interestService: InterestService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.interest = new Interest()
  }

  ngOnInit(): void {
  }

  editInterest() {
    this.onToggleEditInterest.emit()
  }

  removeInterest() {
    this.loaderService.showLoading()
    this.interestService.deleteInterest(this.interest.id).subscribe({
      next: data => this.notificationService.requestNotification({
        type: NotificationType.SUCCESS,
        message: NotificationMessage.INTER_DELETE
      }),
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
    })
  }

}
