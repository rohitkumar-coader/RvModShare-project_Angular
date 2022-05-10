import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CredentialsService } from "src/app/auth/credentials.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { MagnifyImageComponent } from "src/app/shared/shared/magnify-image/magnify-image.component";
import { SharedService } from "src/app/shared/shared.service";
import { environment } from "src/environments/environment";
import { LikeListingModalComponent } from "../like-listing-modal/like-listing-modal.component";
import { PagesService } from "../pages.service";
import { PostSharedWithComponent } from "../post-shared-with/post-shared-with.component";
import { ReportSectionComponent } from "../report-section/report-section.component";
import { ShareModalComponent } from "../share-modal/share-modal.component";
import { ChatService } from "src/app/chat.service";
import { isPlatformBrowser } from "@angular/common";
import { AppInjector } from "../../app.module";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
declare var a2a: any;
import { Meta, SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { FollowingModalComponent } from "src/app/shared/shared/following-modal/following-modal.component";
import { FollowerModalComponent } from "src/app/shared/shared/follower-modal/follower-modal.component";

@Component({
  selector: "app-friend-profile",
  templateUrl: "./friend-profile.component.html",
  styleUrls: ["./friend-profile.component.scss"],
})
export class FriendProfileComponent implements OnInit {
  chatService: any;
  friendDetail: any = {};
  public data: any = {};
  _baseUrl = window.location.origin + "/";
  // _baseUrl = "https://www.rvmodshare.com/";
  public userID: any;
  Form: FormGroup;
  selectedDate: any;
  profileUrl: any;
  friendId: any;
  friendSlug: any;
  user: any;
  progress = 0;
  usercoverimg: any;
  userimg: any;
  _host = environment.url;
  userPostImages: any = [];
  urlSafe: SafeResourceUrl;
  youtubeVID: any = "";
  posts: any = [];
  today = new Date();
  postIndex: any;
  pollVoting: any;
  allComments: Array<any> = [];
  replyForm: any;
  loader = false;
  totalComments: Array<any> = [];
  commentOnPost: any;
  replyOnPost: any;
  replyOnPost2: any;
  modalReference3: any;
  filterBy: any = "";
  filterrvTypes: Array<any> = [];
  MakesFilters: Array<any> = [];
  filterModels: Array<any> = [];
  difficulties: Array<any> = [];
  skillLevelNeeded: Array<any> = [];
  timeRanges: Array<any> = [];
  rvYears: Array<any> = [];
  modCategories: Array<any> = [];
  featuredMods: Array<any> = [];
  miniModes: Array<any> = [];
  // massiveModes: Array<any> = []
  mediumModes: Array<any> = [];
  megaModes: Array<any> = [];

  //updated_by_gi
  imageModalLoader: any;
  rvTypes: any;
  config2: any;
  submitted: any;
  allMakes: any;
  allModels: any;
  config3: any;
  years: any;
  minDate: any;
  uploadCoverImage: any;
  uploadImage: any;
  selectedRVType: any;
  selectedMake: any;
  make: any;
  selectedModel: any;
  updateUser: any;
  coverImageModalLoader: any;
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
  modalReference4: any;
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
  constructor(
    private _activateRouter: ActivatedRoute,
    private pageService: PagesService,
    private toastr: ToastrService,
    public _sharedService: SharedService,
    private spinner: NgxSpinnerService,
    public credentials: CredentialsService,
    private modalService: NgbModal,
    private _bs: BehaviorService,
    private router: Router,
    private meta: Meta,
    // private chatService: ChatService
    @Inject(PLATFORM_ID) private platformId: Object,
    public sanitizer: DomSanitizer
  ) {
    _bs.postDataToreload.subscribe((res) => {
      if (res.postIndex && res.sharecount) {
        this.postIndex = res.postIndex;
        this.posts[this.postIndex].totalShare = res.sharecount;
      }
    });
    window.scroll(0, 0);
  }

  ngOnInit() {
    // this.data = JSON.parse(localStorage.getItem("user"));
    // if (this.data) {
    //   this.userID = this.data.id;
    // }
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }

    this._activateRouter.queryParams.subscribe((param) => {
      console.log("id param", param);
      this.friendId = param["id"];
      console.log("user id ", this.friendId);
      this.friendSlug = param["slug"];
      if (param["id"]) this.getFriendsDetail();
      if (param["slug"]) this.getFriendsWithSlugDetail();
    });
    this.friendSlug = this._activateRouter.snapshot.paramMap.get("slug");
    if (this.friendSlug) {
      this.getFriendsWithSlugDetail();
    }
  }
  get f() {
    return this.Form.controls;
  }

  openfollow() {
    this.modalReference3 = this.modalService.open(FollowingModalComponent);
    let data = {
      id: this.friendId,
    };
    this.modalReference3.componentInstance.followData = data;
  }
  openfollower() {
    console.log("data user", this.data);
    this.modalReference4 = this.modalService.open(FollowerModalComponent);
    let data = {
      id: this.friendId,
    };
    this.modalReference4.componentInstance.followData = data;
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
    if (this.friendId) {
      this.getModPostFilter();
      this.getMyFeaturedMods();
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
    this.getModPostFilter();
    this.getMyFeaturedMods();
  }
  checkLoggedinUser() {
    let user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }
  onClickImage() {
    this._sharedService.onClickImageWithoutLogin();
  }
  goTouserProfile(url, params) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.router.navigate([url], { queryParams: params });
  }
  getModPostFilter() {
    if (isPlatformBrowser(this.platformId)) {
      let filter = {
        userid: this.friendId,
        search: this.modfilters.search,
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
      };
      this.pageService.getModPostFilter(filter).subscribe(
        (res: any) => {
          if (res.success) {
            this.filterrvTypes = this._sharedService.getRvTypeArray(
              res.rvClass
            );
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

  getMyFeaturedMods() {
    if (isPlatformBrowser(this.platformId)) {
      this.spinner.show();
      let filters = {
        userid: this.friendId,
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
      };
      this.pageService.getMyMods(filters).subscribe(
        (res: any) => {
          if (res.success) {
            this.featuredMods = res.data.filter((x) => x.isFeatured == true);
            this.featuredMods = this.featuredMods.map((cat) => {
              return {
                id: cat.id,
                description: cat.description,
                name: cat.name,
                slug: cat.slug,
                beforeImages: cat.beforeImages,
                afterImages: cat.afterImages,
                status: cat.status,
                skillLevel: cat.skillLevel,
                isFeatured: cat.isFeatured,
                isCommentDisabled: cat.isCommentDisabled,
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
  }

  copy() {
    this.profileUrl = this._baseUrl + "friend-profile?id=" + this.friendId;
    let value = this.profileUrl;
    navigator.clipboard.writeText(value);
    // this.toastr.success("Copied URL to clipboard!");
    alert("Copied URL to clipboard!");
  }
  getFriendsDetail() {
    this.spinner.show();
    let data = {
      id: this.friendId,
    };
    let isUser = this.checkLoggedinUser();
    if (isUser) {
      data["uid"] = this.credentials.credentials.id;
    }
    this.pageService.getFriendDetail(data).subscribe(
      (response) => {
        if (response.success) {
          this.friendDetail = response.data;
          if (this.friendId) {
            this.getModPostFilter();
            this.getMyFeaturedMods();
          }
          if (
            this.friendDetail["featuredYouTubeLink"] &&
            this.friendDetail["featuredYouTubeLink"] != ""
          ) {
            let rx =
              /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            this.youtubeVID =
              this.friendDetail["featuredYouTubeLink"].match(rx);
            this.youtubeVID = this.youtubeVID[1];
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
              "https://www.youtube.com/embed/" + this.youtubeVID
            );
          }
          // this.getallNormalPosts();
          // this.spinner.hide();
          this.setShareData(this.friendDetail);
        } else {
          // this.spinner.hide();
        }
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error(error);
        this.spinner.hide();
      }
    );
  }
  getFriendsWithSlugDetail() {
    this.spinner.show();
    // let data = {
    //   id: this.friendId,
    // };
    let data = {
      slug: this.friendSlug,
    };
    let isUser = this.checkLoggedinUser();
    if (isUser) {
      // data["uid"] = this.credentials.credentials.id;
      data["uslug"] = this.credentials.credentials.slug;
    }
    this.pageService.getFriendsWithSlugDetail(data).subscribe(
      (response) => {
        if (response.success) {
          this.friendDetail = response.data;
          this.friendId = response.data.id;
          if (
            this.friendDetail["featuredYouTubeLink"] &&
            this.friendDetail["featuredYouTubeLink"] != ""
          ) {
            let rx =
              /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            this.youtubeVID =
              this.friendDetail["featuredYouTubeLink"].match(rx);
            this.youtubeVID = this.youtubeVID[1];
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
              "https://www.youtube.com/embed/" + this.youtubeVID
            );
          }
          if (this.friendId) {
            this.getModPostFilter();
            this.getMyFeaturedMods();
          }
          // this.getallNormalPosts();
          // this.spinner.hide();
          this.setShareData(this.friendDetail);
        } else {
          // this.spinner.hide();
        }
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error(error);
        this.spinner.hide();
      }
    );
  }
  calculateWeightage(percent) {
    return ((percent / 100) * 100).toFixed(2);
  }
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }
  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }
  viewPost(postId, postType) {
    let data = {
      postType: postType,
      postId: postId,
    };
    this._sharedService.viewPost(data);
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
  replyComment(
    postId,
    commentId: any,
    replyon: any,
    index: any = "",
    activityType,
    to_user_id
  ) {
    let data = {};
    if (replyon == "comment") {
      if (this.replyOnPost == "") {
        return;
      }
      data = {
        postId: postId,
        comment: this.replyOnPost,
        postType: activityType,
      };
    }
    if (replyon == "reply") {
      if (this.replyOnPost2 == "") {
        return;
      }
      data = {
        postId: postId,
        comment: this.replyOnPost2,
        postType: activityType,
      };
    }

    if (commentId) {
      data["commentId"] = commentId;
    }
    // this.spinner.show();
    this.pageService.addComment(data).subscribe(
      (res: any) => {
        if (res.success) {
          // this.getGroupPosts();
          this.replyOnPost = "";
          this.replyOnPost2 = "";
          this.posts[this.postIndex].comments = res.commentdata.count;
          this.sendNotif(to_user_id);
          this.replyForm = "";
          // this.toastr.success(res.message, "Success");
          this.getComments(postId, activityType);
          this.readmoreLess(this.postIndex, "add");
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
  getAllPhotos() {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.pageService.getAllPostPhotos(this.friendId).subscribe(
      (response) => {
        if (response.success) {
          this.userPostImages = response.data;
          // this.friendDetail = response.data;
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

  addFriend() {
    this.spinner.show();
    let data = {
      requesterId: this.credentials.credentials.id,
      recipientId: this.friendId,
    };
    let isUser = this.checkLoggedinUser();
    if (isUser) {
      this._sharedService.post(data, "add/friends").subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.toastr.success(res.message);
            this.getFriendsDetail();
            this.chatService.sendNotif({ user_id: this.friendId });
            //  this._router.navigate(['/auth/login-signup']);
          } else {
            //  this._sharedService.loader('hide');
            this.toastr.error(res.error.message);
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error("There are some error please try after some time.");
        }
      );
    } else {
      this.onClickImage();
    }
  }

  followFriend() {
    this.spinner.show();
    let data = {
      followFriendID: this.friendId,
      type: "follower",
    };
    let isUser = this.checkLoggedinUser();
    if (isUser) {
      this._sharedService.post(data, "follow/friend").subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            // this.toastr.success(res.message);
            this.getFriendsDetail();
            this.chatService.sendNotif({ user_id: this.friendId });
            //  this._router.navigate(['/auth/login-signup']);
          } else {
            //  this._sharedService.loader('hide');
            this.toastr.error(res.error.message);
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error("There are some error please try after some time.");
        }
      );
    } else {
      this.onClickImage();
    }
  }
  // checkLoggedinUser() {
  //   console.log("in check logged in user");
  //   let user = localStorage.getItem("user");
  //   if (user) return true;
  //   else return false;
  // }
  // onClickImage() {
  //   this.sharedService.onClickImageWithoutLogin();
  // }
  getallNormalPosts() {
    let data = {
      userid: this.friendId,
      filterBy: this.filterBy,
    };
    this.spinner.show();
    this.pageService.getallFriendModPosts(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.spinner.hide();
          this.posts = [];
          this.posts = res.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );

            return {
              id: cat.id,
              image:
                cat.activityType == "modPost"
                  ? cat.afterImages && cat.afterImages.length > 0
                    ? cat.afterImages
                    : cat.beforeImages && cat.beforeImages.length > 0
                    ? cat.beforeImages
                    : []
                  : cat.image,
              post: cat.activityType == "normalPost" ? cat.post : cat.name,
              addedByName: cat.addedBy ? cat.addedBy : "",
              addedByImage: cat.addedBy ? cat.addedBy.image : "",
              status: cat.status,
              likes: cat.likesTotal,
              comments: cat.commentTotal,
              totalShare: cat.totalShare,
              likestatus: cat.likestatus,
              isValidTime: this._sharedService.secondsToDhms(cat.isValidTime),
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
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              year: cat.year,
              series: cat.series,
              make: cat.make,
              model: cat.model,
              rvType: this._sharedService.getRvType(cat.rvType),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              activityType: cat.activityType,
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
    this.meta.addTag({
      property: "og:title",
      content: item.firstName + " " + item.lastName,
    });
    this.meta.addTag({ property: "og:type", content: "article" });
    this.meta.addTag({ property: "fb:app_id", content: "995503910998783" });
    this.meta.addTag({
      property: "og:url",
      content: `https://rvmodshare.com/friend-profile?id=${item.id}`,
    });

    this.meta.addTag({
      property: "og:image:secure",
      content: `https://endpoint.rvmodshare.com/${item.image}`,
    });
    this.meta.addTag({
      property: "og:image",
      content: `https://endpoint.rvmodshare.com/${item.image}`,
    });
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
  openLikeModal(item: any) {
    if (item.likes == 0) return;

    localStorage.setItem("type", "");
    localStorage.setItem("postId", "");
    localStorage.setItem(
      "type",
      item.activityType ? item.activityType : "groupPost"
    );
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
  cancelFriendRequest() {
    this.spinner.show();
    let isUser = this.checkLoggedinUser();
    if (isUser) {
      this.pageService.cancelRequest(this.friendId).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.toastr.success(res.message);
            this.getFriendsDetail();
            //  this._router.navigate(['/auth/login-signup']);
          } else {
            //  this._sharedService.loader('hide');
            this.toastr.error(res.error.message);
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error("There are some error please try after some time.");
        }
      );
    } else {
      this.onClickImage();
    }
  }

  unFriend() {
    this.spinner.show();
    let isUser = this.checkLoggedinUser();
    if (isUser) {
      this.pageService.unFriend(this.friendId).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.toastr.success(res.message);
            this.getFriendsDetail();
            //  this._router.navigate(['/auth/login-signup']);
          } else {
            //  this._sharedService.loader('hide');
            this.toastr.error(res.error.message);
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error("There are some error please try after some time.");
        }
      );
    } else {
      this.onClickImage();
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
        this._sharedService.deleteModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.featuredMods.splice(index, 1);
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
  likePost(postId, index, activityType) {
    let data = {
      postId: postId,
      likeBy: this.credentials.credentials.id,
      postType: activityType,
    };
    // this.spinner.show();
    this.pageService.addLike(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.posts[index].likes = res.data.count;
          this.posts[index].likestatus = res.data.likestatus;
          // this.getallNormalPosts();
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
  addComment(postId, commentId: any, index, activityType, to_user_id) {
    if (this.commentOnPost != "") {
      let data = {
        postId: postId,
        comment: this.commentOnPost,
        postType: activityType,
      };
      if (commentId) {
        data["commentId"] = commentId;
      }
      // this.spinner.show()
      this.pageService.addComment(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.commentOnPost = "";
            this.sendNotif(to_user_id);
            // this.toastr.success(res.message, "Success");
            this.getComments(postId, activityType);
            this.posts[this.postIndex].comments = res.commentdata.count;
            this.readmoreLess(this.postIndex, "add");
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
  }
  sendNotif(id) {
    let data = {
      user_id: id,
    };
    this.chatService.sendNotif(data);
  }

  readmoreLess(i, status = "") {
    if (this.postIndex != i) this.allComments = [];
    this.postIndex = i;
    // this.getComments(postId)
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
  replyClick(p: any) {
    if (p == this.replyForm) {
      this.replyForm = 0;
    } else {
      this.replyForm = p;
    }
  }
  getComments(postId, activityType) {
    // this.allComments = [];
    let data = {
      postId: postId,
      // id : postId,
      type: activityType,
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

  openshare(id, type, index) {
    let data = {
      postId: id,
      postType: type,
      postIndex: index,
    };
    this._bs.sharedPostData.next(data);
    const modalRef = this.modalService.open(ShareModalComponent);
    modalRef.componentInstance.name = "World";
  }
  OpenListingOfSharedUsers(item: any) {
    if (item.totalShare == 0) return;

    localStorage.setItem("type", "");
    localStorage.setItem("postId", "");
    localStorage.setItem("type", item.activityType ? item.activityType : "");
    localStorage.setItem("postId", item.id);
    const modalRef = this.modalService.open(PostSharedWithComponent);
    modalRef.componentInstance.name = "Link Modal";
  }
  openReport(id, key) {
    this.modalReference3 = this.modalService.open(ReportSectionComponent);
    let data = {
      key: key,
      id: id,
    };
    this.modalReference3.componentInstance.reportData = data;
  }
  goToModDetail(url, param) {
    console.log("need id ", param);
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    window.location.href = window.location.origin + url + "/" + param;
  }
}
