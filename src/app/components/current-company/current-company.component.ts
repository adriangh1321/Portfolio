import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';

@Component({
  selector: 'app-current-company',
  templateUrl: './current-company.component.html',
  styleUrls: ['./current-company.component.css']
})
export class CurrentCompanyComponent implements OnInit {
@Input() portfolio!:Portfolio;
  constructor() { }

  ngOnInit(): void {
  }

}
