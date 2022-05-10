import {
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
  PLATFORM_ID,
  Inject,
  Output,
  EventEmitter,
} from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorService } from "../../shared/behavior.service";
import { ToastrService } from "ngx-toastr";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { HttpEvent, HttpEventType, HttpParams } from "@angular/common/http";
import { SharedService } from "src/app/shared/shared.service";
import { CredentialsService } from "src/app/auth/credentials.service";
import { ShareModalComponent } from "../share-modal/share-modal.component";
import { ReportSectionComponent } from "../report-section/report-section.component";
import { LikeListingModalComponent } from "../like-listing-modal/like-listing-modal.component";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { PostSharedWithComponent } from "../post-shared-with/post-shared-with.component";
import { ChatService } from "src/app/chat.service";
import { Meta } from "@angular/platform-browser";
import { isPlatformBrowser } from "@angular/common";
import { AppInjector } from "../../app.module";
import { MagnifyImageComponent } from "src/app/shared/shared/magnify-image/magnify-image.component";
import { EditSocialPostComponent } from "../edit-social-post/edit-social-post.component";
declare var require: any;
var Filter = require("bad-words"),
  filter = new Filter();
declare var a2a: any;
@Component({
  selector: "app-home-new",
  templateUrl: "./home-new.component.html",
  styleUrls: ["./home-new.component.scss"],
})
export class HomeNewComponent implements OnInit {
  @Output() timelinemodCount = new EventEmitter<number>();
  loadingContent = [1, 2, 3, 4];
  chatService: any;
  commentData: any = [];
  editReply = false;
  editComment = false;
  newBadWords = environment.bad_word;
  Copylink = "";
  viewModal = false;
  _baseUrl = window.location.origin + "/";
  isPrivate = false;
  userId: any = "";
  // slides = [ ];
  // slideConfig = { slidesToShow: 4, slidesToScroll: 4 };
  pollVoting: any = "";
  allGroups: any = [];
  modFirendsList: any = [];
  friendposts: any = [];
  groupId: any;
  showLikedModPost = false;
  // slickInit(e) {
  //   console.log("slick initialized");
  // }
  likeModal: any = false;
  showTabs: boolean;
  breakpoint(e) {
    console.log("breakpoint");
  }

  afterChange(e) {
    console.log("afterChange");
  }

  beforeChange(e) {
    console.log("beforeChange");
  }
  showModPost = false;
  selectedX: any;
  selectedMod: any;
  changeFavourite: any;
  // filters:{size:string;search:string}={
  //   size:'',search:''
  // }
  modfilters: any = {};
  search: any;
  searchKeyword: any;
  rvTypeFilter: any = "";
  makeFilter: any = "";
  modelValue: any = "";
  size: any = "";
  modCategoryValue: any = "";
  yearValue: any = "";
  @ViewChild("postInput", { static: true }) postInput;
  @ViewChild("post", { static: true }) post;
  @ViewChild("modDocInput", { static: false }) modDocInput;
  @ViewChild("groupInput", { static: true }) groupInput;
  imageLoader: boolean = false;
  validUrl = true;
  progress: number = 0;
  closeResult = "";
  affiliateLink: FormArray;
  modSubmit: Boolean = false;
  mymodposts: any = [];
  myCreatedMods = [];
  afterImages = [];
  beforeImages = [];
  modCategories = [];
  difficulties = [];
  images = [];
  posterr = "";
  postImage: any;
  homeMenu: boolean = true;
  poll = false;
  allMakes = [];
  allModels = [];
  year = new Date().getFullYear() + 1;
  years = [];
  beforeImageLoader = false;
  afterImageLoader = false;
  modPostForm: FormGroup;
  allComments: Array<any> = [];
  replyForm: any;
  totalComments: Array<any> = [];
  commentOnPost: any;
  replyOnPost: any;
  replyOnPost2: any;
  replyOnPost3: any;
  postimageLoader: boolean = false;
  see_mod = false;
  talk_mod = false;
  default_mod = true;
  showBtn = true;
  myDetail: any = {};
  badgeImage: any;
  loaderImage = false;
  badge: object = {
    group_points: 0,
    profile_points: 0,
    social_post_points: 0,
    mod_post_points: 0,
    group_badge: "",
    mod_post_badge: "",
    profile_badge: "",
    social_post_badge: "",
    // "group_image":"",
    // "mod_post_image":"",
    // "profile_image":"",
    // "social_post_image":""
  };
  badgeImages = [];
  favMods: any = [];
  microModes: any = [];
  miniModes: any = [];
  massiveModes: any = [];
  megaModes: any = [];
  mediumModes: any = [];
  badgesData: Array<any> = [];
  fileToUpload: File = null;
  groupImage: any;
  tagsArray: Array<any> = [];
  today = new Date();
  mygroups: Array<any> = [];
  myCreatedGroups: Array<any> = [];
  selectedRvType: any;
  selectedmake: any;
  selectedmodel: any;
  modalReference: any;
  modalReference2: any;
  isCommentDisabled = false;
  showMods: boolean;
  hideDefault: boolean = true;
  hidesDefault: boolean = false;
  submitted: Boolean = false;
  _host = environment.url;
  categories: Array<any> = [];
  disabled = false;
  showEmojiPicker = false;
  rvType: any;
  modSubCategories = [];
  filterCategories: any = [];
  filterSize: any = [];
  friendpost = [];
  filterModels: any = [];
  firendsList: any = [];
  joinedGroups: any = [];
  pollForm: FormGroup;
  isLoading: boolean = false;
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
    // {
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
    //   detail: { value: "wanna-be", key: "I'm a Wannabe" },
    // },
  ];
  sets = [
    "native",
    "google",
    "twitter",
    "facebook",
    "emojione",
    "apple",
    "messenger",
  ];
  set = "twitter";
  message = "";
  isShown = 1;
  uploadDocLoader = false;
  Shown: boolean = false;
  postIndex: any;
  // hidesDefault:boolean=false;
  public groupForm: FormGroup;

  createPostModal = false;
  user: any;
  loader = false;
  categoryId: any;
  MakesFilters: any = [];
  seeMod: boolean = false;
  talkMod: boolean = false;
  leftAdvertisements: any = [];
  rightAdvertisements: any = [];
  centerAdvertisements: any = [];
  DefaultPost: any;
  wlcomeContent: any = {};
  groupPosts: any = [];
  friendsPosts: any = [];
  showFavMods: boolean = false;
  followedCategories: any = [];
  firendMods: any = [];
  filters: { count: number; userid: string } = {
    count: 1000,
    userid: "",
  };
  modalReference3: any;
  pollSubmitted: Boolean = false;
  slideConfig: any;
  followfilters: {
    count: number;
    size: string;
    search: string;
    userid: string;
    class: string;
    series: string;
    make: string;
    modCategory: string;
    year: string;
    tag: string;
    skillLevel: string;
    timerange: string;
    endDate: string;
    startDate: string;
    whatIDid: string;
  } = {
    count: 1000,
    userid: "",
    search: "",
    class: "",
    series: "",
    make: "",
    modCategory: "",
    year: "",
    size: "",
    tag: "",
    skillLevel: "",
    timerange: "",
    endDate: "",
    startDate: "",
    whatIDid: "",
  };
  mymodfilters: any = {
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
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public _bs: BehaviorService,
    public pageService: PagesService,
    config: NgbCarouselConfig,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    public credentials: CredentialsService,
    // public chatService:ChatService,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // this._activateRouter.queryParams.subscribe(param => {
    //   console.log("in timeline by apple login param",param)
    //   if (param) {
    //     this.userId = param['id'];
    //     console.log("in timeline by apple login",this.userId)
    //     if(this.userId){
    //       let data = {
    //         id:  this.userId ,
    //       };
    //       this.autoLogin(data);
    //     }
    //   }

    // })

    // _bs.Tabs.subscribe((res) => {
    //   if (res == "seeMods") this.seeModsBtn();
    //   if (res == "shareMods") this.shareModBtn();
    //   if (res == "talkMods") this.talkModBtn();
    // });
    _bs.postDataToreload.subscribe((res) => {
      if (res.postSection == "timeline") this.getallNormalPosts();
      if (res.postSection == "mods") this.showModsSection();
      if (res.postSection == "likedMods") this.showLikedModsSection();
      if (res.postSection == "groupPosts") this.getGroupPost();
      if (res.postSection == "likedPosts") this.getSavedPosts();
      if (res.postSection == "socialPosts") this.getFriendsPost();
      if (res.postSection == "getMyActivities") this.getMyActivities();
    });
    let user = localStorage.getItem("credentials");
    this.user = JSON.parse(user);
    if (this.user) {
      let data = {
        id: this.user.id,
      };
      // this.autoLogin(data);
      // this.chatService.addUser({user_id:this.user.id,email:this.user.email})
    }

    filter.addWords(...this.newBadWords);
    this.createPollForm();
    this.createForm();
    this.createModForm();
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;

    // if(this.getParam('hideDefault')) this.hideDefault=this.getParam('hideDefault')
    // if(this.getParam('modal') == 'shareMods') this.shareModBtn()
    // if(this.getParam('modal') == 'talkMods') this.talkModBtn()

    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   if (evt.url.indexOf("/timeline") >= 0) {
    //     this.showTabs = false;
    //     // localStorage.removeItem('search');
    //   } else {
    //     this.showTabs = true;
    //   }
    // });
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
    placeholder: "Choose Class", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search Class", // label thats displayed in search input,
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
  config4 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose Make", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search Make", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  ngOnInit() {
    window.scrollTo(0, 0);
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    // console.log("in on init")
    // this._activateRouter.queryParams.subscribe(param => {
    //   console.log("in timeline by apple login param",param)
    //   if (param) {
    //     this.userId = param['id'];
    //     console.log("in timeline by apple login",this.userId)
    //     if(this.userId){
    //       let data = {
    //         id:  this.userId ,
    //       };
    //       this.autoLogin(data);
    //     }
    //   }

    // })

    // this.getFavouriteMods();
    // this.getBadges();
    this.getUserDetail();
    this.getallNormalPosts();
    this.getCategories("group");

    this.getMygroups();
    this.getAllAdvertisements();
    // this.getDeafultPinnedPost();
    this.getWelcomeContent();
    // this.getFriendsList();
    // this.getJoinedGroupList();
    this.getFollowedCategories();
    // this.getMyMods();
    // this.getDifferentMods();
    // this.getModsFriendsList();
    // this.getMyCreatedGroups();
    // this.getFollowedModsCategories();
  }
  createPollForm() {
    this.pollForm = this.formBuilder.group({
      post: ["", Validators.required],
      isCommentDisabled: ["false"],
      choice1: ["", Validators.required],
      choice2: ["", Validators.required],
      isValidTime: ["", Validators.required],
      choices: this.formBuilder.array([]),
    });
  }
  choices(): FormArray {
    return this.pollForm.get("choices") as FormArray;
  }

  newChoice(): FormGroup {
    return this.formBuilder.group({
      choices: ["", Validators.required],
    });
  }

  addChoice() {
    this.choices().push(this.newChoice());
  }

  removeChoice(empIndex: number) {
    this.choices().controls[empIndex].get("choices").clearValidators();
    this.choices().removeAt(empIndex);
    let array = this.pollForm.value.choices;
    this.pollForm.patchValue({ choices: array.splice(empIndex, 1) });
  }

  openshare(postData, id, type, postSection) {
    let data = {
      postId: id,
      postType: type,
      postData: postData,
      postSection: postSection,
    };
    this._bs.sharedPostData.next(data);
    const modalRef = this.modalService.open(ShareModalComponent);
    modalRef.componentInstance.name = "World";
  }

  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }

  openLikeModal(item: any) {
    console.log("item", item);

    if (item.likes == 0) return;

    localStorage.setItem("type", "");
    localStorage.setItem("postId", "");
    localStorage.setItem("type", item.activityType ? item.activityType : "");
    localStorage.setItem("postId", item.id);
    // let url = '/page/timeline';
    // let urldata = {
    //   type:item.activityType,
    //   postId:item.id
    // }
    // this.router.navigate([url],{ queryParams: urldata});
    const modalRef = this.modalService.open(LikeListingModalComponent);
    modalRef.componentInstance.name = "Link Modal";
  }

  OpenListingOfSharedUsers(item: any) {
    console.log("item", item);

    if (item.totalShare == 0) return;

    localStorage.setItem("type", "");
    localStorage.setItem("postId", "");
    localStorage.setItem("type", item.activityType ? item.activityType : "");
    localStorage.setItem("postId", item.id);
    const modalRef = this.modalService.open(PostSharedWithComponent);
    modalRef.componentInstance.name = "Link Modal";
  }

  getFollowedCategories() {
    let filters = {
      type: "modpost",
      userid: this.credentials.credentials.id,
      sortBy: -1,
    };
    this.pageService.getFollowedCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.followedCategories = response.data;
          // console.log(this.allMakes, "this.allMakes");
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

  getFiltersMake() {
    if (this.rvTypeFilter) {
      let filters = {
        type: this.rvTypeFilter,
        sortBy: "name asc",
      };
      this.pageService.getMainCategories(filters).subscribe(
        (response) => {
          if (response.success) {
            this.MakesFilters = response.data;
            // console.log(this.allMakes, "this.allMakes");
            // this.spinner.hide();
          } else {
            // this.spinner.hide();
          }
        },
        (error) => {
          // this.spinner.hide();
        }
      );
    } else {
      this.MakesFilters = [];
      this.filterModels = [];
    }
  }

  getAllAdvertisements() {
    let data = {
      count: 1000,
    };
    this.pageService.getAllAdvertisements(data).subscribe(
      (response) => {
        if (response.success) {
          this.rightAdvertisements = response.data.filter(
            (x) => x.position == "right"
          );
          this.leftAdvertisements = response.data.filter(
            (x) => x.position == "left"
          );
          this.centerAdvertisements = response.data.filter(
            (x) => x.position == "center"
          );
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

  getDeafultPinnedPost() {
    this.pageService.getDefaultPost("618b9383713c825d5505b1f2").subscribe(
      (response) => {
        if (response.success) {
          this.DefaultPost = response.data;

          // this.spinner.hide();
        } else {
          this.DefaultPost = {};
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  getWelcomeContent() {
    this.pageService
      .getDefaultWelcomeContent("619e19d73000820407ab6146")
      .subscribe(
        (response) => {
          if (response.success) {
            this.wlcomeContent = response.data;
            if (this.wlcomeContent.image.length > 0) {
              this.wlcomeContent["image"] = response.data.image[0][0];
            } else {
              this.wlcomeContent["image"] = "";
            }

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
  //  autoLogin(data) {
  //   console.log("in timeline by apple auto login",data)
  //     this.spinner.show();
  //     this.pageService.autoLogin(data).subscribe(
  //       (res) => {
  //         if (res.success) {
  //           this._bs.setUserData(res.data);
  //           this.user = res.data;
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
  //   }
  getGroupPost() {
    this.pageService.getCommonPosts("groupposts").subscribe(
      (response) => {
        if (response.success) {
          this.groupPosts = response.data.map((cat) => {
            return {
              id: cat.id,
              postImage: cat.image,
              image: cat.image,
              postTitle: cat.name,
              likes: cat.likesTotal,
              groupName: cat.groups.name,
              groupId: cat.groups.id,
              slug: cat.groups.slug,
              whomSharedByName: cat.whomSharedByName,
              whomSharedById: cat.whomSharedById,
              sharedWithName: cat.sharedWithName,
              sharedWithId: cat.sharedWithId,
              adsPosition: cat.position,
              adsDescription: cat.description,
              adsImage: cat.image,
              isCommentDisabled: cat.isCommentDisabled,
              adsRedirectUrl: cat.redirectURL,
              sharedName: cat.sharedName,
              originalAddedBy: cat.originalAddedBy,
              totalShare: cat.totalShare,
              activityType: "groupPost",
              comments: cat.commentTotal,
              likestatus: cat.likestatus,
              userDetail: cat.userDetails,
              addedByName: cat.userDetails,
              userFullName: cat.userDetails ? cat.userDetails.fullName : null,
              userImage: cat.userDetails ? cat.userDetails.image : null,
              fbId: cat.userDetails ? cat.userDetails.fbId : null,
              gId: cat.userDetails ? cat.userDetails.gId : null,
              userId: cat.userDetails ? cat.userDetails._id : null,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              showMore: false,
              modDetailSharedata:
                cat.activityType != "advertisement"
                  ? this.setShareData(cat)
                  : {},
            };
          });

          setTimeout(function () {
            a2a.init_all();
          }, 100);
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
  showModsSection() {
    this.showModPost = true;
  }

  showLikedModsSection() {
    this.showLikedModPost = true;
  }
  getSavedPosts() {
    this.pageService.getCommonPosts("likedposts").subscribe(
      (response) => {
        if (response.success) {
          this.posts = [];
          // this.friendsPosts = response.data;
          this.posts = response.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              image: cat.image,
              post: cat.post,
              postType: cat.postType,
              addedByName: cat.addedBy ? cat.addedBy : "",
              addedByImage: cat.addedBy ? cat.addedBy.image : "",
              status: cat.status,
              likes: cat.likesTotal,
              comments: cat.commentTotal,
              likestatus: cat.likestatus,
              isCommentDisabled: cat.isCommentDisabled,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              whomSharedByName: cat.whomSharedByName,
              whomSharedById: cat.whomSharedById,
              originalAddedBy: cat.originalAddedBy,
              sharedName: cat.sharedName,
              isValidTime: this.sharedService.secondsToDhms(cat.isValidTime),
              choice1: cat.choice1,
              isVoted: cat.isVoted,
              isVotedValue: cat.isVotedValue ? cat.isVotedValue.toString() : "",
              choice2: cat.choice2,
              choice3: cat.choice3,
              choice4: cat.choice4,
              totalChoice1: cat.totalChoice1,
              totalChoice2: cat.totalChoice2,
              totalChoice3: cat.totalChoice3,
              totalChoice4: cat.totalChoice4,
              sharedWithName: cat.sharedWithName,
              sharedWithId: cat.sharedWithId,
              updatedAt: cat.updatedAt,
              activityType: "normalPost",
              modDetailSharedata:
                cat.activityType != "advertisement"
                  ? this.setShareData(cat)
                  : {},
            };
          });
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

  getFriendsPost() {
    this.pageService.getCommonPosts("friendsposts").subscribe(
      (response) => {
        if (response.success) {
          this.friendposts = [];
          // this.friendsPosts = response.data;
          this.friendposts = response.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              image: cat.image,
              post: cat.post,
              postType: cat.postType,
              addedByName: cat.addedBy ? cat.addedBy : "",
              addedByImage: cat.addedBy ? cat.addedBy.image : "",
              status: cat.status,
              likes: cat.likesTotal,
              totalShare: cat.totalShare,
              comments: cat.commentTotal,
              likestatus: cat.likestatus,
              whomSharedByName: cat.whomSharedByName,
              whomSharedById: cat.whomSharedById,
              sharedName: cat.sharedName,
              isCommentDisabled: cat.isCommentDisabled,
              originalAddedBy: cat.originalAddedBy,
              sharedWithName: cat.sharedWithName,
              sharedWithId: cat.sharedWithId,
              adsPosition: cat.position,
              adsDescription: cat.description,
              adsImage: cat.image,
              isValidTime: this.sharedService.secondsToDhms(cat.isValidTime),
              choice1: cat.choice1,
              isVotedValue: cat.isVotedValue ? cat.isVotedValue.toString() : "",
              isVoted: cat.isVoted,
              choice2: cat.choice2,
              choice3: cat.choice3,
              choice4: cat.choice4,
              totalChoice1: cat.totalChoice1,
              totalChoice2: cat.totalChoice2,
              totalChoice3: cat.totalChoice3,
              totalChoice4: cat.totalChoice4,
              adsRedirectUrl: cat.redirectURL,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              // activityType:"normalPost",
              activityType: cat.activityType,
              showMore: false,
              modDetailSharedata:
                cat.activityType != "advertisement"
                  ? this.setShareData(cat)
                  : {},
            };
          });

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

  getFilterModels() {
    // this.spinner.show();
    if (this.rvTypeFilter && this.makeFilter) {
      let filters = {
        type: this.rvTypeFilter,
        categoryId: this.makeFilter,
      };
      this.pageService.getSubCategories(filters).subscribe(
        (response) => {
          // console.log('res...',response);
          if (response.success) {
            this.filterModels = response.data;
            // this.spinner.hide();
          } else {
            // this.spinner.hide();
          }
        },
        (error) => {
          // this.spinner.hide();
        }
      );
    } else {
      this.filterModels = [];
      this.modelValue = "";
    }
  }

  getFriendsList() {
    let filters = {
      userid: this.credentials.credentials.id,
    };
    this.pageService.getFriendsList(filters).subscribe(
      (response) => {
        console.log("res...", response);
        if (response.success) {
          this.firendsList = response.data;
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

  getJoinedGroupList() {
    // let filters = {
    //   userid: this.credentials.credentials.id
    // };
    this.pageService.getJoinedGroups().subscribe(
      (response) => {
        console.log("res...", response);
        if (response.success) {
          this.joinedGroups = response.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              image: cat.groupDetails ? cat.groupDetails.image : [],
              name: cat.groupname,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(
                  cat.groupDetails ? cat.groupDetails.updatedAt : cat.updatedAt
                ).getTime(),
                this.today.getTime()
              ),
              groupId: cat.groupId,
              // createdAt: cat.groupDetails.createdAt,
              // updatedAt: cat.groupDetails.updatedAt,
            };
          });
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

  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.
  //   console.log('changes...',changes);
  //   if(changes.changeFavourite){
  //     this.getFavouriteMods();
  //   }
  // }

  openModal() {
    this.createPostModal = true;
  }

  searchValue() {
    this.searchKeyword = this.search;
    this.rvTypeFilter = this.rvTypeFilter;
    this.makeFilter = this.makeFilter;
    this.modelValue = this.modelValue;
    this.size = this.size;
    this.modCategoryValue = this.modCategoryValue;
    this.yearValue = this.yearValue;

    this.modfilters = {
      search: this.search,
      rvTypeFilter: this.rvTypeFilter,
      makeFilter: this.makeFilter,
      modelValue: this.modelValue,
      size: this.size,
      modCategoryValue: this.modCategoryValue,
      yearValue: this.yearValue,
    };
  }

  createForm() {
    this.groupForm = this.formBuilder.group({
      image: [""],
      categoryId: ["", Validators.required],
      tags: [""],
      description: ["", Validators.required],
      name: ["", Validators.required],
      // password: [""],
      // isPrivate: [false],
    });
  }

  route(key, value) {
    if (key == "myFriends") {
      if (value == "all") {
        this.router.navigate(["friend-listing"]);
      } else {
        this.router.navigate(["friend-profile"], {
          queryParams: { id: value },
        });
      }
    }
    if (key == "savedMods") {
      if (value == "all") {
        this.showFavMods = true;
        this.router.navigate(["favorite-mods"]);
      } else {
        this.router.navigate(["mods", value]);
      }
    }
    if (key == "followedCategories") {
      if (value == "all") {
        this.router.navigate(["followed-interests"]);
      } else {
        this.router.navigate(["mod-type"], { queryParams: { id: value } });
      }
    }
    if (key == "myMods") {
      if (value == "all") {
        this.router.navigate(["/dashboard/profile"]);
      } else {
        this.router.navigate(["mods", value]);
        // this.router.navigate(["mod-details"], {
        //   queryParams: { id: value, uid: this.credentials.credentials.id },
        // });
      }
    }
    if (key == "myModsFriends") {
      if (value == "all") {
        this.router.navigate(["followed-mod-friends"]);
      } else {
        this.router.navigate(["friend-profile"], {
          queryParams: { id: value },
        });
      }
    }
  }

  getModsFriendsList() {
    let filters = {
      userid: this.credentials.credentials.id,
    };
    this.sharedService.get("followed/friendlist").subscribe(
      (response: any) => {
        console.log("res...", response);
        if (response.success) {
          this.modFirendsList = response.data;
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

  getParam(p) {
    return this._activateRouter.snapshot.queryParamMap.get(p) || "";
  }

  seeModsBtn() {
    // document.getElementById('pills-tabContents').click()
    // this.seeMod = true;
    this.seeMod = false;
    this.talkMod = false;
    this.hideDefault = true;

    this.showMods = true;
    this.hidesDefault = true;
    if (this._bs.Tabs.value != "seeMods") this._bs.Tabs.next("seeMods");
    this.getCategories("size");
    this.getModCategories("modpost");
    this.getMakes();
    // this.getFiltersMake();
    // this.getFilterModels();
    this.getFavouriteMods();
    this.getFriendsList();
  }

  shareModBtn() {
    this.seeMod = false;
    this.talkMod = false;
    console.log("post data..", this.post);
    if (this.post) {
      this.open(this.post);
      this.isShown = 1;
      this._bs.Tabs.next("seeMods");
    }
  }

  talkModBtn() {
    this.seeMod = false;
    this.talkMod = true;
    this.hideDefault = false;
    this.hidesDefault = true;
    this.showMods = false;
  }

  createModForm() {
    this.modPostForm = this.formBuilder.group({
      // image: [""],
      beforeImages: [""],
      afterImages: [""],
      make: ["", Validators.required],
      model: [""],
      series: [""],
      name: ["", Validators.required],
      modCategory: ["", Validators.required],
      modSubCategory: ["", Validators.required],
      size: ["", Validators.required],
      youtubeLink: [""],
      documents: [""],
      howLongTookMe: ["", Validators.required],
      whatIDid: ["", Validators.required],
      rvType: ["", Validators.required],
      year: ["", Validators.required],
      affiliateLink: this.formBuilder.array([this.createAffiliateForm()]),
    });
    // this.addAffiliateLink();
  }
  delete(i) {
    this.affiliateLink = this.modPostForm.get("affiliateLink") as FormArray;

    this.affiliateLink.controls[i].get("supplierName").clearValidators();
    this.affiliateLink.controls[i].get("link").clearValidators();
    this.affiliateLink.controls[i].get("productName").clearValidators();
    this.affiliateLink.removeAt(i);
    //  let array = this.modPostForm.value.affiliateLink;
    //  console.log(array.splice(i, 1))
    //   this.modPostForm.patchValue({affiliateLink:array.splice(i, 1)})
  }
  createAffiliateForm(): FormGroup {
    return this.formBuilder.group({
      supplierName: ["", Validators.required],
      // type: ["paid", [Validators.required]],
      link: ["", Validators.required],
      progressBar: ["false"],
      images: [""],
      productName: ["", Validators.required],
      quantity: ["", Validators.required],
    });
  }
  posts: any = [
    // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 17, 18, 19, 20,
  ];
  toggleNext() {
    if (this.isShown >= 3) return;
    this.isShown = this.isShown + 1;
  }
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  toggleBack() {
    if (this.isShown <= 1) return;
    this.isShown = this.isShown - 1;
  }
  toggleShow() {
    this.Shown = !this.Shown;
  }
  get f() {
    return this.groupForm.controls;
  }
  get mf() {
    return this.modPostForm.controls;
  }

  get pf() {
    return this.pollForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(
      this.groupForm.value,
      "groupform",
      this.groupForm.controls,
      "invalid"
    );
    if (!this.groupForm.invalid) {
      let data = this.groupForm.value;
      data["tags"] = this.tagsArray.toString();
      console.log("in if");
      this.pageService.addGroup(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.tagsArray = [];
            this.submitted = false;
            this.groupForm.reset();
            this.modalReference.close();
            this.groupImage = [];
            this.getMygroups();
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

  addAffiliateLink() {
    this.affiliateLink = this.modPostForm.get("affiliateLink") as FormArray;
    // this.affiliateLink.push(this.createAffiliateForm());

    if (this.affiliateLink.length == 0) {
      this.affiliateLink.push(this.createAffiliateForm());
      this.modSubmit = false;
      return;
    } else {
      this.modSubmit = true;

      if (this.modSubmit && !this.modPostForm.get("affiliateLink").invalid) {
        this.affiliateLink.push(this.createAffiliateForm());
        this.modSubmit = false;
      }
      return;
    }
  }

  mod(post) {
    this.modalReference = this.modalService.open(post, { size: "lg" });
    this.getModCategories("modpost");
    this.getCategories("size");
    this.isShown = 1;
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  opens(contents) {
    this.modalReference = this.modalService.open(contents);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  addEmoji(event) {
    console.log(this.message);
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`);
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }
  onFocus() {
    console.log("focus");
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log("onblur");
  }

  openReport(id, key) {
    this.modalReference3 = this.modalService.open(ReportSectionComponent);
    let data = {
      key: key,
      id: id,
    };
    this.modalReference3.componentInstance.reportData = data;
  }
  getUrl(img, detail) {
    let image = "";
    let socialImage = false;
    if (img != undefined && img != "" && img != null) {
      socialImage = this.imageIsOfSocialLogin(img);
    }
    if (
      img &&
      img != undefined &&
      img != "" &&
      img != null &&
      socialImage &&
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
  open(content) {
    this.modalReference2 = this.modalService.open(content);
    this.modalReference2.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    // this.modalReference=this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  private getDismissReason(reason: any): string {
    this.submitted = false;
    this.groupForm.reset();
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  uploadImage(files: FileList) {
    if (files) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
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
      formData.append("modelName", "group");
      let params = new HttpParams().set("?modelName", "group");
      this.imageLoader = true;
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
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }

                this.groupImage = docData;
                this.groupForm.patchValue({ image: this.groupImage });
                this.imageLoader = false;
                this.groupInput.nativeElement.value = "";
              } else {
                window.scrollTo(0, 0);
                this.imageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.imageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.imageLoader = true;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
    // this.fileToUpload = files.item(0);
    // let type: "group";
    // // this.loaderImage =true;
    // this.imageLoader = true;
    // this.pageService.uploadImage(this.fileToUpload, "group").subscribe(
    //   (event: HttpEvent<any>) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         // console.log('Request has been made!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         // console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         this.progress = Math.round((event.loaded / event.total) * 100);
    //         // console.log(`Uploaded! ${this.progress}%`);
    //         break;
    //       case HttpEventType.Response:
    //         // console.log('User successfully created!', event.body);
    //         if (event.body.success) {
    //           this.groupImage = event.body.data.fullpath;
    //           this.groupForm.patchValue({ image: this.groupImage });
    //           this.imageLoader = false;
    //           // this.userForm.patchValue({ image: this.userImage })
    //           this.groupInput.nativeElement.value = "";
    //         } else {
    //           window.scrollTo(0, 0);
    //           this.toastr.error(event.body.error.message, "Error");
    //           this.imageLoader = false;
    //         }
    //         setTimeout(() => {
    //           this.progress = 0;
    //           this.imageLoader = false;
    //         }, 100);
    //     }

    //     // this.imageLoader=false;
    //   },
    //   (err) => {
    //     this.imageLoader = false;
    //     // this.toastr.error('There are some errors, please try again after some time !', 'Error');
    //   }
    // );
  }

  uploadDocument(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadDocLoader = true;

    this.pageService.uploadImage(this.fileToUpload, "modPost").subscribe(
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

            break;
          case HttpEventType.Response:
            console.log(event);
            // console.log('User successfully created!', event.body);
            if (event.body.success) {
              let doc = event.body.data.fullpath;
              this.modPostForm.patchValue({ documents: doc });
              this.uploadDocLoader = false;
              this.modDocInput.nativeElement.value = "";
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(event.body.error.message, "Error");
              this.uploadDocLoader = false;
            }
            setTimeout(() => {
              this.progress = 0;
              this.uploadDocLoader = false;
            }, 100);
        }
        console.log(`Uploaded! ${this.progress}%`);
        console.log(this.uploadDocLoader);
      },
      (err) => {
        this.uploadDocLoader = false;
      }
    );
  }

  uploadPostImage(files: FileList) {
    if (files) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
      if (this.postImage) {
        docData = this.postImage;
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
      formData.append("modelName", "posts");
      let params = new HttpParams().set("?modelName", "posts");
      this.postimageLoader = true;
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
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }

                setTimeout(() => {
                  this.postImage = docData;
                  this.postimageLoader = false;
                  this.postInput.nativeElement.value = "";
                }, 5000);
              } else {
                window.scrollTo(0, 0);
                this.postimageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.postimageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.postimageLoader = true;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
    // this.fileToUpload = files.item(0);
    // let type: "posts";
    // this.postimageLoader = true;
    // this.pageService.uploadImage(this.fileToUpload, "posts").subscribe(
    //   (event: HttpEvent<any>) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         // console.log('Request has been made!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         // console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         this.progress = Math.round((event.loaded / event.total) * 100);
    //         // console.log(`Uploaded! ${this.progress}%`);
    //         break;
    //       case HttpEventType.Response:
    //         if (event.body.success) {
    //           this.postImage = event.body.data.fullpath;
    //           this.postimageLoader = false;
    //           this.postInput.nativeElement.value = "";
    //         } else {
    //           window.scrollTo(0, 0);
    //           this.toastr.error(event.body.error.message, "Error");
    //           this.postimageLoader = false;
    //         }
    //         setTimeout(() => {
    //           this.progress = 0;
    //           this.postimageLoader = false;
    //         }, 100);
    //     }
    //   },
    //   (err) => {
    //     this.postimageLoader = false;
    //   }
    // );
  }
  savePost() {
    if (this.poll == true) {
      this.pollSubmitted = true;
      if (!this.pollForm.invalid) {
        let formData = {
          post: filter.clean(this.pollForm.value.post),
          isCommentDisabled: this.pollForm.value.isCommentDisabled,
          postType: "postPoll",
          choice1: this.pollForm.value.choice1,
          choice2: this.pollForm.value.choice2,
          choice3: this.pollForm["controls"].choices["controls"][0]
            ? this.pollForm["controls"].choices["controls"][0].value.choices
            : "",
          choice4: this.pollForm["controls"].choices["controls"][1]
            ? this.pollForm["controls"].choices["controls"][1].value.choices
            : "",
          isValidTime: this.pollForm.value.isValidTime,
        };
        this.pageService.addPost(formData).subscribe(
          (res: any) => {
            if (res.success) {
              this.pollSubmitted = false;
              this.pollForm.reset();
              this.poll = false;
              this.closePostModal();
              this.getallNormalPosts();
              // this.groupForm.patchValue({ image: this.groupImage })
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.toastr.error(
              "There are some errors, please try again after some time !",
              "Error"
            );
          }
        );
      }
    } else {
      if (this.message == "" && !this.postImage) {
        this.posterr = "Content is required";
        return;
      }

      if (this.message != "") {
        this.spinner.show();
        let data = {
          post: filter.clean(this.message),
          isCommentDisabled: this.isCommentDisabled,
          // post: filter.clean(this.message),
          image: this.postImage,
        };
        this.pageService.addPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.postImage = [];
              this.message = "";
              this.isCommentDisabled = false;
              this.createPostModal = false;
              this.getallNormalPosts();
              // this.groupForm.patchValue({ image: this.groupImage })
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.toastr.error(
              "There are some errors, please try again after some time !",
              "Error"
            );
          }
        );
      }
    }
  }
  closePostModal() {
    this.postImage = [];
    this.message = "";
    this.createPostModal = false;
  }

  slickInit(e) {}

  getFavouriteMods() {
    let filters = {
      userid: this.credentials.credentials.id,
      type: "modPost",
      startDate: "",
      endDate: "",
    };
    this.pageService.getFavouriteMods(filters).subscribe(
      (response) => {
        if (response.success) {
          this.favMods = response.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              slug: cat.postdata ? cat.postdata.slug : "",
              id: cat.postdata ? cat.postdata.id : null,
              description: cat.postdata ? cat.postdata.description : null,
              name: cat.postdata ? cat.postdata.name : null,
              beforeImages: cat.postdata ? cat.postdata.beforeImages : [],
              afterImages: cat.postdata ? cat.postdata.afterImages : [],
              status: cat.postdata ? cat.postdata.status : [],
              time: cat.postdata
                ? this.pageService.timeDiffCalc(
                    new Date(cat.postdata.updatedAt).getTime(),
                    this.today.getTime()
                  )
                : null,
              whomSharedByName: cat.whomSharedByName,
              whomSharedById: cat.whomSharedById,
              originalAddedBy: cat.originalAddedBy,
              sharedName: cat.sharedName,
              sharedWithName: cat.sharedWithName,
              sharedWithId: cat.sharedWithId,
              isCommentDisabled: cat.isCommentDisabled,
              createdAt: cat.postdata ? cat.postdata.createdAt : null,
              updatedAt: cat.postdata ? cat.postdata.updatedAt : null,

              // id: cat.id,
              // description: cat.description,
              // name: cat.name,
              // status: cat.status,
              // time: this.pageService.timeDiffCalc(
              //   new Date(cat.updatedAt).getTime(),
              //   this.today.getTime()
              // ),
              // createdAt: cat.createdAt,
              // updatedAt: cat.updatedAt,
            };
          });
          this.mymodposts = [];
          this.changeFavourite = "";
          this.mymodposts = this.favMods;
          // this.mymodposts = this.favMods.map((cat) => {
          //   return {
          //     slug: cat.postdata ? cat.postdata.slug : "",
          //     id: cat.postdata ? cat.postdata.id : null,
          //     description: cat.postdata ? cat.postdata.description : null,
          //     name: cat.postdata ? cat.postdata.name : null,
          //     beforeImages: cat.postdata ? cat.postdata.beforeImages : [],
          //     afterImages: cat.postdata ? cat.postdata.afterImages : [],
          //     status: cat.postdata ? cat.postdata.status : [],
          //     time: cat.postdata
          //       ? this.pageService.timeDiffCalc(
          //           new Date(cat.postdata.updatedAt).getTime(),
          //           this.today.getTime()
          //         )
          //       : null,
          //     whomSharedByName: cat.whomSharedByName,
          //     whomSharedById: cat.whomSharedById,
          //     originalAddedBy: cat.originalAddedBy,
          //     sharedName: cat.sharedName,
          //     sharedWithName: cat.sharedWithName,
          //     sharedWithId: cat.sharedWithId,
          //     isCommentDisabled: cat.isCommentDisabled,
          //     createdAt: cat.postdata ? cat.postdata.createdAt : null,
          //     updatedAt: cat.postdata ? cat.postdata.updatedAt : null,
          //   };
          // });
          // console.log(  this.modCategories, "this.allMakes");
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

  addClickCount(id) {
    let filters = {
      id: id,
      domain: "desktop",
    };
    this.pageService.addClickCount(filters).subscribe(
      (response) => {
        // if (response.success) {
        //   this.favMods= response.data;
        //   // console.log(  this.modCategories, "this.allMakes");
        //   // this.spinner.hide();
        // } else {
        //   // this.spinner.hide();
        // }
      },
      (error) => {
        this.toastr.error(error);
        // this.spinner.hide();
      }
    );
  }

  getModCategories(type) {
    // this.spinner.show();
    let filters = {
      type: type,
      count: 1000,
      sortBy: -1,
    };
    this.pageService.getMainCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.modCategories = response.data;
          // console.log(  this.modCategories, "this.allMakes");
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

  pollVote(postId, activityType, index) {
    let data = {
      postId: postId,
      postType: activityType,
      choices: this.pollVoting,
    };
    console.log(data);
    this.pageService.addPoll(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
        } else {
          window.scrollTo(0, 0);
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err, "Error");
      }
    );
  }

  calculateWeightage(percent) {
    return ((percent / 100) * 100).toFixed(2);
  }
  replyComment(
    postId,
    commentId: any,
    replyon: any,
    type,
    to_user_id,
    postData: any = {}
  ) {
    let data = {};
    if (replyon == "comment") {
      if (this.replyOnPost == "") {
        return;
      }
      data = {
        postId: postId,
        commenttoUser: to_user_id,
        // comment: this.replyOnPost,
        comment: filter.clean(this.replyOnPost),
        postType: postData ? postData.activityType : type,
      };
    }
    if (replyon == "reply") {
      if (this.replyOnPost2 == "") {
        return;
      }
      data = {
        postId: postId,
        comment: filter.clean(this.replyOnPost2),
        // comment: this.replyOnPost2,
        postType: postData ? postData.activityType : type,
      };
    }

    if (commentId) {
      data["commentId"] = commentId;
    }

    this.loader = true;
    // this.spinner.show()
    this.pageService.addComment(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(to_user_id);
          this.sendNotif(postData.addedByName.id);
          // this.getGroupPosts()
          this.replyOnPost = "";
          this.replyOnPost2 = "";
          this.getComments(
            postId,
            postData ? postData.activityType : type,
            postData
          );
          // if (type == "normalPost") {
          //   this.readmoreLess(this.postIndex, "add");

          //   this.posts[this.postIndex].comments = res.commentdata.count;
          //   // this.getallNormalPosts();
          // }
          // if (type == "friendposts") {
          //   this.readmoreSocialLess(this.postIndex, "add");
          //   this.friendposts[this.postIndex].comments = res.commentdata.count;
          // }
          // if (type == "groupPost") {
          //   this.readmoreLessGroupPost(this.postIndex, "add");
          //   this.groupPosts[this.postIndex].comments = res.commentdata.count;
          //   // this.getallNormalPosts();
          // }
          if (type == "modPost") {
            this.readmoreLess(this.postIndex, "add");
            this.posts[this.postIndex].comments = res.commentdata.count;
            // this.getallNormalPosts();
          }
          this.replyForm = "";

          // this.toastr.success(res.message, "Success");
          // this.getComments(postId)
          // this.groupForm.patchValue({ image: this.groupImage })
        } else {
          window.scrollTo(0, 0);
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
        this.loader = false;
      },
      (err) => {
        // this.spinner.hide();
        this.loader = false;
        this.toastr.error(
          "There are some errors, please try again after some time !",
          "Error"
        );
      }
    );
  }

  removeImage(image) {
    this.groupForm.controls.image.setValue("");
    this.groupImage = "";
    let object = {
      imageName: image,
      modelName: "group",
    };
    this.pageService.deleteImage(object).subscribe(
      (res: any) => {
        if (res.success) {
          this.groupImage = "";
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

  removePostImage(image, index) {
    this.postImage.splice(index, 1);
    // this.groupForm.controls.image.setValue("");
    // this.groupImage = "";
    let object = {
      imageName: image,
      modelName: "posts",
    };
    this.pageService.deleteImage(object).subscribe(
      (res: any) => {
        if (res.success) {
          // this.groupImage = "";
          console.log(res.message, "cfgff");
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

  getCategories(type) {
    let data = {
      type: "categories",
      cat_type: type,
      sortBy: "name asc",
    };
    this.pageService.getCategories(data).subscribe(
      (res: any) => {
        if (res.success) {
          // if (type == "modpost") {
          //   this.modCategories = res.data;
          // }
          if (type == "group") {
            this.categories = res.data;
          }
          if (type == "size") {
            this.difficulties = res.data;
          }

          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
      }
    );
  }
  getallNormalPosts() {
    let data = {
      userid: "",
      afterpost: 5,
    };
    this.isLoading = true;
    // this.spinner.show()
    this.pageService.getAllActivities(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.posts = [];
          this.posts = res.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );

            return {
              id: cat.id,
              image: cat.image,
              post: cat.post,
              addedByName: cat.addedBy ? cat.addedBy : "",
              addedByImage: cat.addedBy ? cat.addedBy.image : "",
              status: cat.status,
              likes: cat.likesTotal,
              totalShare: cat.totalShare,
              comments: cat.commentTotal,
              likestatus: cat.likestatus,
              registeredRV: cat.registeredRV,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              isCommentDisabled: cat.isCommentDisabled,
              createdAt: cat.createdAt,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              series: cat.series,
              make: cat.make,
              model: cat.model,
              updatedAt: cat.updatedAt,
              adsPosition: cat.position,
              adsDescription: cat.description,
              adsImage: cat.image,
              adsRedirectUrl: cat.redirectURL,
              postType: cat.postType,
              activityType: cat.activityType,
              modCategory: cat.modCategory.name,
              slug: cat.slug,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              modName: cat.name,
              size: cat.size.name,
              isValidTime: this.sharedService.secondsToDhms(cat.isValidTime),
              choice1: cat.choice1,
              isVotedValue: cat.isVotedValue ? cat.isVotedValue.toString() : "",
              isVoted: cat.isVoted,
              choice2: cat.choice2,
              choice3: cat.choice3,
              choice4: cat.choice4,
              totalChoice1: cat.totalChoice1,
              totalChoice2: cat.totalChoice2,
              totalChoice3: cat.totalChoice3,
              totalChoice4: cat.totalChoice4,
              whomSharedByName: cat.whomSharedByName,
              whomSharedById: cat.whomSharedById,
              sharedWithName: cat.sharedWithName,
              sharedWithId: cat.sharedWithId,
              sharedName: cat.sharedName,
              originalAddedBy: cat.originalAddedBy,
              modDetailSharedata:
                cat.activityType != "advertisement"
                  ? this.setShareData(cat)
                  : {},
            };
          });
          console.log(" this.posts", this.posts);
          this.timelinemodCount.emit(res.total);
          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      (err) => {
        this.isLoading = false;
        // this.spinner.hide();
      }
    );
  }

  copyLink(obj) {
    console.log("obj", obj);
    this.Copylink = this._baseUrl + "mods/" + obj.slug;
    let value = this.Copylink;
    navigator.clipboard.writeText(value);
    // this.toastr.success("Copied URL to clipboard!");
    // alert("Copied URL to clipboard!");
    this.openalertModal();
    this.Onshare(obj, "copyClick");
  }
  openalertModal() {
    this.viewModal = true;
  }

  Onshare(modData, shareType) {
    let data = {
      shareType: shareType,
      postType: "modPost",
      postID: modData.id,
    };
    this.sharedService.Onshare(data).subscribe((res: any) => {
      if (res.success) {
        console.log("copy link response", res);
      }
    });
  }
  getMyActivities() {
    // let data={
    //   userid:this.user.id,
    //   afterpost:5
    // }
    this.posts = [];
    this.sharedService.get("getmyActivity").subscribe(
      (res: any) => {
        if (res.success) {
          this.posts = res.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              image: cat.image,
              slug: cat.slug,
              post: cat.activityType == "groupPost" ? cat.name : cat.post,
              postType: cat.postType,
              addedByName: cat.addedBy ? cat.addedBy : "",
              addedByImage: cat.addedBy ? cat.addedBy.image : "",
              status: cat.status,
              likes: cat.likesTotal,
              totalShare: cat.totalShare,
              adsPosition: cat.position,
              registeredRV: cat.registeredRV,
              adsDescription: cat.description,
              isCommentDisabled: cat.isCommentDisabled,
              adsImage: cat.image,
              adsRedirectUrl: cat.redirectURL,
              comments: cat.commentTotal,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              series: cat.series,
              make: cat.make,
              model: cat.model,
              likestatus: cat.likestatus,
              isValidTime: this.sharedService.secondsToDhms(cat.isValidTime),
              choice1: cat.choice1,
              isVotedValue: cat.isVotedValue ? cat.isVotedValue.toString() : "",
              isVoted: cat.isVoted,
              choice2: cat.choice2,
              choice3: cat.choice3,
              choice4: cat.choice4,
              totalChoice1: cat.totalChoice1,
              totalChoice2: cat.totalChoice2,
              totalChoice3: cat.totalChoice3,
              totalChoice4: cat.totalChoice4,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              isSharedId: cat.isSharedId,
              modCategory: cat.modCategory.name,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              whomSharedByName: cat.whomSharedByName,
              whomSharedById: cat.whomSharedById,
              sharedName: cat.sharedName,
              originalAddedBy: cat.originalAddedBy,
              sharedWithName: cat.sharedWithName,
              sharedWithId: cat.sharedWithId,
              modName: cat.name,
              activityType: cat.activityType,
              showMore: false,
              modDetailSharedata:
                cat.activityType != "advertisement"
                  ? this.setShareData(cat)
                  : {},
            };
          });
          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
      }
    );
  }
  deleteModPost(id, index, postType) {
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
              // this.posts.splice(index,1)
              if (postType == "allActivity") {
                this.posts.splice(index, 1);
                // this.getallNormalPosts();
              }
              if (postType == "friendposts") {
                this.friendposts.splice(index, 1);
                // this.getFriendsPost()
              }
              if (postType == "groupPost") {
                this.groupPosts.splice(index, 1);
                // this.getGroupPost()
              }
              if (postType == "myPost") {
                this.posts.splice(index, 1);
                // this.getMyActivities()
              }
              if (postType == "savedPosts") {
                this.posts.splice(index, 1);
                // this.getSavedPosts()
              }
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
  deleteGroupPost(id, index, postType) {
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
        this.pageService.deletePost(data).subscribe(
          (res: any) => {
            if (res.success) {
              // this.posts.splice(index,1)
              if (postType == "allActivity") {
                this.posts.splice(index, 1);
                // this.getallNormalPosts();
              }
              if (postType == "friendposts") {
                this.friendposts.splice(index, 1);
                // this.getFriendsPost()
              }
              if (postType == "groupPost") {
                this.groupPosts.splice(index, 1);
                // this.getGroupPost()
              }
              if (postType == "myPost") {
                this.posts.splice(index, 1);
                // this.getMyActivities()
              }
              if (postType == "savedPosts") {
                this.posts.splice(index, 1);
                // this.getSavedPosts()
              }
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
  getFollowedModsCategories() {
    // this.pageService.getFollowCategoriesMods().subscribe(
    let filt = this.followfilters;

    this.pageService.getMyMods(filt).subscribe(
      (res: any) => {
        if (res.success) {
          const allMods = res.data;

          this.microModes = allMods.filter(
            (x) => x.size == "617117d45dc9eb47e09a2459"
          );
          this.microModes = this.microModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              make: cat.makedetails,
              series: cat.seriesdetails,
              model: cat.model,
              beforeImages: cat.beforeImages ? cat.beforeImages : [],
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBy,
              isCommentDisabled: cat.isCommentDisabled,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              slug: cat.slug,
              category: cat.modCategorydetails,
            };
          });
          this.miniModes = allMods.filter(
            (x) => x.size == "6171199578121d51ac58f30f"
          );
          this.miniModes = this.miniModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages ? cat.beforeImages : [],
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              make: cat.makedetails,
              series: cat.seriesdetails,
              model: cat.model,
              isCommentDisabled: cat.isCommentDisabled,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBydetails,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              category: cat.modCategorydetails,
              slug: cat.slug,
            };
          });

          this.massiveModes = allMods.filter(
            (x) => x.size == "61714f23fc2f548d335f5933"
          );
          // console.log(this.massiveModes)
          this.massiveModes = this.massiveModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages ? cat.beforeImages : [],
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBydetails,
              isFavourite: cat.isFavourite,
              isCommentDisabled: cat.isCommentDisabled,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              category: cat.modCategorydetails,
              slug: cat.slug,
            };
          });

          this.megaModes = allMods.filter(
            (x) => x.size == "61714f0afc2f548d335f5932"
          );
          this.megaModes = this.megaModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages ? cat.beforeImages : [],
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              make: cat.makedetails,
              series: cat.seriesdetails,
              model: cat.model,
              isCommentDisabled: cat.isCommentDisabled,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBydetails,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              category: cat.modCategorydetails,
              slug: cat.slug,
            };
          });

          this.mediumModes = allMods.filter(
            (x) => x.size == "61714eeefc2f548d335f5931"
          );
          this.mediumModes = this.mediumModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages ? cat.beforeImages : [],
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              make: cat.makedetails,
              series: cat.seriesdetails,
              model: cat.model,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBydetails,
              isCommentDisabled: cat.isCommentDisabled,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              category: cat.modCategorydetails,
              slug: cat.slug,
            };
          });
          console.log(this.miniModes, "this.miniModes");
          // this.myModes = res.data.map((cat) => {
          //   // console.log(
          //   //   new Date(cat.updatedAt).getTime(),
          //   //   this.today.getTime()
          //   // );
          //   return {
          //     id: cat.id,
          //     description: cat.description,
          //     name: cat.name,
          //     beforeImages:cat.beforeImages,
          //     afterImages:cat.afterImages,
          //     status: cat.status,
          //     time: this.pageService.timeDiffCalc(
          //       new Date(cat.updatedAt).getTime(),
          //       this.today.getTime()
          //     ),
          //     createdAt: cat.createdAt,
          //     updatedAt: cat.updatedAt,
          //   };
          // });

          // this.pageService.setModData(this.myModes)
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
  deleteComment(
    commentId,
    index1,
    index2: any = "",
    index3: any = "",
    type,
    activityType,
    postdata
  ) {
    let object = {
      id: commentId,
      postId: postdata.id,
      postType: postdata.activityType,
    };
    this.sharedService.deleteComment(object).subscribe(
      (res: any) => {
        if (res.success) {
          if (type == "comment") {
            this.allComments.splice(index1, 1);
          }
          if (type == "reply") {
            this.allComments[index1].reply.splice(index2, 1);
          }
          if (type == "replyonreply") {
            this.allComments[index1].reply[index2].reply.splice(index3, 1);
          }
          // if (activityType == "normalPost") {
          //   this.readmoreLess(this.postIndex, "add");
          //   this.posts[this.postIndex].comments = res.commentTotal;
          // }
          // if (activityType == "friendposts") {
          //   this.readmoreSocialLess(this.postIndex, "add");
          //   this.friendposts[this.postIndex].comments = res.commentTotal;
          // }
          // if (activityType == "groupPost") {
          //   this.readmoreLessGroupPost(this.postIndex, "add");
          //   if (this.groupPosts.length > this.postIndex) {
          //     this.groupPosts[this.postIndex].comments = res.commentTotal;
          //   } else {
          //     this.posts[this.postIndex].comments = res.commentTotal;
          //   }

          //   // this.getallNormalPosts();
          // }
          if (activityType == "modPost") {
            this.readmoreLess(this.postIndex, "add");
            this.posts[this.postIndex].comments = res.commentTotal;
            // this.getallNormalPosts();
          }
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
  }
  deletePost(postId, index, postType) {
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

        let object = {
          id: postId,
        };
        this.pageService.deleteNormalPost(object).subscribe(
          (res: any) => {
            if (res.success) {
              this.toastr.success(res.message, "Success");
              // if(index){
              //   this.posts=this.posts.splice(index,1)
              // }
              if (postType == "allActivity") {
                this.posts.splice(index, 1);
                // this.getallNormalPosts();
              }
              if (postType == "friendposts") {
                this.friendposts.splice(index, 1);
                // this.getFriendsPost()
              }
              if (postType == "groupPost") {
                this.groupPosts.splice(index, 1);
                // this.getGroupPost()
              }
              if (postType == "myPost") {
                this.posts.splice(index, 1);
                // this.getMyActivities()
              }
              if (postType == "savedPosts") {
                this.posts.splice(index, 1);
                // this.getSavedPosts()
              }

              // this.getallNormalPosts();
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
      // this.toastr.success('Registered Successfully. Please verify your email!');
    });
  }
  unsharePost(shareId, index, postType) {
    Swal.fire({
      title: "Are you sure you want to unshare this post?",
      // html: "<b>Next Step:</b> Verify Your Email. <br> We’ve sent you an email. Click the link in the email to continue setting up your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true;

        let object = {
          id: shareId,
        };
        this.pageService.unsharePost(object).subscribe(
          (res: any) => {
            if (res.success) {
              this.toastr.success(res.message, "Success");
              // if(index){
              //   this.posts=this.posts.splice(index,1)
              // }
              if (postType == "allActivity") {
                console.log("1");
                this.posts.splice(index, 1);
                // this.getallNormalPosts();
              }
              if (postType == "friendposts") {
                console.log("2");
                this.friendposts.splice(index, 1);
                // this.getFriendsPost()
              }
              if (postType == "groupPost") {
                console.log("3");
                this.groupPosts.splice(index, 1);
                // this.getGroupPost()
              }
              if (postType == "myPost") {
                console.log("4");
                this.posts.splice(index, 1);
                // this.getMyActivities()
              }
              if (postType == "savedPosts") {
                console.log("5");
                this.posts.splice(index, 1);
                // this.getSavedPosts()
              }

              // this.getallNormalPosts();
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
      // this.toastr.success('Registered Successfully. Please verify your email!');
    });
  }

  getMygroups() {
    this.mygroups = [];
    // this.spinner.show();
    this.pageService.getMyGroups().subscribe(
      (res: any) => {
        if (res.success) {
          if (res.data.length > 0) {
            this.mygroups = res.data.map((cat) => {
              // console.log(
              //   new Date(cat.updatedAt).getTime(),
              //   this.today.getTime()
              // );
              return {
                id: cat.id,
                slug: cat.slug,
                image: cat.image,
                name: cat.name,
                status: cat.status,
                time: this.pageService.timeDiffCalc(
                  new Date(cat.updatedAt).getTime(),
                  this.today.getTime()
                ),
                createdAt: cat.createdAt,
                updatedAt: cat.updatedAt,
              };
            });
          }

          this.selectedX = this.mygroups;
          this.pageService.setGroupData(this.mygroups);
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
  openEditSocialPost(postDetail, tab) {
    const modalRef = this.modalService.open(EditSocialPostComponent);
    modalRef.componentInstance.name = "edit-social-modal";
    modalRef.componentInstance.postId = postDetail.id;
    modalRef.componentInstance.postType = "normalPost";
    modalRef.componentInstance.postFromTab = tab;
  }
  getMyCreatedGroups() {
    let filt = {
      userId: this.credentials.credentials.id,
    };
    this.myCreatedGroups = [];
    // this.spinner.show();
    this.pageService.getMyCreatedGroups(filt).subscribe(
      (res: any) => {
        if (res.success) {
          this.myCreatedGroups = res.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              image: cat.image,
              name: cat.name,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
            };
          });
          this.selectedX = this.mygroups;

          this.pageService.setGroupData(this.mygroups);
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

  likePost(postId, type, index, user_id, activityType) {
    let data = {
      postId: postId,
      likeBy: this.user.id,
      postType: activityType,
    };
    // this.spinner.show();
    this.pageService.addLike(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(user_id);
          if (type == "friendposts") {
            this.friendposts[index].likes = res.data.count;
            this.friendposts[index].likestatus = res.data.likestatus;
          }
          if (type == "myActivity") {
            this.posts[index].likes = res.data.count;
            this.posts[index].likestatus = res.data.likestatus;
          }
          if (type == "normalPost") {
            this.posts[index].likes = res.data.count;
            this.posts[index].likestatus = res.data.likestatus;

            // this.getallNormalPosts();
          }
          if (type == "modPost") {
            this.posts[index].likes = res.data.count;
            this.posts[index].likestatus = res.data.likestatus;
            // this.getallNormalPosts();
          }
          if (type == "groupPost") {
            this.groupPosts[index].likes = res.data.count;
            this.groupPosts[index].likestatus = res.data.likestatus;
            // this.getGroupPost();
          }
        } else {
          window.scrollTo(0, 0);
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
        this.toastr.error(
          "There are some errors, please try again after some time !",
          "Error"
        );
      }
    );
  }
  likeActivityPost(postId, type, index) {
    let data = {
      postId: postId,
      likeBy: this.user.id,
      postType: type,
    };
    // this.spinner.show();
    this.pageService.addLike(data).subscribe(
      (res: any) => {
        if (res.success) {
          if (type == "normalPost") {
            this.posts[index].likes = res.data.count;
            this.posts[index].likestatus = res.data.likestatus;
            // this.getallNormalPosts();
          }
          if (type == "modPost") {
            this.posts[index].likes = res.data.count;
            this.posts[index].likestatus = res.data.likestatus;
            // this.getallNormalPosts();
          }
          if (type == "groupPost") {
            this.posts[index].likes = res.data.count;
            this.posts[index].likestatus = res.data.likestatus;
            // this.getGroupPost();
          }
        } else {
          window.scrollTo(0, 0);
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
        this.toastr.error(
          "There are some errors, please try again after some time !",
          "Error"
        );
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
  addLike(postId) {
    let data = {
      postId: postId,
      likeBy: this.user.id,
      postType: "groupPost",
    };
    // this.spinner.show();
    this.pageService.addLike(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.getGroupPost();
          // this.getGroupPosts();
          // this.toastr.success(res.message, "Success");
          // this.groupForm.patchValue({ image: this.groupImage })
        } else {
          window.scrollTo(0, 0);
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
        this.toastr.error(
          "There are some errors, please try again after some time !",
          "Error"
        );
      }
    );
  }

  selectedRVType(data) {
    this.selectedRvType = data.value.description;
    this.rvType = data.value.detail.value;
    if (this.rvType == "wanna-be") {
      this.modPostForm.patchValue({
        model: {
          id: null,
          description: "I'm a Wannabe",
        },
        make: {
          id: null,
          description: "I'm a Wannabe",
        },
        year: "I'm a Wannabe",
      });
      this.selectedmake = "I'm a Wannabe";
      this.selectedmodel = "I'm a Wannabe";
      this.modPostForm.get("make").disable();
      this.modPostForm.get("model").disable();
      this.modPostForm.get("year").disable();
    } else {
      this.modPostForm.get("make").enable();
      this.modPostForm.get("model").enable();
      this.modPostForm.get("year").enable();
    }

    this.getMakeCategories();
  }
  selectedMake(data) {
    console.log(data, "selected make");
    this.selectedmake = data.value.description;
    console.log(this.selectedmake, " this.selectedmake");
    if (data.value.description == "I'm a Wannabe") {
      this.modPostForm.patchValue({
        model: {
          id: null,
          description: "I'm a Wannabe",
        },
        rvType: {
          description: "I'm a Wannabe",
          detail: { value: "wanna-be", key: "I'm a Wannabe" },
        },

        year: "I'm a Wannabe",
      });
      this.selectedRvType = "I'm a Wannabe";
      this.selectedmodel = "I'm a Wannabe";
      this.modPostForm.get("rvType").disable();
      this.modPostForm.get("model").disable();
      this.modPostForm.get("year").disable();
    } else {
      this.modPostForm.get("rvType").enable();
      this.modPostForm.get("model").enable();
      this.modPostForm.get("year").enable();
    }
    this.categoryId = data.value.detail.id;
    this.getModelCategories();
  }
  selectedModel(data) {
    console.log(data, "selected model");
    this.selectedmodel = data.value.description;
    console.log(this.selectedmodel, " this.selectedmodel");
    if (data.value.detail.name == "I'm a Wannabe") {
      this.modPostForm.patchValue({
        make: {
          id: null,
          description: "I'm a Wannabe",
        },
        rvType: {
          description: "I'm a Wannabe",
          detail: { value: "wanna-be", key: "I'm a Wannabe" },
        },

        year: "I'm a Wannabe",
      });
      this.selectedRvType = "I'm a Wannabe";
      this.selectedmake = "I'm a Wannabe";
      this.modPostForm.get("rvType").disable();
      this.modPostForm.get("make").disable();
      this.modPostForm.get("year").disable();
    } else {
      this.modPostForm.get("rvType").enable();
      this.modPostForm.get("make").enable();
      this.modPostForm.get("year").enable();
    }
  }
  getYears() {
    // for (let i = this.year - 25; i < this.year + 1; i++) {
    for (let i = this.year; i >= 1980; i--) {
      // console.log(i);
      this.years.push(i);
    }
    // this.years.push("I'm a Wannabe");
  }
  addComment(postId, commentId: any, type, to_user_id, postData: any = {}) {
    if (this.commentOnPost != "") {
      let data = {
        postId: postId,
        // comment: this.commentOnPost,
        comment: filter.clean(this.commentOnPost),
        postType: postData ? postData.activityType : type,
      };
      if (commentId && commentId != null) {
        data["commentId"] = commentId;
      }
      // this.spinner.show()
      this.pageService.addComment(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.sendNotif(to_user_id);
            this.commentOnPost = "";
            // this.toastr.success(res.message, "Success");
            this.getComments(
              postId,
              postData ? postData.activityType : type,
              postData
            );
            // if (type == "normalPost") {
            //   this.readmoreLess(this.postIndex, "add");
            //   this.posts[this.postIndex].comments = res.commentdata.count;
            // }
            // if (type == "friendposts") {
            //   this.readmoreSocialLess(this.postIndex, "add");
            //   this.friendposts[this.postIndex].comments = res.commentdata.count;
            // }
            // if (type == "groupPost") {
            //   this.readmoreLessGroupPost(this.postIndex, "add");
            //   this.groupPosts[this.postIndex].comments = res.commentdata.count;
            //   // this.getallNormalPosts();
            // }
            if (type == "modPost") {
              this.readmoreLess(this.postIndex, "add");
              this.posts[this.postIndex].comments = res.commentdata.count;
              // this.getallNormalPosts();
            }
          } else {
            window.scrollTo(0, 0);
            this.toastr.error(res.error.message, "Error");
          }
          // this.spinner.hide();
        },
        (err) => {
          // this.spinner.hide();
          this.toastr.error(
            "There are some errors, please try again after some time !",
            "Error"
          );
        }
      );
    }
  }
  readmoreLess(i, status = "") {
    if (this.postIndex != i) this.allComments = [];
    this.postIndex = i;
    // this.getComments(postId)
    console.log(this.postIndex, "this.postIndex", i);
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
  readmoreSocialLess(i, status = "") {
    if (this.postIndex != i) this.allComments = [];
    this.postIndex = i;
    // this.getComments(postId)
    for (let j = 0; j < this.friendposts.length; j++) {
      if (i != j) {
        this.friendposts[j].showMore = false;
      } else {
        this.friendposts[i].showMore = !this.friendposts[i].showMore;
      }
    }
    if (status == "add") {
      this.posts[i].showMore = true;
      this.friendposts[i].showMore = true;
    }
  }

  readmoreLessGroupPost(i, status = "") {
    if (this.postIndex != i) this.allComments = [];
    this.postIndex = i;
    // this.getComments(postId)
    console.log(this.postIndex, "this.postIndex", i);
    for (let j = 0; j < this.groupPosts.length; j++) {
      if (i != j) {
        this.groupPosts[j].showMore = false;
      } else {
        this.groupPosts[i].showMore = !this.groupPosts[i].showMore;
      }
    }
    if (status == "add") {
      if (this.groupPosts.length > i) {
        this.groupPosts[i].showMore = true;
      }
    }
  }
  replyClick(p: any) {
    if (p == this.replyForm) {
      this.replyForm = 0;
    } else {
      this.replyForm = p;
    }
  }
  getComments(postId, type, postData) {
    console.log(type);
    // if (postData && postData.isCommentDisabled) {
    //   return
    // }
    // this.allComments = [];
    let data = {
      postId: postId,
      // id : postId,
      type: type,
    };

    this.loader = true;

    this.pageService.getComments(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.allComments = res.data.map((cat) => {
            return {
              id: cat.id,
              // postImage: cat.image,
              // postTitle: cat.name,
              // likes: cat.likes,
              // likestatus: cat.likestatus,
              comment: cat.comment,
              userFullName: cat.addedBy.fullName,
              userImage: cat.addedBy.image,
              userId: cat.addedBy.id,
              slug: cat.addedBy.slug,
              fbId: cat.addedBy.fbId,
              gId: cat.addedBy.gId,
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
                        commentId: cat2.commentId,
                        slug: cat2.addedBy.slug,
                        userFullName: cat2.addedBy.fullName,
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
                        reply:
                          cat2.reply && cat2.reply.length > 0
                            ? cat2.reply.map((cat3) => {
                                return {
                                  id: cat3.id,
                                  comment: cat3.comment,
                                  commentId: cat3.commentId,
                                  slug: cat3.addedBy.slug,
                                  userFullName: cat3.addedBy.fullName,
                                  userImage: cat3.addedBy.image,
                                  userId: cat3.addedBy.id,
                                  fbId: cat3.addedBy.fbId,
                                  gId: cat3.addedBy.gId,
                                  time: this.pageService.timeDiffCalc(
                                    new Date(cat3.updatedAt).getTime(),
                                    this.today.getTime()
                                  ),
                                  createdAt: cat3.createdAt,
                                  updatedAt: cat3.updatedAt,
                                  showMore: false,
                                };
                              })
                            : cat2.reply,
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
  getMyMods() {
    let filt = this.mymodfilters;
    filt["userid"] = this.credentials.credentials.id;
    // let filt = {
    //   userid: this.credentials.credentials.id,
    //   isFeatured: false,
    // };
    this.pageService.getMyMods(filt).subscribe(
      (res: any) => {
        if (res.success) {
          console.log("res data", res.data);
          this.myCreatedMods = [];

          this.myCreatedMods = res.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              slug: cat.slug,
              isCommentDisabled: cat.isCommentDisabled,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              // id: cat.id,
              // description: cat.description,
              // name: cat.name,
              // status: cat.status,
              // time: this.pageService.timeDiffCalc(
              //   new Date(cat.updatedAt).getTime(),
              //   this.today.getTime()
              // ),
              // createdAt: cat.createdAt,
              // updatedAt: cat.updatedAt,
            };
          });
          this.selectedMod = this.myCreatedMods;

          this.pageService.setModData(this.myCreatedMods);
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

  getDifferentMods() {
    this.spinner.show();

    this.pageService.getMyMods(this.filters).subscribe(
      (res: any) => {
        if (res.success) {
          const allMods = res.data;

          this.microModes = allMods.filter(
            (x) => x.size == "617117d45dc9eb47e09a2459"
          );
          this.microModes = this.microModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              series: cat.series,
              isCommentDisabled: cat.isCommentDisabled,
              beforeImages: cat.beforeImages ? cat.beforeImages : [],
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBy,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              category: cat.modCategorydetails,
              slug: cat.slug,
            };
          });
          this.miniModes = allMods.filter(
            (x) => x.size == "6171199578121d51ac58f30f"
          );
          this.miniModes = this.miniModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              isCommentDisabled: cat.isCommentDisabled,
              beforeImages: cat.beforeImages ? cat.beforeImages : [],
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              series: cat.seriesdetails,
              make: cat.make,
              model: cat.model,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBydetails,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              category: cat.modCategorydetails,
              slug: cat.slug,
            };
          });

          this.massiveModes = allMods.filter(
            (x) => x.size == "61714f23fc2f548d335f5933"
          );
          // console.log(this.massiveModes)
          this.massiveModes = this.massiveModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              isCommentDisabled: cat.isCommentDisabled,
              beforeImages: cat.beforeImages ? cat.beforeImages : [],
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBydetails,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              category: cat.modCategorydetails,
              slug: cat.slug,
            };
          });

          this.megaModes = allMods.filter(
            (x) => x.size == "61714f0afc2f548d335f5932"
          );
          this.megaModes = this.megaModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages ? cat.beforeImages : [],
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              isCommentDisabled: cat.isCommentDisabled,
              series: cat.seriesdetails,
              make: cat.make,
              model: cat.model,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBydetails,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              category: cat.modCategorydetails,
              slug: cat.slug,
            };
          });

          this.mediumModes = allMods.filter(
            (x) => x.size == "61714eeefc2f548d335f5931"
          );
          this.mediumModes = this.mediumModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              isCommentDisabled: cat.isCommentDisabled,
              beforeImages: cat.beforeImages ? cat.beforeImages : [],
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              series: cat.seriesdetails,
              make: cat.make,
              model: cat.model,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBydetails,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              category: cat.modCategorydetails,
              slug: cat.slug,
            };
          });

          // this.myModes = res.data.map((cat) => {
          //   // console.log(
          //   //   new Date(cat.updatedAt).getTime(),
          //   //   this.today.getTime()
          //   // );
          //   return {
          //     id: cat.id,
          //     description: cat.description,
          //     name: cat.name,
          //     beforeImages:cat.beforeImages,
          //     afterImages:cat.afterImages,
          //     status: cat.status,
          //     time: this.pageService.timeDiffCalc(
          //       new Date(cat.updatedAt).getTime(),
          //       this.today.getTime()
          //     ),
          //     createdAt: cat.createdAt,
          //     updatedAt: cat.updatedAt,
          //   };
          // });

          // this.pageService.setModData(this.myModes)
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

  getFriendsMods() {
    this.pageService.getFriendsMods().subscribe(
      (res: any) => {
        if (res.success) {
          console.log("res data", res.data);
          this.firendMods = [];

          this.firendMods = res.data.map((cat) => {
            console.log(
              new Date(cat.updatedAt).getTime(),
              this.today.getTime()
            );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              isCommentDisabled: cat.isCommentDisabled,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              // id: cat.id,
              // description: cat.description,
              // name: cat.name,
              // status: cat.status,
              // time: this.pageService.timeDiffCalc(
              //   new Date(cat.updatedAt).getTime(),
              //   this.today.getTime()
              // ),
              // createdAt: cat.createdAt,
              // updatedAt: cat.updatedAt,
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

  getUserDetail() {
    this.pageService.getUserDetail2().subscribe(
      (res: any) => {
        if (res.success) {
          this.myDetail = res.data;
          this.modPostForm.patchValue({
            rvType: this.myDetail["rvType"],
            model: this.myDetail["model"],
            make: this.myDetail["make"],
            year: this.myDetail["year"],
          });
          this.getYears();
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
  submiteditComment(comment, type, postId, activityType, postData: any = {}) {
    let data = {
      postId: postId,
      postType: postData ? postData.activityType : activityType,
    };
    if (type == "reply") {
      data["id"] = comment.id;
      data["commentId"] = comment.commentId;
      data["comment"] = this.replyOnPost;
    }
    if (type == "comment") {
      data["id"] = comment.id;
      data["comment"] = this.commentOnPost;
    }
    this.sharedService.editComment(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.commentOnPost = "";
          this.replyOnPost = "";
          this.editComment = false;
          this.editReply = false;
          this.replyForm = "";
          // this.toastr.success(res.message, "Success");
          this.getComments(
            postId,
            postData ? postData.activityType : activityType,
            postData
          );
          if (type == "normalPost") {
            this.readmoreLess(this.postIndex, "add");

            this.posts[this.postIndex].comments = res.commentdata.count;
            // this.getallNormalPosts();
          }
          if (type == "friendposts") {
            this.readmoreSocialLess(this.postIndex, "add");
            this.friendposts[this.postIndex].comments = res.commentdata.count;
          }
          if (type == "groupPost") {
            this.readmoreLessGroupPost(this.postIndex, "add");
            this.groupPosts[this.postIndex].comments = res.commentdata.count;
            // this.getallNormalPosts();
          }
          if (type == "modPost") {
            this.readmoreLess(this.postIndex, "add");
            this.posts[this.postIndex].comments = res.commentdata.count;
            // this.getallNormalPosts();
          }
          // this.groupForm.patchValue({ image: this.groupImage })
        } else {
          window.scrollTo(0, 0);
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
        this.toastr.error(
          "There are some errors, please try again after some time !",
          "Error"
        );
      }
    );
  }
  oneditComment(comment, type) {
    this.commentData = comment;
    console.log(this.commentData, "this.commentData");
    if (type == "reply") {
      this.editReply = true;
      this.replyClick(comment.id);
      this.replyOnPost = comment.comment;
    }
    if (type == "comment") {
      this.editComment = true;
      this.commentOnPost = comment.comment;
    }
  }
  BadgeExists(arr, value, matchkey, setkey) {
    let obj = this.badge;
    let images = this.badgeImages;
    arr.filter(function (el) {
      if (el["badge_for"] == matchkey && el.points <= value) {
        obj[setkey] = el["image"];
        images.push(el["image"]);
      }
    });
    this.badge = obj;
    this.badgeImages = images;
    // return obj
  }
  getMakes() {
    // this.spinner.show();
    let filters = {
      type: this.rvType,
      sortBy: -1,
    };
    this.pageService.getMainCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.allMakes = response.data;
          // console.log(this.allMakes, "this.allMakes");
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

  getModels() {
    // this.spinner.show();
    let filters = {
      type: this.rvType,
      categoryId: this.categoryId,
    };
    this.pageService.getSubCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.allModels = response.data;
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
  getBadges() {
    this.pageService.getAllBadges().subscribe(
      (res: any) => {
        if (res.success) {
          this.badgesData = res.data;
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
  viewGroup(slug) {
    if (slug != "all") {
      this.router.navigate(["/groups", slug]);
    } else {
      this.router.navigate(["/groups"]);
    }
  }

  splitByComma(value) {
    if (value != "") {
      let tagnewarray = [];
      tagnewarray = this.pageService.splitByComma(value);
      tagnewarray = tagnewarray.filter(function (el) {
        return el != "";
      });
      tagnewarray.forEach((element) => {
        this.tagsArray.push(element);
      });
      this.groupForm.patchValue({
        tags: "",
      });
    }
    console.log(this.tagsArray, "tags");
  }

  deleteTag(item) {
    let index = this.tagsArray.indexOf(item);
    console.log(index, "index");
    this.tagsArray.splice(index, 1);
    console.log(this.tagsArray, "this.tagsArray");
    // this.groupForm.patchValue({
    //   tags: this.tagsArray
    // });
  }
  getMakeCategories() {
    // this.spinner.show();
    let filters = {
      type: this.rvType,
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
          //   description: "I'm a Wannabe",
          // });
          this.allMakes = [...this.allMakes];

          console.log(this.allMakes, "this.allMakes");
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

  getModelCategories() {
    // this.spinner.show();
    let filters = {
      type: this.rvType,
      categoryId: this.categoryId,
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
          this.allModels.push({
            id: null,
            description: "I'm a Wannabe",
          });
          this.allModels = [...this.allModels];
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

  getModSubCategories(categoryId) {
    // this.spinner.show();
    let filters = {
      type: "modpost",
      categoryId: categoryId,
    };
    this.pageService.getSubCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.modSubCategories = response.data;
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

  uploadBeforeImages(files) {
    if (files) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
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
      this.beforeImageLoader = true;
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
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }

                this.beforeImages = docData;
                this.modPostForm.patchValue({ beforeImages: docData });
                this.beforeImageLoader = false;
              } else {
                window.scrollTo(0, 0);
                this.beforeImageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.beforeImageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.beforeImageLoader = false;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
  }

  uploadAfterImages(files) {
    if (files) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
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
      this.afterImageLoader = true;
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
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }

                this.afterImages = docData;
                this.modPostForm.patchValue({ afterImages: docData });
                this.afterImageLoader = false;
              } else {
                window.scrollTo(0, 0);
                this.afterImageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.afterImageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.afterImageLoader = true;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
  }

  uploadAffiliateImages(files, i) {
    let index: any;
    console.log(i, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    if (files) {
      this.affiliateLink = this.modPostForm.get("affiliateLink") as FormArray;
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
      // docData =  this.affiliateLink[i]['controls'].value
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
      this.affiliateLink["controls"][i]["controls"]["progressBar"].patchValue(
        "true"
      );
      console.log(this.affiliateLink);
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
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }
                this.affiliateLink["controls"][i]["controls"][
                  "images"
                ].patchValue(docData);
                this.affiliateLink["controls"][i]["controls"][
                  "progressBar"
                ].patchValue("false");
              } else {
                window.scrollTo(0, 0);
                this.affiliateLink["controls"][i]["controls"][
                  "progressBar"
                ].patchValue("false");
              }
              setTimeout(() => {
                this.progress = 0;
                this.affiliateLink["controls"][i]["controls"][
                  "progressBar"
                ].patchValue("false");
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.affiliateLink["controls"][i]["controls"][
            "progressBar"
          ].patchValue("false");
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
  }
  sendNotif(id) {
    let data = {
      user_id: id,
    };
    console.log("send notif data", data);
    this.chatService.sendNotif(data);
  }
  validateYouTubeUrl(urlToParse) {
    if (urlToParse != "") {
      console.log("in if");
      let url = urlToParse;
      var regExp =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(regExp)) {
        this.validUrl = true;
      } else {
        this.validUrl = false;
      }
    }
    console.log("this.validUrl", this.validUrl);
  }
  setShareData(item) {
    if (item.activityType == "normalPost") {
      this.meta.addTag({ property: "og:title", content: item.post });
      this.meta.addTag({ property: "og:type", content: "article" });
      this.meta.addTag({ property: "fb:app_id", content: "995503910998783" });
      this.meta.addTag({
        property: "og:url",
        content: `https://rvmodshare.com/normal-post-detail?id=${item.id}`,
      });
      this.meta.addTag({
        property: "og:image:secure",
        content: `https://endpoint.rvmodshare.com/images/posts/${item.image[0]}`,
      });
      this.meta.addTag({
        property: "og:image",
        content: `https://endpoint.rvmodshare.com/images/posts/${item.image[0]}`,
      });
      // this.meta.addTag({ property: 'og:description', content: description });
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(function () {
          a2a.init_all();
        }, 1000);
      }
    }
    if (item.activityType == "modPost") {
      this.meta.addTag({ property: "og:title", content: item.modName });
      this.meta.addTag({ property: "og:type", content: "article" });
      this.meta.addTag({ property: "fb:app_id", content: "995503910998783" });
      this.meta.addTag({
        property: "og:url",
        content: `https://rvmodshare.com/mods/${item.slug}`,
      });
      if (item.afterImages.length > 0) {
        this.meta.addTag({
          property: "og:image:secure",
          content: `https://endpoint.rvmodshare.com/images/modPost/${item.afterImages[0]}`,
        });
      } else {
        this.meta.addTag({
          property: "og:image:secure",
          content: `https://endpoint.rvmodshare.com/images/modPost/${item.beforeImages[0]}`,
        });
      }
      if (item.afterImages.length > 0) {
        this.meta.addTag({
          property: "og:image",
          content: `https://endpoint.rvmodshare.com/images/modPost/${item.afterImages[0]}`,
        });
      } else {
        this.meta.addTag({
          property: "og:image",
          content: `https://endpoint.rvmodshare.com/images/modPost/${item.beforeImages[0]}`,
        });
      }
      // this.meta.addTag({ property: 'og:description', content: description });
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(function () {
          a2a.init_all();
        }, 1000);
      }
    }
    if (item.activityType == "groupPost") {
      this.meta.addTag({ property: "og:title", content: item.name });
      this.meta.addTag({ property: "og:type", content: "article" });
      this.meta.addTag({ property: "fb:app_id", content: "995503910998783" });
      this.meta.addTag({
        property: "og:url",
        content: `https://rvmodshare.com/group-post-detail?id=${item.id}`,
      });
      if (item.image.length > 0) {
        this.meta.addTag({
          property: "og:image:secure",
          content: `https://endpoint.rvmodshare.com/images/group/${item.image[0]}`,
        });
        this.meta.addTag({
          property: "og:image",
          content: `https://endpoint.rvmodshare.com/images/group/${item.image[0]}`,
        });
      }

      // this.meta.addTag({ property: 'og:description', content: description });
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(function () {
          a2a.init_all();
        }, 1000);
      }
    }
  }
  goTouserProfile(url, params) {
    console.log("in go to user profile");
    this.router.navigate([url], { queryParams: params });
  }
}
