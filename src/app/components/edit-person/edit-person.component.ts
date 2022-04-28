import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  @Output() offEvent = new EventEmitter();
  
  @Input() person: Person;
  updatedPerson: Person;


  constructor(private personService: PersonService) {
    this.person = new Person();
    this.updatedPerson = new Person;
  }
  ngOnInit(): void {
    this.updatedPerson = Cloneable.deepCopy(this.person)
  }

  onSubmit() {

    this.personService.updatePerson(this.updatedPerson.id, this.updatedPerson).subscribe({
      next: data => { alert("The data was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })

    this.emitOff();
  }

  emitOff() {
    this.offEvent.emit();
  }

  onPhotoUpload(e: Event) {

    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.updatedPerson.image = reader.result as string;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }

  onImageCompanyUpload(e: Event) {

    // if (this == null || this.files == null) {
    //     throw new NotFoundException(`The element with id=profile-image does not exist`);
    // }
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.updatedPerson.currentCompany.image = reader.result as string;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }

  onCancel() {   
    this.emitOff();
  }



}
