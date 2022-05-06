import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experience } from 'src/app/models/Experience';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {
  
  @Output() offEvent=new EventEmitter<number>();
  @Input() indexExperience:number;
  @Input() portfolio: Portfolio;
  updatedPortfolio: Portfolio;
  
  constructor(private portfolioService:PortfolioService) {
    this.indexExperience=0;
    this.portfolio = new Portfolio();
    this.updatedPortfolio = new Portfolio();
  }

  ngOnInit(): void {
    this.updatedPortfolio = Cloneable.deepCopy(this.portfolio);
    console.log(this.updatedPortfolio)
    console.log(this.indexExperience)
  }

  onSubmit() {
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The experience was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
    
    this.emitOff(this.indexExperience)
  }

  emitOff(indexExperience:number){
    this.offEvent.emit(indexExperience);
  }

  onImageExperienceUpload(e:Event){
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.updatedPortfolio.experiences[this.indexExperience].image = reader.result as string;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  
  setStartDate(startDate:Date){
    this.updatedPortfolio.experiences[this.indexExperience].startDate=startDate
  }
  setEndDate(endDate:Date){
    this.updatedPortfolio.experiences[this.indexExperience].endDate=endDate
  }

}
