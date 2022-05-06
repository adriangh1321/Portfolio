import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Cloneable } from 'src/app/utilities/Clone';


@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {
  
  @Output() offEvent=new EventEmitter();
  @Input() portfolio: Portfolio;
  updatedPortfolio: Portfolio;


  constructor(private portfolioService:PortfolioService) {
    this.portfolio = new Portfolio()
    this.updatedPortfolio = new Portfolio()
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

  emitOff(){
    this.offEvent.emit();
  }

}
