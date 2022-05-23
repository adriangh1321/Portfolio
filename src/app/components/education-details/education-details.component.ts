import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Education } from 'src/app/models/Education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent implements OnInit {
  @Input() education: Education;
  @Output() onToggleEditEducation = new EventEmitter()
  constructor(private educationService:EducationService) {
    this.education = new Education()
  }

  ngOnInit(): void {
  }

  editEducation() {
    this.onToggleEditEducation.emit()
  }

  removeEducation(){
    this.educationService.deleteEducation(this.education.id).subscribe({
      next:data=>alert('The education was deleted successfull'),
      error:error=>alert('There was error')
    })
  }

}
