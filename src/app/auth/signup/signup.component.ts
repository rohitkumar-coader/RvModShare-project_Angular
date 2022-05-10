import {
  Component,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { MyAuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmMatch } from "src/app/shared/confirm-match.validator";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ChatService } from "src/app/chat.service";

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from "angular5-social-login";
import { isPlatformBrowser } from "@angular/common";
import { AppInjector } from "src/app/app.module";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  @ViewChild("content", { static: true }) modalContent2: TemplateRef<any>;
  @ViewChild("contents", { static: true }) email: TemplateRef<any>;
  chatService: any;
  validPattern = "^[a-zA-Z0-9]$";
  public userRegisterForm: FormGroup;
  submitted = false;
  _registerObservable: any;
  emailForm: FormGroup;
  public phone: any = {};
  public referralCode: any;
  refcode: string;
  toastRef: any;
  public input: any;
  separateDialCode = true;
  appleErrorCode: any;
  appleErrorMessage: any;
  // SearchCountryField = SearchCountryField;
  // TooltipLabel = TooltipLabel;
  // CountryISO = CountryISO;
  // preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  passwordType: boolean;
  confirmPasswordType: boolean;
  ownedRV: boolean = false;
  myRecaptcha: boolean;
  _Observable: any;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: MyAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private socialAuthService: AuthService,
    private _activateRouter: ActivatedRoute,
    public jwtHelper: JwtHelperService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    config.backdrop = "static";
    config.keyboard = false;
    this._activateRouter.queryParams.subscribe((params) => {
      this.refcode = params.refcode;
    });
    this._activateRouter.queryParams.subscribe((param) => {
      this.appleErrorCode = param["code"];
      // this.getAppleInfo();
      if (this.appleErrorCode == "244") {
        this.appleErrorMessage =
          "Your Account already exists. Please continue with login";
        // this.showToast('Your Account already exists. Please continue with login')
        // this.toastRef =this.toastr.error('Your Account already exists. Please continue with login');
        // console.log( this.toastRef," this.toastRef")
        // this.toastr.clear( this.toastRef.toastId)
        // this.removeToast()
        // this.router.navigate(['/auth/signup'])
      }
      if (this.appleErrorCode == "245") {
        this.appleErrorMessage = "Your account doesn't exists.";
        // this.toastr.error("Your account doesn't exists.");
        // this.toastr.clear()
      }
    });
    this.createForm();
  }
  emailsMatchValidator(form: FormGroup) {
    return;
  }
  open(content) {
    this.modalService.open(content);
  }
  opens(contents) {
    this.modalService.open(contents);
  }
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    // this.userRegisterForm.get("email").valueChanges.subscribe((event) => {
    //   this.userRegisterForm
    //     .get("email")
    //     .setValue(event.toLowerCase(), { emitEvent: false });
    // });
  }
  onScriptLoad() {
    console.log("Google reCAPTCHA loaded and is ready for use!");
    // this.userRegisterForm.patchValue({ myRecaptcha: true });
  }

  onScriptError() {
    // this.userRegisterForm.patchValue({ myRecaptcha: false });
    console.log("Something went long when loading the Google reCAPTCHA");
  }

  createForm() {
    this.userRegisterForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        // displayName: ['', Validators.required],
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              "^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$"
            ),
          ],
          // [
          //   Validators.required,
          //   Validators.email,
          //   Validators.pattern("^[a-z0-9._%. +-]+@[a-z0-9.-]+\\.[a-z]{2,4}.$"),
          // ],
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
            ),
          ],
        ],
        // myRecaptcha: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        termService: ["", Validators.required],
      },
      {
        validator: ConfirmMatch("password", "confirmPassword"),
      }
    );
  }

  get f() {
    return this.userRegisterForm.controls;
  }

  togglePassword() {
    this.passwordType = !this.passwordType;
  }

  toggleConfirmPassword() {
    this.confirmPasswordType = !this.confirmPasswordType;
  }
  removeToast = () => {
    this.router.navigate(["/auth/signup"]);
    // this.toastr.clear(this.toastRef.toastId);
  };

  showToast = (msg) => {
    console.log(msg, "in show toast");
    this.toastRef = this.toastr.show(msg, null, {
      disableTimeOut: true,
      tapToDismiss: true,
      toastClass: "toast border-red",
      closeButton: true,
      positionClass: "bottom-left",
    });
  };
  get fg() {
    return this.emailForm.controls;
  }

  onSubmitEmail() {
    this.submitted = true;
    if (!this.emailForm.invalid) {
      let data = this.emailForm.value;
      this._registerObservable = this.authService.resendEmail(data).subscribe(
        (res) => {
          if (res.success) {
            this.modalService.dismissAll();
            Swal.fire({
              text: "Email has been sent. Please check",
              icon: "success",
            });
          } else {
            this.toastr.error(res.error.message, "Error");
          }
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error, "Error");
        }
      );
      return;
    } else {
      console.log(JSON.stringify(this.emailForm.value));
    }
  }
  onSubmit() {
    this.submitted = true;
    if (!this.userRegisterForm.invalid) {
      let data = this.userRegisterForm.value;
      data["email"] = this.userRegisterForm.value.email.toLowerCase();
      data["privacyPolicy"] = data["termService"];
      if (this.refcode) {
        data["refcode"] = this.refcode;
      }
      this.spinner.show();
      this._registerObservable = this.authService.Signup(data).subscribe(
        (res) => {
          if (res.success) {
            this.open(this.modalContent2);
            this.router.navigate(["/auth/login"]);
            this.userRegisterForm.reset();
            this.submitted = false;
            // Swal.fire({
            //   title: "Glad you'll be joining us! You're almost there.",
            //   html: "<b>Next Step:</b> Verify Your Email. <br> We’ve sent you an email. Click the link in the email to continue setting up your account.",
            //   icon: 'success',
            //   showCancelButton: true,
            //   confirmButtonText: 'OK',
            //   cancelButtonText: "<div class='sweet-custom'>Didn’t receive an email? <a>Click Here.</a><div>"
            // }).then((result) => {
            //   if (result.isConfirmed) {

            //   } else if (result.dismiss === Swal.DismissReason.cancel) {
            //     this.resendConfirmation()
            //   }
            //   this.router.navigate(['/auth/login']);
            //   this.userRegisterForm.reset();
            //   this.submitted = false;

            // })
          } else {
            this.toastr.error(res.error.message, "Error");
          }
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error, "Error");
        }
      );
    }
  }
  signInWithApple() {
    console.log("in apple sign in");
    const CLIENT_ID = "com.rvmodshare.rvmodshare";

    const REDIRECT_API_URL = "https://endpoint.rvmodshare.com/applesignup";
    window.open(
      `https://appleid.apple.com/auth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_API_URL
      )}&response_type=code id_token&scope=name email&response_mode=form_post`,
      "_self"
    );

    // window.addEventListener('message', async event => {
    //   console.log("in add event of apple sign in",event)
    //     const decodedToken = this.jwtHelper.decodeToken(event.data.id_token);
    //     let requestData = {}
    //     if (event.data.user) {
    //       console.log(event.data,"my apple login data")
    //         const userName = JSON.parse(event.data.user);
    //         requestData = {
    //             "email": decodedToken.email,
    //             "name": `${userName.name.firstName} ${userName.name.lastName}`,
    //             "socialId": decodedToken.sub,
    //         };
    //     } else {
    //         requestData = {
    //             "email": decodedToken.email,
    //             "socialId": decodedToken.sub,
    //         };
    //     }
    //     requestData["provider"] = "apple"
    //     console.log(`User Apple login Data : ${requestData}`);
    //     // this.socialLogin(requestData)

    //     // do your next stuff here
    // });
  }
  //  public getAppleInfo(){
  //   // window.addEventListener('message', async event => {
  //   //   console.log("in add event of apple sign in",event)
  //       const decodedToken = this.jwtHelper.decodeToken(this.appleToken);
  //       console.log(this.appleToken,decodedToken,"my apple login data")
  //       let requestData = {}
  //       if (this.appleToken) {
  //           const userName = JSON.parse(decodedToken.user);
  //           requestData = {
  //               "email": decodedToken.email,
  //               "name": `${userName.name.firstName} ${userName.name.lastName}`,
  //               "socialId": decodedToken.sub,
  //           };
  //       } else {
  //           requestData = {
  //               "email": decodedToken.email,
  //               "socialId": decodedToken.sub,
  //           };
  //       }
  //       requestData["provider"] = "apple"
  //       console.log(`User Apple login Data : ${requestData}`);
  //       // this.socialLogin(requestData)

  //       // do your next stuff here
  //   // });
  //  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
      if (userData && userData["provider"] == "google") {
        userData["gId"] = userData["id"];
        userData["client_id"] = userData["id"];
        this.socialLogin(userData);
      } else if (userData && userData["provider"] == "facebook") {
        userData["fbId"] = userData["id"];
        userData["client_id"] = userData["id"];
        this.socialLogin(userData);
      }
    });
  }

  socialLogin(userData) {
    this.spinner.show();
    this._Observable = this.authService
      .socialLogin(userData, "socialmedia/signin")
      .subscribe(
        (res) => {
          if (res.success) {
            const result = res.data;
            this.selectedUser(res.data);
            this.router.navigateByUrl("/welcome/" + result.id);
          } else {
            this.toastr.error(res.error.message, "Error");
          }
          this.spinner.hide();
        },
        (error) => {
          this.toastr.error(error, "Error");
          this.spinner.hide();
        }
      );
  }
  selectedUser(user) {
    this.chatService.addUser({
      email: user.email,
      user_type: "U",
      user_id: user.id,
    });
  }
  async resendConfirmation() {
    await Swal.fire({
      title: "Oh bummer. No email?!",
      html: "<b>Note:</b> It can take a few minutes! <br> Also, you checked your spam folder, right?<br>Let's Try This Again.",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.open(this.email);
        // if (result.value) {
        //   let data = {
        //     email: result.value,
        //   };
        //   this._registerObservable = this.authService
        //     .resendEmail(data)
        //     .subscribe(
        //       (res) => {
        //         if (res.success) {
        //           Swal.fire({
        //             text: "Email has been sent. Please check",
        //             icon: "success",
        //           });
        //         } else {
        //           this.toastr.error(res.error.message, "Error");
        //         }
        //         this.spinner.hide();
        //       },
        //       (error) => {
        //         this.spinner.hide();
        //         this.toastr.error(error, "Error");
        //       }
        //     );
        // }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  ngOnDestroy(): void {
    if (this._registerObservable) {
      this._registerObservable.unsubscribe();
    }
  }
}
