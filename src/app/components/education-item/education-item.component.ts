import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/models/Education';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent implements OnInit {
  @Input() education: Education;
  isOnShowDetails: boolean = true

  constructor() {
    this.education = new Education()
  }

  ngOnInit(): void {
  }

  showDetails() {
    this.isOnShowDetails = true
  }
  toggleEditEducation(){
    this.isOnShowDetails=false
  }


}
