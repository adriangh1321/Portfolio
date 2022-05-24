import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  projectForm!: FormGroup;
  @Output() onShowDetails = new EventEmitter()
  @Input() project: Project;


  constructor(private projectService: ProjectService, private formBuilder: FormBuilder, private parserFormatter: NgbDateParserFormatter) {
    this.project = new Project()
  }

  ngOnInit(): void {

    this.projectForm = this.formBuilder.group({
      name: [this.project.name, [Validators.required]],
      description: [this.project.description, [Validators.required]],

    })
  }

  onSubmit() {

    if (this.projectForm.invalid) {
      alert('Invalid input');
      return;
    }

    this.projectService.updateProject(this.project.id, this.projectForm.getRawValue()).subscribe({
      next: data => { alert("The project was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })

    this.onCloseEdit()
  }
  onCloseEdit() {
    this.onShowDetails.emit()
  }

  get m() {
    return this.projectForm!.controls;
  }


}
