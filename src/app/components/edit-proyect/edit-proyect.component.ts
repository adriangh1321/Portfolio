import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-proyect',
  templateUrl: './edit-proyect.component.html',
  styleUrls: ['./edit-proyect.component.css']
})
export class EditProyectComponent implements OnInit {
  @Input() portfolio: Portfolio;
  updatedPortfolio: Portfolio;
  @Input() indexProyect: number;
  @Output() offEvent = new EventEmitter<number>()
  
  proyectForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private portfolioService:PortfolioService) {
    this.portfolio = new Portfolio();
    this.updatedPortfolio = new Portfolio();
    this.indexProyect = 0;
    this.proyectForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.updatedPortfolio=Cloneable.deepCopy(this.portfolio)
    this.proyectForm.patchValue({
      name:this.updatedPortfolio.proyects[this.indexProyect].name,
      description:this.updatedPortfolio.proyects[this.indexProyect].description
    })
  }

  onSubmit(){
    if(this.proyectForm.invalid){
      alert('Invalid input')
      return
    }
    this.updatedPortfolio.proyects[this.indexProyect].name=this.proyectForm.get('name')?.value
    this.updatedPortfolio.proyects[this.indexProyect].description=this.proyectForm.get('description')?.value
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The proyect was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
        
    this.emitOff(this.indexProyect)
  }

  get m() {
    return this.proyectForm.controls;
  }

  emitOff(indexProyect: number) {
    this.offEvent.emit(indexProyect);
  }

}
