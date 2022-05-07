import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillType } from 'src/app/enums/SkillType';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Cloneable } from 'src/app/utilities/Clone';


@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  skillForm: FormGroup;
  @Input() portfolio: Portfolio;
  updatedPortfolio: Portfolio;
  @Input()indexSkill: number;
  @Output() offEvent = new EventEmitter<number>();
 


  constructor(private formBuilder: FormBuilder ,private portfolioService:PortfolioService) {
    this.skillForm = this.formBuilder.group({
      type: [SkillType.NONE, []],
      name: ['', [Validators.required]],
      percent: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    })
    this.portfolio = new Portfolio()
    this.updatedPortfolio = new Portfolio()
    this.indexSkill = 0
  }

  ngOnInit(): void {
    this.updatedPortfolio = Cloneable.deepCopy(this.portfolio)
    this.skillForm.patchValue({
      type: this.updatedPortfolio.skills[this.indexSkill].type,
      name: this.updatedPortfolio.skills[this.indexSkill].name,
      percent: this.updatedPortfolio.skills[this.indexSkill].percent
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
    this.updatedPortfolio.skills[this.indexSkill].name=this.skillForm.get("name")?.value
    this.updatedPortfolio.skills[this.indexSkill].percent=this.skillForm.get("percent")?.value
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The skill was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
    
    this.emitOff(this.indexSkill)
  }

}
