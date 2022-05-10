import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';

// import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MyAuthService } from '../auth/auth.service';

// import {do} from  'rxjs/add/operator/do';

const TOKEN_KEY = 'token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    protected debug = false;
    private APIToken = null;
    token: any;
    currentUserData :any;

    constructor(private authService: MyAuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.currentUserData = JSON.parse(localStorage.getItem('credentials'));
    this.token = localStorage.getItem("token");

    // console.log(this.currentUserData);
    if(this.currentUserData){
        let headers = {}; 
        // const token = this.currentUserData.access_token ? this.currentUserData.access_token:''; 
        // console.log("tkennnnnnnnnnnn",token)
        // console.log("tkennnnnnnnnnnn",this.token)
        if (this.token) {
          headers = {
            'Authorization': `Bearer ${this.token}`,
            'Access-Control-Allow-Origin': '*', 
            'Accept': 'application/json', 
          };
       
        request = request.clone({
          setHeaders: headers
        });
    } 
    }
   
    return next.handle(request);
  }
}