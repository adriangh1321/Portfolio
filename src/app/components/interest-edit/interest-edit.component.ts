import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Interest } from 'src/app/models/Interest';
import { InterestService } from 'src/app/services/interest.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { onlyWhitespace } from 'src/app/validators/WhitespaceValidatorDirective';

@Component({
  selector: 'app-interest-edit',
  templateUrl: './interest-edit.component.html',
  styleUrls: ['./interest-edit.component.css']
})
export class InterestEditComponent implements OnInit {
  interestForm!: FormGroup;
  @Output() onShowDetails = new EventEmitter()
  @Input() interest: Interest;


  constructor(
    private interestService: InterestService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.interest = new Interest()
  }

  ngOnInit(): void {
    this.interestForm = this.formBuilder.group({
      name: [this.interest.name, [Validators.required, onlyWhitespace()]],
      image: [this.interest.image, []]
    })
  }

  onSubmit() {

    if (this.interestForm.invalid) {
      alert('Invalid input');
      return;
    }


    this.loaderService.showLoading()
    this.interestService.updateInterest(this.interest.id, this.interestForm.getRawValue()).subscribe({
      next: data => { this.notificationService.requestNotification({
        type:NotificationType.SUCCESS,
        message:NotificationMessage.INTER_UPDATE
      }) },
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



  onImageInterestUpload(e: Event) {
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.interestForm.controls['image'].setValue(reader.result as string)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  get m() {
    return this.interestForm!.controls;
  }

}
