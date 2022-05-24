import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/models/Skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent implements OnInit {
  skillForm!: FormGroup;
  @Output() onShowDetails = new EventEmitter()
  @Input() skill: Skill;


  constructor(private skillService: SkillService, private formBuilder: FormBuilder, private parserFormatter: NgbDateParserFormatter) {
    this.skill = new Skill()
  }

  ngOnInit(): void {

    this.skillForm = this.formBuilder.group({
      type: [this.skill.type, [Validators.required]],
      name: [this.skill.name, [Validators.required]],
      percent: [this.skill.percent, [Validators.required, Validators.min(0), Validators.max(100)]],

    })
  }
  onSubmit() {

    if (this.skillForm.invalid) {
      alert('Invalid input');
      return;
    }
    

    this.skillService.updateSkill(this.skill.id, this.skillForm.getRawValue()).subscribe({
      next: data => { alert("The skill was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })

    this.onCloseEdit()
  }
  onCloseEdit() {
    this.onShowDetails.emit()
  }



  
  

  get m() {
    return this.skillForm!.controls;
  }


}
