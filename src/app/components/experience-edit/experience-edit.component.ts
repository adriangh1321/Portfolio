import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experience } from 'src/app/models/Experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { PersonService } from 'src/app/services/person.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent implements OnInit {
  @Output() onShowDetails = new EventEmitter()
  @Input() experience: Experience;
  updatedExperience: Experience;

  constructor(private experienceService: ExperienceService) {
    this.experience = new Experience()
    this.updatedExperience = new Experience()

  }

  ngOnInit(): void {
    this.updatedExperience = Cloneable.deepCopy(this.experience);

  }

  onSubmit() {
    // this.experienceService.updateExperience(this.updatedExperience.id, this.updatedExperience).subscribe({
    //   next: data => { alert("The experience was updated successfull!") },
    //   error: error => { alert("There was a error"); console.log(error) }
    // })

    this.onCloseEdit()
  }
  onCloseEdit(){
    this.onShowDetails.emit()
  }

 

  onImageExperienceUpload(e: Event) {
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.updatedExperience.image = reader.result as string;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  setStartDate(startDate: Date) {
    this.updatedExperience.startDate = startDate
  }
  setEndDate(endDate: Date) {
    this.updatedExperience.endDate = endDate
  }
}
