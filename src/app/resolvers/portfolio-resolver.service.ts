import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import moment from 'moment';


import { catchError, map, Observable, tap } from 'rxjs';
import { Portfolio } from '../models/Portfolio';
import { AuthService } from '../services/auth.service';
import { ButtonService } from '../services/button.service';
import { PortfolioService } from '../services/portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioResolverService {

  constructor(private portfolioService: PortfolioService, private router: Router, private buttonService:ButtonService,private authService:AuthService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,

  ): Observable<Portfolio> {
    const nickname = localStorage.getItem('nickname')
    const paramNickname=route.params['nickname']
    if (this.authService.isLoggedIn() && paramNickname == nickname) {
      return this.portfolioService.getMeByToken().pipe(
        map(response => {
          response.experiences.forEach(experience => {
            if (experience.startDate !== null) {
              experience.startDate = moment(experience.startDate, 'YYYY-MM-DD').toDate()
            }
  
            if (experience.endDate !== null) {
              experience.endDate = moment(experience.endDate, 'YYYY-MM-DD').toDate()
            }
          })
          response.educations.forEach(education => {
            if (education.startDate !== null) {
              education.startDate = moment(education.startDate, 'YYYY-MM-DD').toDate()
            }
  
            if (education.endDate !== null) {
              education.endDate = moment(education.endDate, 'YYYY-MM-DD').toDate()
            }
          })
          response.projects.forEach(project => {
            if (project.startDate !== null) {
              project.startDate = moment(project.startDate, 'YYYY-MM-DD').toDate()
            }
  
            if (project.endDate !== null) {
              project.endDate = moment(project.endDate, 'YYYY-MM-DD').toDate()
            }
          })
          
          this.buttonService.activateButton()
          return response
        }),
        tap((resp)=>{
          this.portfolioService.emitPortfolio(resp)
          this.buttonService.activateButton()})
      )
    }
    return this.portfolioService.getByUserNickname(paramNickname).pipe(
      map(response => {
        response.experiences.forEach(experience => {
          if (experience.startDate !== null) {
            experience.startDate = moment(experience.startDate, 'YYYY-MM-DD').toDate()
          }

          if (experience.endDate !== null) {
            experience.endDate = moment(experience.endDate, 'YYYY-MM-DD').toDate()
          }
        })
        response.educations.forEach(education => {
          if (education.startDate !== null) {
            education.startDate = moment(education.startDate, 'YYYY-MM-DD').toDate()
          }

          if (education.endDate !== null) {
            education.endDate = moment(education.endDate, 'YYYY-MM-DD').toDate()
          }
        })
        
        
        return response
      }),
      tap(resp=>this.buttonService.disableButton())
    )
    

  }
}
