import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/Skill';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css']
})
export class SkillItemComponent implements OnInit {
  @Input() skill: Skill;
  isOnShowDetails: boolean = true

  constructor() {
    this.skill = new Skill()
  }

  ngOnInit(): void {
  }

  showDetails() {
    this.isOnShowDetails = true
  }
  toggleEditSkill(){
    this.isOnShowDetails=false
  }
}
