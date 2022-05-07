import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';


@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.css']
})
export class ShowContactComponent implements OnInit {
@Input() portfolio:Portfolio;
@Output() offEvent=new EventEmitter()
isOnShowContact:boolean
@Output() editContactEvent=new EventEmitter()

  constructor() { 
    this.portfolio=new Portfolio()
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
