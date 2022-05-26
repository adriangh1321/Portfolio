import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/models/Experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent implements OnInit {
  experienceForm!: FormGroup;
  @Output() onShowDetails = new EventEmitter()
  @Input() experience: Experience;


  constructor(private experienceService: ExperienceService, private formBuilder: FormBuilder, private parserFormatter: NgbDateParserFormatter) {
    this.experience = new Experience()
  }

  ngOnInit(): void {
    console.log(this.experience.startDate)
    this.experienceForm = this.formBuilder.group({
      position: [this.experience.position, [Validators.required]],
      company: [this.experience.company, [Validators.required]],
      description: [this.experience.description, [Validators.required]],
      startDate: [this.experience.startDate !== null ? {
        year: this.experience.startDate!.getFullYear(),
        month: this.experience.startDate!.getMonth() + 1,
        day: this.experience.startDate!.getDate(),
      } : null, [Validators.required]],
      endDate: [this.experience.endDate !== null ? {
        year: this.experience.endDate!.getFullYear(),
        month: this.experience.endDate!.getMonth() + 1,
        day: this.experience.endDate!.getDate(),
      } : null, []],
      state: [this.experience.state, [Validators.required]],
      country: [this.experience.country, [Validators.required]],
      image: [this.experience.image, []]
    })
  }

  onSubmit() {

    if (this.experienceForm.invalid) {
      alert('Invalid input');
      return;
    }
    if (this.experienceForm.get("endDate")!.value !== null) {
      this.experienceForm.patchValue({
        endDate: this.parserFormatter.format(this.experienceForm.get("endDate")!.value)
      })
    }
    this.experienceForm.patchValue({
      startDate: this.parserFormatter.format(this.experienceForm.get("startDate")!.value),

    })

    this.experienceService.updateExperience(this.experience.id, this.experienceForm.getRawValue()).subscribe({
      next: data => { alert("The experience was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })

    this.onCloseEdit()
  }
  onCloseEdit() {
    this.onShowDetails.emit()
  }



  onImageExperienceUpload(e: Event) {
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.experienceForm.controls['image'].setValue(reader.result as string)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  get m() {
    return this.experienceForm!.controls;
  }

}
