import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {
  @Input() banner!: string;
  @Output() onShowDetails = new EventEmitter()
  bannerForm!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.bannerForm = this.formBuilder.group({
      banner: [this.banner , []],
      
    })
  }

  onImageUpload(e: Event) {
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.bannerForm.controls['banner'].setValue(reader.result as string)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    if (this.bannerForm.invalid) {
      alert('Invalid input');
      return;
    }
    this.loaderService.showLoading()
    this.portfolioService.patchBanner(this.bannerForm.getRawValue()).subscribe({
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
    return this.bannerForm.controls;
  }

}
