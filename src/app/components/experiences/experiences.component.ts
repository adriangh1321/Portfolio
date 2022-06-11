import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/Experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {
@Input() experiences:Experience[];
  constructor(private experienceService:ExperienceService) { 
    this.experiences=[]
  }

  ngOnInit(): void {
    this.experienceService.RefreshRequired.subscribe({
      next: data => {this.getExperiences(parseInt(localStorage.getItem("id_portfolio")!))
    },
      error: error => alert('There was an error loading the experiences')
    })
    
    
    
  }

  getExperiences(idPortfolio:number){
  this.experienceService.getExperiencesByPortfolioId(idPortfolio).subscribe(experiences=>this.experiences=experiences)
  }
}
