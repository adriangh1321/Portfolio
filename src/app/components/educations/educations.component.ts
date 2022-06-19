import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/models/Education';
import { EducationService } from 'src/app/services/education.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-educations',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.css']
})
export class EducationsComponent implements OnInit {
  @Input() educations: Education[];
  notification!: any
  constructor(
    private educationService: EducationService,
    private notificationService: NotificationService,
    private loaderService: LoaderService) {
    this.educations = []
  }

  ngOnInit(): void {
    this.educationService.RefreshRequired.subscribe(() => this.getEducations(parseInt(localStorage.getItem("id_portfolio")!)))
    this.notificationService.RequestNotification.subscribe((notification) => this.notification = notification)
  }

  getEducations(idPortfolio: number) {
    this.educationService.getEducationsByPortfolioId(idPortfolio).subscribe({
      next: educations => {
        this.educations = educations
        this.loaderService.hideLoading()
        this.notificationService.showNotification(this.notification)
      },
      error: error => { 
        this.loaderService.hideLoading()
        throw error
      }
    })
  }
}
