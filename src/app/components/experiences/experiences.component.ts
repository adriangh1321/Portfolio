import { Component, Inject, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Experience } from 'src/app/models/Experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})

export class ExperiencesComponent implements OnInit,OnDestroy {
  @Input() experiences: Experience[];
  notification!:any;
  subscription: Subscription = new Subscription;
  constructor(private experienceService: ExperienceService, private loaderService: LoaderService,private notificationService:NotificationService) {
    this.experiences = []
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  
  }

  ngOnInit(): void {
    const s1$=this.experienceService.RefreshRequired.subscribe(() => this.getExperiences(parseInt(localStorage.getItem("id_portfolio")!)))
    const s2$=this.notificationService.RequestNotification.subscribe((notification)=>this.notification=notification)
    this.subscription.add(s1$)
    this.subscription.add(s2$)
  }

  getExperiences(idPortfolio: number) {
    
    
    const s3$=this.experienceService.getExperiencesByPortfolioId(idPortfolio)
    .subscribe({
      next: experiences => { 
        this.experiences=experiences
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
