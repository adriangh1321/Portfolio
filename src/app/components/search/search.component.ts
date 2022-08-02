import { Component, OnInit, Query } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search!: string;
  findBy!: string

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.findBy = ""
  }

  onSubmit() {
    let query: any={}
    query[`${this.findBy}`] = this.search
    this.router.navigate(['/portfolios'], { queryParams: query})
}

onInput(){
  console.log('search:' + this.search)
  console.log('findBy:' + this.findBy)
}

}
