import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: Project;
  isOnShowDetails: boolean = true

  constructor() {
    this.project = new Project()
  }

  ngOnInit(): void {
  }

  showDetails() {
    this.isOnShowDetails = true
  }
  toggleEditProject() {
    this.isOnShowDetails = false
  }

}
