import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactInformation } from 'src/app/models/ContactInformation';

@Component({
  selector: 'app-contact-info-details',
  templateUrl: './contact-info-details.component.html',
  styleUrls: ['./contact-info-details.component.css']
})
export class ContactInfoDetailsComponent implements OnInit {
  @Input() contactInformation!: ContactInformation;
  @Output() onToggleEditContactInformation = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  editContactInformation() {
    this.onToggleEditContactInformation.emit()
  }

}
