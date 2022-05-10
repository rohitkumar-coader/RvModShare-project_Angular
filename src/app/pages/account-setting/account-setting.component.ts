import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorService } from "../../shared/behavior.service";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "../../dashboard/dashboard.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { HttpEvent, HttpEventType, HttpParams } from "@angular/common/http";
import { CredentialsService } from "src/app/auth/credentials.service";
import { SharedService } from "src/app/shared/shared.service";
import { PagesService } from "src/app/pages/pages.service";
import { ClipboardService } from "ngx-clipboard";
import Swal from "sweetalert2";

import "sweetalert2/src/sweetalert2.scss";
declare var a2a: any;
import { DomSanitizer, Meta, SafeResourceUrl } from "@angular/platform-browser";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { MagnifyImageComponent } from "src/app/shared/shared/magnify-image/magnify-image.component";
// import { RightSponsoredComponent } from "src/app/pages/right-sponsored/right-sponsored.component";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { FollowProfileComponent } from "src/app/pages/follow-profile/follow-profile.component";
import { FollowingModalComponent } from "src/app/shared/shared/following-modal/following-modal.component";
import { FollowerModalComponent } from "src/app/shared/shared/follower-modal/follower-modal.component";
declare const tinymce;

@Component({
  selector: "app-account-setting",
  templateUrl: "./account-setting.component.html",
  styleUrls: ["./account-setting.component.css"],
})
export class AccountSettingComponent implements OnInit {
  @ViewChild("myInput", { static: false })
  public userID: any;
  public data: any = {};
  _observable: any;
  selectedDate: any;
  isrvRental: boolean = false;
  makeerr: any;
  serieserr: any;
  modalReference3: any;
  modalReference4: any;
  selected: boolean;
  modfilters: any = {
    search: "",
    rvTypeFilter: "",
    makeFilter: "",
    modelValue: "",
    size: "",
    modCategoryValue: "",
    yearValue: "",
    skillLevel: "",
    timerange: "",
    tag: "",
    startDate: "",
    endDate: "",
  };
  validUrl = true;
  urlSafe: SafeResourceUrl = "";
  validfacebookUrl = true;

  validintagramUrl = true;
  validtwitterUrl = true;
  isPrivate = false;
  profileUrl: any = "";
  _baseUrl = window.location.origin + "/";
  year = new Date().getFullYear() + 1;
  imageLoader: boolean = false;
  isSuggestedMakeSeries: boolean = false;
  isSuggestedSeries: boolean = false;
  rvImageLoader: boolean = false;
  imageModalLoader: boolean = false;
  selectedRvType: any;
  selectedmake: any;
  rvImages: any = [];
  selectedmodel: any;
  coverImageLoader: boolean = false;
  coverImageModalLoader: boolean = false;
  progress: number = 0;
  myModes = [];
  closeResult = "";
  see_mod = false;
  talk_mod = false;
  default_mod = true;
  userimg: any;
  usercoverimg: any;
  public user: any = {};
  public response: any;
  conditionalForm: boolean = false;
  public userImage = "";
  fileToUpload: File = null;
  public userForm: FormGroup;
  submitted = false;
  _userObservable: any;
  _host = environment.url;
  public personalForm: FormGroup;
  public socialForm: FormGroup;
  years = [];
  aboutMeData = "";
  rvDescData = "";
  rvType: Array<any> = [];
  allMakes: Array<any> = [];
  occupations: Array<any> = [];
  MakesFilters: Array<any> = [];
  filterModels: Array<any> = [];
  difficulties: Array<any> = [];
  skillLevelNeeded: Array<any> = [];
  timeRanges: Array<any> = [];
  rvYears: Array<any> = [];
  modCategories: Array<any> = [];
  filterrvTypes: Array<any> = [];
  featuredMods: Array<any> = [];
  miniModes: Array<any> = [];
  // massiveModes: Array<any> = []
  mediumModes: Array<any> = [];
  megaModes: Array<any> = [];
  make: string;
  model: string;
  pageContent;
  allModels: Array<any> = [];
  categoryId: any;
  minDate = new Date();
  modalReference: any;
  ownRV: boolean = false;
  editSocialForm: boolean = false;
  socialsubmitted: boolean = false;
  editPersonalForm: boolean = false;
  personalsubmitted: boolean = false;
  editRVDetail: boolean = false;
  rvSubmitted: boolean = false;
  youtubeVID: any = "";
  userPostImages: any = [];
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
    // ,
    // {
    //   description: "Other",
    //   detail: { value: "other", key: "Other" },
    // },
    // {
    //   description: "I'm a Wannabe",
    //             detail: {value:"wanna-be",key:"I'm a Wannabe"},
    // }
  ];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: false,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
      { class: "helvetica-neue", name: "Helvetica Neue" },
      { class: "helvetica", name: "Helvetica" },
      { class: "sans-serif", name: "Sans Serif" },
    ],
    // uploadUrl: this._host+'uploadnormalImages',
    // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [
      [
        "subscript",
        "superscript",
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
        "indent",
        "outdent",
      ],
      ["link", "unlink", "insertVideo", "removeFormat", "toggleEditorMode"],
    ],
  };
  posts: any = [];
  today = new Date();
  postIndex: any = 0;
  allComments: any = [];
  loader: any = false;
  replyForm: any;
  totalComments: any = 0;
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };
  // rvImageslideConfig = {
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  replyOnPost: any;
  replyComment: any;
  replyOnPost2: any;
  commentOnPost: any;
  addComment: any;
  content2: any;
  deletePost: any;
  likePost: any;
  copyText: any;
  massageofuser: any = false;
  originalname: any;
  slickInit(e) {}

  breakpoint(e) {
    // console.log("breakpoint");
  }

  afterChange(e) {
    // console.log("afterChange");
  }

  beforeChange(e) {
    // console.log("beforeChange");
  }

  states: any = [];
  cities: any = [];
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dashService: DashboardService,
    public sharedService: SharedService,
    public _bs: BehaviorService,
    private meta: Meta,
    @Inject(DOCUMENT) private dom,
    public sanitizer: DomSanitizer,
    // private _clipboardService: ClipboardService,
    // private credentialsService: CredentialsService,\
    public credentials: CredentialsService,
    private formBuilder: FormBuilder,
    private pageService: PagesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userimg = this.user.image;
    this.userImage = this.user.image;
    this.createFormPersonal();
    config.backdrop = "static";
    config.keyboard = false;
    // this.getallNormalPosts()
  }
  get sf() {
    return this.socialForm.controls;
  }
  get pf() {
    return this.personalForm.controls;
  }

  createFormPersonal() {
    this.personalForm = this.formBuilder.group({
      image: [""],
      coverPhoto: [""],
      occupation: [""],
      // series: ['', Validators.required],
      gender: [""],
      // age: ['', Validators.required],
      dob: [""],
      // suggestedSeries: [""],
      // suggestedMake: [""],
      // dob: ['', Validators.required],
      userName: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      state: [""],
      city: [""],
      country: [""],
      address: [""],
      zipcode: [""],
    });
    this.personalForm.disable();
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    // if (isPlatformBrowser(this.platformId)) {
    //   let tab1 = document.getElementById("pills-See-tab");
    //   tab1.classList.remove("active");
    // }

    this.userimg = this.user.image;
    this.userImage = this.user.image;
    this.setConfigForRVEditor();
    this.setConfigForAboutEditor();
    this.data = JSON.parse(localStorage.getItem("user"));
    if (this.data) {
      this.userID = this.data.id;
    }

    this.getUser();
    // this.getMyMods();
    // this.getMyFeaturedMods();
    // this.getModPostFilter();
    this.getOccupation();
    // this._bs.getUserData().subscribe((res: any) => {
    //   this.user = res;
    // });
  }
  openfollow() {
    this.modalReference3 = this.modalService.open(FollowingModalComponent);
    let data = {
      id: this.data.id,
    };
    this.modalReference3.componentInstance.followData = data;
  }
  openfollower() {
    console.log("data user", this.data);
    this.modalReference4 = this.modalService.open(FollowerModalComponent);
    let data = {
      id: this.data.id,
    };
    this.modalReference4.componentInstance.followData = data;
  }

  open(profilecontent, flag = 0) {
    // this.modalReference = this.modalService.open(profilecontent);
    // this.modalService.open(profilecontent, { size: "lg" });
    this.modalService.open(profilecontent, { size: "lg", scrollable: true });
    if (flag == 1) {
      this.setConfigForRVEditor();
      if (tinymce.get("rveditText")) {
        setTimeout(() => {
          tinymce.get("rveditText").setContent(this.rvDescData);
        }, 1000);
      }
    }
    if (flag == 2) {
      this.setConfigForAboutEditor();
      if (tinymce.get("editAboutText")) {
        setTimeout(() => {
          tinymce.get("editAboutText").setContent(this.aboutMeData);
        }, 1000);
      }
    }
  }
  closemodal() {
    this.modalService.dismissAll();
  }
  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }

  // getallNormalPosts() {
  //   //   let data:any ={
  //   //   class:this.modfilters.rvTypeFilter,
  //   //   make:this.modfilters.makeFilter,
  //   //   series:this.modfilters.modelValue,
  //   //   size: this.modfilters.size,
  //   //   modCategory:this.modfilters.modCategoryValue,
  //   //   year:this.modfilters.yearValue,
  //   //   skillLevel:this.modfilters.skillLevel,
  //   //   timerange:this.modfilters.timerange
  //   // }
  //   this.pageService.getallNormalPosts().subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         this.posts = res.data.map((cat) => {
  //           return {
  //             id: cat.id,
  //             image: cat.image,
  //             post: cat.post,
  //             addedByName: cat.addedBy.displayName
  //               ? cat.addedBy.displayName
  //               : cat.addedBy.fullName,
  //             addedByImage: cat.addedBy.image,
  //             status: cat.status,
  //             likes: cat.likesTotal,
  //             comments: cat.commentTotal,
  //             likestatus: cat.likestatus,
  //             time: this.pageService.timeDiffCalc(
  //               new Date(cat.updatedAt).getTime(),
  //               this.today.getTime()
  //             ),
  //             createdAt: cat.createdAt,
  //             updatedAt: cat.updatedAt,
  //           };
  //         });
  //         this.spinner.hide();
  //       } else {
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       this.spinner.hide();
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }
  getModPostFilter() {
    let filter = {
      userid: this.data.id,
      class: this.modfilters.rvTypeFilter,
      make: this.modfilters.makeFilter,
      series: this.modfilters.modelValue,
      size: this.modfilters.size,
      modCategory: this.modfilters.modCategoryValue,
      year: this.modfilters.yearValue,
      skillLevel: this.modfilters.skillLevel,
      timerange: this.modfilters.timerange,
      search: this.modfilters.search,
      startDate: this.modfilters.startDate,
      endDate: this.modfilters.endDate,
    };
    this.pageService.getModPostFilter(filter).subscribe(
      (res: any) => {
        if (res.success) {
          this.filterrvTypes = this.sharedService.getRvTypeArray(res.rvClass);
          this.MakesFilters = this.modfilters.rvTypeFilter
            ? res.rvMake.filter(
                (obj) => obj.cat_type == this.modfilters.rvTypeFilter
              )
            : res.rvMake;
          // this.MakesFilters = res.rvMake;
          this.skillLevelNeeded = res.skillLevel;
          this.timeRanges = res.timerange;
          this.rvYears = res.years;
          // this.filterModels = res.rvSeries;
          this.filterModels = this.modfilters.makeFilter
            ? res.rvSeries.filter(
                (obj) => obj.parentCategory == this.modfilters.makeFilter
              )
            : res.rvSeries;
          this.modCategories = res.modCategory;
          this.difficulties = res.size;
          this._bs.modFilter.next(this.modfilters);
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
  resetMakeSeries(type) {
    if (type == "both") {
      this.modfilters.makeFilter = "";
      this.modfilters.modelValue = "";
    }
    if (type == "series") {
      this.modfilters.modelValue = "";
    }
  }
  searchValue() {
    if (
      this.selectedDate &&
      this.selectedDate != "" &&
      this.selectedDate != null &&
      this.selectedDate.startDate != null &&
      this.selectedDate.endDate != null &&
      this.selectedDate.startDate != "" &&
      this.selectedDate.endDate != ""
    ) {
      this.modfilters["startDate"] = new Date(
        this.selectedDate.startDate.toDate()
      );
      this.modfilters["endDate"] = new Date(this.selectedDate.endDate.toDate());
    }
    this.getMyFeaturedMods();
    this.getModPostFilter();
  }

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
  removeImage(image, index) {
    this.rvImages.splice(index, 1);
    let object = {
      imageName: image,
      modelName: "modPost",
    };
    this.pageService.deleteImage(object).subscribe(
      (res: any) => {
        if (res.success) {
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
  // getMyMods() {
  //   this.spinner.show();
  //   let filters = {
  //     userid: this.data.id,
  //     class: this.modfilters.rvTypeFilter,
  //     make: this.modfilters.makeFilter,
  //     series: this.modfilters.modelValue,
  //     size: this.modfilters.size,
  //     modCategory: this.modfilters.modCategoryValue,
  //     year: this.modfilters.yearValue,
  //     skillLevel: this.modfilters.skillLevel,
  //     timerange: this.modfilters.timerange,
  //   };
  //   this.pageService.getMyMods(filters).subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         this.miniModes = res.data.filter(
  //           (x) => x.size == "6171199578121d51ac58f30f"
  //         );
  //         this.miniModes = this.miniModes.map((cat) => {
  //           // console.log(
  //           //   new Date(cat.updatedAt).getTime(),
  //           //   this.today.getTime()
  //           // );
  //           return {
  //             id: cat.id,
  //             description: cat.description,
  //             name: cat.name,
  //             isFeatured: cat.isFeatured,
  //             beforeImages: cat.beforeImages,
  //             afterImages: cat.afterImages,
  //             status: cat.status,
  //             skillLevel: cat.skillLevel,
  //             time: this.pageService.timeDiffCalc(
  //               new Date(cat.updatedAt).getTime(),
  //               this.today.getTime()
  //             ),
  //             createdAt: cat.createdAt,
  //             updatedAt: cat.updatedAt,
  //             addedBy: cat.addedBy,
  //             isEdit: cat.addedBy == this.user.id ? true : false,
  //             isFavourite: cat.isFavourite,
  //             likesTotal: cat.likesTotal,
  //             commentTotal: cat.commentTotal,
  //             totalTime: cat.totalTime,
  //             addedBydetails: cat.addedBydetails,
  //             timerange: cat.timerange,
  //           };
  //         });
  //         this.megaModes = res.data.filter(
  //           (x) => x.size == "61714f0afc2f548d335f5932"
  //         );
  //         this.megaModes = this.megaModes.map((cat) => {
  //           return {
  //             id: cat.id,
  //             description: cat.description,
  //             name: cat.name,
  //             isFeatured: cat.isFeatured,
  //             beforeImages: cat.beforeImages,
  //             afterImages: cat.afterImages,
  //             status: cat.status,
  //             skillLevel: cat.skillLevel,
  //             isEdit: cat.addedBy == this.user.id ? true : false,
  //             time: this.pageService.timeDiffCalc(
  //               new Date(cat.updatedAt).getTime(),
  //               this.today.getTime()
  //             ),
  //             createdAt: cat.createdAt,
  //             updatedAt: cat.updatedAt,
  //             addedBy: cat.addedBy,
  //             isFavourite: cat.isFavourite,
  //             likesTotal: cat.likesTotal,
  //             commentTotal: cat.commentTotal,
  //             totalTime: cat.totalTime,
  //             addedBydetails: cat.addedBydetails,
  //             timerange: cat.timerange,
  //           };
  //         });
  //         this.mediumModes = res.data.filter(
  //           (x) => x.size == "61714eeefc2f548d335f5931"
  //         );
  //         this.mediumModes = this.mediumModes.map((cat) => {
  //           return {
  //             id: cat.id,
  //             description: cat.description,
  //             name: cat.name,
  //             isFeatured: cat.isFeatured,
  //             beforeImages: cat.beforeImages,
  //             afterImages: cat.afterImages,
  //             status: cat.status,
  //             skillLevel: cat.skillLevel,
  //             isEdit: cat.addedBy == this.user.id ? true : false,
  //             time: this.pageService.timeDiffCalc(
  //               new Date(cat.updatedAt).getTime(),
  //               this.today.getTime()
  //             ),
  //             createdAt: cat.createdAt,
  //             updatedAt: cat.updatedAt,
  //             addedBy: cat.addedBy,
  //             isFavourite: cat.isFavourite,
  //             likesTotal: cat.likesTotal,
  //             commentTotal: cat.commentTotal,
  //             totalTime: cat.totalTime,
  //             addedBydetails: cat.addedBydetails,
  //             timerange: cat.timerange,
  //           };
  //         });
  //         this.featuredMods = res.data.filter((x) => x.isFeatured == true);
  //         this.featuredMods = this.featuredMods.map((cat) => {
  //           return {
  //             id: cat.id,
  //             description: cat.description,
  //             name: cat.name,
  //             beforeImages: cat.beforeImages,
  //             afterImages: cat.afterImages,
  //             status: cat.status,
  //             skillLevel: cat.skillLevel,
  //             isFeatured: cat.isFeatured,
  //             isEdit: cat.addedBy == this.user.id ? true : false,
  //             time: this.pageService.timeDiffCalc(
  //               new Date(cat.updatedAt).getTime(),
  //               this.today.getTime()
  //             ),
  //             createdAt: cat.createdAt,
  //             updatedAt: cat.updatedAt,
  //             addedBy: cat.addedBy,
  //             isFavourite: cat.isFavourite,
  //             likesTotal: cat.likesTotal,
  //             commentTotal: cat.commentTotal,
  //             totalTime: cat.totalTime,
  //             addedBydetails: cat.addedBydetails,
  //             timerange: cat.timerange,
  //           };
  //         });
  //         this.spinner.hide();
  //       } else {
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       this.spinner.hide();
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }
  getMyFeaturedMods() {
    console.log("in get featured mods");
    this.spinner.show();
    let filters = {
      userid: this.data.id,
      isFeatured: true,
      class: this.modfilters.rvTypeFilter,
      make: this.modfilters.makeFilter,
      series: this.modfilters.modelValue,
      size: this.modfilters.size,
      modCategory: this.modfilters.modCategoryValue,
      year: this.modfilters.yearValue,
      skillLevel: this.modfilters.skillLevel,
      timerange: this.modfilters.timerange,
      startDate: this.modfilters.startDate,
      endDate: this.modfilters.endDate,
      search: this.modfilters.search,
    };
    this.pageService.getMyMods(filters).subscribe(
      (res: any) => {
        if (res.success) {
          this.featuredMods = res.data.map((cat) => {
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              slug: cat.slug,
              skillLevel: cat.skillLevel,
              isFeatured: cat.isFeatured,
              registeredRV: cat.registeredRV,
              isCommentDisabled: cat.isCommentDisabled,
              isEdit: cat.addedBy == this.user.id ? true : false,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBy,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              addedBydetails: cat.addedBydetails,
              timerange: cat.timerange,
              // modDetailSharedata: this.setShareData(cat),
            };
          });
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
  setShareData(item) {
    if (!item) return;
    this.meta.addTag({ property: "og:title", content: item.name });
    this.meta.addTag({ property: "og:type", content: "article" });
    this.meta.addTag({ property: "fb:app_id", content: "995503910998783" });
    this.meta.addTag({
      property: "og:url",
      content: `https://rvmodshare.com/mods/${item.slug}`,
    });

    this.meta.addTag({
      property: "og:image:secure",
      content: `https://endpoint.rvmodshare.com/images/modPost/${item.afterImages[0]}`,
    });
    this.meta.addTag({
      property: "og:image",
      content: `https://endpoint.rvmodshare.com/images/modPost/${item.afterImages[0]}`,
    });

    // this.meta.addTag({ property: 'og:description', content: description });
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(function () {
        a2a.init_all();
      }, 1000);
    }
  }
  reset() {
    this.selectedDate = null;
    this.modfilters = {
      search: "",
      rvTypeFilter: "",
      makeFilter: "",
      modelValue: "",
      size: "",
      modCategoryValue: "",
      yearValue: "",
      skillLevel: "",
      timerange: "",
      tag: "",
      startDate: "",
      endDate: "",
    };

    this.getMyFeaturedMods();
  }
  uploadRVImages(files) {
    if (files) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
      if (this.rvImages && this.rvImages.length > 0) {
        docData = this.rvImages;
      }
      // this.fileToUpload = files.item(0)
      for (let index = 0; index < files.length; index++) {
        let element = files[index];
        uploadedImageArray.push(element);
        this.fileToUpload = uploadedImageArray;
        formData.append(
          "data",
          this.fileToUpload[index],
          this.fileToUpload[index].name
        );
      }
      formData.append("modelName", "modPost");
      let params = new HttpParams().set("?modelName", "modPost");
      this.rvImageLoader = true;
      this.sharedService.uploadMultipleImage(params, formData).subscribe(
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
              // console.log("User successfully created!", event.body);
              if (event.body.success) {
                // console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }

                this.rvImages = docData;
                this.rvImageLoader = false;
              } else {
                window.scrollTo(0, 0);
                this.rvImageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.rvImageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.rvImageLoader = false;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
  }
  readmoreLess(i, status = "") {
    if (this.postIndex != i) this.allComments = [];
    this.postIndex = i;
    for (let j = 0; j < this.posts.length; j++) {
      if (i != j) {
        this.posts[j].showMore = false;
      } else {
        this.posts[i].showMore = !this.posts[i].showMore;
      }
    }
    if (status == "add") {
      this.posts[i].showMore = true;
    }
  }
  getUserName(value) {
    console.log(" change user name value", value);

    this.pageService.getUserName(value).subscribe((res: any) => {
      this.massageofuser = false;
      if (res.success) {
        if (res.isExist == true && value != this.data.userName) {
          this.massageofuser = res.isExist;
        } else {
          this.massageofuser = false;
        }
      } else {
        this.toastr.error(res.error.message, "Error");
      }
    });
  }
  getComments(postId) {
    let data = {
      postId: postId,
      type: "normalPost",
    };

    this.loader = true;

    this.pageService.getComments(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.allComments = res.data.map((cat) => {
            return {
              id: cat.id,
              comment: cat.comment,
              userFullName: cat.addedBy.displayName,
              userImage: cat.addedBy.image,
              userId: cat.addedBy.id,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              showMore: false,
              reply:
                cat.reply && cat.reply.length > 0
                  ? cat.reply.map((cat2) => {
                      return {
                        id: cat2.id,
                        comment: cat2.comment,
                        userFullName: cat2.addedBy.displayName,
                        userImage: cat2.addedBy.image,
                        userId: cat2.addedBy.id,
                        fbId: cat2.addedBy.fbId,
                        gId: cat2.addedBy.gId,
                        time: this.pageService.timeDiffCalc(
                          new Date(cat2.updatedAt).getTime(),
                          this.today.getTime()
                        ),
                        createdAt: cat2.createdAt,
                        updatedAt: cat2.updatedAt,
                        showMore: false,
                      };
                    })
                  : cat.reply,
            };
          });
          // this.joinedGroupMembers = res.data;
          this.totalComments = res.total;
          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
        this.loader = false;
      },
      (err) => {
        this.loader = false;
        // this.spinner.hide();
      }
    );
  }
  replyClick(p: any) {
    if (p == this.replyForm) {
      this.replyForm = 0;
    } else {
      this.replyForm = p;
    }
  }
  deleteModPost(id, index) {
    Swal.fire({
      title: "Are you sure you want to delete this post?",
      // html: "<b>Next Step:</b> Verify Your Email. <br> We’ve sent you an email. Click the link in the email to continue setting up your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true;
        let data = {
          id: id,
        };
        this.sharedService.deleteModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.myModes.splice(index, 1);
              this.toastr.success(res.message);
            } else {
              this.toastr.error(res.error.message, "Error");
            }
            this.loader = false;
          },
          (err) => {
            this.loader = false;
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
      // this.toastr.success('Registered Successfully. Please verifygetUserName your email!');
    });
  }
  patchPersonalDetails() {
    this.personalForm.patchValue({
      userName: this.data.slug ? this.data.slug : "",
      firstName: this.data.firstName ? this.data.firstName : "",
      lastName: this.data.lastName ? this.data.lastName : "",

      // series: this.data.series,
      // make: this.data.make,
      year: this.data.year ? this.data.year : "",
      gender: this.data.gender,
      address: this.data.address,
      zipcode: this.data.zipcode,
      coverPhoto: this.data.coverPhoto,

      image: this.data.image,
      state: this.data.state,
      city: this.data.city,
      country: this.data.country,

      occupation:
        this.data.occupation != null && this.data.occupation != ""
          ? this.data.occupation.id
          : "",
      dob: this.data.dob ? new Date(this.data.dob) : null,
    });
    if (tinymce.get("editAboutText"))
      tinymce.get("editAboutText").setContent(this.data.rvDescription);
    this.userimg = this.data.image;
    this.userImage = this.data.image;
    this.usercoverimg = this.data.coverPhoto;
  }
  getUser() {
    let data = {
      id: this.userID,
    };
    // console.log(' userID', this.userID);
    this.spinner.show();
    this._observable = this.dashService.getUserDetail(this.data.id).subscribe(
      (res) => {
        if (res.success) {
          this.getYears();
          this.data = res.data;
          this.isSuggestedMakeSeries = res.data["isSuggestedMakeSeries"];
          this.isSuggestedSeries = res.data["isSuggestedSeries"];
          this.ownRV = this.data.ownRV;
          this.originalname = this.data.slug;
          this.personalForm.patchValue({
            userName: this.data.slug ? this.data.slug : "",
            firstName: this.data.firstName ? this.data.firstName : "",
            lastName: this.data.lastName ? this.data.lastName : "",

            // series: this.data.series,
            // make: this.data.make,
            year: this.data.year ? this.data.year : "",
            gender: this.data.gender,
            address: this.data.address,
            zipcode: this.data.zipcode,
            coverPhoto: this.data.coverPhoto,

            image: this.data.image,
            state: this.data.state,
            city: this.data.city,
            country: this.data.country,

            occupation:
              this.data.occupation != null && this.data.occupation != ""
                ? this.data.occupation.id
                : "",
            dob: this.data.dob ? new Date(this.data.dob) : null,
          });
          if (tinymce.get("rveditText"))
            tinymce.get("rveditText").setContent(this.data.rvDescription);
          if (tinymce.get("editAboutText"))
            tinymce.get("editAboutText").setContent(this.data.aboutme);
          this.aboutMeData = this.data.aboutme;
          this.rvDescData = this.data.rvDescription;
          this.isrvRental = this.data.isrvRental;
          if (
            this.data["featuredYouTubeLink"] &&
            this.data["featuredYouTubeLink"] != ""
          ) {
            let rx =
              /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            this.youtubeVID = this.data["featuredYouTubeLink"].match(rx);
            this.youtubeVID = this.youtubeVID[1];
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
              "https://www.youtube.com/embed/" + this.youtubeVID
            );
          }

          if (this.data.state) this.getState(this.data.country);
          if (this.data.city) this.getCity();

          this.userimg = this.data.image;
          this.rvImages = this.data.RVImages != "" ? this.data.RVImages : [];
          this.userImage = this.data.image;
          this.usercoverimg = this.data.coverPhoto;
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

  getState(code: any) {
    this.spinner.show();
    let data = {
      code,
    };
    this.pageService.getAll("states", data).subscribe(
      (res) => {
        if (res.success) {
          this.states = res.data;
        }

        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  getCity() {
    let value: any = this.personalForm.value;

    let data = {
      countryCode: value.country == "USA" ? "US" : value.country,
      stateCode: value.state,
    };

    this.spinner.show();
    this.pageService.getAll("city", data).subscribe(
      (res) => {
        if (res.success) {
          this.cities = res.data;
        }

        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  uploadCoverImage(files: FileList, location) {
    this.fileToUpload = files.item(0);
    let type: "users";
    // this.spinner.show();
    if (location == "outModel") {
      this.coverImageLoader = true;
    } else {
      this.coverImageModalLoader = true;
    }

    this.dashService.uploadImage(this.fileToUpload, "users").subscribe(
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
              this.usercoverimg = event.body.data.imagePath;
              let data = {
                coverPhoto: this.usercoverimg,
              };

              // this.userForm.patchValue({ image: this.userImage })

              if (location == "outModel") {
                this.updateUser(data);
                this.coverImageLoader = false;
              } else {
                this.personalForm.patchValue({
                  coverPhoto: this.usercoverimg,
                });
                this.coverImageModalLoader = false;
              }
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(event.body.error.message, "Error");
              if (location == "outModel") {
                this.coverImageLoader = false;
              } else {
                this.coverImageModalLoader = false;
              }
            }
            setTimeout(() => {
              this.progress = 0;
              if (location == "outModel") {
                this.coverImageLoader = false;
              } else {
                this.coverImageModalLoader = false;
              }
            }, 200);
        }

        // this.imageLoader=false;
      },
      (err) => {
        if (location == "outModel") {
          this.coverImageLoader = false;
        } else {
          this.coverImageModalLoader = false;
        }
      }
    );
  }

  uploadImage(files: FileList, location) {
    this.fileToUpload = files.item(0);
    let type: "users";
    // this.spinner.show();
    if (location == "outModel") {
      this.imageLoader = true;
    } else {
      this.imageModalLoader = true;
    }
    this.dashService.uploadImage(this.fileToUpload, "users").subscribe(
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
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            // console.log('User successfully created!', event.body);
            if (event.body.success) {
              // this.userForm.patchValue({ image: this.userImage })

              if (location == "outModel") {
                this.userImage = event.body.data.imagePath;
                let data = {
                  image: this.userImage,
                };

                this.updateUser(data);
                this.imageLoader = false;
              } else {
                this.userimg = event.body.data.imagePath;
                this.personalForm.patchValue({
                  image: this.userimg,
                });
                this.imageModalLoader = false;
              }
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(event.body.error.message, "Error");
              if (location == "outModel") {
                this.imageLoader = false;
              } else {
                this.imageModalLoader = false;
              }
            }
            setTimeout(() => {
              this.progress = 0;
              if (location == "outModel") {
                this.imageLoader = false;
              } else {
                this.imageModalLoader = false;
              }
            }, 200);
        }
      },
      (err) => {
        if (location == "outModel") {
          this.imageLoader = false;
        } else {
          this.imageModalLoader = false;
        }
      }
    );
  }
  updatePersonalData() {
    this.personalsubmitted = true;
    let data = this.personalForm.value;
    console.log(this.massageofuser, "this.massageofuser");
    if (this.massageofuser == false) {
      let data: any;
      if (!this.personalForm.invalid) {
        data = this.personalForm.value;
        if (data["dob"] == null) {
          delete data.dob;
        }
        if (data["occupation"] == null || data["occupation"] == "") {
          delete data.occupation;
        }
        this.dashService.update(data, this.data.id).subscribe(
          (res: any) => {
            if (res.success) {
              this.submitted = false;
              let data = res.data;
              this.aboutMeData = "";
              this.rvDescData = "";
              data["access_token"] = localStorage.getItem("token");
              this.credentials.setCredentials(data);
              localStorage.setItem("user", JSON.stringify(data));
              this._bs.setUserData(data);
              this.getUser();
              this.closemodal();
              this.getMyFeaturedMods();
              this.personalsubmitted = false;
              this.editPersonalForm = false;
              this.personalForm.disable();
              this._bs.modFilter.next(this.modfilters);
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
    } else {
      this.personalsubmitted = false;
    }
  }
  updateUser(d: any = "") {
    console.log("update user image");
    this.submitted = true;
    console.log(this.personalForm.controls, "this.Form.value");

    let data: any;
    if (!d) {
      data = this.personalForm.value;
    }
    if (!this.personalForm.invalid) {
      data["make"] = this.selectedmake ? this.selectedmake : this.data.make.id;
      data["series"] = this.selectedmodel
        ? this.selectedmodel
        : this.data.series.id;
      // data["make"] = this.selectedmake
      //   ? this.selectedmake
      //   : this.data.value.make;
      // data["series"] = this.selectedmodel
      //   ? this.selectedmodel
      //   : this.data.value.series;
      // data['model']=this.selectedmodel
      data["rvType"] = this.selectedRvType
        ? this.rvType
        : this.data.value.rvType;
      data["ownRV"] = this.ownRV;
      data["isrvRental"] = this.isrvRental;
      data["isSuggestedMakeSeries"] = this.isSuggestedMakeSeries;
      data["isSuggestedSeries"] = this.isSuggestedSeries;
      // if (this.ownRV) {
      //   data.rvRental.rvShareUrl = this.sharedService.getRvRentalUrlType(
      //     data.rvRental.rentalurl,
      //     "rvShareUrl"
      //   );
      //   data.rvRental.outdoorsyUrl = this.sharedService.getRvRentalUrlType(
      //     data.rvRental.rentalurl,
      //     "outdoorsyUrl"
      //   );
      //   data.rvRental.rvezyUrl = this.sharedService.getRvRentalUrlType(
      //     data.rvRental.rentalurl,
      //     "rvezyUrl"
      //   );
      // }
      if (data["dob"] == null) {
        delete data.dob;
      }
      if (data["occupation"] == null || data["occupation"] == "") {
        delete data.occupation;
      }
      if (this.isSuggestedMakeSeries) {
        data["cat_type"] = this.selectedRvType;
        data["id"] = this.userID;
        // data["isSuggestedMakeSeries"] = this.isSuggestedMakeSeries;
      }

      // data=this.sharedService.clean(data)
      this.dashService.update(data, this.data.id).subscribe(
        (res: any) => {
          if (res.success) {
            this.submitted = false;
            let data = res.data;
            this.aboutMeData = "";
            this.rvDescData = "";
            data["access_token"] = localStorage.getItem("token");
            this.credentials.setCredentials(data);
            localStorage.setItem("user", JSON.stringify(data));
            this._bs.setUserData(data);
            this.getUser();
            this.closemodal();
            this.getMyFeaturedMods();
            this._bs.modFilter.next(this.modfilters);
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
  checkLoggedinUser() {
    console.log("in check logged in user");
    let user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }
  onClickImage() {
    this.sharedService.onClickImageWithoutLogin();
  }
  goTouserProfile(url, params) {
    console.log("in go to user profile");
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.router.navigate([url], { queryParams: params });
  }
  goToModDetail(url, param) {
    window.location.href = window.location.origin + url + "?id=" + param;
  }
  getYears() {
    // for(let i = (this.year - 25); i < (this.year + 1); i++) {
    for (let i = this.year; i >= 1970; i--) {
      this.years.push(i);
    }
    // this.years.push("I'm a Wannabe")
  }
  getOccupation() {
    // this.spinner.show();
    let filters = {
      type: "categories",
      cat_type: "occupation",
      count: 10000,
    };
    this.sharedService.getOccupation(filters).subscribe(
      (response) => {
        if (response.success) {
          this.occupations = [];
          this.occupations = response.data;

          // this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  getAllPhotos() {
    this.pageService.getAllPostPhotos(this.data.id).subscribe(
      (response) => {
        if (response.success) {
          this.userPostImages = response.data;

          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        this.toastr.error(error);
        // this.spinner.hide();
      }
    );
  }
  copy(obj) {
    this.profileUrl = this._baseUrl + "profile/" + obj.slug;
    let value = this.profileUrl;
    navigator.clipboard.writeText(value);
    // this.toastr.success("Copied URL to clipboard!");
    alert("Copied URL to clipboard!");
  }
  // sortUrl(obj) {
  //   return window.location.origin + "/" + obj.id;
  // }
  // validateFacebookUrl(url) {
  //   var pattern =
  //     /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?$/;
  //   if (pattern.test(url)) {
  //     this.validfacebookUrl = true;
  //   } else {
  //     this.validfacebookUrl = false;
  //   }
  //   return pattern.test(url);
  // }
  // validateInstagramUrl(url) {
  //   var pattern =
  //     /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?$/;
  //   if (pattern.test(url)) {
  //     this.validintagramUrl = true;
  //   } else {
  //     this.validintagramUrl = false;
  //   }
  //   return pattern.test(url);
  // }
  // validateTwitterUrl(url) {
  //   var pattern = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
  //   if (pattern.test(url)) {
  //     this.validtwitterUrl = true;
  //   } else {
  //     this.validtwitterUrl = false;
  //   }
  //   return pattern.test(url);
  // }
  // validateYouTubeUrl(urlToParse) {
  //   if (urlToParse != "") {
  //     console.log("in if");
  //     let url = urlToParse;
  //     var regExp =
  //       /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  //     if (url.match(regExp)) {
  //       this.validUrl = true;
  //     } else {
  //       this.validUrl = false;
  //     }
  //   }
  //   console.log("this.validUrl", this.validUrl);
  // }
  showMessage(obj) {
    let message =
      "Copied Successfully : " + this._baseUrl + "profile/" + obj.id;
    // this._sharedService.showAlert(message, "alert-success");
    window.alert(message);
  }
  setConfigForRVEditor() {
    tinymce.remove();

    tinymce.init({
      selector: "#rveditText",
      base_url: "/tinymce",
      suffix: ".min",
      branding: false,
      toolbar_mode: "wrap",
      menubar: false,
      content_style:
        "body { color: #495057;font-size: 14px;font-family: 'Open Sans',sans-serif;}",
      plugins: "link image table lists autoresize emoticons",
      toolbar:
        "h1 h2 | bold italic underline | alignleft aligncenter alignright | table image  bullist numlist link | emoticons ",
      height: 300,
      object_resizing: ":not(table)",
      image_title: false,
      /* enable automatic uploads of images represented by blob or data URIs*/
      automatic_uploads: true,
      file_picker_types: "image",
      default_link_target: "_blank",
      target_list: false,
      link_title: false,
      images_upload_url: this._host + "uploadnormalImages",
      emoticons_append: {
        custom_mind_explode: {
          keywords: ["brain", "mind", "explode", "blown"],
          char: "🤯",
        },
      },
    });
  }
  setConfigForAboutEditor() {
    tinymce.remove();

    tinymce.init({
      selector: "#editAboutText",
      base_url: "/tinymce",
      suffix: ".min",
      branding: false,
      toolbar_mode: "wrap",
      menubar: false,
      content_style:
        "body { color: #495057;font-size: 14px;font-family: 'Open Sans',sans-serif;}",
      plugins: "link image table lists autoresize emoticons",
      toolbar:
        "h1 h2 | bold italic underline | alignleft aligncenter alignright | table image  bullist numlist link | emoticons ",
      height: 300,
      object_resizing: ":not(table)",
      image_title: false,
      /* enable automatic uploads of images represented by blob or data URIs*/
      automatic_uploads: true,
      file_picker_types: "image",
      default_link_target: "_blank",
      target_list: false,
      link_title: false,
      images_upload_url: this._host + "uploadnormalImages",
      emoticons_append: {
        custom_mind_explode: {
          keywords: ["brain", "mind", "explode", "blown"],
          char: "🤯",
        },
      },
    });
  }
  editPersonalData() {
    this.editPersonalForm = true;
    this.personalForm.enable();
  }
  ngOnDestroy(): void {
    if (this.modalReference) {
      this.modalReference.close();
    }
  }
}
