import { Component, Input, OnInit } from '@angular/core';
import { CurrentCompany } from 'src/app/models/CurrentCompany';
import { Portfolio } from 'src/app/models/Portfolio';
import { CurrentCompanyService } from 'src/app/services/current-company.service';

@Component({
  selector: 'app-current-company',
  templateUrl: './current-company.component.html',
  styleUrls: ['./current-company.component.css']
})
export class CurrentCompanyComponent implements OnInit {
  @Input() currentCompany!: CurrentCompany;
  isOnShowDetails: Boolean
  constructor(private currentCompanyService: CurrentCompanyService) { this.isOnShowDetails = true }

  ngOnInit(): void {
    this.currentCompanyService.CurrentCompanyRefreshRequired.subscribe((id) => this.getCurrentCompany(id))
  }
  getCurrentCompany(id: number) {
    this.currentCompanyService.getById(id).subscribe(response => this.currentCompany = response)
  }
  toggleEditCurrentCompany() {
    this.isOnShowDetails = false;
  }
  showDetails() {
    this.isOnShowDetails = true;
  }
}
