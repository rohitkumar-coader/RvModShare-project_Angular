import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import { CredentialsService } from "../auth/credentials.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PagesService {
  private _baseUrl = environment.url;
  myGroupData = new BehaviorSubject<any>([]);
  myModData = new BehaviorSubject<any>([]);
  // userData = new BehaviorSubject<any>({})

  constructor(
    public credentialsService: CredentialsService,
    private httpClient: HttpClient
  ) {
    // console.log('myGroupData service',this.userData)
  }

  getGroupData(): Observable<any> {
    return this.myGroupData.asObservable();
  }
  // getuserData(): Observable<any> {
  //   return this.userData.asObservable();

  // }
  getModData(): Observable<any> {
    return this.myModData.asObservable();
  }

  setGroupData(data: any) {
    this.myGroupData.next(data);
  }
  setModData(data: any) {
    this.myModData.next(data);
  }
  // setUserData(data:any) {
  //   console.log('data sew',data)
  //     this.userData.next(data);
  // }

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

  addFollowCategories(data) {
    return this.httpClient
      .post(this._baseUrl + "follow/multiple/category", data)
      .pipe(
        map((response: any) => {
          if (response.data) {
            // this.credentialsService.setCredentials(response.data);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  gethostdata(data) {
    return this.httpClient.post(this._baseUrl + "mod/interest", data).pipe(
      map((response: any) => {
        if (response.data) {
          // this.credentialsService.setCredentials(response.data);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateSocialPost(data) {
    return this.httpClient.put(this._baseUrl + "post/update", data).pipe(
      map((response: any) => {
        if (response.data) {
          // this.credentialsService.setCredentials(response.data);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getAllPlans() {
    return this.httpClient.get(this._baseUrl + "getPlans").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getContent(slug) {
    return this.httpClient
      .get(this._baseUrl + "page?slug=" + slug + "&status=active")
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getMyGroups() {
    return this.httpClient.get(this._baseUrl + "groups").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getMyCreatedGroups(param) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "user/created/groups", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getReportedPosts(param) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "reportposts", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getAllAdvertisements(param) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "advertisements", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getTimeRanges() {
    return this.httpClient.get(this._baseUrl + "timeranges").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getAllActivities(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "allactivity", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getFollowCategoriesMods() {
    return this.httpClient.get(this._baseUrl + "followcatMods").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getDefaultPost(id) {
    return this.httpClient.get(this._baseUrl + "pinnedpost?id=" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getDefaultWelcomeContent(id) {
    return this.httpClient.get(this._baseUrl + "welcomepost?id=" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getCommonPosts(key) {
    return this.httpClient.get(this._baseUrl + key).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getMyMods(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "modposts", { params: params })
      .pipe(
        map((response: any) => {
          return response;
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  getPopularMods(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "popular/post", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getLandingPopularMods(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "landing/popular/post", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getMyFollowedInterestMods(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "seemods/follwedinterest/post", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getMyMemberInterestMods(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "seemods/memberinterest/post", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getAll(url, param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient.get(this._baseUrl + url, { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  put(context: any, url: any) {
    return this.httpClient.put(this._baseUrl + url, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  post(context: any, url: any) {
    return this.httpClient.post(this._baseUrl + url, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // getComments(param?) {
  //   let params = new HttpParams();
  //   if (param) {
  //     for (let key of Object.keys(param)) {
  //       params = params.set(key, param[key]);
  //     }
  //   }
  //   return this.httpClient
  //     .get(this._baseUrl + "single/post/comment", { params: params })
  //     .pipe(
  //       map((response: any) => {
  //         return response;
  //       }),
  //       catchError(this.handleError)
  //     );
  // }
  getComments(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "single/comment", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getAllFeatures() {
    return this.httpClient.get(this._baseUrl + "getAllFeatures").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getAllProfessionals() {
    return this.httpClient.get(this._baseUrl + "getProfessionals").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  addLike(context) {
    return this.httpClient.post(this._baseUrl + `add/addlike`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  addComment(context) {
    return this.httpClient.post(this._baseUrl + `add/comment`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  followNotification(context) {
    return this.httpClient.post(this._baseUrl + `check/interest`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  unfollowNotification(context) {
    return this.httpClient
      .post(this._baseUrl + `delete/follow/interest`, context)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  book(context) {
    return this.httpClient.post(this._baseUrl + `bookCall`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  contact(context) {
    return this.httpClient.post(this._baseUrl + `contactus`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  sampleVideoContact(context) {
    return this.httpClient
      .post(this._baseUrl + `contactusSampleCourseVideo`, context)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  samplePdfContact(context) {
    return this.httpClient
      .post(this._baseUrl + `contactusSamplePdfDownload`, context)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  contactUs(context) {
    return this.httpClient
      .post(this._baseUrl + `add/contactFormData`, context)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getAllCountries() {
    return this.httpClient.get(this._baseUrl + "getCountries").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getMakeSeriesClass() {
    return this.httpClient.get(this._baseUrl + "popular/rv").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getAllStates(code) {
    return this.httpClient
      .get(this._baseUrl + "getStates?country_code=" + code)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // buyPlan(context) {
  //   return this.httpClient.post(this._baseUrl + `paypalPayment`, context).pipe(
  //     map((response: any) => {
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }
  timeDiffCalc(dateFuture, dateNow) {
    var diffMs = dateNow - dateFuture; // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    let difference = { hours: diffHrs, minutes: diffMins, days: diffDays };
    let time = "";
    if (difference.days > 0) {
      time = difference.days + " day ago";
    } else if (difference.hours > 0) {
      time = difference.hours + " hours ago";
    } else if (difference.minutes > 0) {
      time = difference.minutes + " minutes ago";
    }

    return time;
  }

  buyPlan(context, param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .post(this._baseUrl + `stripePayment`, context, { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  trialPlan(id) {
    return this.httpClient
      .post(this._baseUrl + `trialplan?plan_id=` + id, { params: "" })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  addPaymentCard(context) {
    return this.httpClient.post(this._baseUrl + `getcardtoken`, context).pipe(
      map((response: any) => {
        return response;
      })
      // catchError(this.handleError)
    );
  }

  deleteCard(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .delete(this._baseUrl + "deletecard", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getUserDetail(id = "") {
    if (id != "") {
      return this.httpClient.get(this._baseUrl + "user?id=" + id).pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
    } else {
      return this.httpClient.get(this._baseUrl + "user").pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
    }
  }

  getUserDetail2(id = "") {
    if (id != "") {
      return this.httpClient.get(this._baseUrl + "userDetail?id=" + id).pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
    } else {
      return this.httpClient.get(this._baseUrl + "userDetail").pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
    }
  }
  getAllUsers(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "user/list", {
        params: params,
      })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getGroupMembers(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "member/groups", {
        params: params,
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getJoinRequest(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "group/joinrequest", {
        params: params,
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  status(id, model, status) {
    let url =
      this._baseUrl +
      "changestatus?id=" +
      id +
      "&model=" +
      model +
      "&status=" +
      status;

    return this.httpClient.put(url, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  InviteMember(context) {
    return this.httpClient
      .post(this._baseUrl + `notification/add`, context)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  updateGroup(context, id) {
    return this.httpClient
      .put(this._baseUrl + `group/update?id=` + id, context)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getGroupDetail(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "slug/group", {
        params: params,
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getGroupDetailWithOutLogin(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "slug/group/nologin", {
        params: params,
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  update(context, id) {
    return this.httpClient
      .put(this._baseUrl + `editProfile?id=` + id, context)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  sendWelcomeEmail(context) {
    // let params = this.getParams(param);
    return this.httpClient.post(this._baseUrl + "welcome/email", context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  setUserDefaultCard(context) {
    return this.httpClient.post(this._baseUrl + `setDefultCard`, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getFriendDetail(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + `friend/details`, { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getFriendsWithSlugDetail(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + `slug/friend/details`, { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getFriendsListToSharePost(param) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "sharedfriends", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  addClickCount(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + `click/count`, { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getAllBadges(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "badges", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getAllGroups() {
    return this.httpClient.get(this._baseUrl + "allgroups").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getAllSuggestedGroups() {
    return this.httpClient.get(this._baseUrl + "suggested/allgroups").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getLandingSuggestedGroups() {
    return this.httpClient.get(this._baseUrl + "popular/users").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  cancelRequest(id) {
    return this.httpClient.get(this._baseUrl + "cancelrequest?id=" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  unFriend(id) {
    return this.httpClient.get(this._baseUrl + "unfriend?id=" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  addFavourite(formData) {
    return this.httpClient.post(this._baseUrl + "add/favourite", formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  addModFollow(formData) {
    return this.httpClient.post(this._baseUrl + "add/follow", formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  joinGroup(formData) {
    return this.httpClient
      .post(this._baseUrl + "group/joinMember", formData)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getFavouriteMods(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "favourites", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getLikedMods(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "liked/modposts", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getFollowers(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "seemods/followedList", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getFollowings(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "seemods/followingList", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getFollowedCategories(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "categoryfollow", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  unsharePost(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .delete(this._baseUrl + "unshare", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getAllPostPhotos(id) {
    return this.httpClient
      .get(this._baseUrl + "friendspostimages?id=" + id)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getFriendsMods() {
    return this.httpClient.get(this._baseUrl + "friendsmodposts").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getSavedPosts() {
    return this.httpClient.get(this._baseUrl + "friendsmodposts").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getAllFaqs(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "allfaq", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getAllNews(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "getAllPressAndNews?status=active", {
        params: params,
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  uploadImage(fileToUpload: File, type) {
    // console.log('type')
    let params = "?modelName=" + type;
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    formData.append("modelName", type);
    return this.httpClient
      .post(this._baseUrl + `product/uploadimage?modelName=` + type, formData, {
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

  deleteImage(param?) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "image/delete", { params: params })
      .pipe(
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
  getAllMakes(param?) {
    let params = this.getParams(param);
    console.log("make params", params);
    return this.httpClient
      .get(this._baseUrl + "makecategory", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getMainsCategories() {
    return this.httpClient.get(this._baseUrl + "homemainCategories").pipe(
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

  getFriendsList(param) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "allfriends", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getJoinedGroups() {
    // let params = this.getParams(param);
    return this.httpClient.get(this._baseUrl + "user/joingroups").pipe(
      map((response: any) => {
        // this.credentialsService.setCredentials(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getUserName(value) {
    console.log(value);
    return this.httpClient
      .get(this._baseUrl + "check/username?search=" + value)
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  sharePost(formData) {
    return this.httpClient.post(this._baseUrl + "add/share", formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  //see mods page filter apis start

  seemodfavorites() {
    // let params = this.getParams(param);
    return this.httpClient.get(this._baseUrl + "seemods/favourites").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  seemodLikedMods() {
    // let params = this.getParams(param);
    return this.httpClient.get(this._baseUrl + "seemods/liked/modposts").pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  seemodFollowMemberMods() {
    return this.httpClient
      .get(this._baseUrl + "seemods/followed/member/post")
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  seemodFollowInterestMods() {
    // let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "seemods/followed/interest/post")
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  seemodtimelineMods() {
    // let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "seemods/followed/memberinterest/post")
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  //see mods filter api end

  addModPost(data) {
    return this.httpClient.post(this._baseUrl + "add/modpost", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  updateModPost(data) {
    return this.httpClient.put(this._baseUrl + "modpost/update", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  addGroup(data) {
    return this.httpClient.post(this._baseUrl + "group/add", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getGroupPosts(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "group/post/like/counts", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
    // return this.httpClient
    //   .get(this._baseUrl + "group/allpost", { params: params })
    //   .pipe(
    //     map((response: any) => {
    //       // this.credentialsService.setCredentials(response.data);
    //       return response;
    //     }),
    //     catchError(this.handleError)
    //   );
  }
  getCommentedModPosts(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "commented/post", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
    // return this.httpClient
    //   .get(this._baseUrl + "group/allpost", { params: params })
    //   .pipe(
    //     map((response: any) => {
    //       // this.credentialsService.setCredentials(response.data);
    //       return response;
    //     }),
    //     catchError(this.handleError)
    //   );
  }
  addGroupPost(data) {
    return this.httpClient.post(this._baseUrl + "group/post/add", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  updateGroupPost(data) {
    return this.httpClient.put(this._baseUrl + "group/post/update", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getallNormalPosts(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "posts", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getModPostFilter(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "modpost/filter", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getFavModPostFilter(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "favourites/filter", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getallFriendModPosts(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "friendprofile/modposts", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }
  deletePost(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .delete(this._baseUrl + "group/post/delete", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  removeInterest(param) {
    let params = this.getParams(param);
    return this.httpClient
      .delete(this._baseUrl + "categoryfollow/delete", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  deleteNormalPost(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "post/delete", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  addPoll(data) {
    return this.httpClient.post(this._baseUrl + "polling/add", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getpopularTagsMods(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "tag/modpost", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  addPost(data) {
    return this.httpClient.post(this._baseUrl + "add/post", data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  splitByComma(string) {
    let sentences = string;
    let result = sentences.split(",").map(function (value) {
      return value.trim();
    });
    return result;
  }
  getModDetail(param?) {
    let params = this.getParams(param);
    return this.httpClient
      .get(this._baseUrl + "slug/modpost", { params: params })
      .pipe(
        map((response: any) => {
          // this.credentialsService.setCredentials(response.data);
          return response;
        }),
        catchError(this.handleError)
      );
    // return this.httpClient
    //   .get(this._baseUrl + "modpost", { params: params })
    //   .pipe(
    //     map((response: any) => {
    //       // this.credentialsService.setCredentials(response.data);
    //       return response;
    //     }),
    //     catchError(this.handleError)
    //   );
  }

  getParams(parameters) {
    let params = new HttpParams();
    Object.keys(parameters).map((key) => {
      params = params.set(key, parameters[key]);
    });
    return params;
  }

  handleError(error) {
    if (error && error.error) {
      if (error.error.code == 404) {
        return throwError(error.error.message);
      } else if (error.error.code == 301) {
        return throwError(error.error.message);
      } else if (error.error.code == 400) {
        return throwError(error.error.message);
      }
    } else {
      return throwError("Something bad happened; please try again later.");
    }
  }
}
