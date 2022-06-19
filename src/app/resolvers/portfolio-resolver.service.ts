import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import moment from 'moment';


import { catchError, map, Observable } from 'rxjs';
import { Portfolio } from '../models/Portfolio';
import { PortfolioService } from '../services/portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioResolverService {

  constructor(private portfolioService:PortfolioService,private router:Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Portfolio> {
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
        localStorage.setItem("id_portfolio", response.id.toString())

        return response
      })
      )
      
  }
}
