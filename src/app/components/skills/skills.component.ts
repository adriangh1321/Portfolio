import { Component, Input, OnInit } from '@angular/core';
import { SkillType } from 'src/app/enums/SkillType';
import { Skill } from 'src/app/models/Skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  @Input() skills:Skill[];
  @Input() skillType:SkillType;
  constructor(private skillService:SkillService) { 
    this.skills=[]
    this.skillType=SkillType.NONE;
  }

  ngOnInit(): void {
    this.skillService.RefreshRequired.subscribe(()=>this.getSkills(parseInt(localStorage.getItem("id_portfolio")!)))
  }

  getSkills(idPortfolio:number){
  this.skillService.getSkillsByPortfolioId(idPortfolio).subscribe(skills=>this.skills=skills)
  }

}
