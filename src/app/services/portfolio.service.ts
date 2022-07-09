import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Portfolio } from '../models/Portfolio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AboutMe } from '../models/AboutMe';
import { ContactInformation } from '../models/ContactInformation';
import { Profile } from '../models/Profile';
import { PortfolioImage } from '../models/PortfolioImage';
import { PortfolioBasicInfo } from '../models/PortfolioBasicInfo';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl: string = `${environment.baseUrl}/v1/portfolios`
  
  // private _refreshRequired = new Subject<void>()
  private _aboutMeRefreshRequired = new Subject<void>()
  private _basicInfoRefreshRequired = new Subject<void>()
  private _portfolioRequired=new Subject<Portfolio>()
  private _bannerRefreshRequired=new Subject<void>()
  private _imageRequired=new Subject<string>()
  private _basicInfoRequired=new Subject<PortfolioBasicInfo>()

  // get RefreshRequired() {
  //   return this._refreshRequired;
  // }

  get AboutMeRefreshRequired(){
    return this._aboutMeRefreshRequired;
  }
  get BasicInfoRefreshRequired(){
    return this._basicInfoRefreshRequired;
  }
  get PortfolioRequired(){
    return this._portfolioRequired
  }
  get BannerRefreshRequired(){
    return this._bannerRefreshRequired
  }
  get ImageRequired(){
    return this._imageRequired
  }

  get BasicInfoRequired(){
    return this._basicInfoRequired
  }

  constructor(private http: HttpClient) { }

  getMeByToken(): Observable<Portfolio> {
    const url = `${this.apiUrl}/me`
    return this.http.get<Portfolio>(url)
  }

  // getPortfolioById(id: number): Observable<Portfolio> {
  //   const url = `${this.apiUrl}/${id}`
  //   return this.http.get<Portfolio>(url).pipe(
  //     map(response => {
  //       response.experiences.forEach(experience => {
  //         if (experience.startDate !== null) {
  //           experience.startDate = moment(experience.startDate, 'YYYY-MM-DD').toDate()
  //         }

  //         if (experience.endDate !== null) {
  //           experience.endDate = moment(experience.endDate, 'YYYY-MM-DD').toDate()
  //         }
  //       })
  //       response.educations.forEach(education => {
  //         if (education.startDate !== null) {
  //           education.startDate = moment(education.startDate, 'YYYY-MM-DD').toDate()
  //         }

  //         if (education.endDate !== null) {
  //           education.endDate = moment(education.endDate, 'YYYY-MM-DD').toDate()
  //         }
  //       })

  //       return response
  //     }))
  // }

  // updatePortfolio(id: number, portfolio: Portfolio): Observable<void> {
  //   const url = `${this.apiUrl}/${id}`
  //   return this.http.put<void>(url, portfolio).pipe(
  //     tap(() => {
  //       this.RefreshRequired.next()
  //     })
  //   );
  // }

  updateAboutMe(id: number, aboutMe: any): Observable<void> {
    const url = `${this.apiUrl}/${id}/aboutMe`
    return this.http.patch<void>(url, aboutMe).pipe(
      tap(() => {
        this.AboutMeRefreshRequired.next()
      })
    );
  }
  
  getAboutMe(id:number):Observable<AboutMe>{
    const url = `${this.apiUrl}/${id}/aboutMe`
    return this.http.get<AboutMe>(url)
  }

  patchBasicInfo(id:number,basicInfo:any):Observable<any>{
    const url = `${this.apiUrl}/${id}`
    return this.http.patch<void>(url, basicInfo).pipe(
      tap(() => {
        this.BasicInfoRefreshRequired.next()
        
      })
    );
  }

  patchBanner(banner:any):Observable<any>{
    const url = `${this.apiUrl}/me/banner`
    return this.http.patch<void>(url, banner).pipe(
      tap(() => {
        this.BannerRefreshRequired.next()
      })
    );
  }

  getBanner():Observable<any>{
    const url = `${this.apiUrl}/me/banner`
    return this.http.get<any>(url)
  }

  getBasicInfo(id:number):Observable<any>{
    const url = `${this.apiUrl}/${id}/basicInfo`
    return this.http.get<any>(url).pipe(tap(resp=>this.emitBasicInfo(resp)))
  }



  getProfiles():Observable<Profile[]>{
    return this.http.get<Profile[]>(this.apiUrl)
  }

  getByUserNickname(nickname:string):Observable<Portfolio>{
    const url = `${this.apiUrl}/user/${nickname}`
    return this.http.get<Portfolio>(url)
  
  }

  getImage():Observable<PortfolioImage>{
    const url = `${this.apiUrl}/me/image`
    return this.http.get<PortfolioImage>(url).pipe(map(resp=>{
      if(resp.image===null){
        resp.image="./assets/img/default-profile.png"
        return resp
      }
      
      return resp
    }))
  }

  emitPortfolio(portfolio:Portfolio){
    this._portfolioRequired.next(portfolio)
  }

  emitImage(image:string){
    if(image===null){
      image="./assets/img/default-profile.png"
    }
    this._imageRequired.next(image)
  }

  emitBasicInfo(basicInfo:PortfolioBasicInfo){
    
   this._basicInfoRequired.next(basicInfo)
  }

  
}

