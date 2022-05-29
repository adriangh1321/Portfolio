import { Component, Input, OnInit } from '@angular/core';
import { Interest } from 'src/app/models/Interest';
import { InterestService } from 'src/app/services/interest.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  @Input() interests: Interest[];

  constructor(private interestService: InterestService) {
    this.interests = []
  }

  ngOnInit(): void {
    this.interestService.InterestsRefreshRequired.subscribe(() => this.getInterests(parseInt(localStorage.getItem("id_portfolio")!)))
  }

  getInterests(idPortfolio: number) {
    this.interestService.getInterestsByPortfolioId(idPortfolio).subscribe(interests => this.interests = interests)
  }

  addInterest() {
    const newInterest: any = { name: "New", image: "./assets/img/new-interest.jpg", idPortfolio: parseInt(localStorage.getItem("id_portfolio")!) }
    this.interestService.addInterest(newInterest).subscribe({
      next: data => { alert("The interest was added successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
  }
}
