import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { CurrentCompany } from 'src/app/models/CurrentCompany';
import { Portfolio } from 'src/app/models/Portfolio';
import { CurrentCompanyService } from 'src/app/services/current-company.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-current-company',
  templateUrl: './current-company.component.html',
  styleUrls: ['./current-company.component.css']
})
export class CurrentCompanyComponent implements OnInit,OnDestroy {
  @Input() currentCompany!: CurrentCompany;
  isOnShowDetails: Boolean
  subscription:Subscription=new Subscription

  constructor(
    private currentCompanyService: CurrentCompanyService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) { this.isOnShowDetails = true }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const s1$=this.currentCompanyService.CurrentCompanyRefreshRequired.subscribe(() => this.getCurrentCompany())
    this.subscription.add(s1$)
  }
  getCurrentCompany() {
    const s2$=this.currentCompanyService.getMeByToken().subscribe({
      next: response => {
        this.currentCompany = response
        this.loaderService.hideLoading()
        this.notificationService.showNotification({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.COMPANY_EDIT
        })
      },
      error:error=>{
        this.loaderService.hideLoading()
        throw error
      }
    })
    this.subscription.add(s2$)
  }
  toggleEditCurrentCompany() {
    this.isOnShowDetails = false;
  }
  showDetails() {
    this.isOnShowDetails = true;
  }
}
