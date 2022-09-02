import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { ContactInformationService } from 'src/app/services/contact-information.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit, OnDestroy {
  @Input() contactInformation!: ContactInformation;
  isOnShowDetails: Boolean
  subscription: Subscription = new Subscription

  constructor(
    private contactInformationService: ContactInformationService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) { this.isOnShowDetails = true }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const s1$ = this.contactInformationService.ContactInformationRefreshRequired.subscribe(() => this.getContactInformation())
    this.subscription.add(s1$)
  }
  getContactInformation() {
    const s2$ = this.contactInformationService.getMeByToken().subscribe({
      next: response => {
        this.contactInformation = response
        this.loaderService.hideLoading()
        this.notificationService.showNotification({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.CONTACT_EDIT
        })
      },
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
    })
    this.subscription.add(s2$)
  }
  toggleEditContactInformation() {
    this.isOnShowDetails = false;
  }
  showDetails() {
    this.isOnShowDetails = true;
  }

}
