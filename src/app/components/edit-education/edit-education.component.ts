import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {
  
  @Output() offEvent=new EventEmitter<number>();
  @Input() indexEducation:number;
  @Input() person: Person;
  updatedPerson: Person;
  
  constructor(private personService:PersonService) {
    this.indexEducation=0;
    this.person = new Person();
    this.updatedPerson = new Person();
  }

  ngOnInit(): void {
    this.updatedPerson = Cloneable.deepCopy(this.person);
    console.log(this.updatedPerson)
    console.log(this.indexEducation)
  }

  onSubmit() {
    this.personService.updatePerson(this.updatedPerson.id, this.updatedPerson).subscribe({
      next: data => { alert("The education was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
    
    
    this.emitOff(this.indexEducation)
  }

  emitOff(indexEducation:number){
    this.offEvent.emit(indexEducation);
  }

  onImageEducationUpload(e:Event){
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.updatedPerson.educations[this.indexEducation].image = reader.result as string;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  
  setStartDate(startDate:Date){
    this.updatedPerson.educations[this.indexEducation].startDate=startDate
  }
  setEndDate(endDate:Date){
    this.updatedPerson.educations[this.indexEducation].endDate=endDate
  }


}
