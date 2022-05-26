import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  idPortfolio!:number;


  constructor(private portfolioService: PortfolioService, private formBuilder: FormBuilder) {
       
  }

  ngOnInit(): void {
    this.idPortfolio=parseInt(localStorage.getItem("id_portfolio")!)
    this.aboutMeForm = this.formBuilder.group({
      aboutMe: [this.aboutMe, [Validators.required,onlyWhitespace()]],        
    })
  }
  onSubmit() {

    if (this.aboutMeForm.invalid) {
      alert('Invalid input');
      return;
    }
    

    this.portfolioService.updateAboutMe(this.idPortfolio, this.aboutMeForm.getRawValue()).subscribe({
      next: data => { alert("The about me was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
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
