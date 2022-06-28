import { Component, OnInit } from '@angular/core';
import isOnline from 'is-online';
import { Observable } from 'rxjs';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { Portfolio } from 'src/app/models/Portfolio';
import { AuthService } from 'src/app/services/auth.service';
import { ContactInformationService } from 'src/app/services/contact-information.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  contactInformation$!: Observable<ContactInformation>
  portfolio!: Portfolio

  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private contactInformationService: ContactInformationService) {

  }
  networkStatus: boolean = false;


  ngOnInit(): void {

    this.contactInformation$ = this.contactInformationService.contactInformationRequired$()
    this.portfolioService.PortfolioRequired.subscribe((portfolio) => this.contactInformationService.emitContactInformation(portfolio.contactInformation))

  }

  logout() {
    this.authService.logout()
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

}
