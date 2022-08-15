import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { SkillType } from 'src/app/enums/SkillType';
import { Portfolio } from 'src/app/models/Portfolio';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit,OnDestroy {
  portfolio: Portfolio;
  skillType = SkillType;
  subscription: Subscription = new Subscription;


  constructor(
    private experienceService: ExperienceService,
    private educationService: EducationService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private notificationService: NotificationService,

  ) {
    this.portfolio = new Portfolio();


  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    
    const s1$=this.route.params.subscribe(data=>this.portfolio = this.route.snapshot.data["portfolio"])
    this.subscription.add(s1$)

  }



  onAddExperience() {
    this.loaderService.showLoading()
    const newExperience: any = { position: "Position", company: "Company", description: "Description", image: null, state: "State", country: "Country", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!)}
    const s2$=this.experienceService.addExperience(newExperience).subscribe({
      next: () => {
        this.notificationService.requestNotification(
          {
            type: NotificationType.SUCCESS,
            message: NotificationMessage.EXP_ADD
          })
      },
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
    })
    this.subscription.add(s2$)
  }

  onAddEducation() {
    this.loaderService.showLoading()
    const newEducation: any = { title: "Title", institute: "Institute", image: null, idPortfolio: parseInt(localStorage.getItem("id_portfolio")!), startDate: new Date().toISOString().slice(0, 10) }
    const s3$= this.educationService.addEducation(newEducation).subscribe({
      next: () => {
        this.notificationService.requestNotification(
          {
            type: NotificationType.SUCCESS,
            message: NotificationMessage.EDU_ADD
          })
      },
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
    })
    this.subscription.add(s3$)
  }



  onAddProject() {
    this.loaderService.showLoading()
    const newProject: any = { name: "Name", description: "Description", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!),startDate: new Date().toISOString().slice(0, 10) }
    const s4$=this.projectService.addProject(newProject).subscribe({
      next: () => {
        this.notificationService.requestNotification(
          {
            type: NotificationType.SUCCESS,
            message: NotificationMessage.PROJ_ADD
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




