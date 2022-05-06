import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.css']
})
export class EditPortfolioComponent implements OnInit {

  @Output() offEvent = new EventEmitter();
  
  @Input() portfolio: Portfolio;
  updatedPortfolio: Portfolio;


  constructor(private portfolioService: PortfolioService) {
    this.portfolio = new Portfolio();
    this.updatedPortfolio = new Portfolio;
  }
  ngOnInit(): void {
    this.updatedPortfolio = Cloneable.deepCopy(this.portfolio)
  }

  onSubmit() {

    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The data was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })

    this.emitOff();
  }

  emitOff() {
    this.offEvent.emit();
  }

  onPhotoUpload(e: Event) {

    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.updatedPortfolio.image = reader.result as string;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }

  onImageCompanyUpload(e: Event) {

    // if (this == null || this.files == null) {
    //     throw new NotFoundException(`The element with id=profile-image does not exist`);
    // }
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.updatedPortfolio.currentCompany.image = reader.result as string;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }

  onCancel() {   
    this.emitOff();
  }



}
