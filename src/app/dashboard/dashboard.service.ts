import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject, of } from 'rxjs';
import { CredentialsService } from '../auth/credentials.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _baseUrl = environment.url;
  userData = new BehaviorSubject({})
  constructor(
    public credentialsService: CredentialsService,
    private httpClient: HttpClient) {

  }
  setUserData(data){
    this.userData.next(data)
  }
  getUserData(){
    return this.userData;
  }
  sendTop() {
    window.scrollTo(500, 0);
  }

  update(context, id) {
    return this.httpClient.put(this._baseUrl + `editProfile?id=` + id, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getUserDetail(id) {
    return this.httpClient.get(this._baseUrl + 'userDetail?id=' + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  uploadImage(fileToUpload: File, type) {
    // console.log('type')
    let params = "?modelName=" + type;
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    formData.append("modelName", type);
    return this.httpClient
      .post(this._baseUrl + `product/uploadimage?modelName=` + type, formData,{
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  deleteImage(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.delete(this._baseUrl + 'Image/delete', { params: params }).pipe(
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

  handleError(error) {
    if (error.code == 404 || error.error.code == 404) {
      return throwError(error.message || error.error.message);
    } else if (error.error.code == 301) {
      return throwError(error.error.message);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getTransitionDetails(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(this._baseUrl + 'transactionList?', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }




}
