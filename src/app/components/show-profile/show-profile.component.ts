import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SkillType } from 'src/app/enums/SkillType';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { CurrentCompany } from 'src/app/models/CurrentCompany';
import { Education } from 'src/app/models/Education';
import { Experience } from 'src/app/models/Experience';
import { Portfolio } from 'src/app/models/Portfolio';
import { Project } from 'src/app/models/Project';
import { Skill } from 'src/app/models/Skill';
import { ExperienceService } from 'src/app/services/experience.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
  isOnEditPortfolio: Boolean = false;
  
  isOnEditAbout: Boolean;
  isOnEditEducation: Boolean[];
  isOnShowContact: Boolean;
  isOnEditContact: Boolean;
  isOnEditSkill: Boolean[];
  isOnEditProject: Boolean[]
  
  indexEducation: number;
  indexHardSkill: number;
  indexSoftSkill: number;
  indexProject: number;
  portfolio: Portfolio;
  updatedPortfolio: Portfolio;
  skillType = SkillType

  constructor(private portfolioService: PortfolioService,private experienceService:ExperienceService) {

    // this.portfolio = new Portfolio();
    // this.portfolio.firstname = "Gustavo"
    // this.portfolio.lastname = "Hernandez"
    // this.portfolio.ocupation = "Chemical Engineer"
    // this.portfolio.currentCompany = new CurrentCompany()
    // this.portfolio.currentCompany.name = "Ecogas"
    // this.portfolio.currentCompany.image = "./assets/img/ecogas-logo.png"
    // this.portfolio.currentCompany.url = "https://www.ecogas.com.ar/"
    // this.portfolio.country = "Argentine"
    // this.portfolio.state = "Mendoza"
    // this.portfolio.image = "./assets/img/profile-photo.png"
    // this.portfolio.aboutMe = "I am a java backend developer!"
    // this.portfolio.experiences = [
    //   Experience.factoryAllProperties("Documentation control", "Ecogas", "Loading and control of documentation of external works for the digitization department of Ecogas", "./assets/img/ecogas-logo.png", new Date(2017, 3, 17), new Date(2018, 5, 30), "Mendoza", "Argentine"),
    //   Experience.factoryAllProperties("Laboratory Technician", "Aguas Danone S.A.", "Quality control at Villavicencio Plant", "./assets/img/villavicencio-logo.jpg", new Date(2010, 9, 1), new Date(2019, 10, 29), "Mendoza", "Argentine")
    // ];
    // this.portfolio.educations = [
    //   Education.factoryAllProperties("Chemical Engineer", "Universidad Tecnológica Nacional", new Date(2011, 2, 1), new Date(2019, 10, 25), "./assets/img/utn-logo.png"),
    //   Education.factoryAllProperties("Chemical Technician", "Universidad Tecnológica Nacional", new Date(2011, 2, 1), new Date(2014, 10, 25), "./assets/img/utn-logo.png"),
    //   Education.factoryAllProperties("Fullstack Developer", "Egg Institute", new Date(2021, 5, 1), new Date(2021, 11, 1), "./assets/img/logo-egg.JPG")
    // ];
    // this.portfolio.contactInformation =
    //   ContactInformation.factoryAllProperties("(261)5749942", "adriangh1321@gmail.com", "linkedin.com/in/gustavohernandez-ing/", "github.com/adriangh1321");
    // this.portfolio.skills = [
    //   Skill.factoryAllProperties(SkillType.HARD, "Authentication API", 75),
    //   Skill.factoryAllProperties(SkillType.HARD, "Spring Security", 50),
    //   Skill.factoryAllProperties(SkillType.SOFT, "Teamwork", 90),
    //   Skill.factoryAllProperties(SkillType.SOFT, "Problem-solving", 100)
    // ]
    // this.portfolio.projects = [
    //   Project.factoryAllProperties("API for SOMOS MAS organization", "This API was developed with Java Spring for SOMOS MAS organization in Alkemy Aceleration "),
    //   Project.factoryAllProperties("Accommodation Application", "This web application was developed with Java Spring that allows renting accommodation ")

    // ]

    this.portfolio = new Portfolio();
    this.updatedPortfolio = new Portfolio();
    
    this.isOnEditEducation = [];
    this.isOnEditSkill = [];
    this.isOnEditProject = [];

    this.isOnEditAbout = false;

    this.isOnShowContact = false;
    this.isOnEditContact = false;


    //this.isOnEditHardSkill = new Array(this.portfolio.skills.filter(skill => { skill.type == this.skillType.HARD }).length).fill(false)
    
    this.indexEducation = 0;
    this.indexHardSkill = 0;
    this.indexSoftSkill = 0;
    this.indexProject = 0;
  }
  onEditPortfolio() {
    this.isOnEditPortfolio = true;
  }

  offEditPortfolio() {
    this.isOnEditPortfolio = false;
  }

  onAddExperience() {
    const newExperience:any={position:"Position",company:"Company",description:"Description",image:"./assets/img/add-image.png",state:"State",country:"Country",idPortfolio:parseInt(localStorage.getItem("id_portfolio")!),startDate:new Date().toISOString().slice(0, 10)}
    console.log(new Date().toISOString().split('T'))
    // let experience: Experience = Experience.factoryAllProperties("Position", "Company", "Description", "./assets/img/add-image.png", null, null, "State", "Country")
    // this.updatedPortfolio.experiences.push(experience.toContract())
    // this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
    //   next: data => { alert("The new experience was added successfull!") },
    //   error: error => { alert("There was a error"); console.log(error) }
    // })
    this.experienceService.addExperience(newExperience).subscribe({
      next: data => { alert("The experience was added successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }

  onAddEducation() {
    let education: Education = Education.factoryAllProperties("Title", "Institute", null, null, "./assets/img/add-image.png")
    this.updatedPortfolio.educations.push(education.toContract())
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id,this.updatedPortfolio).subscribe({
      next: data => { alert("The new education was added successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }

  onAddSkill(type: SkillType) {
    const skill: Skill = Skill.factoryAllProperties(type, "Name", 1)
    this.updatedPortfolio.skills.push(skill.toContract());
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The new skill was added successfull!") },
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

  onRemoveExperience(i: number) {
    this.updatedPortfolio.experiences.splice(i, 1);
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The experience was deleted successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }

  onRemoveEducation(i: number) {
    this.updatedPortfolio.educations.splice(i, 1)
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The education was deleted successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })

  }

  onRemoveSkill(i: number) {
    this.updatedPortfolio.skills.splice(i, 1)
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The skill was deleted successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
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
  offEditEducation(indexEducation: number) {
    this.isOnEditEducation[indexEducation] = false;
  }

  offShowContact() {
    this.isOnShowContact = false;
  }
  offEditContact() {
    this.isOnEditContact = false;
    this.onShowContact()
  }
  offEditSkill(indexSkill: number) {
    this.isOnEditSkill[indexSkill] = false;
  }
  offEditProject(indexProject: number) {
    this.isOnEditProject[indexProject] = false;
  }

  onEditAbout() {
    this.isOnEditAbout = true;
  }
  onEditEducation(i: number) {
    this.indexEducation = i;
    this.isOnEditEducation[this.indexEducation] = true;
  }
  onEditContact() {
    this.isOnEditContact = true
  }
  onEditSkill(i: number) {
    this.isOnEditSkill[i] = true;
  }

  getPortfolio(id: number) {
    this.portfolioService.getPortfolioById(id).subscribe((res) => {
      this.portfolio = res

      
      this.isOnEditEducation = new Array(this.portfolio.educations.length).fill(false);
      this.isOnEditSkill = new Array(this.portfolio.skills.length).fill(false);
      this.isOnEditProject = new Array(this.portfolio.projects.length).fill(false);
      this.updatedPortfolio = Cloneable.deepCopy(this.portfolio)
      console.log("---------------")
      console.log(this.portfolio)
      console.log(this.updatedPortfolio)
      localStorage.setItem("id_portfolio",this.portfolio.id.toString())
     
    })
  }
  ngOnInit(): void {
    

    this.getPortfolio(1);

    this.portfolioService.RefreshRequired.subscribe(() => {
      this.getPortfolio(1)
      
    })


  }
}




