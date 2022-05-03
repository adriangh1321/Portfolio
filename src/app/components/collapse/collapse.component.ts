import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent implements OnInit {
  @Input() person:Person;
  constructor() { 
    this.person=new Person();
  }

  ngOnInit(): void {
  }

}
