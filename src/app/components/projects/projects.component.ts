import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() projects:Project[];
  constructor(private projectService:ProjectService) { 
    this.projects=[]
  }

  ngOnInit(): void {
    this.projectService.RefreshRequired.subscribe(()=>this.getProjects(parseInt(localStorage.getItem("id_portfolio")!)))
  }

  getProjects(idPortfolio:number){
  this.projectService.getProjectsByPortfolioId(idPortfolio).subscribe(projects=>this.projects=projects)
  }

}
