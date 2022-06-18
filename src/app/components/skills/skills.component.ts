import { Component, Input, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enums/NotificationType';
import { SkillType } from 'src/app/enums/SkillType';
import { Skill } from 'src/app/models/Skill';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  @Input() skills: Skill[];
  @Input() skillType: SkillType;
  notification: any
  constructor(
    private skillService: SkillService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.skills = []
    this.skillType = SkillType.NONE;
  }

  ngOnInit(): void {
    this.skillService.RefreshRequired.subscribe(() => this.getSkills(parseInt(localStorage.getItem("id_portfolio")!)))
    this.notificationService.RequestNotification.subscribe((notification)=>this.notification=notification)
  }

  getSkills(idPortfolio: number) {
    this.skillService.getSkillsByPortfolioId(idPortfolio).subscribe({
      next: skills => { 
        this.skills=skills
        this.loaderService.hideLoading()
        this.notificationService.showNotification(this.notification)
       },
      error: error => { 
        this.loaderService.hideLoading()
        throw error }

    })
  }

}
