import { Component, OnInit } from '@angular/core';
import { SkillType } from 'src/app/enums/SkillType';
import { Portfolio } from 'src/app/models/Portfolio';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ProjectService } from 'src/app/services/project.service';
import { SkillService } from 'src/app/services/skill.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
  portfolio: Portfolio;
  skillType = SkillType;


  constructor(
    private portfolioService: PortfolioService,
    private experienceService: ExperienceService,
    private educationService: EducationService,
    private skillService: SkillService,
    private projectService: ProjectService) {
    this.portfolio = new Portfolio();
  }

  ngOnInit(): void {
    this.portfolioService.getMeByToken().subscribe((res) => {
      this.portfolio = res
    }) 
  } 

  onAddExperience() {
    const newExperience: any = { position: "Position", company: "Company", description: "Description", image: null, state: "State", country: "Country", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!), startDate: new Date().toISOString().slice(0, 10) }
    this.experienceService.addExperience(newExperience).subscribe({
      next: data => { alert("The experience was added successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }

  onAddEducation() {
    const newEducation: any = { title: "Title", institute: "Institute", image: null, idPortfolio: parseInt(localStorage.getItem("id_portfolio")!), startDate: new Date().toISOString().slice(0, 10) }
    this.educationService.addEducation(newEducation).subscribe({
      next: data => { alert("The education was added successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }

  onAddSkill(type: SkillType) {
    const newSkill: any = { type: type, name: "Skill", percent: 1, idPortfolio: parseInt(localStorage.getItem("id_portfolio")!) }
    this.skillService.addSkill(newSkill).subscribe({
      next: data => { alert("The skill was added successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }

  onAddProject() {
    const newProject: any = { name: "Name", description: "Description", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!) }
    this.projectService.addProject(newProject).subscribe({
      next: data => { alert("The project was added successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }


}




