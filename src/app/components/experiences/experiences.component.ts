import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/Experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {
  @Input() experiences: Experience[];
  constructor(private experienceService: ExperienceService, private loaderService: LoaderService) {
    this.experiences = []
  }

  ngOnInit(): void {
    this.experienceService.RefreshRequired.subscribe(() => this.getExperiences(parseInt(localStorage.getItem("id_portfolio")!)))
  }

  getExperiences(idPortfolio: number) {
    this.loaderService.showLoading()
    this.experienceService.getExperiencesByPortfolioId(idPortfolio).subscribe({
      next: experiences => {
        this.experiences = experiences
        this.loaderService.hideLoading()
      },
      error: error => {
        this.loaderService.hideLoading()
        alert('There was an error loading the experiences')
      },
    })

  }
}
