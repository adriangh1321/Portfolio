import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Skill } from 'src/app/models/Skill';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.css']
})
export class SkillDetailsComponent implements OnInit {
  @Input() skill: Skill;
  @Output() onToggleEditSkill = new EventEmitter()
  constructor(
    private skillService: SkillService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.skill = new Skill()
  }

  ngOnInit(): void {
  }

  editSkill() {
    this.onToggleEditSkill.emit()
  }

  removeSkill() {
    this.loaderService.showLoading()
    this.skillService.deleteSkill(this.skill.id).subscribe({
      next: data => this.notificationService.requestNotification(
        {
          type: NotificationType.SUCCESS,
          message: NotificationMessage.SKILL_DELETE
        }),
      error: error=>{
        this.loaderService.hideLoading()
        throw error
      }})
    }
  

}
