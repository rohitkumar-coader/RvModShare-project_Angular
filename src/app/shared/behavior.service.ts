import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class BehaviorService {
  public userData: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public magnifyBadgeData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public user: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public sharedPostData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public postDataToreload: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public Tabs: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public modFilter: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public feedFilter: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public resetTotalCount: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );
  public resetToBrowsemod: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );
  public updateFollowListButton: BehaviorSubject<any> =
    new BehaviorSubject<any>(false);
  public contenModalValid: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );
  public RequestAccepted: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );
  public messageSent: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public chatCount: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public viewNormalPostDetail: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );
  public viewModPostDetail: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );
  public viewGroupPostDetail: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );
  public updateSticky: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public publishedMod: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public reloadFollowCategory: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );

  public headerSearchKeyword: BehaviorSubject<string> =
    new BehaviorSubject<string>("");
  // rootUrl: string = environment.url;

  constructor() {}

  setUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
    this.userData.next(data);
  }

  getUserData() {
    return this.userData.asObservable();
  }

  getmodData() {
    return this.modFilter.asObservable();
  }

  setUser(value) {
    let user: object;
    let userObject = { user: value };
    this.user.next(userObject);
    return {};
  }

  unsetUser() {
    this.user.next({});
    return {};
  }
}
