import { Component, Input, OnInit } from '@angular/core';
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
export class CurrentCompanyComponent implements OnInit {
  @Input() currentCompany!: CurrentCompany;
  isOnShowDetails: Boolean
  constructor(
    private currentCompanyService: CurrentCompanyService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) { this.isOnShowDetails = true }

  ngOnInit(): void {
    this.currentCompanyService.CurrentCompanyRefreshRequired.subscribe((id) => this.getCurrentCompany(id))
  }
  getCurrentCompany(id: number) {
    this.currentCompanyService.getById(id).subscribe({
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
  }
  toggleEditCurrentCompany() {
    this.isOnShowDetails = false;
  }
  showDetails() {
    this.isOnShowDetails = true;
  }
}
