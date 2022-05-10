import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable, BehaviorSubject, of, Subject } from "rxjs";
import { CredentialsService } from "../auth/credentials.service";
import { environment } from "../../environments/environment";
import { ChatService } from "../chat.service";
import { Router } from "@angular/router";
import { BehaviorService } from "./behavior.service";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  private _baseUrl = environment.url;
  // userData = new BehaviorSubject<any>({})

  constructor(
    public credentialsService: CredentialsService,
    private httpClient: HttpClient,
    private router: Router,
    public _bs: BehaviorService
  ) {
    // console.log('myGroupData service',this.userData)
  }

  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject(this.editDataDetails);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  get(path) {
    // const headers = this.getAuthorizationHeader();
    return this.httpClient.get(this._baseUrl + path);
  }

  post(body, path) {
    // let headers = this.getAuthorizationHeader();
    return this.httpClient.post(this._baseUrl + path, body);
  }

  put(body, path) {
    // let headers = this.getAuthorizationHeader();
    return this.httpClient
      .put(this._baseUrl + path, body)
      .pipe(catchError(this.handleError));
  }
  daysDiffCalc(dateFuture, dateNow) {
    var diffMs = dateNow - dateFuture; // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days

    return diffDays;
  }
  autoLoginWithSlug(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "autoLogin/slug", { params: params })
      .pipe(
        map((response: any) => {
          this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  updateNotification(id) {
    return this.httpClient.put(this._baseUrl + "updateReadStatus?id=" + id, {});
  }
  deleteReport(id) {
    return this.httpClient
      .delete(this._baseUrl + "reportpost/delete?id=" + id)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  // checkModerateContent(url) {
  //   console.log(url, "in  response moderate");
  //   // let params = this.getParams(param);
  //   return this.httpClient.get(url).pipe(
  //     map((response: any) => {
  //       console.log(response, "response moderate");
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }
  public checkModerateContent = (url) => {
    // return this.http.get(environment.config.CHAT_URL + '/admin/user_history?from=' + from + '&to=' + to)
    console.log(url, "in  response moderate");
    return this.httpClient.get(url);
  };

  actionRequest(url) {
    return this.httpClient.get(url);
  }
  clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ""
      ) {
        delete obj[propName];
      }
    }
    return obj;
  }
  sendTop() {
    window.scrollTo(500, 0);
  }

  autoLogin(data) {
    return this.httpClient.post(this._baseUrl + "autoLogin", data).pipe(
      map((response: any) => {
        this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  Onshare(data) {
    return this.httpClient.post(this._baseUrl + "click/add", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getCategories(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "categories", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  deleteModPost(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .delete(this._baseUrl + "modpost/delete", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  deleteGroup(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .delete(this._baseUrl + "group/delete", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  deleteComment(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .delete(this._baseUrl + "comment/delete", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  leaveGroup(context) {
    return this.httpClient
      .post(this._baseUrl + "group/leaveMember", context)
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getMainCategories(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "mainCategories", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getSubCategories(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "subCategories", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getOccupation(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "categories", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  uploadMultipleImage(params, formData) {
    return this.httpClient
      .post(this._baseUrl + `uploadimages` + params, formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  uploadMultipleDocImage(params, formData) {
    return this.httpClient
      .post(this._baseUrl + `multipleimagedoc` + params, formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  sendNotif(id) {
    let data = {
      user_id: id,
    };
    // this.chatService.sendNotif(data);
  }
  secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  getRvType(type) {
    let allrvTypes = [
      {
        description: "Class A",
        detail: { value: "a", key: "Class A" },
      },
      {
        description: "Class B",
        detail: { value: "b", key: "Class B" },
      },
      {
        description: "Class C",
        detail: { value: "c", key: "Class C" },
      },
      {
        description: "Truck Camper",
        detail: { value: "truck-camper", key: "Truck Camper" },
      },
      {
        description: "Travel Trailer",
        detail: { value: "trailer", key: "Travel Trailer" },
      },
      {
        description: "Fifth-Wheel",
        detail: { value: "fifth-wheel", key: "Fifth-Wheel" },
      },
      {
        description: "Custom",
        detail: { value: "custom", key: "Custom" },
      },
      {
        description: "Ambulance",
        detail: { value: "ambulance", key: "Ambulance" },
      },
      {
        description: "Skoolie",
        detail: { value: "skoolie", key: "Skoolie" },
      },
    ];
    if (type != "" && type != undefined && type != null) {
      let rvType = allrvTypes.find(({ detail }) => detail.value == type);
      return rvType.description;
    }
  }
  getRvRentalUrlType(url, typeOfUrl) {
    console.log("in rv url test", url, typeOfUrl);
    let text = url;
    let result = false;
    var regexrvshare = new RegExp("^https://www.rvshare.com/(.+)");
    var regexoutdoorsy = new RegExp("^https://www.outdoorsy.com/(.+)");
    var regexrvezy = new RegExp("^https://www.rvezy.com/(.+)");
    if (typeOfUrl == "rvShareUrl") {
      result = regexrvshare.test(text);
      console.log(result, "1");
      return result;
    }
    if (typeOfUrl == "outdoorsyUrl") {
      result = regexoutdoorsy.test(text);
      console.log(result, "2");
      return result;
    }
    if (typeOfUrl == "rvezyUrl") {
      result = regexrvezy.test(text);
      console.log(result, "3");
      return result;
    }
  }
  getRvTypeArray(rvTypes) {
    let selectedTypes = [];
    let allrvTypes = [
      {
        description: "Class A",
        detail: { value: "a", key: "Class A" },
      },
      {
        description: "Class B",
        detail: { value: "b", key: "Class B" },
      },
      {
        description: "Class C",
        detail: { value: "c", key: "Class C" },
      },
      {
        description: "Truck Camper",
        detail: { value: "truck-camper", key: "Truck Camper" },
      },
      {
        description: "Travel Trailer",
        detail: { value: "trailer", key: "Travel Trailer" },
      },
      {
        description: "Fifth-Wheel",
        detail: { value: "fifth-wheel", key: "Fifth-Wheel" },
      },
      {
        description: "Custom",
        detail: { value: "custom", key: "Custom" },
      },
      {
        description: "Ambulance",
        detail: { value: "ambulance", key: "Ambulance" },
      },
      {
        description: "Skoolie",
        detail: { value: "skoolie", key: "Skoolie" },
      },
    ];
    for (let index = 0; index < rvTypes.length; index++) {
      const type = rvTypes[index].id;
      if (type != "" && type != undefined && type != null) {
        let rvType = allrvTypes.find(({ detail }) => detail.value == type);
        let newType = rvType;
        newType["count"] = rvTypes[index].count;
        selectedTypes.push(newType);
      }
    }
    return selectedTypes;
  }
  viewPost(data) {
    if (data.postType == "normalPost") {
      this.router.navigate(["normal-post-detail"], {
        queryParams: { id: data.postId },
      });
      this._bs.viewNormalPostDetail.next(true);
      // this.getallNormalPosts();
    }
    if (data.postType == "modPost") {
      this.router.navigate(["mods", data.postId]);
      // this.router.navigate(["page/mod-details"], {
      //   queryParams: { id: data.postId },
      // });
      this._bs.viewModPostDetail.next(true);
      // this.getallNormalPosts();
    }
    if (data.postType == "groupPost") {
      this.router.navigate(["group-post-detail"], {
        queryParams: { id: data.postId },
      });
      this._bs.viewGroupPostDetail.next(true);
      // this.getGroupPost();
    }
  }
  editComment(context) {
    return this.httpClient.put(this._baseUrl + "comment/update", context).pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getNormalPostDetail(param?) {
    let params = this.getParams(param);
    return this.httpClient.get(this._baseUrl + "post", { params: params }).pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }
  searchSuggestedMake(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "profileMainCategoriessearch", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  groupposts(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "group/post", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getDocIconFromType(type) {
    let image = "";
    if (type == "image/png") {
      image = "assets/img/img.png";
    }
    if (type == "application/pdf") {
      image = "assets/img/pdf1.png";
    }
    if (type == "image/webp") {
      image = "assets/img/web.png";
    }
    if (type == "image/jpeg") {
      image = "assets/img/img.png";
    }
    if (type == "application/vnd.ms-excel") {
      image = "assets/img/web.png";
    }
    return image;
  }
  getParams(parameters) {
    let params = new HttpParams();
    Object.keys(parameters).map((key) => {
      params = params.set(key, parameters[key]);
    });
    return params;
  }
  generateRandomString() {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var identifier = "";
    for (var i = 0; i < 10; i++) {
      identifier += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return identifier;
  }
  onClickImageWithoutLogin() {
    if (!this.credentialsService.credentials) {
      let fireData: any = {
        title: "Sign Up or Login to see more community content. Its free!",
        // title:
        //   "To see more community content, click Sign Up to join, it’s free!",
        confirmButtonText: "Click here to Sign Up or Login",
        showCancelButton: true,
        allowOutsideClick: false,
        cancelButtonColor: "#ff0000",
        cancelButtonText: "Cancel",
      };
      Swal.fire(fireData).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/auth/signup"]);
        }
      });
    }
  }
  onAcceptRejectGroup(status) {
    if (!this.credentialsService.credentials) {
      if (status == "accepted") {
        let fireData: any = {
          title: "Group request Accepted",
          // title:
          //   "To see more community content, click Sign Up to join, it’s free!",
          confirmButtonText: "Click here to Login",
          showCancelButton: true,
          allowOutsideClick: false,
          cancelButtonColor: "#ff0000",
          cancelButtonText: "Cancel",
        };
        Swal.fire(fireData).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(["/auth/login"]);
          }
        });
      }
      if (status == "rejected") {
        let fireData: any = {
          title: "Group request Rejected",
          // title:
          //   "To see more community content, click Sign Up to join, it’s free!",
          confirmButtonText: "Click here to Login",
          showCancelButton: true,
          allowOutsideClick: false,
          cancelButtonColor: "#ff0000",
          cancelButtonText: "Cancel",
        };
        Swal.fire(fireData).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(["/auth/login"]);
          }
        });
      }
    }
  }

  handleError(error) {
    console.log("errrrrrrrrrr in [age", error);
    if (error.code) {
      return throwError(error);
    } else if (error.error.code == 404) {
      return throwError(error.error.message);
    } else if (error.error.code == 301) {
      return throwError(error.error.message);
    } else if (error.error.code == 400) {
      return throwError(error.error.message);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
