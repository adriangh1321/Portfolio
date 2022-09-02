import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Education } from 'src/app/models/Education';
import { EducationService } from 'src/app/services/education.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-educations',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.css']
})
export class EducationsComponent implements OnInit,OnDestroy {
  @Input() educations: Education[];
  notification!: any
  subscription:Subscription=new Subscription
  constructor(
    private educationService: EducationService,
    private notificationService: NotificationService,
    private loaderService: LoaderService) {
    this.educations = []
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const s1$=this.educationService.RefreshRequired.subscribe(() => this.getEducations())
    const s2$=this.notificationService.RequestNotification.subscribe((notification) => this.notification = notification)
    this.subscription.add(s1$)
    this.subscription.add(s2$)
  }

  getEducations() {
    const s3$=this.educationService.getMeByToken().subscribe({
      next: educations => {
        this.educations = educations
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
}
