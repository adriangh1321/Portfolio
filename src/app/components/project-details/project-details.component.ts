import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() project: Project;
  @Output() onToggleEditProject = new EventEmitter()
  constructor(private projectService: ProjectService) {
    this.project = new Project()
  }

  ngOnInit(): void {
  }

  editProject() {
    this.onToggleEditProject.emit()
  }

  removeProject() {
    this.projectService.deleteProject(this.project.id).subscribe({
      next: data => alert('The project was deleted successfull'),
      error: error => alert('There was error')
    })
  }

}
