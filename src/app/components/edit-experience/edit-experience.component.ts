import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experience } from 'src/app/models/Experience';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {
  
  @Output() offEvent=new EventEmitter<number>();
  @Input() indexExperience:number;
  @Input() person: Person;
  updatedPerson: Person;
  
  constructor(private personService:PersonService) {
    this.indexExperience=0;
    this.person = new Person();
    this.updatedPerson = new Person();
  }

  ngOnInit(): void {
    this.updatedPerson = Cloneable.deepCopy(this.person);
    console.log(this.updatedPerson)
    console.log(this.indexExperience)
  }

  onSubmit() {
    this.personService.updatePerson(this.updatedPerson.id, this.updatedPerson).subscribe({
      next: data => { alert("The experience was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
    
    this.emitOff(this.indexExperience)
  }

  emitOff(indexExperience:number){
    this.offEvent.emit(indexExperience);
  }

  onImageExperienceUpload(e:Event){
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.updatedPerson.experiences[this.indexExperience].image = reader.result as string;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  
  setStartDate(startDate:Date){
    this.updatedPerson.experiences[this.indexExperience].startDate=startDate
  }
  setEndDate(endDate:Date){
    this.updatedPerson.experiences[this.indexExperience].endDate=endDate
  }

}
