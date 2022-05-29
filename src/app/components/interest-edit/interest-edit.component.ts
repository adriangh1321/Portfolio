import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interest } from 'src/app/models/Interest';
import { InterestService } from 'src/app/services/interest.service';
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


  constructor(private interestService: InterestService, private formBuilder: FormBuilder) {
    this.interest = new Interest()
  }

  ngOnInit(): void {
    this.interestForm = this.formBuilder.group({
      name: [this.interest.name, [Validators.required,onlyWhitespace()]],
      image: [this.interest.image, []]
    })
  }

  onSubmit() {

    if (this.interestForm.invalid) {
      alert('Invalid input');
      return;
    }
    
    

    this.interestService.updateInterest(this.interest.id, this.interestForm.getRawValue()).subscribe({
      next: data => { alert("The interest was updated successfull!") },
      error: error => { alert("There was a error"); console.log(error) }
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
