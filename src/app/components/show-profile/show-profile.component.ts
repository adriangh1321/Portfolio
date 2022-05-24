import { Component, OnInit } from '@angular/core';
import { SkillType } from 'src/app/enums/SkillType';
import { Portfolio } from 'src/app/models/Portfolio';
import { Project } from 'src/app/models/Project';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { SkillService } from 'src/app/services/skill.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
  isOnEditPortfolio: Boolean = false;
  isOnEditAbout: Boolean;
  isOnShowContact: Boolean;
  isOnEditContact: Boolean;
  isOnEditProject: Boolean[]
  indexProject: number;
  portfolio: Portfolio;
  updatedPortfolio: Portfolio;
  skillType = SkillType

  constructor(private portfolioService: PortfolioService, private experienceService: ExperienceService, private educationService: EducationService, private skillService: SkillService) {

    this.portfolio = new Portfolio();
    this.updatedPortfolio = new Portfolio();
    this.isOnEditProject = [];
    this.isOnEditAbout = false;
    this.isOnShowContact = false;
    this.isOnEditContact = false;
    this.indexProject = 0;
  }
  onEditPortfolio() {
    this.isOnEditPortfolio = true;
  }

  offEditPortfolio() {
    this.isOnEditPortfolio = false;
  }

  onAddExperience() {
    const newExperience: any = { position: "Position", company: "Company", description: "Description", image: "./assets/img/add-image.png", state: "State", country: "Country", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!), startDate: new Date().toISOString().slice(0, 10) }
    this.experienceService.addExperience(newExperience).subscribe({
      next: data => { alert("The experience was added successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }

  onAddEducation() {
    const newEducation: any = { title: "Title", institute: "Institute", image: "./assets/img/add-image.png", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!), startDate: new Date().toISOString().slice(0, 10) }
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
    let project = Project.factoryAllProperties("Name", "Description");
    this.updatedPortfolio.projects.push(project.toContract());
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The new project was added successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }

  onEditProject(i: number) {
    this.indexProject = i;
    this.isOnEditProject[this.indexProject] = true;
  }

  onShowContact() {
    this.isOnShowContact = true;
  }

  onRemoveProject(i: number) {
    this.updatedPortfolio.projects.splice(i, 1)
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The project was deleted successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }

  offEditAbout() {
    this.isOnEditAbout = false;
  }


  offShowContact() {
    this.isOnShowContact = false;
  }
  offEditContact() {
    this.isOnEditContact = false;
    this.onShowContact()
  }

  offEditProject(indexProject: number) {
    this.isOnEditProject[indexProject] = false;
  }

  onEditAbout() {
    this.isOnEditAbout = true;
  }

  onEditContact() {
    this.isOnEditContact = true
  }


  getPortfolio(id: number) {
    this.portfolioService.getPortfolioById(id).subscribe((res) => {
      this.portfolio = res


      this.isOnEditProject = new Array(this.portfolio.projects.length).fill(false);
      this.updatedPortfolio = Cloneable.deepCopy(this.portfolio)
      console.log("---------------")
      console.log(this.portfolio)
      console.log(this.updatedPortfolio)
      localStorage.setItem("id_portfolio", this.portfolio.id.toString())

    })
  }
  ngOnInit(): void {


    this.getPortfolio(1);

    this.portfolioService.RefreshRequired.subscribe(() => {
      this.getPortfolio(1)

    })


  }
}




