import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Education } from 'src/app/models/Education';
import { EducationService } from 'src/app/services/education.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent implements OnInit {
  @Input() education: Education;
  @Output() onToggleEditEducation = new EventEmitter()

  constructor(
    private educationService: EducationService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.education = new Education()
  }

  ngOnInit(): void { }


  editEducation() {
    this.onToggleEditEducation.emit()
  }

  removeEducation() {
    this.loaderService.showLoading()
    this.educationService.deleteEducation(this.education.id).subscribe({
      next: data => this.notificationService.requestNotification(
        {
          type: NotificationType.SUCCESS,
          message: NotificationMessage.EDU_DELETE
        }),
      error: error=>{
        this.loaderService.hideLoading()
        throw error
      }
    })
  }

}
