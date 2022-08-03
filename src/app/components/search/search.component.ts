import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search!: string;
  findBy!: string | null;
  filterCountry!:string;
  filterState!:string;
  order!:string;
  showFilters!:boolean;
  showSort!:boolean;
  query:any

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private notificationService: NotificationService, private loaderService: LoaderService) {
    
  }

  ngOnInit(): void {
    this.query={}
    this.showFilters=false;
    

    this.activatedRoute.queryParamMap.subscribe(paramMap => {

      const findBy = paramMap.keys[0]
      const search= paramMap.get(findBy)
      const filterCountry= paramMap.get('country')
      const filterState=paramMap.get('state')
      const order=paramMap.get('order')
      this.findBy=findBy?findBy:''
      this.search=search?search:''
      if(filterCountry || filterState){
        this.showFilters=true
      }
      this.filterCountry=filterCountry?filterCountry:''
      this.filterState=filterState?filterState:''
      this.order=order?order:'ASC'
      
      
      

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
  }

  isFindByInvalid() {
    return this.findBy == ""

  }
  isFiltersInvalid(){
    return this.filterCountry=="" && this.filterState=="" && this.showFilters
  }

  toggleFilters(){
    this.showFilters=!this.showFilters
  }
  toggleSort(){
    this.order=this.order=='ASC'?'DESC':'ASC'
  }

  setFindBy(){
    this.query={}
    this.query[`${this.findBy}`] = this.search
  }

  setFilters(){
    if(!this.showFilters){
      return
    }
    if(this.filterCountry){
      this.query['country']=this.filterCountry
    }
    if(this.filterState){
      this.query['state']=this.filterState
    }

  }
  setOrder(){
    this.query['order']=this.order
  }



}
