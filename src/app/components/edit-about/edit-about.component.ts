import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { Cloneable } from 'src/app/utilities/Clone';


@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {
  @Output() refreshPerson = new EventEmitter<Person>();
  @Output() offEvent=new EventEmitter();
  @Input() person: Person;
  updatedPerson: Person;


  constructor() {
    this.person = new Person()
    this.updatedPerson = new Person()
  }

  ngOnInit(): void {
    this.updatedPerson = Cloneable.deepCopy(this.person)

  }

  onSubmit() {
    this.refreshPerson.emit(this.updatedPerson)
    this.emitOff();
  }

  emitOff(){
    this.offEvent.emit();
  }

}
