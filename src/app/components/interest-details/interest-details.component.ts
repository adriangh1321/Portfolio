import { Component, Input, OnInit } from '@angular/core';
import { Interest } from 'src/app/models/Interest';

@Component({
  selector: 'app-interest-details',
  templateUrl: './interest-details.component.html',
  styleUrls: ['./interest-details.component.css']
})
export class InterestDetailsComponent implements OnInit {
@Input() interest:Interest;

  constructor() {
    this.interest=new Interest();
   }

  ngOnInit(): void {
  }

}
