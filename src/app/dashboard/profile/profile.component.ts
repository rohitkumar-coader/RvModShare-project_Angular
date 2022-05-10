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
import { DashboardService } from "../dashboard.service";
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
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
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
  public Form: FormGroup;
  public rvForm: FormGroup;
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
  viewModal = false;
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
    this.createForm();
    this.createFormRv();
    this.createFormPersonal();
    this.createFormSocial();
    config.backdrop = "static";
    config.keyboard = false;
    window.scroll(0, 0);
    // this.getallNormalPosts()
  }

  get f() {
    return this.Form.controls;
  }
  get sf() {
    return this.socialForm.controls;
  }
  get pf() {
    return this.personalForm.controls;
  }
  get rf() {
    return this.rvForm.controls;
  }

  createFormSocial() {
    this.socialForm = this.formBuilder.group({
      yourWebsite: [""],
      // rvDescription: [""],
      featuredYouTubeLink: [
        "",
        Validators.pattern(
          "^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+$"
        ),
      ],
      youTubeLink: [
        "",
        Validators.pattern(
          "^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+$"
        ),
      ],
      facebookLink: [
        "",
        Validators.pattern(
          "http://www.facebook.com/(.+)|https://www.facebook.com/(.+)|https://facebook.com/(.+)"
        ),
      ],
      twitterLink: [
        "",
        Validators.pattern(
          "^https://www.twitter.com/(.+)|www.twitter.com/(.+)|https://twitter.com/(.+)"
        ),
      ],
      instagramLink: [
        "",
        Validators.pattern(
          "^https://www.instagram.com/(.+)|www.instagram.com/(.+)|https://instagram.com/(.+)"
        ),
      ],
      blogLink: [
        "",
        Validators.pattern(
          "^https://www(.+)|www./(.+)|http://www(.+)|http://(.+)|https://(.+)"
        ),
      ],
    });
    this.socialForm.disable();
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

  createFormRv() {
    this.rvForm = this.formBuilder.group({
      rvType: ["", Validators.required],
      make: [""],
      series: [""],
      year: ["", Validators.required],
      model: [""],
      RVImages: [[]],
      suggestedSeries: [""],
      suggestedMake: [""],
      rvDescription: [""],
      rvRental: this.formBuilder.group({
        rvShareUrl: [
          "",
          Validators.pattern(
            "^https://www.rvshare.com/(.+)|https://rvshare.com/(.+)"
          ),
        ],
        outdoorsyUrl: [
          "",
          Validators.pattern(
            "^https://www.outdoorsy.com/(.+)|https://outdoorsy.com/(.+)"
          ),
        ],
        rvezyUrl: [
          "",
          Validators.pattern(
            "^https://www.rvezy.com/(.+)|https://rvezy.com/(.+)"
          ),
        ],
      }),
    });
    this.rvForm.disable();
  }

  createForm() {
    this.Form = this.formBuilder.group({
      image: [""],
      coverPhoto: [""],
      rvType: ["", Validators.required],
      make: [""],
      series: [""],
      // make: ['', Validators.required],
      //  series: ['', Validators.required],
      year: ["", Validators.required],
      model: [""],
      RVImages: [[]],
      aboutme: [""],
      occupation: [""],
      // series: ['', Validators.required],
      gender: [""],
      // age: ['', Validators.required],
      dob: [""],
      suggestedSeries: [""],
      suggestedMake: [""],
      // dob: ['', Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      state: [""],
      city: [""],
      country: [""],
      address: [""],
      zipcode: [""],
      yourWebsite: [""],
      rvDescription: [""],
      featuredYouTubeLink: [
        "",
        Validators.pattern(
          "^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+$"
        ),
      ],
      youTubeLink: [
        "",
        Validators.pattern(
          "^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+$"
        ),
      ],
      facebookLink: [
        "",
        Validators.pattern(
          "http://www.facebook.com/(.+)|https://www.facebook.com/(.+)|https://facebook.com/(.+)"
        ),
      ],
      // twitterLink: [
      //   "",
      //   Validators.pattern("^http(s*)://(www.)*twitter.com/[a-zA-Z0-9.]+$"),
      // ],
      twitterLink: [
        "",
        Validators.pattern(
          "^https://www.twitter.com/(.+)|www.twitter.com/(.+)|https://twitter.com/(.+)"
        ),
      ],
      instagramLink: [
        "",
        Validators.pattern(
          "^https://www.instagram.com/(.+)|www.instagram.com/(.+)|https://instagram.com/(.+)"
        ),
      ],
      blogLink: [
        "",
        Validators.pattern(
          "^https://www(.+)|www./(.+)|http://www(.+)|http://(.+)|https://(.+)"
        ),
      ],
      rvRental: this.formBuilder.group({
        // rentalurl: [
        //   "",
        //   Validators.pattern(
        //     "^https://www.rvshare.com/(.+)|https://www.outdoorsy.com/(.+)|https://www.rvezy.com/(.+)"
        //   ),
        // ],
        rvShareUrl: [
          "",
          Validators.pattern(
            "^https://www.rvshare.com/(.+)|https://rvshare.com/(.+)"
          ),
        ],
        outdoorsyUrl: [
          "",
          Validators.pattern(
            "^https://www.outdoorsy.com/(.+)|https://outdoorsy.com/(.+)"
          ),
        ],
        rvezyUrl: [
          "",
          Validators.pattern(
            "^https://www.rvezy.com/(.+)|https://rvezy.com/(.+)"
          ),
        ],
      }),
    });
  }

  config1 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose RV Type", // text to be displayed when no item is selected defaults to Select,
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
  ngOnInit(): void {
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
    this.onChangeSuggestedMakeSeries();
    this.onChangeSuggestedSeries();
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
                this.Form.patchValue({ RVImages: docData });
                this.rvForm.patchValue({ RVImages: docData });
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
  filterRVClass(rvType) {
    let data = {};
    data = this.rvTypes.filter((obj) => {
      if (obj.detail.value == rvType) {
        return obj;
      }
    });
    let newData = {
      value: data[0],
    };
    this.selectedRVType(newData);
    // this.selectedRvType = data[0].detail.value;
    // this.rvType = data[0].detail.value;

    return data[0]["description"];
  }
  filterRVMake(rvMake, makesData) {
    // console.log(rvMake,makesData,"rv filter in")
    let data = {};
    data = makesData.filter((obj) => {
      if (obj["id"] == rvMake) {
        return obj;
      }
    });
    let newData = {
      value: data[0],
    };
    // console.log(data[0],newData,"rv filter")
    this.selectedMake(newData);
    return data[0];
  }
  filterRVModel(rvmodel, modelData) {
    let data = {};
    data = modelData.filter((obj) => {
      if (obj["id"] == rvmodel) {
        return obj;
      }
    });
    let newData = {
      value: data[0],
    };
    this.selectedModel(newData);
    return data[0];
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
      // this.toastr.success('Registered Successfully. Please verify your email!');
    });
  }
  patchRVdetails() {
    this.ownRV = this.data.ownRV;
    this.isSuggestedSeries = this.data.isSuggestedSeries;
    this.isSuggestedMakeSeries = this.data.isSuggestedMakeSeries;
    this.rvForm.patchValue({
      model: this.data["model"],
      year: this.data.year ? this.data.year : "",
      suggestedSeries: this.data.suggestedSeries,
      suggestedMake: this.data.suggestedMake,
      RVImages: this.data.RVImages != "" ? this.data.RVImages : [],
      rvDescription: this.data.rvDescription ? this.data.rvDescription : "",
      rvType: this.data["rvType"]
        ? this.filterRVClass(this.data["rvType"])
        : null,
      rvRental:
        this.data.rvRental != null ||
        this.data.rvRental != "" ||
        this.data.rvRental != undefined
          ? this.data.rvRental
          : {},
      isrvRental: this.data.isrvRental,
    });
    if (this.isSuggestedMakeSeries == true) {
      this.onChangeSuggestedMakeSeries();
    }
    if (this.isSuggestedMakeSeries == false && this.isSuggestedSeries == true) {
      this.onChangeSuggestedSeries();
    }
    if (tinymce.get("rveditText"))
      // this.onChangeSuggestedMakeSeries();
      // this.onChangeSuggestedSeries();
      tinymce.get("rveditText").setContent(this.data.rvDescription);
    this.rvDescData = this.data.rvDescription;
    this.isrvRental = this.data.isrvRental;
    this.rvImages = this.data.RVImages != "" ? this.data.RVImages : [];
  }
  patchSocialDetails() {
    this.socialForm.patchValue({
      featuredYouTubeLink: this.data.featuredYouTubeLink,
      facebookLink: this.data.facebookLink,
      youTubeLink: this.data.youTubeLink,
      twitterLink: this.data.twitterLink,
      instagramLink: this.data.instagramLink,
      blogLink: this.data.blogLink,
      yourWebsite: this.data.yourWebsite,
    });
  }
  patchPersonalDetails() {
    this.personalForm.patchValue({
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
          // this.rvForm.patchValue({
          //   suggestedSeries: this.data.suggestedSeries,
          //   suggestedMake: this.data.suggestedMake,
          //   RVImages: this.data.RVImages != "" ? this.data.RVImages : [],
          //   rvDescription: this.data.rvDescription
          //     ? this.data.rvDescription
          //     : "",
          //   model: this.data["model"],
          //   year: this.data.year ? this.data.year : "",
          //   rvType: this.data["rvType"]
          //     ? this.filterRVClass(this.data["rvType"])
          //     : null,
          //   rvRental: this.data.rvRental,
          //   isrvRental: this.data.isrvRental,
          // });
          // this.Form.patchValue({
          //   firstName: this.data.firstName ? this.data.firstName : "",
          //   lastName: this.data.lastName ? this.data.lastName : "",

          //   // series: this.data.series,
          //   // make: this.data.make,
          //   year: this.data.year ? this.data.year : "",
          //   gender: this.data.gender,
          //   address: this.data.address,
          //   zipcode: this.data.zipcode,
          //   coverPhoto: this.data.coverPhoto,
          //   suggestedSeries: this.data.suggestedSeries,
          //   suggestedMake: this.data.suggestedMake,
          //   image: this.data.image,
          //   state: this.data.state,
          //   city: this.data.city,
          //   country: this.data.country,
          //   featuredYouTubeLink: this.data.featuredYouTubeLink,
          //   facebookLink: this.data.facebookLink,
          //   youTubeLink: this.data.youTubeLink,
          //   twitterLink: this.data.twitterLink,
          //   instagramLink: this.data.instagramLink,
          //   blogLink: this.data.blogLink,
          //   rvRental: this.data.rvRental,
          //   isrvRental: this.data.isrvRental,
          //   occupation:
          //     this.data.occupation != null && this.data.occupation != ""
          //       ? this.data.occupation.id
          //       : "",
          //   RVImages: this.data.RVImages != "" ? this.data.RVImages : [],
          //   yourWebsite: this.data.yourWebsite,
          //   aboutme: this.data.aboutme ? this.data.aboutme : "",
          //   rvDescription: this.data.rvDescription
          //     ? this.data.rvDescription
          //     : "",
          //   dob: this.data.dob ? new Date(this.data.dob) : null,
          //   model: this.data["model"],
          //   rvType: this.data["rvType"]
          //     ? this.filterRVClass(this.data["rvType"])
          //     : null,
          // });
          // this.socialForm.patchValue({
          //   featuredYouTubeLink: this.data.featuredYouTubeLink,
          //   facebookLink: this.data.facebookLink,
          //   youTubeLink: this.data.youTubeLink,
          //   twitterLink: this.data.twitterLink,
          //   instagramLink: this.data.instagramLink,
          //   blogLink: this.data.blogLink,
          //   yourWebsite: this.data.yourWebsite,
          // });
          // this.personalForm.patchValue({
          //   firstName: this.data.firstName ? this.data.firstName : "",
          //   lastName: this.data.lastName ? this.data.lastName : "",

          //   // series: this.data.series,
          //   // make: this.data.make,
          //   year: this.data.year ? this.data.year : "",
          //   gender: this.data.gender,
          //   address: this.data.address,
          //   zipcode: this.data.zipcode,
          //   coverPhoto: this.data.coverPhoto,

          //   image: this.data.image,
          //   state: this.data.state,
          //   city: this.data.city,
          //   country: this.data.country,

          //   occupation:
          //     this.data.occupation != null && this.data.occupation != ""
          //       ? this.data.occupation.id
          //       : "",
          //   dob: this.data.dob ? new Date(this.data.dob) : null,
          // });
          // if (tinymce.get("editAboutText"))
          //   tinymce.get("editAboutText").setContent(this.data.aboutme);
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
    let value: any = this.Form.value;

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
                this.Form.patchValue({
                  coverPhoto: this.usercoverimg,
                });
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
  goTofollowing() {
    this._bs.postDataToreload.next({
      tabToview: "pills-home-tab",
    });
  }

  goTofollowers() {
    this._bs.postDataToreload.next({
      tabToview: "pills-mod-contact-tab",
    });
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
                console.log("this.userimg", this.userimg);
                this.Form.patchValue({
                  image: this.userimg,
                });
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
  viewPost(postId, postType) {
    let data = {
      postType: postType,
      postId: postId,
    };
    this.sharedService.viewPost(data);
  }
  onChangeSuggestedMakeSeries() {
    console.log(this.isSuggestedMakeSeries, "this.isSuggestedMakeSeries");
    this.rvSubmitted = false;
    if (this.isSuggestedSeries == true) {
      this.isSuggestedSeries = false;
    }
    // if (this.isSuggestedMakeSeries) {
    //   this.isSuggestedSeries = true;
    // }
    // if (!this.isSuggestedMakeSeries && !this.isSuggestedSeries) {
    if (this.isSuggestedMakeSeries == false) {
      this.makeerr = "";
      this.serieserr = "";
      this.rvForm.get("make").setValidators(Validators.required);
      this.rvForm.get("series").setValidators(Validators.required);

      this.rvForm.get("suggestedMake").clearValidators();
      this.rvForm.get("suggestedSeries").clearValidators();
      this.rvForm.get("suggestedMake").setValue("");
      this.rvForm.get("suggestedSeries").setValue("");
      // this.rvForm.get("suggestedMake").reset();
      // this.rvForm.get("suggestedSeries").reset();
      if (this.data["rvType"] && this.data["rvType"] != "") {
        this.rvForm.patchValue({
          rvType: this.data["rvType"]
            ? this.filterRVClass(this.data["rvType"])
            : null,
          year: this.data["year"],
          model: this.data["model"],
        });
      }
    } else {
      // this.rvForm.get("year").reset();
      // this.rvForm.get("year").setValue("");
      // this.rvForm.get("model").reset();
      this.rvForm.get("suggestedMake").setValidators(Validators.required);
      this.rvForm.get("suggestedSeries").setValidators(Validators.required);
      this.rvForm.get("make").clearValidators();
      this.rvForm.get("series").clearValidators();
      this.rvForm.get("make").reset();
      this.rvForm.get("series").reset();
    }
    this.rvForm.get("make").updateValueAndValidity();
    this.rvForm.get("series").updateValueAndValidity();
    this.rvForm.get("suggestedMake").updateValueAndValidity();
    this.rvForm.get("suggestedSeries").updateValueAndValidity();
  }
  onChangeSuggestedSeries() {
    this.rvSubmitted = false;
    if (this.isSuggestedMakeSeries == true) {
      this.isSuggestedMakeSeries = false;
    }
    if (this.isSuggestedSeries == false) {
      this.serieserr = "";
      this.rvForm.get("make").setValidators(Validators.required);
      this.rvForm.get("series").setValidators(Validators.required);
      this.rvForm.get("suggestedSeries").clearValidators();
      this.rvForm.get("suggestedSeries").setValue("");
      if (this.data["rvType"] && this.data["rvType"] != "") {
        this.rvForm.patchValue({
          rvType: this.data["rvType"]
            ? this.filterRVClass(this.data["rvType"])
            : null,
          year: this.data["year"],
          model: this.data["model"],
        });
      }
    } else {
      // this.rvForm.get("year").reset();
      // this.rvForm.get("year").setValue("");
      // this.rvForm.get("model").reset();
      this.rvForm.get("suggestedSeries").setValidators(Validators.required);
      this.rvForm.get("series").clearValidators();
      this.rvForm.get("series").reset();
    }
    this.rvForm.get("make").updateValueAndValidity();
    this.rvForm.get("series").updateValueAndValidity();
    this.rvForm.get("suggestedSeries").updateValueAndValidity();
  }
  clearYearModel() {
    this.rvForm.get("year").reset();
    this.rvForm.get("year").setValue("");
    this.rvForm.get("model").reset();
  }
  CloseRv() {
    this.editRVDetail = false;
    // this.getUser();
    this.makeerr = "";
    this.serieserr = "";
    this.isSuggestedMakeSeries = false;
    this.isSuggestedSeries = false;
    this.rvForm.get("suggestedMake").clearValidators();
    this.rvForm.get("make").clearValidators();
    this.rvForm.get("suggestedSeries").clearValidators();
    this.rvForm.get("series").clearValidators();
    this.closemodal();
    this.patchRVdetails();
    this.rvForm.disable();
  }
  updateSocialData() {
    this.socialsubmitted = true;
    if (!this.socialForm.invalid) {
      let data = this.socialForm.value;
      this.dashService.update(data, this.data.id).subscribe(
        (res: any) => {
          if (res.success) {
            this.socialsubmitted = false;
            let newdata = res.data;
            newdata["access_token"] = localStorage.getItem("token");
            this.credentials.setCredentials(newdata);
            localStorage.setItem("user", JSON.stringify(newdata));
            this._bs.setUserData(newdata);
            this.getUser();
            this.closemodal();
            this.getMyFeaturedMods();
            this.editSocialForm = false;
            this.socialForm.disable();
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
  updateRvUser(d: any = "") {
    this.rvSubmitted = true;
    console.log(this.rvForm.controls, "this.rvForm.value");
    console.log(this.selectedmodel, "this.selectedmodel");
    console.log(this.data.series, "this.this.data.series");
    // return;

    let data: any;
    if (!d) {
      data = this.rvForm.value;
    }
    if (!this.rvForm.invalid) {
      data["make"] = this.selectedmake
        ? this.selectedmake
        : this.data.make
        ? this.data.make.id
        : null;
      data["series"] = this.selectedmodel
        ? this.selectedmodel
        : this.data.series
        ? this.data.series.id
        : null;
      data["rvType"] = this.selectedRvType
        ? this.rvType
        : this.data.value.rvType;
      data["ownRV"] = this.ownRV;
      data["isrvRental"] = this.isrvRental;
      data["isSuggestedMakeSeries"] = this.isSuggestedMakeSeries;
      data["isSuggestedSeries"] = this.isSuggestedSeries;
      if (
        this.isSuggestedMakeSeries == true ||
        this.isSuggestedSeries == true
      ) {
        data["isInterestAdded"] = true;
      }
      if (this.isSuggestedMakeSeries || this.isSuggestedSeries) {
        data["cat_type"] = this.selectedRvType;
        data["id"] = this.userID;
      }
      if (
        !this.isSuggestedMakeSeries &&
        data.suggestedMake == "" &&
        data.suggestedSeries == ""
      ) {
        data["makeAction"] = "";
        data["seriesAction"] = "";
      }
      if (!this.isSuggestedSeries && data.suggestedSeries == "") {
        data["seriesAction"] = "";
      }
      if (!this.isSuggestedSeries && !data.suggestedSeries) {
        this.onFollowInterestSubmitted();
      }
      console.log(data, "rv datataaaaa");
      this.dashService.update(data, this.data.id).subscribe(
        (res: any) => {
          if (res.success) {
            this.rvSubmitted = false;
            this.editRVDetail = false;
            let data = res.data;
            this.aboutMeData = "";
            this.rvDescData = "";
            this.makeerr = "";
            this.serieserr = "";
            data["access_token"] = localStorage.getItem("token");
            this.credentials.setCredentials(data);
            localStorage.setItem("user", JSON.stringify(data));
            this._bs.setUserData(data);
            this.getUser();
            this.closemodal();
            this.getMyFeaturedMods();
            this.rvForm.disable();
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
  updatePersonalData() {
    this.personalsubmitted = true;
    console.log(this.personalForm.controls, "this.personalForm.value");

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
  }
  updateUser(d: any = "") {
    this.submitted = true;
    console.log(this.Form.controls, "this.Form.value");

    let data: any;
    if (!d) {
      data = this.Form.value;
    }
    if (!this.Form.invalid) {
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
  updateAboutMe() {
    this.Form.patchValue({
      aboutme: tinymce.get("editAboutText").getContent(),
    });
    // this.Form.patchValue({
    //   aboutme: this.aboutMeData,
    // });
    this.updateUser();
  }
  updateRVDescription() {
    this.Form.patchValue({
      rvDescription: tinymce.get("rveditText").getContent(),
    });
    // this.Form.patchValue({
    //   rvDescription: this.rvDescData,
    // });
    this.updateUser();
  }
  updatePrivacy() {
    let data = {
      isPrivate: this.isPrivate,
    };
    this.dashService.update(data, this.data.id).subscribe(
      (res: any) => {
        if (res.success) {
          this.submitted = false;
          let data = res.data;
          data["access_token"] = localStorage.getItem("token");
          this.credentials.setCredentials(data);
          localStorage.setItem("user", JSON.stringify(data));
          this._bs.setUserData(data);
          this.getUser();
          this.closemodal();
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
  checkLoggedinUser() {
    console.log("in check logged in user");
    let user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }
  onClickImage() {
    this.sharedService.onClickImageWithoutLogin();
  }
  goTouserProfile(url) {
    console.log("in go to user profile");
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.router.navigate([url]);
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
  resetOldRvData() {
    this.rvForm.controls["make"].reset();
    this.rvForm.controls["series"].reset();
    this.rvForm.controls["model"].reset();
    this.rvForm.controls["year"].reset();
    this.rvForm.controls["suggestedMake"].reset();
    this.rvForm.controls["suggestedSeries"].reset();
    this.isSuggestedMakeSeries = false;
    this.isSuggestedSeries = false;
    this.rvForm.get("suggestedMake").setValue("");
    this.rvForm.get("suggestedSeries").setValue("");
  }
  selectedRVType(data) {
    this.make = "";
    this.selectedRvType = data.value.detail.value;
    this.rvType = data.value.detail.value;

    this.allMakes = [];
    this.allModels = [];
    this.getCategories();
  }
  selectedMake(data) {
    console.log(data, "selected make", this.selectedmake, this.makeerr);
    // this.selectedmake = data.value.description;
    if (data.value != undefined && data.value != null) {
      this.selectedmake = data.value.id;
      this.rvForm.patchValue({
        make: data.value.description,
      });
      this.categoryId = data.value.detail.id;
      this.getSubCategories();
    }
  }
  selectedModel(data) {
    console.log(data, "selected model");
    if (data.value != undefined && data.value != null) {
      this.selectedmodel = data.value.id;
      this.rvForm.patchValue({
        series: data.value.description,
      });
      this.model = data.value.detail.name;
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

  getCategories() {
    // this.spinner.show();
    let filters = {
      type: this.rvType,
      sortBy: -1,
      count: 10000,
    };
    this.sharedService.getMainCategories(filters).subscribe(
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
          // this.allMakes = [...this.allMakes];
          if (this.data["make"] && this.data["make"]["id"]) {
            this.Form.patchValue({
              make: this.filterRVMake(this.data["make"]["id"], this.allMakes),
            });
            this.rvForm.patchValue({
              make: this.filterRVMake(this.data["make"]["id"], this.allMakes),
            });
          }

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

  getSubCategories() {
    // this.spinner.show();
    let filters = {
      type: this.rvType,
      categoryId: this.categoryId,
      count: 10000,
    };
    this.sharedService.getSubCategories(filters).subscribe(
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
          // this.Form.patchValue({
          //   series: this.filterRVModel(
          //     this.data["series"]["id"],
          //     this.allModels
          //   ),
          // });
          if (this.data["series"] && this.data["series"]["id"]) {
            this.rvForm.patchValue({
              series: this.filterRVModel(
                this.data["series"]["id"],
                this.allModels
              ),
            });
          }

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

  openModal() {
    this.viewModal = true;
  }
  copy(obj) {
    this.profileUrl = this._baseUrl + "profile/" + obj.slug;
    let value = this.profileUrl;
    navigator.clipboard.writeText(value);
    // this.toastr.success("Copied URL to clipboard!");
    // alert("Copied URL to clipboard!");
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
      "Copied Successfully : " + this._baseUrl + "profile/" + obj.slug;
    // this._sharedService.showAlert(message, "alert-success");
    window.alert(message);
  }
  onFollowInterestSubmitted() {
    let filtermod1 = {
      interestArray: [
        {
          categoryType: "modpost",
          categoryId: this.modfilters.modCategory,
          rvClass: this.selectedRvType ? this.rvType : this.data.value.rvType,
          rvMake: this.selectedmake
            ? this.selectedmake
            : this.data.make
            ? this.data.make.id
            : null,
          rvSeries: this.selectedmodel
            ? this.selectedmodel
            : this.data.series
            ? this.data.series.id
            : null,
          // rvModel: this.modfilters.modelValue,
          // rvYear: this.modfilters.year,
          // size: this.modfilters.size,
          // difficulty: this.modfilters.skillLevel,
          // timerange: this.modfilters.timerange,
        },
      ],
    };
    this.pageService.addFollowCategories(filtermod1).subscribe(
      (res: any) => {
        if (res.success) {
        } else {
          console.log(res.error.message, "follow interest profile Error");
        }
      },
      (err) => {}
    );
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
  editSocial() {
    this.editSocialForm = true;
    this.socialForm.enable();
  }
  editRVForm() {
    this.editRVDetail = true;
    this.rvForm.enable();
  }
  ngOnDestroy(): void {
    if (this.modalReference) {
      this.modalReference.close();
    }
  }
}
