import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Experience } from 'src/app/models/Experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.css']
})
export class ExperienceDetailsComponent implements OnInit {
  @Input() experience: Experience;
  @Output() onToggleEditExperience = new EventEmitter()
  constructor(private experienceService: ExperienceService, private notificationService: NotificationService, private loaderService: LoaderService) {
    this.experience = new Experience()
  }

  ngOnInit(): void {
  }

  editExperience() {
    this.onToggleEditExperience.emit()
  }

  removeExperience() {
    this.loaderService.showLoading()
    this.experienceService.deleteExperience(this.experience.id).subscribe({
      next: data => this.notificationService.requestNotification({ type: NotificationType.SUCCESS, message: NotificationMessage.EXP_DELETE }),
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
    })
  }

}
