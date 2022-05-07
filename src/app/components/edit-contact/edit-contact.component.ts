import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Cloneable } from 'src/app/utilities/Clone';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactForm!: FormGroup;
  @Input() portfolio: Portfolio;
  updatedPortfolio: Portfolio;
  @Output() offEvent = new EventEmitter()
  

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private portfolioService: PortfolioService) {

    this.portfolio = new Portfolio()
    this.updatedPortfolio = new Portfolio()


  }
  get m() {
    return this.contactForm!.controls;
  }

  ngOnInit(): void {
    this.updatedPortfolio = Cloneable.deepCopy(this.portfolio)
    this.contactForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern("^[(]{1}[0-9]+[)]{1}[0-9]+$")]],
      email: ['', [Validators.required, Validators.email]],
      linkedIn: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      remoteRepository: []
    })
    this.contactForm.patchValue({
      phone: this.updatedPortfolio.contactInformation.phone,
      email: this.updatedPortfolio.contactInformation.email,
      linkedIn: this.updatedPortfolio.contactInformation.linkedIn,
      remoteRepository: this.updatedPortfolio.contactInformation.remoteRepository
    })
    //const json = JSON.parse(JSON.stringify(this.updatedPortfolio.contactInformation))
    //this.contactForm.patchValue(json)





  }

  onSubmit() {
    if (this.contactForm.invalid) {
      alert('Invalid input');
      return;
    }
    this.updatedPortfolio.contactInformation.phone = this.contactForm.get("phone")?.value
    this.updatedPortfolio.contactInformation.email = this.contactForm.get("email")?.value
    this.updatedPortfolio.contactInformation.linkedIn = this.contactForm.get("linkedIn")?.value
    this.updatedPortfolio.contactInformation.remoteRepository = this.contactForm.get("remoteRepository")?.value
    this.portfolioService.updatePortfolio(this.updatedPortfolio.id, this.updatedPortfolio).subscribe({
      next: data => { alert("The contact data was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })



    
    this.emitOff()
  }
  emitOff() {
    this.offEvent.emit()
  }


}
