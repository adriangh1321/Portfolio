import { Component, Inject, Input, NgZone, OnInit } from '@angular/core';
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

export class ExperiencesComponent implements OnInit {
  @Input() experiences: Experience[];
  notification!:any;
  constructor(private experienceService: ExperienceService, private loaderService: LoaderService,private notificationService:NotificationService) {
    this.experiences = []
  }

  ngOnInit(): void {
    this.experienceService.RefreshRequired.subscribe(() => this.getExperiences(parseInt(localStorage.getItem("id_portfolio")!)))
    this.notificationService.RequestNotification.subscribe((notification)=>this.notification=notification)
  }

  getExperiences(idPortfolio: number) {
    
    
    this.experienceService.getExperiencesByPortfolioId(idPortfolio)
    .subscribe({
      next: experiences => { 
        this.experiences=experiences
        this.loaderService.hideLoading()
        this.notificationService.showNotification(this.notification)
        
        
       },
      error: error => { 
        this.loaderService.hideLoading()
        this.notificationService.showNotification({type:NotificationType.ERROR,message:"There was an error loading the experiences"})
        console.log(error) }
    })
    
  }
}
