import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  @Output() offEvent = new EventEmitter();
  @Output() refreshPerson = new EventEmitter<Person>();
  @Input() person: Person;
  updatedPerson: Person;


  constructor() {
    this.person = new Person();
    this.updatedPerson = new Person;
  }
  ngOnInit(): void {
    this.updatedPerson = Cloneable.deepCopy(this.person)
  }

  onSubmit() {

    console.log(this.person)
    this.refreshPerson.emit(this.updatedPerson);
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

    // this.updatedPerson.firstname = this.person.firstname
    // this.updatedPerson.lastname = this.person.lastname
    // this.updatedPerson.ocupation = this.person.ocupation
    // this.updatedPerson.currentCompany = this.person.currentCompany
    // this.updatedPerson.country = this.person.country
    // this.updatedPerson.state = this.person.state
    // this.updatedPerson.photo = this.person.photo
    // this.updatedPerson.aboutMe = this.person.aboutMe
    // this.updatedPerson.experiences = this.person.experiences
    // this.updatedPerson.educations = this.person.educations
    // this.updatedPerson.contactInformation = this.person.contactInformation
    this.emitOff();
  }



}
