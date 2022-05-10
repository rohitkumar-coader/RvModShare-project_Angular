import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorService } from '../shared/behavior.service';
import { CredentialsService } from './credentials.service';
export interface SignupContext {
  program: string;
  companyName: string;
  companyUrl: string;
  salutaion: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginContext {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  private _baseUrl = environment.url;

  constructor(
    private httpClient: HttpClient,
    public credentialsService: CredentialsService,
    private _bs :BehaviorService
  ) { }

  /**
* @method
* @name login
* @description
* Authenticates the user.
* Request body:json {
       'email': string,
       'password': string
* }
* @param context The login parameters.
* @return Promise.
*/
  // sendTop() {
  //   window.scrollTo(500, 0);
  // }

  login(context) {
    return this.httpClient.post(this._baseUrl + `user/signin`, context).pipe(
      map((response: any) => {
        this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }
  socialLogin(data,path){
    return this.httpClient.post(this._baseUrl + path, data).pipe(
      map((response: any) => {
        this._bs.setUserData(response.data);
        this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  Signup(context) {
    // let param = this.getParams(context);
    return this.httpClient.post(this._baseUrl + `signup`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )

  }
  getIPAddress()  
  {  
    return this.httpClient.get('https://jsonip.com');  
  } 

  resendEmail(context) {
    // let param = this.getParams(context);
    return this.httpClient.post(this._baseUrl + `resendVerifyEmail`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )

  }

  logout(id) {
    let url = this._baseUrl + 'logout';
    return this.httpClient.post(url, id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  changePass(params) {
    return this.httpClient.post(this._baseUrl + 'changePassword', params).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }



  sendEmail(formData): Observable<any> {
    return this.httpClient.post(this._baseUrl + `forgotpassword`, formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  resetPassword(formData): Observable<any> {
    return this.httpClient.put(this._baseUrl + `resetPassword`, formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  sendInvite(formData): Observable<any> {
    return this.httpClient.post(this._baseUrl + `invite/friend`, formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getParams(parameters) {
    let params = new HttpParams();
    Object.keys(parameters).map((key) => {
      params = params.set(key, parameters[key]);
    })
    return params;
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error.code == 401) {
      return throwError('');
    } else if (error.error.code == 404) {
      return throwError(error.error.message);
    } else if (error.error.code == 404) {
      // console.log("Here======")
      return throwError(error.error.message);
    }else if (error.error.code == 400) {
      return throwError(error.error.message);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
