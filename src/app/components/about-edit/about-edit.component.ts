import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { onlyWhitespace } from 'src/app/validators/WhitespaceValidatorDirective';


@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.css']
})
export class AboutEditComponent implements OnInit {
  aboutMeForm!: FormGroup;
  @Output() onShowDetails = new EventEmitter()
  @Input() aboutMe!: String;
  


  constructor(
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService) {

  }

  ngOnInit(): void {
   
    this.aboutMeForm = this.formBuilder.group({
      aboutMe: [this.aboutMe == null ? '' : this.aboutMe, [Validators.required, onlyWhitespace()]],
    })
  }
  onSubmit() {

    if (this.aboutMeForm.invalid) {
      alert('Invalid input');
      return;
    }

    this.loaderService.showLoading()
    this.portfolioService.updateAboutMe(this.aboutMeForm.getRawValue()).subscribe({
      next: data => {},
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
    return this.aboutMeForm!.controls;
  }


}
