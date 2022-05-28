import { Component, Input, OnInit } from '@angular/core';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { ContactInformationService } from 'src/app/services/contact-information.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
@Input() contactInformation!:ContactInformation;
isOnShowDetails: Boolean
constructor(private contactInformationService: ContactInformationService) { this.isOnShowDetails = true }

ngOnInit(): void {
  this.contactInformationService.ContactInformationRefreshRequired.subscribe((id) => this.getContactInformation(id))
}
getContactInformation(id: number) {
  this.contactInformationService.getById(id).subscribe(response => this.contactInformation = response)
}
toggleEditContactInformation() {
  this.isOnShowDetails = false;
}
showDetails() {
  this.isOnShowDetails = true;
}

}
