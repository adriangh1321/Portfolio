import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {
  
  @Output() offEvent=new EventEmitter<number>();
  @Input() indexEducation:number;
  @Input() portfolio: Portfolio;
  updatedPortfolio: Portfolio;
  
  constructor(private portfolioService:PortfolioService) {
    this.indexEducation=0;
    this.portfolio = new Portfolio();
    this.updatedPortfolio = new Portfolio();
  }

  ngOnInit(): void {
    this.updatedPortfolio = Cloneable.deepCopy(this.portfolio);
    console.log(this.updatedPortfolio)
    console.log(this.indexEducation)
  }

  onSubmit() {
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The education was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
    
    
    this.emitOff(this.indexEducation)
  }

  emitOff(indexEducation:number){
    this.offEvent.emit(indexEducation);
  }

  onImageEducationUpload(e:Event){
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.updatedPortfolio.educations[this.indexEducation].image = reader.result as string;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  
  setStartDate(startDate:Date){
    this.updatedPortfolio.educations[this.indexEducation].startDate=startDate
  }
  setEndDate(endDate:Date){
    this.updatedPortfolio.educations[this.indexEducation].endDate=endDate
  }


}
