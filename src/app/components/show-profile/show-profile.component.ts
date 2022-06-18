import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { SkillType } from 'src/app/enums/SkillType';
import { Portfolio } from 'src/app/models/Portfolio';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ProjectService } from 'src/app/services/project.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
  portfolio: Portfolio;
  skillType = SkillType;


  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private experienceService: ExperienceService,
    private educationService: EducationService,
    private skillService: SkillService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private notificationService: NotificationService,

  ) {
    this.portfolio = new Portfolio();


  }

  ngOnInit(): void {
    this.portfolio = this.route.snapshot.data["portfolio"]
    // this.portfolioService.getMeByToken().subscribe((res) => {
    //   this.portfolio = res
    // }) 
  }



  onAddExperience() {
    this.loaderService.showLoading()
    const newExperience: any = { position: "Position", company: "Company", description: "Description", image: null, state: "State", country: "Country", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!), startDate: new Date().toISOString().slice(0, 10) }
    this.experienceService.addExperience(newExperience).subscribe({
      next: data => {
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
  }

  onAddEducation() {
    this.loaderService.showLoading()
    const newEducation: any = { title: "Title", institute: "Institute", image: null, idPortfolio: parseInt(localStorage.getItem("id_portfolio")!), startDate: new Date().toISOString().slice(0, 10) }
    this.educationService.addEducation(newEducation).subscribe({
      next: data => {
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
  }

  

  onAddProject() {
    const newProject: any = { name: "Name", description: "Description", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!) }
    this.projectService.addProject(newProject).subscribe({
      next: data => { alert("The project was added successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }


}




