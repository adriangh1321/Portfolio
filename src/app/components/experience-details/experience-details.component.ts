import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experience } from 'src/app/models/Experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.css']
})
export class ExperienceDetailsComponent implements OnInit {
  @Input() experience: Experience;
  @Output() onToggleEditExperience = new EventEmitter()
  constructor(private experienceService:ExperienceService) {
    this.experience = new Experience()
  }

  ngOnInit(): void {
  }

  editExperience() {
    this.onToggleEditExperience.emit()
  }

  removeExperience(){
    this.experienceService.deleteExperience(this.experience.id).subscribe({
      next:data=>alert('The experience was deleted successfull'),
      error:error=>alert('There was error')
    })
  }

}
