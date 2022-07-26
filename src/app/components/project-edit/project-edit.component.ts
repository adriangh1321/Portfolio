import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Project } from 'src/app/models/Project';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProjectService } from 'src/app/services/project.service';
import { urlOrWhitespace } from 'src/app/validators/UrlOrWhitespace';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  projectForm!: FormGroup;
  @Output() onShowDetails = new EventEmitter()
  @Input() project: Project;
  checkboxImage: boolean;


  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private parserFormatter: NgbDateParserFormatter,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.project = new Project()
    this.checkboxImage = false;
  }

  ngOnInit(): void {

    this.projectForm = this.formBuilder.group({
      name: [this.project.name, [Validators.required]],
      description: [this.project.description, [Validators.required]],
      startDate: [this.project.startDate !== null ? {
        year: this.project.startDate!.getFullYear(),
        month: this.project.startDate!.getMonth() + 1,
        day: this.project.startDate!.getDate(),
      } : null, [Validators.required]],
      endDate: [this.project.endDate !== null ? {
        year: this.project.endDate!.getFullYear(),
        month: this.project.endDate!.getMonth() + 1,
        day: this.project.endDate!.getDate(),
      } : null, []],
      url: [this.project.url == null ? "" : this.project.url, [urlOrWhitespace()]],
      image: [this.project.image, []]

    })
  }

  onSubmit() {

    if (this.projectForm.invalid) {
      alert('Invalid input');
      return;
    }
    if (this.projectForm.get("endDate")!.value !== null) {
      this.projectForm.patchValue({
        endDate: this.parserFormatter.format(this.projectForm.get("endDate")!.value)
      })
    }
    this.projectForm.patchValue({
      startDate: this.parserFormatter.format(this.projectForm.get("startDate")!.value),

    })
    if ((this.projectForm.get('url')?.value as string).trim().length == 0) {
      this.projectForm.patchValue({
        url: null
      })
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

  onImageProjectUpload(e: Event) {
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.projectForm.controls['image'].setValue(reader.result as string)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  get m() {
    return this.projectForm!.controls;
  }

  disableImage() {
    this.checkboxImage = !this.checkboxImage;
    this.projectForm.patchValue({
      image: null
    })
  }


}
