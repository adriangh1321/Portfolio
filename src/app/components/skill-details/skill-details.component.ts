import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from 'src/app/models/Skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.css']
})
export class SkillDetailsComponent implements OnInit {
  @Input() skill: Skill;
  @Output() onToggleEditSkill = new EventEmitter()
  constructor(private skillService:SkillService) {
    this.skill = new Skill()
  }

  ngOnInit(): void {
  }

  editSkill() {
    this.onToggleEditSkill.emit()
  }

  removeSkill(){
    this.skillService.deleteSkill(this.skill.id).subscribe({
      next:data=>alert('The skill was deleted successfull'),
      error:error=>alert('There was error')
    })
  }

}
