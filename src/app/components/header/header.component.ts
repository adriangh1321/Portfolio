import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ContactInformationService } from 'src/app/services/contact-information.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  contactInformation$!: Observable<ContactInformation>
  portfolioImage$!: Observable<string>
  user$!: Observable<User>
  showNetworks: boolean


  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private contactInformationService: ContactInformationService,
    private router: Router,
    private scrollService: ScrollService) {
    this.showNetworks = false
  }
  networkStatus: boolean = false;


  ngOnInit(): void {

    this.contactInformation$ = this.contactInformationService.contactInformationRequired$()
    this.portfolioImage$ = this.portfolioService.ImageRequired
    this.portfolioService.PortfolioRequired.subscribe((portfolio) => {
      this.contactInformationService.emitContactInformation(portfolio.contactInformation)
      this.portfolioService.emitImage(portfolio.image)
    })
    this.portfolioService.BasicInfoRequired.subscribe(resp => this.portfolioService.emitImage(resp.image))

    this.user$ = this.authService.userRequired$()
    if (this.isLoggedIn()) {
      this.authService.getMeUser().subscribe(user => this.authService.emitUser(user))
      this.contactInformationService.getMeByToken().subscribe(resp => this.contactInformationService.emitContactInformation(resp))
      this.portfolioService.getImage().subscribe(resp => {
        this.portfolioService.emitImage(resp.image)
      })
    }

    this.authService.LogoutRequired.subscribe(() => {
      this.contactInformation$ = this.contactInformationService.contactInformationRequired$()
      this.portfolioImage$ = this.portfolioService.ImageRequired
      this.portfolioService.PortfolioRequired.subscribe((portfolio) => {
        this.contactInformationService.emitContactInformation(portfolio.contactInformation)
        this.portfolioService.emitImage(portfolio.image)
      })
      this.portfolioService.BasicInfoRequired.subscribe(resp => this.portfolioService.emitImage(resp.image))


    })
  }

  logout() {
    this.authService.logout()
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  toggleShowNetworks(e: Event) {
    e.stopPropagation();
    this.showNetworks = !this.showNetworks
  }

  navigate(nickname: string) {
    let oldUrl: string = this.router.url
    let newUrl=`/profile/${nickname}`
    if (oldUrl == newUrl) {
      window.location.reload();
      return
    }

    this.router.navigate(['profile', nickname])
      .then(() => {
        this.scrollService.scrollEmit()
      });
  }


}
