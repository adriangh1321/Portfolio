import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Country } from 'src/app/models/Country';
import { Region } from 'src/app/models/Region';
import { CountryService } from 'src/app/services/country.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search!: string;
  findBy!: string | null;
  filterCountry!: string;
  filterRegion!: string;
  order!: string;
  showFilters!: boolean;
  showSort!: boolean;
  query: any
  countries$!: Observable<Country[]>
  regions$!: Observable<Region[]>
  private countryToLoad = new Subject<number>()


  isRegionReady!: boolean
  isCountryReady!: boolean




  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private countryService: CountryService,
    private regionService: RegionService) {

  }

  ngOnInit(): void {
    this.countries$ = this.countryService.getAll().pipe(tap(d => { 
      this.isCountryReady = true
      if(this.filterCountry){
      this.countryToLoad.next(parseInt(this.filterCountry))
      }
    }))
    this.regions$ = this.countryToLoad
      .pipe(
        switchMap(countryId => this.regionService.getAllByCountry(countryId)
          .pipe(
            tap(regions => this.isRegionReady = true))))
    this.isCountryReady = false
    this.isRegionReady = false

    this.query = {}
    this.showFilters = false;


    this.activatedRoute.queryParamMap.subscribe(paramMap => {

      const findBy = paramMap.keys[0]
      const search = paramMap.get(findBy)
      const filterCountry = paramMap.get('country')
      const filterRegion = paramMap.get('region')
      const order = paramMap.get('order')
      this.findBy = findBy ? findBy : ''
      this.search = search ? search : ''
      this.filterCountry = filterCountry ? filterCountry : ''
      this.filterRegion = filterRegion ? filterRegion : ''
      this.order = order ? order : 'ASC'
      if (filterCountry || filterRegion) {
        this.showFilters = true
        
        
      }
      




    })




  }

  onSubmit() {
    if (this.isFindByInvalid()) {
      this.notificationService.showNotification({ type: NotificationType.WARNING, message: NotificationMessage.NO_SEARCH_METHOD })
      return;
    }
    if (this.isFiltersInvalid()) {
      this.notificationService.showNotification({ type: NotificationType.WARNING, message: NotificationMessage.NO_FILTERS })
      return;
    }

    this.setFindBy()
    this.setFilters()
    this.setOrder()
    this.loaderService.showLoading()
    console.log(this.query)
    this.router.navigate(['/home'], { queryParams: this.query })
  }

  onInput() {
    console.log('search:' + this.search)
    console.log('findBy:' + this.findBy)
    console.log('filterCountry:' + this.filterCountry)
    console.log('filterRegion:' + this.filterRegion)
  }

  isFindByInvalid() {
    return this.findBy == ""

  }
  isFiltersInvalid() {
    return this.filterCountry == "" && this.filterRegion == "" && this.showFilters
  }

  toggleFilters() {

    this.showFilters = !this.showFilters
    if (this.showFilters) {
      console.log(this.showFilters)
      this.filterCountry=''
      this.filterRegion=''
      this.isCountryReady=false
      this.isRegionReady=false
      this.countryService.getAll()
    }
  }
  toggleSort() {
    this.order = this.order == 'ASC' ? 'DESC' : 'ASC'
  }

  setFindBy() {
    this.query = {}
    this.query[`${this.findBy}`] = this.search
  }

  setFilters() {
    if (!this.showFilters) {
      return
    }
    if (this.filterCountry) {
      this.query['country'] = this.filterCountry
    }
    if (this.filterRegion) {
      this.query['region'] = this.filterRegion
    }

  }
  setOrder() {
    this.query['order'] = this.order
  }

  onChange() {
    console.log(this.filterCountry);
    
    this.isRegionReady=false
    this.filterRegion=''
    this.countryToLoad.next(parseInt(this.filterCountry))
    


  }



}
