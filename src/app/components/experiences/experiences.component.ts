import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/Experience';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {
@Input() experiences:Experience[];
  constructor() { 
    this.experiences=[]
  }

  ngOnInit(): void {
  }

}
