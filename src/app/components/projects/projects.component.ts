import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/Project';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit,OnDestroy {
  @Input() projects: Project[];
  notification: any
  subscription:Subscription=new Subscription
  constructor(
    private projectService: ProjectService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.projects = []
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const s1$=this.projectService.RefreshRequired.subscribe(() => this.getProjects(parseInt(localStorage.getItem("id_portfolio")!)))
    const s2$=this.notificationService.RequestNotification.subscribe((notification) => this.notification = notification)
    this.subscription.add(s1$)
    this.subscription.add(s2$)

  }

  getProjects(idPortfolio: number) {
    const s3$=this.projectService.getProjectsByPortfolioId(idPortfolio).subscribe({
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
    this.subscription.add(s3$)
  }

}
