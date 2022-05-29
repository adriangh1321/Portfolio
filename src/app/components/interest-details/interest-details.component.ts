import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Interest } from 'src/app/models/Interest';
import { InterestService } from 'src/app/services/interest.service';

@Component({
  selector: 'app-interest-details',
  templateUrl: './interest-details.component.html',
  styleUrls: ['./interest-details.component.css']
})
export class InterestDetailsComponent implements OnInit {
  @Input() interest: Interest;

  @Output() onToggleEditInterest = new EventEmitter()
  constructor(private interestService: InterestService) {
    this.interest = new Interest()
  }

  ngOnInit(): void {
  }

  editInterest() {
    this.onToggleEditInterest.emit()
  }

  removeInterest() {
    this.interestService.deleteInterest(this.interest.id).subscribe({
      next: data => alert('The interest was deleted successfull'),
      error: error => alert('There was error')
    })
  }

}
