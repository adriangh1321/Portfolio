import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { Cloneable } from 'src/app/utilities/Clone';


@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {
  
  @Output() offEvent=new EventEmitter();
  @Input() person: Person;
  updatedPerson: Person;


  constructor(private personService:PersonService) {
    this.person = new Person()
    this.updatedPerson = new Person()
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

  emitOff(){
    this.offEvent.emit();
  }

}
