import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experience } from 'src/app/models/Experience';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.css']
})
export class ExperienceDetailsComponent implements OnInit {
  @Input() experience: Experience;
  @Output() onToggleEditExperience = new EventEmitter()
  constructor() {
    this.experience = new Experience()
  }

  ngOnInit(): void {
  }

  editExperience() {
    this.onToggleEditExperience.emit()
  }

  removeExperience(){
    
  }

}
