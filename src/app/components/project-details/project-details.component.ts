import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Project } from 'src/app/models/Project';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() project: Project;
  @Output() onToggleEditProject = new EventEmitter()
  constructor(
    private projectService: ProjectService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.project = new Project()
  }

  ngOnInit(): void {
  }

  editProject() {
    this.onToggleEditProject.emit()
  }

  removeProject() {
    this.loaderService.showLoading()
    this.projectService.deleteProject(this.project.id).subscribe({
      next: data => {
        this.notificationService.requestNotification({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.PROJ_DELETE
        })
      },
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
    })
  }

}
