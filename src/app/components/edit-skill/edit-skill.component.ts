import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillType } from 'src/app/enums/SkillType';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { Cloneable } from 'src/app/utilities/Clone';


@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  skillForm: FormGroup;
  @Input() person: Person;
  updatedPerson: Person;
  @Input()indexSkill: number;
  @Output() offEvent = new EventEmitter<number>();
 


  constructor(private formBuilder: FormBuilder ,private personService:PersonService) {
    this.skillForm = this.formBuilder.group({
      type: [SkillType.NONE, []],
      name: ['', [Validators.required]],
      percent: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    })
    this.person = new Person()
    this.updatedPerson = new Person()
    this.indexSkill = 0
  }

  ngOnInit(): void {
    this.updatedPerson = Cloneable.deepCopy(this.person)
    this.skillForm.patchValue({
      type: this.updatedPerson.skills[this.indexSkill].type,
      name: this.updatedPerson.skills[this.indexSkill].name,
      percent: this.updatedPerson.skills[this.indexSkill].percent
    })
  }
  emitOff(i:number) {
    this.offEvent.emit(i);
  }

  get m() {
    return this.skillForm!.controls;
  }

  onSubmit() {
    if(this.skillForm.invalid){
      alert('Invalid input');
      return;
    }
    this.updatedPerson.skills[this.indexSkill].name=this.skillForm.get("name")?.value
    this.updatedPerson.skills[this.indexSkill].percent=this.skillForm.get("percent")?.value
    this.personService.updatePerson(this.updatedPerson.id, this.updatedPerson).subscribe({
      next: data => { alert("The skill was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
    
    this.emitOff(this.indexSkill)
  }

}
