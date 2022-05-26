import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { onlyWhitespace } from 'src/app/validators/WhitespaceValidatorDirective';

@Component({
  selector: 'app-basic-info-edit',
  templateUrl: './basic-info-edit.component.html',
  styleUrls: ['./basic-info-edit.component.css']
})
export class BasicInfoEditComponent implements OnInit {
  @Input() portfolio!: Portfolio;
  @Output() onShowDetails = new EventEmitter()
  basicInfoForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.basicInfoForm = this.formBuilder.group({
      firstname: [this.portfolio.firstname, [Validators.required, onlyWhitespace()]],
      lastname: [this.portfolio.lastname, [Validators.required, onlyWhitespace()]],
      ocupation: [this.portfolio.ocupation, [Validators.required, onlyWhitespace()]],
      country: [this.portfolio.country, [Validators.required, onlyWhitespace()]],
      state: [this.portfolio.state, [Validators.required, onlyWhitespace()]],
      image: [this.portfolio.image, []]
    })
  }

  onImageUpload(e: Event) {
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.basicInfoForm.controls['image'].setValue(reader.result as string)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    if (this.basicInfoForm.invalid) {
      alert('Invalid input');
      return;
    }
    this.portfolioService.patchBasicInfo(this.portfolio.id, this.basicInfoForm.getRawValue()).subscribe({
      next: data => { alert("The basic info was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
    })
    this.onCloseEdit()
  }
  onCloseEdit() {
    this.onShowDetails.emit()
  }

  get m(){
    return this.basicInfoForm.controls;
  }

}
