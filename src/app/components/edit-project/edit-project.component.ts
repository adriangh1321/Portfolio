import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  @Input() portfolio: Portfolio;
  updatedPortfolio: Portfolio;
  @Input() indexProject: number;
  @Output() offEvent = new EventEmitter<number>()
  
  projectForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private portfolioService:PortfolioService) {
    this.portfolio = new Portfolio();
    this.updatedPortfolio = new Portfolio();
    this.indexProject = 0;
    this.projectForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.updatedPortfolio=Cloneable.deepCopy(this.portfolio)
    this.projectForm.patchValue({
      name:this.updatedPortfolio.projects[this.indexProject].name,
      description:this.updatedPortfolio.projects[this.indexProject].description
    })
  }

  onSubmit(){
    if(this.projectForm.invalid){
      alert('Invalid input')
      return
    }
    this.updatedPortfolio.projects[this.indexProject].name=this.projectForm.get('name')?.value
    this.updatedPortfolio.projects[this.indexProject].description=this.projectForm.get('description')?.value
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The project was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
        
    this.emitOff(this.indexProject)
  }

  get m() {
    return this.projectForm.controls;
  }

  emitOff(indexProject: number) {
    this.offEvent.emit(indexProject);
  }

}
