import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CurrentCompany } from 'src/app/models/CurrentCompany';
import { CurrentCompanyService } from 'src/app/services/current-company.service';
import { LoaderService } from 'src/app/services/loader.service';
import { maxFileSize } from 'src/app/validators/MaxFileSize';
import { urlOrWhitespace } from 'src/app/validators/UrlOrWhitespace';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-current-company-edit',
  templateUrl: './current-company-edit.component.html',
  styleUrls: ['./current-company-edit.component.css']
})
export class CurrentCompanyEditComponent implements OnInit {

  @Input() currentCompany!: CurrentCompany;
  @Output() onShowDetails = new EventEmitter()
  currentCompanyForm!: FormGroup
  checkboxImage: boolean;
  readonly maxSizeAllowed = environment.maxFileSize
  constructor(
    private formBuilder: FormBuilder,
    private currentCompanyService: CurrentCompanyService,
    private loaderService: LoaderService) {
    this.checkboxImage = false;
  }

  ngOnInit(): void {
    this.currentCompanyForm = this.formBuilder.group({
      name: [this.currentCompany.name == null ? "" : this.currentCompany.name, []],
      url: [this.currentCompany.url == null ? "" : this.currentCompany.url, [urlOrWhitespace()]],
      image: [this.currentCompany.image, [maxFileSize(this.maxSizeAllowed)]]
    })
  }

  onImageUpload(e: Event) {
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.currentCompanyForm.controls['image'].setValue(reader.result as string)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    if (this.currentCompanyForm.invalid) {
      alert('Invalid input');
      return;
    }
    if ((this.currentCompanyForm.get('name')?.value as string).trim().length == 0) {
      this.currentCompanyForm.patchValue({
        name: null
      })
    }
    if ((this.currentCompanyForm.get('url')?.value as string).trim().length == 0) {
      this.currentCompanyForm.patchValue({
        url: null
      })
    }
    this.loaderService.showLoading()
    this.currentCompanyService.updateCurrentCompany(this.currentCompanyForm.getRawValue()).subscribe({
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
    return this.currentCompanyForm.controls;
  }

  disableImage() {
    this.checkboxImage = !this.checkboxImage;
    this.currentCompanyForm.patchValue({
      image: null
    })
  }

}
