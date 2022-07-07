import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import isOnline from 'is-online';
import { Observable } from 'rxjs';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { Portfolio } from 'src/app/models/Portfolio';
import { User } from 'src/app/models/User';
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
  
  user$!:Observable<User>

  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private contactInformationService: ContactInformationService) {

  }
  networkStatus: boolean = false;


  ngOnInit(): void {
    
    this.contactInformation$ = this.contactInformationService.contactInformationRequired$()
    this.portfolioService.PortfolioRequired.subscribe((portfolio) => this.contactInformationService.emitContactInformation(portfolio.contactInformation))

    this.user$=this.authService.userRequired$()
    if(this.isLoggedIn()){
      this.user$=this.authService.getMeUser()
      this.contactInformation$=this.contactInformationService.getMeByToken()
    }
  }

  logout() {
    this.authService.logout()
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

}
