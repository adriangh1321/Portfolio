import { Component, OnInit } from '@angular/core';
import { SkillType } from 'src/app/enums/SkillType';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { CurrentCompany } from 'src/app/models/CurrentCompany';
import { Education } from 'src/app/models/Education';
import { Experience } from 'src/app/models/Experience';
import { Person } from 'src/app/models/Person';
import { Proyect } from 'src/app/models/Proyect';
import { Skill } from 'src/app/models/Skill';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
  isOnEditPerson: Boolean = false;
  isOnEditExperience: Boolean[];
  isOnEditAbout: Boolean;
  isOnEditEducation: Boolean[];
  isOnShowContact: Boolean;
  isOnEditContact: Boolean;
  isOnEditSkill: Boolean[];
  isOnEditProyect: Boolean[]
  indexExperience: number;
  indexEducation: number;
  indexHardSkill: number;
  indexSoftSkill: number;
  indexProyect: number;
  person: Person;
  skillType = SkillType

  constructor(private personService: PersonService) {

    // this.person = new Person();
    // this.person.firstname = "Gustavo"
    // this.person.lastname = "Hernandez"
    // this.person.ocupation = "Chemical Engineer"
    // this.person.currentCompany = new CurrentCompany()
    // this.person.currentCompany.name = "Ecogas"
    // this.person.currentCompany.image = "./assets/img/ecogas-logo.png"
    // this.person.currentCompany.url = "https://www.ecogas.com.ar/"
    // this.person.country = "Argentine"
    // this.person.state = "Mendoza"
    // this.person.image = "./assets/img/profile-photo.png"
    // this.person.aboutMe = "I am a java backend developer!"
    // this.person.experiences = [
    //   Experience.factoryAllProperties("Documentation control", "Ecogas", "Loading and control of documentation of external works for the digitization department of Ecogas", "./assets/img/ecogas-logo.png", new Date(2017, 3, 17), new Date(2018, 5, 30), "Mendoza", "Argentine"),
    //   Experience.factoryAllProperties("Laboratory Technician", "Aguas Danone S.A.", "Quality control at Villavicencio Plant", "./assets/img/villavicencio-logo.jpg", new Date(2010, 9, 1), new Date(2019, 10, 29), "Mendoza", "Argentine")
    // ];
    // this.person.educations = [
    //   Education.factoryAllProperties("Chemical Engineer", "Universidad Tecnológica Nacional", new Date(2011, 2, 1), new Date(2019, 10, 25), "./assets/img/utn-logo.png"),
    //   Education.factoryAllProperties("Chemical Technician", "Universidad Tecnológica Nacional", new Date(2011, 2, 1), new Date(2014, 10, 25), "./assets/img/utn-logo.png"),
    //   Education.factoryAllProperties("Fullstack Developer", "Egg Institute", new Date(2021, 5, 1), new Date(2021, 11, 1), "./assets/img/logo-egg.JPG")
    // ];
    // this.person.contactInformation =
    //   ContactInformation.factoryAllProperties("(261)5749942", "adriangh1321@gmail.com", "linkedin.com/in/gustavohernandez-ing/", "github.com/adriangh1321");
    // this.person.skills = [
    //   Skill.factoryAllProperties(SkillType.HARD, "Authentication API", 75),
    //   Skill.factoryAllProperties(SkillType.HARD, "Spring Security", 50),
    //   Skill.factoryAllProperties(SkillType.SOFT, "Teamwork", 90),
    //   Skill.factoryAllProperties(SkillType.SOFT, "Problem-solving", 100)
    // ]
    // this.person.proyects = [
    //   Proyect.factoryAllProperties("API for SOMOS MAS organization", "This API was developed with Java Spring for SOMOS MAS organization in Alkemy Aceleration "),
    //   Proyect.factoryAllProperties("Accommodation Application", "This web application was developed with Java Spring that allows renting accommodation ")

    // ]

    this.person = new Person();
    this.isOnEditExperience = [];
    this.isOnEditEducation = [];
    this.isOnEditSkill = [];
    this.isOnEditProyect = [];

    this.isOnEditAbout = false;

    this.isOnShowContact = false;
    this.isOnEditContact = false;


    //this.isOnEditHardSkill = new Array(this.person.skills.filter(skill => { skill.type == this.skillType.HARD }).length).fill(false)
    this.indexExperience = 0;
    this.indexEducation = 0;
    this.indexHardSkill = 0;
    this.indexSoftSkill = 0;
    this.indexProyect = 0;
  }
  onEditPerson() {
    this.isOnEditPerson = true;
  }

  offEditPerson() {
    this.isOnEditPerson = false;
  }

  onAddExperience() {
    let experience: Experience = Experience.factoryAllProperties("Position", "Company", "Description", "./assets/img/add-image.png", null, null, "State", "Country")
    this.person.experiences.push(experience)
  }

  onAddEducation() {
    let education: Education = Education.factoryAllProperties("Title", "Institute", null, null, "./assets/img/add-image.png")
    this.person.educations.push(education)
  }

  onAddSkill(type: SkillType) {
    const skill: Skill = Skill.factoryAllProperties(type, "Name", 1)
    this.person.skills.push(skill);
  }
  onAddProyect() {
    let proyect = Proyect.factoryAllProperties("Name", "Description");
    this.person.proyects.push(proyect);
  }
  onEditExperience(i: number) {

    this.indexExperience = i;
    this.isOnEditExperience[this.indexExperience] = true;
  }

  onEditProyect(i: number) {
    this.indexProyect = i;
    this.isOnEditProyect[this.indexProyect] = true;
  }

  onShowContact() {
    this.isOnShowContact = true;
  }

  onRemoveExperience(i: number) {
    this.person.experiences.splice(i, 1)
  }

  onRemoveEducation(i: number) {
    this.person.educations.splice(i, 1)
  }

  onRemoveSkill(i: number) {
    this.person.skills.splice(i, 1)
  }
  onRemoveProyect(i: number) {
    this.person.proyects.splice(i, 1)
  }

  offEditExperience(indexExperience: number) {
    console.log("index parent: " + this.indexExperience)
    console.log("index child: " + indexExperience)
    this.isOnEditExperience[indexExperience] = false;
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
  offEditProyect(indexProyect: number) {
    this.isOnEditProyect[indexProyect] = false;
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


  refreshPersonData(id: number) {
    console.log("llego al refresh")
    this.personService.getPersonById(id).subscribe(res => {
      console.log("el refresh:");
      console.log(res)
      this.person = res
    })


  }

  getPerson(id: number) {
    this.personService.getPersonById(id).subscribe((res) => {
      this.person = res

      this.isOnEditExperience = new Array(this.person.experiences.length).fill(false);
      this.isOnEditEducation = new Array(this.person.educations.length).fill(false);
      this.isOnEditSkill = new Array(this.person.skills.length).fill(false);
      this.isOnEditProyect = new Array(this.person.proyects.length).fill(false);
      
    })
  }
  ngOnInit(): void {
    this.getPerson(1);
    this.personService.RefreshRequired.subscribe(() => {
      this.getPerson(1)
    })

  }
}




