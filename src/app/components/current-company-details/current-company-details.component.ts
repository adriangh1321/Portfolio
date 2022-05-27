import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentCompany } from 'src/app/models/CurrentCompany';

@Component({
  selector: 'app-current-company-details',
  templateUrl: './current-company-details.component.html',
  styleUrls: ['./current-company-details.component.css']
})
export class CurrentCompanyDetailsComponent implements OnInit {

  @Input() currentCompany!:CurrentCompany;
  @Output() onToggleEditCurrentCompany = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  editCurrentCompany() {
    this.onToggleEditCurrentCompany.emit()
  }

}
