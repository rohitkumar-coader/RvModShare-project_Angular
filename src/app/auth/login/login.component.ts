import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ChatService } from "src/app/chat.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { MyAuthService } from "../auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
// import { SocialLoginService, Provider } from 'ngx-social-login';
import { AppInjector } from "../../app.module";
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from "angular5-social-login";
import { isPlatformBrowser } from "@angular/common";
import { SharedService } from "src/app/shared/shared.service";
import { PagesService } from "src/app/pages/pages.service";
// import { UserIdleService } from "angular-user-idle";

// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/Rx';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  chatService: any;
  IppDetails: any;
  errorMessage: any;
  modUrl: any;
  public loginForm: FormGroup;
  facebookId: any;
  googleId: any;
  today = new Date();
  user: any;
  _Observable: any;
  submitted = false;
  _loginObservable: any;
  passwordType: boolean;
  public rememberMe: boolean = false;
  appleErrorCode: any = "";
  newInterestArray: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: MyAuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService,
    private _bs: BehaviorService,
    private pageService: PagesService,
    // private userIdle: UserIdleService,
    // private chatService: ChatService,
    private _activateRouter: ActivatedRoute,
    private socialAuthService: AuthService,
    private sharedService: SharedService,
    // private socialService: SocialLoginService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.createForm();

    this._activateRouter.queryParams.subscribe((param) => {
      this.appleErrorCode = param["code"];
      // this.getAppleInfo();
      if (this.appleErrorCode == "244") {
        this.toastr.error("", "Error");
      }
      if (this.appleErrorCode == "245") {
        this.toastr.error(
          "Please signup first then continue with login",
          "Error"
        );
      }
      if (param["id"]) {
        this.appleAutoLogin(param["id"]);
      }
    });
    // //Start watching for user inactivity.
    // this.userIdle.startWatching();

    // // Start watching when user idle is starting.
    // this.userIdle.onTimerStart().subscribe((count) => console.log(count));

    // // Start watch when time is up.
    // this.userIdle.onTimeout().subscribe(() => {
    //   console.log("Time is up!");
    //   this.user = JSON.parse(localStorage.getItem("user"));
    //   if (this.user) {
    //     this.setUserOffline();
    //   }
    //   // this.authService.logout();
    //   this.restart();
    // });
  }

  ngOnInit() {
    this.modUrl = localStorage.getItem("url");
    this.newInterestArray = JSON.parse(localStorage.getItem("interestArray"));
    console.log(this.modUrl, "this.modUrl");
    // this.authService.sendTop();
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    if (localStorage.getItem("remember")) {
      this.loginForm.patchValue({
        email: JSON.parse(localStorage.getItem("remember")),
        password: JSON.parse(localStorage.getItem("rememberPassword")),
      });
    }
  }

  markRemember() {
    this.rememberMe = !this.rememberMe;
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      remember: [""],
    });
  }
  // stop() {
  //   this.userIdle.stopTimer();
  // }

  // stopWatching() {
  //   this.userIdle.stopWatching();
  // }

  // startWatching() {
  //   this.userIdle.startWatching();
  // }

  // restart() {
  //   this.userIdle.resetTimer();
  // }
  // setUserOffline() {
  //   this.chatService.showOffline({
  //     user_id: this.user.id,
  //   });
  // }

  get f() {
    return this.loginForm.controls;
  }

  togglePassword() {
    this.passwordType = !this.passwordType;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.spinner.show();
      this._loginObservable = this.authService
        .login(this.loginForm.value)
        .subscribe(
          (res) => {
            if (this.rememberMe == true) {
              let rememberData = this.loginForm.controls.email.value;
              let rememberPassword = this.loginForm.controls.password.value;
              localStorage.setItem("remember", JSON.stringify(rememberData));
              localStorage.setItem(
                "rememberPassword",
                JSON.stringify(rememberPassword)
              );
            } else {
              localStorage.removeItem("remember");
              localStorage.removeItem("rememberPassword");
            }

            if (res.success) {
              // localStorage.setItem("user", JSON.stringify(res.data));
              this._bs.setUserData(res.data);
              // this.getIP()
              this.selectedUser(res.data);
              // if()
              if (
                res.data.isVerified == "Y" &&
                (!res.data.isEmail || !res.data.isRV || !res.data.isInterest)
              ) {
                this.router.navigate(["/welcome/" + res.data.id]);
              } else if (this.modUrl && this.modUrl != "") {
                this.router.navigate([this.modUrl]);
                localStorage.removeItem("url");
              } else if (this.newInterestArray) {
                this.router.navigate(["/mods"]);
                this.followNotificationByclick(this.newInterestArray);
                localStorage.removeItem("interestArray");
              } else {
                this.router.navigate(["/timeline"]);
                // let daysdiff = this.sharedService.daysDiffCalc(
                //   new Date(res.data.date_registered).getTime(),
                //   this.today.getTime()
                // );
                // console.log(daysdiff, "daysdiff");
                // if (daysdiff > 6) this.router.navigate(["/timeline"]);
                // else this.router.navigate(["/mods"]);
              }
              // this.toastr.success('Logged In Successfully!');
            } else {
              this.toastr.error(res.error.message, "Error");
            }

            // setTimeout(() => {
            //   this.spinner.hide();
            // },3500)
          },
          (error) => {
            this.spinner.hide();
            this.toastr.error(error);
          }
        );
    }
  }
  getIP() {
    this.authService.getIPAddress().subscribe((res: any) => {
      this.IppDetails = res.ip;
      localStorage.setItem("ip", JSON.stringify(this.IppDetails));
    });
  }
  signInWithApple() {
    console.log("in apple sign in");
    const CLIENT_ID = "com.rvmodshare.rvmodshare";
    const REDIRECT_API_URL = "https://endpoint.rvmodshare.com/applelogin";
    // const REDIRECT_API_URL = "https://www.rvmodshare.com/auth/login"
    window.open(
      `https://appleid.apple.com/auth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_API_URL
      )}&response_type=code id_token&scope=name email&response_mode=form_post`,
      "_self"
    );
  }
  appleAutoLogin(userId) {
    let requestData = {};
    requestData = {
      id: userId,
    };
    this._Observable = this.authService
      .socialLogin(requestData, "appleautoLogin")
      .subscribe(
        (res) => {
          if (res.success) {
            const result = res.data;
            this.selectedUser(res.data);
            //  if (
            //    res.data.isVerified == "Y" &&
            //    (!res.data.isEmail || !res.data.isRV || !res.data.isInterest)
            //  ) {
            //    this.router.navigate(["/welcome/" + res.data.id]);
            //  } else {
            //    this.router.navigate(["/timeline"]);
            //  }
            if (
              res.data.isVerified == "Y" &&
              (!res.data.isEmail || !res.data.isRV || !res.data.isInterest)
            ) {
              this.router.navigate(["/welcome/" + res.data.id]);
            } else {
              this.router.navigate(["/timeline"]);
              // let daysdiff = this.sharedService.daysDiffCalc(
              //   new Date(res.data.date_registered).getTime(),
              //   this.today.getTime()
              // );
              // console.log(daysdiff, "daysdiff");
              // if (daysdiff > 6) this.router.navigate(["/timeline"]);
              // else this.router.navigate(["/mods"]);
            }
            this.spinner.hide();
          } else {
            this.toastr.error(res.error.message, "Error");
            this.spinner.hide();
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error, "Error");
        }
      );
  }
  followNotificationByclick(filtermod1) {
    this.pageService.followNotification(filtermod1).subscribe(
      (res: any) => {
        if (res.success) {
          if (res.isFollowed == false) {
            this.onFollowInterestSubmitted(filtermod1);
          } else {
            // window.scrollTo(0, 0);
            this.toastr.error(res.error.message, "Error");
          }
        }
      },
      (err) => {
        this.toastr.error(
          "There are some errors, please try again after some time !",
          "Error"
        );
      }
    );
  }
  onFollowInterestSubmitted(filtermod1) {
    this.pageService.addFollowCategories(filtermod1).subscribe(
      (res: any) => {
        if (res.success) {
        } else {
          this.toastr.error(res.error.message, "Error");
        }
      },
      (err) => {}
    );
  }
  selectedUser(user) {
    this.chatService.connectUserOnline({
      email: user.email,
      user_type: "U",
      user_id: user.id,
    });
  }
  // selectedUser(user) {
  //   this.chatService.addUser({
  //     email: user.email,
  //     user_type: "U",
  //     user_id: user.id,
  //   });
  // }

  //   loginWithFacebook(): void {
  //     this.socialService.login(Provider.FACEBOOK).subscribe(user =>{
  //       console.log("facebook loign", user)
  //       this.facebookId = user;
  //       this.socialLogin()
  //       // if(user.id){
  //       //   this.facebookId = user.id;
  //       //   this.socialLogin()
  //       // }
  //     });
  //   }
  //   loginWithGoogle(): void {
  //     this.socialService.login(Provider.GOOGLE).subscribe(user =>{
  //       console.log("google login",user)
  //       this.googleId = user;
  //       this.socialLogin()
  //     },error=>{
  //       console.log("google error", error)
  //     });
  // }

  // loginWithGoogle(): void {
  //   this.AuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // loginWithFacebook(): void {
  //   this.AuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
      console.log(socialPlatform + " sign in data : ", userData);
      if (userData && userData["provider"] == "google") {
        userData["gId"] = userData["id"];
        userData["client_id"] = userData["id"];
        this.socialLogin(userData);
      } else if (userData && userData["provider"] == "facebook") {
        userData["fbId"] = userData["id"];
        userData["client_id"] = userData["id"];
        this.socialLogin(userData);
      }
      console.log(socialPlatform + " sign in data : ", userData);
    });
  }

  socialLogin(userData) {
    this.spinner.show();
    // let push_token = localStorage.getItem('push_token');

    // let name:any = this.googleId.name.split(' ');

    // let data = {
    //   googleId: this.googleId.id,
    //   email:this.googleId.email,
    //   firstName: name[0],
    //   lastName:name[1]?name[1]:'',
    //   facebookId: this.facebookId,
    //   push_token
    // }
    this._Observable = this.authService
      .socialLogin(userData, "socialmedia/login")
      .subscribe(
        (res) => {
          if (res.success) {
            const result = res.data;
            this.selectedUser(res.data);
            if (
              res.data.isVerified == "Y" &&
              (!res.data.isEmail || !res.data.isRV || !res.data.isInterest)
            ) {
              this.router.navigate(["/welcome/" + res.data.id]);
            } else {
              // let daysdiff = this.sharedService.daysDiffCalc(
              //   new Date(res.data.date_registered).getTime(),
              //   this.today.getTime()
              // );
              // console.log(daysdiff, "daysdiff");
              // if (daysdiff > 6) this.router.navigate(["/timeline"]);
              // else this.router.navigate(["/mods"]);
              this.router.navigate(["/timeline"]);
            }
            // this.router.navigate(["/timeline"]);
            this.spinner.hide();
          } else {
            this.toastr.error(res.error.message, "Error");
            this.spinner.hide();
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error, "Error");
        }
      );
  }

  ngOnDestroy(): void {
    if (this._loginObservable) {
      this._loginObservable.unsubscribe();
    }
  }
}
