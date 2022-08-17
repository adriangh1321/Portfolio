import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Portfolio } from 'src/app/models/Portfolio';
import { LoaderService } from 'src/app/services/loader.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { onlyWhitespace } from 'src/app/validators/WhitespaceValidatorDirective';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { Country } from 'src/app/models/Country';
import { Region } from 'src/app/models/Region';
import { CountryService } from 'src/app/services/country.service';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-basic-info-edit',
  templateUrl: './basic-info-edit.component.html',
  styleUrls: ['./basic-info-edit.component.css']
})
export class BasicInfoEditComponent implements OnInit {
  @Input() portfolio!: Portfolio;
  @Output() onShowDetails = new EventEmitter()
  basicInfoForm!: FormGroup
  country!: string
  countries$!: Observable<Country[]>
  regions$!: Observable<Region[]>
  private countryToLoad = new Subject<number>()

  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
    private loaderService: LoaderService,
    private countryService: CountryService,
    private regionService: RegionService) { }

  ngOnInit(): void {
    this.regions$ = this.countryToLoad
      .pipe(
        switchMap(countryId => this.regionService.getAllByCountry(countryId)
          .pipe(
            tap(regions => this.basicInfoForm.get('regionId')?.enable()))))

    this.countries$ = this.countryService.getAll()
      .pipe(
        tap(d => {
          this.basicInfoForm.get('countryId')?.enable()
          if (this.basicInfoForm.get('countryId')?.value) {
            this.countryToLoad.next(parseInt(this.basicInfoForm.get('countryId')?.value))
          }
        }))


    this.basicInfoForm = this.formBuilder.group({
      firstname: [this.portfolio.firstname == null ? '' : this.portfolio.firstname, [Validators.required, onlyWhitespace()]],
      lastname: [this.portfolio.lastname == null ? '' : this.portfolio.lastname, [Validators.required, onlyWhitespace()]],
      occupation: [this.portfolio.occupation == null ? '' : this.portfolio.occupation, [Validators.required, onlyWhitespace()]],
      countryId: [{ value: this.portfolio.location.region == null ? '' : this.portfolio.location.region.country.id, disabled: true }, [Validators.required]],
      regionId: [{ value: this.portfolio.location.region == null ? '' : this.portfolio.location.region.id, disabled: true }, [Validators.required]],
      address:[this.portfolio.location.address==null?'':this.portfolio.location.address,[Validators.required, onlyWhitespace()]],
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
    this.basicInfoForm.removeControl('countryId')
    this.loaderService.showLoading()
    this.portfolioService.patchBasicInfo(this.portfolio.id, this.basicInfoForm.getRawValue()).subscribe({
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
    return this.basicInfoForm.controls;
  }

  onChangeCountry() {
    this.basicInfoForm.get('regionId')?.disable()
    this.basicInfoForm.patchValue({ regionId: '' })
    this.countryToLoad.next(this.basicInfoForm.get('countryId')?.value)
  }

}
