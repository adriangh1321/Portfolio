import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/Person';


@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.css']
})
export class ShowContactComponent implements OnInit {
@Input() person:Person;
@Output() offEvent=new EventEmitter()
isOnShowContact:boolean
@Output() editContactEvent=new EventEmitter()

  constructor() { 
    this.person=new Person()
    this.isOnShowContact=true
  }

  ngOnInit(): void {
  }

  offShowContact(){
    this.isOnShowContact=false
    this.offEvent.emit();
  }

  onEditContact(){
    this.offShowContact()
    this.editContactEvent.emit()
  }
  
}
