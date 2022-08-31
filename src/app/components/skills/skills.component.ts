import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
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
export class SkillsComponent implements OnInit, OnDestroy {
  @Input() skills: Skill[];
  skillType;
  notification: any
  subscription: Subscription = new Subscription
  constructor(
    private skillService: SkillService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.skills = []
    this.skillType = SkillType;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const s1$ = this.skillService.RefreshRequired.subscribe(() => this.getSkills())
    const s2$ = this.notificationService.RequestNotification.subscribe((notification) => this.notification = notification)
    this.subscription.add(s1$)
    this.subscription.add(s2$)
  }

  getSkills() {
    const s3$ = this.skillService.getMeByToken().subscribe({
      next: skills => {
        this.skills = skills
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

  onAddSkill(type: SkillType) {
    this.loaderService.showLoading()
    const newSkill: any = { type: type, name: "Skill", percent: 1 }
    const s4$ = this.skillService.addSkill(newSkill).subscribe({
      next: data => {
        this.notificationService.requestNotification(
          {
            type: NotificationType.SUCCESS,
            message: NotificationMessage.SKILL_ADD
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
