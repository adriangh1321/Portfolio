import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/Person';
import { Cloneable } from 'src/app/utilities/Clone';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactForm!: FormGroup;
  @Input() person: Person;
  updatedPerson: Person;
  @Output() offEvent = new EventEmitter()
  @Output() refreshPerson = new EventEmitter<Person>()

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,) {

    this.person = new Person()
    this.updatedPerson = new Person()


  }
  get m() {
    return this.contactForm!.controls;
  }

  ngOnInit(): void {
    this.updatedPerson = Cloneable.deepCopy(this.person)
    this.contactForm = this.formBuilder.group({
      phone: ['',[Validators.required,Validators.pattern("^[(]{1}[0-9]+[)]{1}[0-9]+$")]],
      email: ['',[Validators.required,Validators.email]],
      linkedIn: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      remoteRepository: []
    })
    this.contactForm.patchValue({
      phone: this.updatedPerson.contactInformation.phone,
      email: this.updatedPerson.contactInformation.email,
      linkedIn: this.updatedPerson.contactInformation.linkedIn,
      remoteRepository: this.updatedPerson.contactInformation.remoteRepository
    })
    //const json = JSON.parse(JSON.stringify(this.updatedPerson.contactInformation))
    //this.contactForm.patchValue(json)





  }

  onSubmit() {
    if(this.contactForm.invalid){
      alert('Invalid input');
      return;
    }
    this.updatedPerson.contactInformation.phone=this.contactForm.get("phone")?.value
    this.updatedPerson.contactInformation.email=this.contactForm.get("email")?.value
    this.updatedPerson.contactInformation.linkedIn=this.contactForm.get("linkedIn")?.value
    this.updatedPerson.contactInformation.remoteRepository=this.contactForm.get("remoteRepository")?.value
    this.refreshPerson.emit(this.updatedPerson)
    this.emitOff()
  }
  emitOff() {
    this.offEvent.emit()
  }


}
