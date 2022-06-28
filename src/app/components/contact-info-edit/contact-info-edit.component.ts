import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { ContactInformationService } from 'src/app/services/contact-information.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { urlOrWhitespace } from 'src/app/validators/UrlOrWhitespace';

@Component({
  selector: 'app-contact-info-edit',
  templateUrl: './contact-info-edit.component.html',
  styleUrls: ['./contact-info-edit.component.css']
})
export class ContactInfoEditComponent implements OnInit {
  @Input() contactInformation!: ContactInformation;
  @Output() onShowDetails = new EventEmitter()
  contactInformationForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private contactInformationService: ContactInformationService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.contactInformationForm = this.formBuilder.group({
      phone: [this.contactInformation.phone, [Validators.required, Validators.pattern("^[(]{1}[0-9]+[)]{1}[0-9]+$")]],
      email: [this.contactInformation.email, [Validators.required, Validators.email]],
      linkedIn: [this.contactInformation.linkedIn == null ? "" : this.contactInformation.linkedIn, [urlOrWhitespace()]],
      remoteRepository: [this.contactInformation.remoteRepository == null ? "" : this.contactInformation.remoteRepository, [urlOrWhitespace()]],
      facebook:[this.contactInformation.facebook==null?"":this.contactInformation.facebook,[urlOrWhitespace()]],
      twitter: [this.contactInformation.twitter == null ? "" : this.contactInformation.twitter, [urlOrWhitespace()]],
      instagram: [this.contactInformation.instagram == null ? "" : this.contactInformation.instagram, [urlOrWhitespace()]]

    })
  }


  onSubmit() {
    if (this.contactInformationForm.invalid) {
      alert('Invalid input');
      return;
    }
    if ((this.contactInformationForm.get('linkedIn')?.value as string).trim().length == 0) {
      this.contactInformationForm.patchValue({
        linkedIn: null
      })
    }
    if ((this.contactInformationForm.get('remoteRepository')?.value as string).trim().length == 0) {
      this.contactInformationForm.patchValue({
        remoteRepository: null
      })
    }
    if ((this.contactInformationForm.get('facebook')?.value as string).trim().length == 0) {
      this.contactInformationForm.patchValue({
        facebook: null
      })
    }
    if ((this.contactInformationForm.get('twitter')?.value as string).trim().length == 0) {
      this.contactInformationForm.patchValue({
        twitter: null
      })
    }
    if ((this.contactInformationForm.get('instagram')?.value as string).trim().length == 0) {
      this.contactInformationForm.patchValue({
        instagram: null
      })
    }
    this.loaderService.showLoading()
    this.contactInformationService.updateContactInformation(this.contactInformation.id, this.contactInformationForm.getRawValue()).subscribe({
      next: data => { },
      error: error => {
        this.loaderService.hideLoading()
        throw error
      }
    })
    this.onCloseEdit()
  }
  onCloseEdit() {
    this.onShowDetails.emit()
  }

  get m() {
    return this.contactInformationForm.controls;
  }

}
