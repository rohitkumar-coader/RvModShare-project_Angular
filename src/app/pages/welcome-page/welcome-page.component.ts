import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BehaviorService } from "src/app/shared/behavior.service";
import { PagesService } from "../pages.service";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { CredentialsService } from "src/app/auth/credentials.service";
import { HttpEvent, HttpEventType, HttpParams } from "@angular/common/http";
import { SharedService } from "src/app/shared/shared.service";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
  content2ModalValid = false;
  @ViewChild("content", { static: true }) modalContent2: TemplateRef<any>;
  @ViewChild("content0", { static: true }) modalContent: TemplateRef<any>;
  // @ViewChild("content1", { static: true }) modalContent1: TemplateRef<any>;
  @ViewChild("myInput", { static: false }) myInputVariable;
  @ViewChild("content2", { static: true }) thanksModal: TemplateRef<any>;

  @ViewChild("profileData", { static: true })
  profileDataContent: TemplateRef<any>;
  today = new Date();
  newUser = false;
  imageLoader: boolean = false;
  progress: number = 0;
  makeerr: string = "";
  serieserr: string = "";
  closeResult = "";
  modUrl: any;
  isSuggestedMakeSeries: boolean = false;
  isSuggestedSeries: boolean = false;
  tab = 0;
  subtabs = 0;
  modalReference: NgbModalRef;
  selectedRvType: any;
  minDate = new Date();
  token = "";
  interestArray: any = {};
  isShown: boolean = false;
  user: any;
  categoryId: any;
  newInterestArray: any;
  fileToUpload: File = null;
  profileImage: string = "";
  public Form: FormGroup;
  public detailForm: FormGroup;
  year = new Date().getFullYear() + 1;
  userID = "";
  display_name: string = "";
  submitted = false;
  _host = environment.url;
  _loginObservable: any;
  years = [];
  isHarmless = false;
  rvType: string;
  allMakes: Array<any> = [];
  make: string;
  model: string;
  pageContent;
  allModels: Array<any> = [];
  allCategories: Array<any> = [];
  followCategories: any = [];
  rvTypes: Array<any> = [
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
    //  {
    //   description: "Camper Van",
    //   detail: { value: "camper-van", key: "Camper Van" },
    // },
    {
      description: "Travel Trailer",
      detail: { value: "trailer", key: "Travel Trailer" },
    },
    // {
    //   description: "Folding Trailer",
    //   detail: { value: "folding-trailer", key: "Folding Trailer" },
    // },
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
    // {
    //   description: "Tow Vehicle",
    //             detail: {value:"tow-vehicle",key:"Tow Vehicle"},
    // },
    // {
    //   description: "Utility Trailer",
    //             detail: {value:"utility-trailer",key:"Utility Trailer"},
    // },
    // {
    //   description: "Other",
    //   detail: { value: "other", key: "Other" },
    // },
    // {
    //   description: "I'm a Wannabe",
    //             detail: {value:"wanna-be",key:"I'm a Wannabe"},
    // }
  ];
  config1 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "RV Class", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search RV Type", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  config2 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose Make", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search make", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  config3 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose Series", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search Series", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  ownRV: boolean = true;
  localUser: any;

  constructor(
    private modalService: NgbModal,
    private pageService: PagesService,
    private _bs: BehaviorService,
    config: NgbModalConfig,
    private router: Router,
    private formBuilder: FormBuilder,
    public credentialsService: CredentialsService,
    private _activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService
  ) {
    this._bs.contenModalValid.subscribe((res) => {
      if (res == true) {
        this.content2ModalValid = res;
      }
    });
    this.modUrl = localStorage.getItem("url");
    this.newInterestArray = JSON.parse(localStorage.getItem("interestArray"));
    this.createForm();
    this.createDetailForm();
    this.onChangeSuggestedMakeSeries();
    this.getYears();
    config.backdrop = "static";
    config.keyboard = false;

    let user = localStorage.getItem("credentials");

    if (user) this.localUser = JSON.parse(user);
  }

  ngOnInit() {
    this.userID = this._activateRouter.snapshot.params["id"];

    // this._activateRouter.queryParams.subscribe((params) => {
    //   this.pageContent = params.pageContent;
    // });
    if (this.userID != "" && this.userID != undefined) {
      let data = {
        id: this.userID,
      };
      this.autoLogin(data);
      this.getALLCategories();
    }
  }
  //   ngOnChanges(changes: any) {
  //     console.log(changes)
  //     this.open(this.content);
  //  }

  getUrl(img, detail) {
    let image = "";
    let socialImage = false;
    if (img != undefined) {
      socialImage = this.imageIsOfSocialLogin(img);
    }
    if (
      img &&
      img != undefined &&
      socialImage &&
      (detail.gId || detail.fbId) &&
      (detail.gId != "" || detail.fbId != "")
    ) {
      image = img;
    } else {
      image = this._host + img;
    }
    return image;
  }
  imageIsOfSocialLogin(img) {
    let socialImage = false;
    if (img.indexOf("http://") == 0 || img.indexOf("https://") == 0) {
      socialImage = true;
    } else {
      socialImage = false;
    }
    return socialImage;
  }
  createForm() {
    this.Form = this.formBuilder.group({
      image: [""],
      rvType: ["", Validators.required],
      year: ["", Validators.required],
      make: [""],
      series: [""],
      // make: ["", Validators.required],
      // series: ["", Validators.required],
      model: [""],
      suggestedSeries: [""],
      suggestedMake: [""],
    });
  }
  createDetailForm() {
    this.detailForm = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
    });
  }
  toggleShow() {
    this.isShown = !this.isShown;
  }
  get f() {
    return this.Form.controls;
  }
  getYears() {
    // for(let i = (this.year - 25); i < (this.year + 1); i++) {
    for (let i = this.year; i >= 1970; i--) {
      this.years.push(i);
    }
    // this.years.push("I'm a Wannabe")
  }
  open(content) {
    // window.alert(content)

    this.modalReference = this.modalService.open(content, {
      size: "lg",
      ariaLabelledBy: "welcomeModal",
    });
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  openfb(content) {
    // window.alert(content)

    this.modalReference = this.modalService.open(content, {
      size: "md",
      ariaLabelledBy: "welcomeModal",
    });
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  close() {
    if (this.modalReference) this.modalReference.close();
  }

  viewHarmnessPage() {
    this.router.navigate(["/harmless-agreement"], {
      queryParams: { id: this.userID, pageContent: "content" },
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  tabClick(p) {
    if (p == this.tab) {
      this.tab = 0;
    } else {
      this.tab = p;
    }
  }
  subtabsClick(e) {
    if (e == this.subtabs) {
      this.subtabs = 0;
    } else {
      this.subtabs = e;
    }
  }

  selectedRVType(data) {
    this.make = "";
    this.Form.patchValue({
      make: "",
      model: "",
    });
    console.log(data, "selected memeber1");
    this.allMakes = [];
    this.allModels = [];
    //added By sheetal
    this.selectedRvType = data.value.detail.value;
    this.rvType = data.value.detail.value;
    console.log(this.rvType, "selected rv type");
    this.getCategories();
  }
  selectedMake(data) {
    this.Form.patchValue({
      model: "",
      series: "",
    });
    console.log(data, "selected make");

    //added By sheetal

    this.make = data.value.detail.id;
    this.categoryId = data.value.detail.id ? data.value.detail.id : "";
    this.getSubCategories();
  }
  selectedModel(data) {
    console.log(data, "selected model");

    //added by sheetal
    this.model = data.value.detail.id;
    console.log(this.model, "selected model");
  }
  // openharmnessModal(){
  // this.open(this.modalContent2)
  // }
  gotowebsite() {
    if (this.modUrl && this.modUrl != "") {
      this.router.navigate([this.modUrl]);
      localStorage.removeItem("url");
    } else if (this.newInterestArray) {
      this.followNotificationByclick(this.newInterestArray);
    } else {
      this.router.navigate(["/timeline"]);
    }
  }
  autoLogin(data) {
    console.log(data);
    this.spinner.show();
    this._loginObservable = this.pageService.autoLogin(data).subscribe(
      (res) => {
        if (res.success) {
          this.user = res.data;
          this._bs.setUserData(res.data);
          this.token = res.data.access_token;
          this.display_name = res.data.displayName;
          this.profileImage = res.data.image;
          let daysdiff = this.sharedService.daysDiffCalc(
            new Date(res.data.date_registered).getTime(),
            this.today.getTime()
          );
          if (daysdiff > 6) {
            this.newUser = false;
          } else {
            this.newUser = true;
          }
          this.Form.patchValue({
            image: res.data.image,
          });
          // if (!this.pageContent) {
          if (
            res.data.isVerified != "Y" ||
            (!res.data.isEmail && !res.data.isRV && !res.data.isInterest)
          ) {
            let fireData: any = {
              title: "Great! You're verified!",
              iconHtml: '<i class="fa fa-thumbs-o-up"></i>',
              confirmButtonText: "Continue Modding My RVmodshare Profile",
              showCancelButton: false,
            };
            if (
              this.user &&
              this.user.aId != null &&
              this.user.aId != undefined &&
              this.user.aId != ""
            ) {
              this.open(this.profileDataContent);
            } else if (
              this.user &&
              this.user.fbId != null &&
              this.user.fbId != undefined &&
              this.user.fbId != "" &&
              this.user.fbId + "@facebook.com" == this.user.email
            ) {
              this.openfb(this.profileDataContent);
            } else {
              Swal.fire(fireData).then((result) => {
                this.open(this.modalContent);
                this.updateStepCompleted("email");
              });
            }
          }
          if (
            res.data.isVerified == "Y" &&
            res.data.isEmail &&
            !res.data.isRV
          ) {
            this.open(this.modalContent);
          }
          // if (
          //   res.data.isVerified == "Y" &&
          //   res.data.isRV &&
          //   !res.data.isInterest
          // ) {
          //   this.open(this.modalContent1);
          // }
          if (
            res.data.isVerified == "Y" &&
            res.data.isRV &&
            res.data.isInterest
          ) {
            this.open(this.thanksModal);
          }
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
  // onChangeSuggestedMakeSeries(){
  //   if(!this.isSuggestedMakeSeries){
  //     this.Form.controls["make"].setValidators(Validators.required);
  //     this.Form.controls["series"].setValidators(Validators.required);
  //     this.Form.controls["suggestedMake"].clearValidators()
  //     this.Form.controls["suggesteSeries"].clearValidators()
  //   }
  //   else{
  //     this.Form.controls["make"].clearValidators()
  //     this.Form.controls["series"].clearValidators()
  //     this.Form.controls["suggestedMake"].setValidators(Validators.required);
  //     this.Form.controls["suggestedSeries"].setValidators(Validators.required);
  //   }
  //   this.Form.controls["make"].updateValueAndValidity()
  //   this.Form.controls["series"].updateValueAndValidity()
  //   this.Form.controls["suggestedMake"].updateValueAndValidity()
  //   this.Form.controls["suggestedSeries"].updateValueAndValidity()
  // }
  onChangeSuggestedMakeSeries() {
    this.submitted = false;
    if (this.isSuggestedSeries) {
      this.isSuggestedSeries = false;
    }
    // if (this.isSuggestedMakeSeries) {
    //   this.isSuggestedSeries = true;
    // }
    // if (!this.isSuggestedMakeSeries && !this.isSuggestedSeries) {
    if (!this.isSuggestedMakeSeries) {
      this.makeerr = "";
      this.serieserr = "";
      this.Form.get("make").setValidators(Validators.required);
      this.Form.get("series").setValidators(Validators.required);

      this.Form.get("suggestedMake").clearValidators();
      this.Form.get("suggestedSeries").clearValidators();
      this.Form.get("suggestedMake").reset();
      this.Form.get("suggestedSeries").reset();
    } else {
      this.Form.get("suggestedMake").setValidators(Validators.required);
      this.Form.get("suggestedSeries").setValidators(Validators.required);
      this.Form.get("make").clearValidators();
      this.Form.get("series").clearValidators();
      this.Form.get("make").reset();
      this.Form.get("series").reset();
    }
    this.Form.get("make").updateValueAndValidity();
    this.Form.get("series").updateValueAndValidity();
    this.Form.get("suggestedMake").updateValueAndValidity();
    this.Form.get("suggestedSeries").updateValueAndValidity();
  }
  onChangeSuggestedSeries() {
    this.submitted = false;
    if (this.isSuggestedMakeSeries) {
      this.isSuggestedMakeSeries = false;
    }
    if (!this.isSuggestedSeries) {
      this.serieserr = "";
      this.Form.get("make").setValidators(Validators.required);
      this.Form.get("series").setValidators(Validators.required);
      this.Form.get("suggestedSeries").clearValidators();
      this.Form.get("suggestedSeries").setValue("");
      this.Form.get("suggestedMake").clearValidators();
      this.Form.get("suggestedMake").setValue("");
    } else {
      this.Form.get("suggestedSeries").setValidators(Validators.required);
      this.Form.get("make").setValidators(Validators.required);
      this.Form.get("suggestedMake").clearValidators();
      this.Form.get("suggestedMake").setValue("");
      this.Form.get("series").clearValidators();
      this.Form.get("series").reset();
    }
    this.Form.get("make").updateValueAndValidity();
    this.Form.get("series").updateValueAndValidity();
    this.Form.get("suggestedSeries").updateValueAndValidity();
    this.Form.get("suggestedMake").updateValueAndValidity();
  }
  submitDetail() {
    let data = {};
    if (
      this.user &&
      this.user.fbId != null &&
      this.user.fbId != undefined &&
      this.user.fbId != "" &&
      this.user.fbId + "@facebook.com" == this.user.email
    ) {
      data["email"] = this.detailForm.value.email;
    } else {
      data = this.detailForm.value;
    }
    this.pageService.update(data, this.userID).subscribe(
      (res: any) => {
        if (res.success) {
          this.submitted = false;
          let data = res.data;

          data["access_token"] = this.token;
          this.credentialsService.setCredentials(data);
          // localStorage.setItem("user", JSON.stringify(data));
          this._bs.setUserData(data);
          this.updateEmail(data.email);
          this.open(this.modalContent);
          // this.categories=res.data
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  updateEmail(email) {
    let data = {};
    data["email"] = email;
    data["firstName"] = this.user.firstName;
    // data['id']=this.userID
    this.pageService.sendWelcomeEmail(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.submitted = false;
          let data = res.data;
          data["access_token"] = this.token;
          this.credentialsService.setCredentials(data);
          // localStorage.setItem("user", JSON.stringify(data));
          this._bs.setUserData(data);
          console.log(data, "data");
          this.modalReference.close();
          this.open(this.thanksModal);
          // this.modalReference.close()
          // this.categories=res.data
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
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
          localStorage.removeItem("interestArray");
          this.router.navigate(["/mods"]);
        } else {
          this.toastr.error(res.error.message, "Error");
        }
      },
      (err) => {}
    );
  }
  uploadImage(files: FileList) {
    this.fileToUpload = files.item(0);
    let type: "users";
    // this.spinner.show();
    if (this.fileToUpload) {
      this.imageLoader = true;
      this.pageService.uploadImage(this.fileToUpload, "users").subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              // console.log('User successfully created!', event.body);
              if (event.body.success) {
                this.profileImage = event.body.data.imagePath;
                this.Form.patchValue({ image: this.profileImage });
                this.imageLoader = false;
                // this.userForm.patchValue({ image: this.userImage })
                this.myInputVariable.nativeElement.value = "";
              } else {
                window.scrollTo(0, 0);
                this.toastr.error(event.body.error.message, "Error");
                this.imageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.imageLoader = false;
              }, 100);
          }

          // this.imageLoader=false;
        },
        (err) => {
          this.imageLoader = false;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
  }
  // uploadImage(files) {
  //   if (files) {
  //     const formData: FormData = new FormData();
  //     let uploadedImageArray: any = [];
  //     // this.fileToUpload = files.item(0)
  //     for (let index = 0; index < files.length; index++) {
  //       let element = files[index];
  //       uploadedImageArray.push(element);
  //       this.fileToUpload = uploadedImageArray;
  //       formData.append(
  //         "data",
  //         this.fileToUpload[index],
  //         this.fileToUpload[index].name
  //       );
  //     }
  //     formData.append("modelName", "users");
  //     let params = new HttpParams().set("?modelName", "users");
  //    this.imageLoader = true;
  //     this.sharedService.uploadMultipleImage(params, formData).subscribe(
  //       (event: HttpEvent<any>) => {
  //         switch (event.type) {
  //           case HttpEventType.Sent:
  //             // console.log('Request has been made!');
  //             break;
  //           case HttpEventType.ResponseHeader:
  //             // console.log('Response header has been received!');
  //             break;
  //           case HttpEventType.UploadProgress:
  //             this.progress = Math.round((event.loaded / event.total) * 100);
  //             // console.log(`Uploaded! ${this.progress}%`);
  //             break;
  //           case HttpEventType.Response:
  //             // console.log("User successfully created!", event.body);
  //             if (event.body.success) {
  //               // console.log("event.body.data", event.body.data);
  //               // if (docData.length > 0) {
  //               //   docData.push(...event.body.data.imagePath);
  //               // } else {
  //               //   docData = event.body.data.imagePath;
  //               // }
  //               this.profileImage ="images/users/"+ event.body.data.imagePath;
  //               this.Form.patchValue({ image: this.profileImage });
  //               this.imageLoader = false;
  //               // this.userForm.patchValue({ image: this.userImage })
  //               this.myInputVariable.nativeElement.value = "";

  //               // this.rvImages = docData;
  //               // this.Form.patchValue({ RVImages: docData });
  //               // this.rvForm.patchValue({ RVImages: docData });
  //               // this.rvImageLoader = false;
  //             } else {
  //               window.scrollTo(0, 0);
  //                this.imageLoader = false;
  //             }
  //             setTimeout(() => {
  //               this.progress = 0;
  //                 this.imageLoader = false;
  //             }, 500);
  //         }
  //       },
  //       (err) => {
  //         this.progress = 0;
  //           this.imageLoader = false;
  //         // this.toastr.error('There are some errors, please try again after some time !', 'Error');
  //       }
  //     );
  //   }
  // }
  removeImage(image) {
    this.Form.controls.image.setValue("");
    this.profileImage = "";
    let object = {
      Imagename: image,
      type: "users",
    };
    this.pageService.deleteImage(object).subscribe(
      (res: any) => {
        if (res.success) {
          this.profileImage = "";
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    if (!this.Form.invalid) {
      let data = this.Form.value;
      data["make"] = this.make;
      // data['model'] = this.model
      data["series"] = this.model; //added by sheetal
      data["rvType"] = this.selectedRvType;
      data["ownRV"] = this.ownRV;
      data["cat_type"] = this.selectedRvType;
      data["id"] = this.userID;
      data["isRV"] = true;
      data["isInterest"] = true;
      data["isSuggestedMakeSeries"] = this.isSuggestedMakeSeries;
      data["isSuggestedSeries"] = this.isSuggestedSeries;

      let newData = this.sharedService.clean(data);
      this.interestArray = {
        interestArray: [
          {
            categoryType: "modpost",
            rvClass: this.selectedRvType,
            rvMake: this.make,
            rvSeries: this.model,
            // rvModel: this.Form.value.model,
            rvYear: "",
          },
        ],
      };
      if (
        this.isSuggestedMakeSeries == true ||
        this.isSuggestedSeries == true
      ) {
        data["addedInterest"] = this.interestArray;
        data["isInterestAdded"] = true;
      }
      // console.log(this.interestArray, "this.interestArraythis.interestArray");
      // return;
      this.pageService.update(newData, this.userID).subscribe(
        (res: any) => {
          if (res.success) {
            if (
              this.isSuggestedMakeSeries == false &&
              this.isSuggestedSeries == false
            ) {
              this.addFollowCategories(this.interestArray);
            }

            this.submitted = false;
            let data = res.data;
            data["access_token"] = this.token;
            this.credentialsService.setCredentials(data);
            localStorage.setItem("user", JSON.stringify(data));
            this._bs.setUserData(data);
            console.log(data, "data");
            this.modalReference.close();
            this.open(this.thanksModal);
            // this.modalReference.close()
            // this.categories=res.data
            this.spinner.hide();
          } else {
            this.toastr.error(res.error.message, "Error");
          }
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
  }

  searchMake(value, type = "") {
    // if (!this.Form.invalid) {
    let data = {};
    data["search"] = value;
    data["catType"] = this.selectedRvType;
    data["type"] = type;
    data["count"] = 1000;
    if (value) {
      this.sharedService.searchSuggestedMake(data).subscribe(
        (res: any) => {
          if (res.success) {
            if (type == "parent_categories") {
              if (res.data.length > 0) {
                this.makeerr = "Make aleady exist";
              } else {
                this.makeerr =
                  "Your request will be reviewed and status sent to your email.";
              }
            }
            if (type == "sub_categories") {
              if (res.data.length > 0) {
                this.serieserr = "Series aleady exist";
              } else {
                this.serieserr =
                  "Your request will be reviewed and status sent to your email.";
              }
            }
          } else {
            this.toastr.error(res.error.message, "Error");
          }
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    } else {
      if (type == "parent_categories") {
        this.makeerr = "";
      }
      if (type == "sub_categories") {
        this.serieserr = "";
      }
    }
  }
  markHrmless() {
    let data = {
      isHarmless: this.isHarmless,
    };
    // data['id']=this.userID
    this.pageService.update(data, this.userID).subscribe(
      (res: any) => {
        if (res.success) {
          this.submitted = false;
          let data = res.data;
          data["access_token"] = this.token;
          this.credentialsService.setCredentials(data);
          localStorage.setItem("user", JSON.stringify(data));
          this._bs.setUserData(data);
          console.log(data, "data");

          // this.categories=res.data
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  selectAll(ele) {
    //   checkboxes = document.getElementsByName('foo');
    // for(var i=0, n=checkboxes.length;i<n;i++) {
    //   checkboxes[i].checked = source.checked;
    // }
    var checkboxes = document.getElementsByTagName("input");
    if (ele.checked) {
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
          checkboxes[i].checked = true;
          this.allCategories.forEach((x) => {
            this.followCategories.push(x.id);
          });
        }
      }
    } else {
      for (var i = 0; i < checkboxes.length; i++) {
        console.log(i);
        if (checkboxes[i].type == "checkbox") {
          checkboxes[i].checked = false;
          this.followCategories = [];
        }
      }
    }
  }
  updateStepCompleted(type) {
    let data = {};
    if (type == "interest") {
      data["isInterest"] = true;
    }
    if (type == "email") {
      data["isEmail"] = true;
    }
    // data['id']=this.userID
    this.pageService.update(data, this.userID).subscribe(
      (res: any) => {
        if (res.success) {
          this.submitted = false;
          let data = res.data;
          data["access_token"] = this.token;
          this.credentialsService.setCredentials(data);
          localStorage.setItem("user", JSON.stringify(data));
          this._bs.setUserData(data);
          console.log(data, "data");

          // this.categories=res.data
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  pushCategory(e) {
    if (e.target.checked) {
      this.followCategories = e.target.value;
      // this.followCategories.push(e.target.value);
    } else {
      this.removeElement(
        this.followCategories,
        this.followCategories.find((x) => x == e.target.value)
      );
    }
  }

  // selectAll(e){
  //   if(e.target.checked){

  //   }else{
  //     this.followCategories = [];
  //     // this.removeElement(this.followCategories,this.followCategories.find(x=>x == e.target.value));
  //   }
  // }

  removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  addFollowCategories(formData) {
    // let formData = {
    //   categoryId: this.followCategories.toString(),
    //   categoryType: "modpost",
    // };
    this.pageService.addFollowCategories(formData).subscribe(
      (res: any) => {
        if (res.success) {
          //  this.toastr.success(res.message)

          // this.categories=res.data
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getALLCategories() {
    // this.spinner.show();
    // let filters = {
    //   type: '',
    // };
    this.pageService.getMainsCategories().subscribe(
      (response) => {
        if (response.success) {
          this.allCategories = response.data;
          console.log(this.allCategories, "this.allCategories..");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  getCategories() {
    this.spinner.show();
    let filters = {
      type: this.rvType,
      count: 1000,
      sortBy: -1,
    };
    this.pageService.getMainCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          let makesData = [];
          response.data.forEach((element) => {
            makesData.push({
              id: element["id"],
              description: element["name"],
              detail: element,
              // id: element['parentCategory']['id'],
              // description: element['parentCategory']['name'],
              // detail: element,
            });
          });
          const map = new Map();
          this.allMakes = [];
          for (const item of makesData) {
            if (!map.has(item.id)) {
              map.set(item.id, true); // set any value to Map
              this.allMakes.push({
                id: item.id,
                description: item.description,
                detail: item.detail,
              });
            }
          }
          // this.allMakes.push({
          //   id: null,
          //   description: "I'm a Wannabe"
          // });
          this.allMakes = [...this.allMakes];

          console.log(this.allMakes, "this.allMakes");
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  getSubCategories() {
    this.spinner.show();
    let filters = {
      type: this.rvType,
      categoryId: this.categoryId,
      count: 1000,
      sortBy: -1,
    };
    this.pageService.getSubCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.allModels = [];
          response.data.forEach((element) => {
            this.allModels.push({
              id: element["id"],
              description: element["name"],
              detail: element,
            });
          });
          // this.allModels.push({
          //   id: null,
          //   description: "I'm a Wannabe"
          // });
          this.allModels = [...this.allModels];

          console.log(this.allModels, "this.allModels");
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  ngOnDestroy(): void {
    this.close();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
