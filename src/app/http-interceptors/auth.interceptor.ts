import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';
import isOnline from "is-online";

import { from, Observable, mergeMap, Subject } from "rxjs";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs/operators";

import { AuthService } from "../services/auth.service";
import { EMPTY } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private networkStatus: boolean = false;
    constructor(private auth: AuthService, private router: Router, private zone: NgZone,private http:HttpClient) { }

    // checkStatus(): Observable<boolean> {
    //     return from((async () => {
    //         return await isOnline();
    //     })())
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        

            return from(isOnline()).pipe(mergeMap(res => {





                if (!res) {
                    // if there is no internet, throw a HttpErrorResponse error
                    // since an error is thrown, the function will terminate here
    
                    
                   this.zone.runGuarded(()=>{
                    throw new Error ("No Internet connection")
                   }) ;
                   return EMPTY;
                   
                   
                    
                }
    
                // Get the auth token from the service.
                const authToken = this.auth.getAuthorizationToken();
    
                // Clone the request and replace the original headers with
                // cloned headers, updated with the authorization.
                const authReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
                });
    
                // send cloned request with header to the next handler.
                return next.handle(authReq).pipe(
                    catchError((err: HttpErrorResponse) => {
    
                        if (err.status === 401) {
                            this.router.navigateByUrl('/login');
                        }
    
                        return throwError(() => err);
    
                    })
                );
    
    
    
    
    
    
    
    
    
    
            }))
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

        





    }
}