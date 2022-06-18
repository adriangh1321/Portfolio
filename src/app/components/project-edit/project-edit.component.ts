import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Project } from 'src/app/models/Project';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
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


  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private parserFormatter: NgbDateParserFormatter,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
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
    this.loaderService.showLoading()
    this.projectService.updateProject(this.project.id, this.projectForm.getRawValue()).subscribe({
      next: data => {
        this.notificationService.requestNotification({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.PROJ_UPDATE
        })
      },
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
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
