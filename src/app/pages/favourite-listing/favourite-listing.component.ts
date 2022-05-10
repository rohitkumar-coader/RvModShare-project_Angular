import { Component, Inject, Input, OnInit, PLATFORM_ID } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CredentialsService } from "src/app/auth/credentials.service";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";
import { NgxSpinnerService } from "ngx-spinner";
import { SharedService } from "src/app/shared/shared.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MagnifyImageComponent } from "src/app/shared/shared/magnify-image/magnify-image.component";
import { isPlatformBrowser } from "@angular/common";
import { AppInjector } from "src/app/app.module";
import { ChatService } from "src/app/chat.service";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { ReportSectionComponent } from "../report-section/report-section.component";
import { Meta } from "@angular/platform-browser";
declare var a2a: any;
@Component({
  selector: "app-favourite-listing",
  templateUrl: "./favourite-listing.component.html",
  styleUrls: ["./favourite-listing.component.scss"],
})
export class FavouriteListingComponent implements OnInit {
  friendDetail: any = {};
  public data: any = {};
  chatService: any;
  public userID: any;
  friendId: any;
  user: any;
  selectedDate: any;
  progress = 0;
  usercoverimg: any;
  userimg: any;
  userPostImages: any = [];
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
  modalReference3: any;
  // filters: any = {
  //   search: "",
  //   class: "",
  //   make: "",
  //   modCategory: "",
  //   size: "",
  //   series: "",
  //   year: "",
  //   skillLevel: "",
  //   timerange: "",
  //   tag: "",
  // };
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
  // @Input() public changeFavourite;
  // changeFavourite:boolean=false;
  favMods: any = [];
  _host = environment.url;
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
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
  today = new Date();
  homeMenu: boolean;
  hideDefault: boolean = true;
  showTabs: boolean = true;
  isLoading: boolean;
  slickInit(e) {}

  breakpoint(e) {
    console.log("breakpoint");
  }

  afterChange(e) {
    // console.log("afterChange");
  }

  beforeChange(e) {
    // console.log("beforeChange");
  }
  constructor(
    public credentials: CredentialsService,
    private pageService: PagesService,
    private toastr: ToastrService,
    private router: Router,
    public _sharedService: SharedService,
    private spinner: NgxSpinnerService,
    public _bs: BehaviorService,
    private modalService: NgbModal,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // this._bs.modFilter.subscribe((elem) => {
    //   if (elem != null && elem != undefined) {
    //     console.log(elem, "filter elem");
    //     this.filters.search = elem.search ? elem.search : "";
    //     this.filters.class = elem.rvTypeFilter ? elem.rvTypeFilter : "";
    //     // this.filters.series = elem.seriesFilter;
    //     this.filters.make = elem.makeFilter ? elem.makeFilter : "";
    //     this.filters.modCategory = elem.modCategoryValue
    //       ? elem.modCategoryValue
    //       : "";
    //     this.filters.series = elem.modelValue ? elem.modelValue : "";
    //     this.filters.size = elem.size ? elem.size : "";
    //     this.filters.year = elem.yearValue ? elem.yearValue : "";
    //     this.filters.tag = elem.tag ? elem.tag : "";
    //     this.filters.skillLevel = elem.skillLevel ? elem.skillLevel : "";
    //     this.filters.timerange = elem.timerange ? elem.timerange : "";
    //   }
    //   this.getFavouriteMods();
    // });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (evt.url.indexOf("favorite-mods") >= 0) {
        this.showTabs = false;
        // localStorage.removeItem('search');
      } else {
        this.showTabs = true;
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    // this.getFavouriteMods();
    this.getFavModPostFilter();
    this.getFavouriteMods();
  }

  htmlLength(html = "", length) {
    if (html && html.length > length) {
      return html.slice(0, length) + "...";
    } else {
      return html;
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

    this.getFavouriteMods();
  }
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }
  openReport(id, key) {
    this.modalReference3 = this.modalService.open(ReportSectionComponent);
    let data = {
      key: key,
      id: id,
    };
    this.modalReference3.componentInstance.reportData = data;
  }
  deletePost(id, index) {
    Swal.fire({
      title: "Are you sure you want to delete this post?",
      // html: "<b>Next Step:</b> Verify Your Email. <br> We’ve sent you an email. Click the link in the email to continue setting up your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // this.loader = true;
        let data = {
          id: id,
        };
        this._sharedService.deleteModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.favMods.splice(index, 1);
              this.toastr.success(res.message);
            } else {
              this.toastr.error(res.error.message, "Error");
            }
            // this.loader = false;
          },
          (err) => {
            // this.loader = false;
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
      // this.toastr.success('Registered Successfully. Please verify your email!');
    });
  }
  likePost(postId, type, index, to_user_id) {
    let data = {
      postId: postId,
      likeBy: this.credentials.credentials.id,
      postType: type,
    };
    // this.spinner.show();
    this.pageService.addLike(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(to_user_id);
          this.favMods[index].likesTotal = res.data.count;
          this.favMods[index].likestatus = res.data.likestatus;
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
  getFavouriteMods() {
    // console.log(this.filters, "my filters dffdgf");
    // let filters = {};
    // if (this.filters != null && this.filters != undefined) {
    //   filters = this._sharedService.clean(this.filters);
    // }
    let filters = {
      userid: this.credentials.credentials.id,
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
    // filters["userid"] = this.credentials.credentials.id;
    filters["modPost"] = "modPost";
    // let filters = {
    //   userid: this.credentials.credentials.id,
    //   type: "modPost",
    // };
    // this.isLoading = true;
    this.spinner.show();
    this.pageService.getFavouriteMods(filters).subscribe(
      (response) => {
        if (response.success) {
          this.favMods = response.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              postId: cat.postId,
              description: cat.description,
              slug: cat.postdata.slug,
              isCommentDisabled: cat.isCommentDisabled,
              name: cat.name,
              registeredRV: cat.registeredRV,
              isFeatured: cat.isFeatured,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              skillLevel: cat.skillLevel,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedById: cat.addedById,
              modCategoryDetails: cat.modCategoryDetails,
              rvType: cat.rvType,
              year: cat.year,
              postdata: cat.postdata,
              seriesDetails: cat.seriesDetails,
              makeDetails: cat.makeDetails,
              model: cat.model,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              userDetails: cat.userDetails,
              timerange: cat.timerange,
              whatIDid: cat.whatIDid.replace(/<img[^>]*>/g, ""),
              // whatIDid: cat.whatIDid,
              isPending: cat.isPending,
              isFollow: cat.isFollow,
              isFriend: cat.isFriend,
              sizeDetails: cat.sizeDetails,
              // modDetailSharedata: this.setShareData(cat),
            };
          });
          this.isLoading = false;
          // this.favMods = response.data;
          // this.changeFavourite = true;
          // console.log(  this.modCategories, "this.allMakes");
          this.spinner.hide();
        } else {
          // this.isLoading = false;
          this.spinner.hide();
        }
      },
      (error) => {
        // this.isLoading = false;
        this.spinner.hide();
      }
    );
  }
  followMod(modDetail, i) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    let data = {
      followFriendID: modDetail.userDetails._id,
      type: "follower",
    };
    this.spinner.show();
    this._sharedService.post(data, "follow/friend").subscribe(
      (res: any) => {
        if (res.success) {
          this.favMods
            .filter((mod) => mod.userDetails._id == res.friendId)
            .map((mod) => {
              mod.isFollow = res.isFollow;
              return mod;
            });
          //  this.allMods[i].isFollow = res.isFollow;
          this.sendNotif(modDetail.userDetails._id);
          // this.getMyMods();
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
    let user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }
  goTouserProfile(url, params) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.router.navigate([url], { queryParams: params });
  }
  onClickImage() {
    this._sharedService.onClickImageWithoutLogin();
  }
  goToModDetail(url, param) {
    window.location.href = window.location.origin + url + "/" + param;
    // window.location.href = window.location.origin + url + "?id=" + param;
  }
  unFriend(modDetail, i) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.spinner.show();

    this.pageService.unFriend(modDetail.userDetails._id).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          // this.allMods[i].isPending = res.isPending;
          // this.allMods[i].isFriend = res.isFriend;

          // this.getMyMods();
          this.favMods
            .filter((mod) => mod.userDetails._id == res.friendId)
            .map((mod) => {
              mod.isPending = res.isPending;
              mod.isFriend = res.isFriend;
              return mod;
            });
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
  }

  cancelRequest(modDetail, i) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.spinner.show();

    this.pageService.cancelRequest(modDetail.userDetails._id).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          // this.allMods[i].isPending = res.isPending;
          // this.allMods[i].isFriend = res.isFriend;
          // this.getMyMods();
          this.favMods
            .filter((mod) => mod.userDetails._id == res.friendId)
            .map((mod) => {
              mod.isPending = res.isPending;
              mod.isFriend = res.isFriend;
              return mod;
            });

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
  }
  followFriend(modDetail, i) {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.checkLoggedinUser()) {
        this.onClickImage();
        return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
      }
      this.spinner.show();
      let data = {
        requesterId: this.credentials.credentials.id,
        recipientId: modDetail.userDetails._id,
      };
      this._sharedService.post(data, "add/friends").subscribe(
        (res: any) => {
          console.log(res);
          this.spinner.hide();
          if (res.success) {
            this.sendNotif(modDetail.userDetails._id);
            // this.allMods[i].isPending = res.isPending;
            // this.allMods[i].isFriend = res.isFriend;
            this.toastr.success(res.message);
            this.favMods
              .filter((mod) => mod.userDetails._id == res.friendId)
              .map((mod) => {
                mod.isPending = res.isPending;
                mod.isFriend = res.isFriend;
                return mod;
              });
            // this.getMyMods();
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
    }
  }
  getFavModPostFilter() {
    let filter = {
      userid: this.credentials.credentials.id,
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
    this.pageService.getFavModPostFilter(filter).subscribe(
      (res: any) => {
        if (res.success) {
          this.filterrvTypes = this._sharedService.getRvTypeArray(res.rvClass);
          this.MakesFilters = this.modfilters.rvTypeFilter
            ? res.rvMake.filter(
                (obj) => obj.cat_type == this.modfilters.rvTypeFilter
              )
            : res.rvMake;
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
      this.modfilters.startDate = new Date(
        this.selectedDate.startDate.toDate()
      );
      this.modfilters.endDate = new Date(this.selectedDate.endDate.toDate());
    }

    this.getFavModPostFilter();
    this.getFavouriteMods();
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
  route(value) {
    this.router.navigate(["mod-details"], {
      queryParams: { id: value, uid: this.credentials.credentials.id },
    });
  }

  favourite(postId, index) {
    let data = {
      postId: postId,
      userId: this.credentials.credentials.id,
      postType: "modPost",
    };
    // this.isFavourate = !postId.isFavourite;
    // this.loader =true;
    this.favMods[index].isFavourate = !this.favMods[index].isFavourate;
    this.pageService.addFavourite(data).subscribe(
      (res: any) => {
        if (res.success) {
          // this.toastr.success(res.message)
          this.getFavouriteMods();

          // this.loader =false;
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.loader =false;
      },
      (err) => {
        // this.loader =false;
      }
    );
  }
  setShareData(item) {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(function () {
        a2a.init_all();
      }, 500);
    }
    return;
  }
  sendNotif(id) {
    let data = {
      user_id: id,
    };
    this.chatService.sendNotif(data);
  }
}
