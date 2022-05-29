import { Component, Input, OnInit } from '@angular/core';
import { Interest } from 'src/app/models/Interest';

@Component({
  selector: 'app-interest-item',
  templateUrl: './interest-item.component.html',
  styleUrls: ['./interest-item.component.css']
})
export class InterestItemComponent implements OnInit {

  isOnShowDetails: boolean = true
  @Input() interest: Interest
  constructor() {
    this.interest = new Interest()
  }

  ngOnInit(): void {
  }

  showDetails() {
    this.isOnShowDetails = true
  }
  toggleEditInterest() {
    this.isOnShowDetails = false
  }
}
