import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/models/Experience';
import { Location } from 'src/app/models/Location';
import { ExperienceService } from 'src/app/services/experience.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enums/NotificationType';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { Country } from 'src/app/models/Country';
import { Region } from 'src/app/models/Region';
import { RegionService } from 'src/app/services/region.service';
import { CountryService } from 'src/app/services/country.service';
import { onlyWhitespace } from 'src/app/validators/WhitespaceValidatorDirective';
import { maxFileSize } from 'src/app/validators/MaxFileSize';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent implements OnInit {
  experienceForm!: FormGroup;
  @Output() onShowDetails = new EventEmitter()
  @Input() experience: Experience;
  countries$!: Observable<Country[]>
  regions$!: Observable<Region[]>
  private countryToLoad = new Subject<number>()
  readonly maxSizeAllowed = environment.maxFileSize


  constructor(
    private experienceService: ExperienceService,
    private formBuilder: FormBuilder,
    private parserFormatter: NgbDateParserFormatter,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private countryService: CountryService,
    private regionService: RegionService) {
    this.experience = new Experience()
  }

  ngOnInit(): void {
    this.regions$ = this.countryToLoad
    .pipe(
      switchMap(countryId => this.regionService.getAllByCountry(countryId)
        .pipe(
          tap(regions => this.experienceForm.get('regionId')?.enable()))))

  this.countries$ = this.countryService.getAll()
    .pipe(
      tap(d => {
        this.experienceForm.get('countryId')?.enable()
        if (this.experienceForm.get('countryId')?.value) {
          this.countryToLoad.next(parseInt(this.experienceForm.get('countryId')?.value))
        }
      }))




    
    this.experienceForm = this.formBuilder.group({
      position: [this.experience.position, [Validators.required]],
      company: [this.experience.company, [Validators.required]],
      description: [this.experience.description, [Validators.required]],
      startDate: [this.experience.startDate !== null ? {
        year: this.experience.startDate!.getFullYear(),
        month: this.experience.startDate!.getMonth() + 1,
        day: this.experience.startDate!.getDate(),
      } : null, [Validators.required]],
      endDate: [this.experience.endDate !== null ? {
        year: this.experience.endDate!.getFullYear(),
        month: this.experience.endDate!.getMonth() + 1,
        day: this.experience.endDate!.getDate(),
      } : null, []],
      countryId: [{ value: this.experience.location.region == null ? '' : this.experience.location.region.country.id, disabled: true }, [Validators.required]],
      regionId: [{ value: this.experience.location.region == null ? '' : this.experience.location.region.id, disabled: true }, [Validators.required]],
      address:[this.experience.location.address==null?'':this.experience.location.address],
      image: [this.experience.image, [maxFileSize(this.maxSizeAllowed)]]
    })
  }

  onSubmit() {

    if (this.experienceForm.invalid) {
      alert('Invalid input');
      return;
    }
    if (this.experienceForm.get("endDate")!.value !== null) {
      this.experienceForm.patchValue({
        endDate: this.parserFormatter.format(this.experienceForm.get("endDate")!.value)
      })
    }
    this.experienceForm.patchValue({
      startDate: this.parserFormatter.format(this.experienceForm.get("startDate")!.value),

    })
    if((this.experienceForm.get('address')!.value as string).trim().length == 0){
      this.experienceForm.patchValue({
        address: null
      })
    }
    this.experienceForm.removeControl('countryId')
    this.loaderService.showLoading()
    this.experienceService.updateExperience(this.experience.id, this.experienceForm.getRawValue()).subscribe({
      next: data => this.notificationService.requestNotification({ type: NotificationType.SUCCESS, message: NotificationMessage.EXP_UPDATE }),
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



  onImageExperienceUpload(e: Event) {
    let file = (e.target as HTMLInputElement).files![0]
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convierte la imagen a una cadena en base64
      this.experienceForm.controls['image'].setValue(reader.result as string)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  get m() {
    return this.experienceForm!.controls;
  }

  onChangeCountry() {
    this.experienceForm.get('regionId')?.disable()
    this.experienceForm.patchValue({ regionId: '' })
    this.countryToLoad.next(this.experienceForm.get('countryId')?.value)
  }

}
