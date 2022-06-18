import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() projects: Project[];
  notification: any
  constructor(
    private projectService: ProjectService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.projects = []
  }

  ngOnInit(): void {
    this.projectService.RefreshRequired.subscribe(() => this.getProjects(parseInt(localStorage.getItem("id_portfolio")!)))
    this.notificationService.RequestNotification.subscribe((notification) => this.notification = notification)
  }

  getProjects(idPortfolio: number) {
    this.projectService.getProjectsByPortfolioId(idPortfolio).subscribe({
      next: projects => {
        this.projects = projects
        this.loaderService.hideLoading()
        this.notificationService.showNotification(this.notification)
      },
      error:error=>{
        this.loaderService.hideLoading()
        throw error
      }
    })
  }

}
