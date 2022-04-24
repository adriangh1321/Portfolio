import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experience } from 'src/app/models/Experience';
import { Person } from 'src/app/models/Person';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {
  @Output() refreshPerson = new EventEmitter<Person>();
  @Output() offEvent=new EventEmitter<number>();
  @Input() indexExperience:number;
  @Input() person: Person;
  updatedPerson: Person;
  
  constructor() {
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
    console.log(this.updatedPerson)
    this.refreshPerson.emit(this.updatedPerson)
    
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
