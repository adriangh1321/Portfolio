import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/models/Education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-educations',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.css']
})
export class EducationsComponent implements OnInit {
  @Input() educations:Education[];
  constructor(private educationService:EducationService) { 
    this.educations=[]
  }

  ngOnInit(): void {
    this.educationService.RefreshRequired.subscribe(()=>this.getEducations(parseInt(localStorage.getItem("id_portfolio")!)))
  }

  getEducations(idPortfolio:number){
  this.educationService.getEducationsByPortfolioId(idPortfolio).subscribe(educations=>this.educations=educations)
  }
}
