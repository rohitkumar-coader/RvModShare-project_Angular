import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AppInjector } from "src/app/app.module";
import { CredentialsService } from "src/app/auth/credentials.service";
import { ChatService } from "src/app/chat.service";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { LikeListingModalComponent } from "src/app/pages/like-listing-modal/like-listing-modal.component";
import { PagesService } from "src/app/pages/pages.service";
import { ReportSectionComponent } from "src/app/pages/report-section/report-section.component";
import { BehaviorService } from "src/app/shared/behavior.service";
import { SharedService } from "src/app/shared/shared.service";
import { environment } from "src/environments/environment";
import { MagnifyImageComponent } from "../magnify-image/magnify-image.component";
declare var a2a: any;
declare var require: any;
var Filter = require("bad-words"),
  filter = new Filter();
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
@Component({
  selector: "app-mods",
  templateUrl: "./mods.component.html",
  styleUrls: ["./mods.component.css"],
})
export class ModsComponent implements OnInit {
  allMods = [];
  sum = 40;
  viewLink = false;
  @Output() seemodCount = new EventEmitter<number>();
  _host = environment.url;
  p: number = 1;
  _baseUrl = window.location.origin + "/";
  // _baseUrl = "https://www.rvmodshare.com/";
  chatService: any;
  fullCls = false;
  isLoading = false;
  smallCls = true;
  page = 1;
  @Input() userId: any;
  modalReference3: any;
  @Input() modfilters: any;
  @Input() seeAllmods: any;
  @Input() featured: any;
  totalComments = 0;
  replyForm: any;
  commentOnPost: any;
  Copylink: string = "";
  isfollowing: any;
  InfiniteScrollModule;
  replyOnPost: any;
  replyOnPost2: any;
  replyOnPost3: any;
  makeSeriesClass: any;
  allComments: Array<any> = [];
  loadingContent = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  commentData: any;
  editComment = false;
  editReply = false;
  postIndex: any;
  newBadWords = environment.bad_word;
  interestArray: any = [];
  loader = false;
  today = new Date();
  count: number;
  totalcount: number = 20;
  totalModsCount: any;
  newWhatIdid: any;
  whatIdid: any;
  filterdata: any;
  isfollow: any;
  sortBy: string = "popularPost";
  isUser: boolean;
  classdata: any;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dashService: DashboardService,
    public sharedService: SharedService,
    private renderer: Renderer2,
    public _bs: BehaviorService,
    private _titleService: Title,

    // private credentialsService: CredentialsService,
    public credentials: CredentialsService,
    private formBuilder: FormBuilder,
    private pageService: PagesService,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    var ModID = JSON.parse(localStorage.getItem("modobj"));

    if(ModID.page){
      // this.page = ModID.page
        this.page = this.page;
    }

    this._bs.resetTotalCount.subscribe((res) => {
      console.log("in reset count", res);
      if (res == true) {
        this.totalcount = 20;
        this.sum = 0;
        console.log(this.sum, this.totalcount);
      }
    });
    this._bs.updateFollowListButton.subscribe((res) => {
      this.isfollow = res;
    });
    this.isUser = this.checkLoggedinUser();
    this._bs.modFilter.subscribe((elem) => {
      if (elem != null && elem != undefined && elem != "") {
        console.log(elem, "elm filter");
        this.filterdata = elem;
        this.getMyMods();
      }
    });

    // this.appendItems(20, this.sum);
  }
  pageChanged(e) {
    this.page = e;
    this.getMyMods();
    window.scrollTo(0, 0);
  }
  // addItems(startIndex, endIndex, _method) {
  //   for (let i = 0; i < this.sum; i++) {
  //     this.allMods[_method]([i, " "].join(""));
  //   }
  // }

  // appendItems(startIndex, endIndex) {
  //   this.addItems(startIndex, endIndex, "push");
  //   this.getMyMods();
  // }

  // prependItems(startIndex, endIndex) {
  //   this.addItems(startIndex, endIndex, "unshift");
  // }

  // seeMore() {
  //   this.totalcount = this.sum;
  //   this.sum += 20;
  //   this.appendItems(this.totalcount, this.sum);
  // }

  ngOnInit() {
    this.getMakeSeriesClass();
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }

    // this.getMyMods();
  }

  addClss() {
    this.fullCls = true;
    this.smallCls = false;
  }
  showClss() {
    this.smallCls = true;
    this.fullCls = false;
  }
  // ngOnChanges(changes: { modfilters }) {}
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
  changepopular(value) {
    this.sortBy = value;
    this.getMyMods();
  }
  getMyMods() {
    var ModID = JSON.parse(localStorage.getItem("modobj"));
 
    if( ModID.page){
      this.page = ModID.page
      this.sortBy =ModID.sortBy
    }
    let filters: any = {};
    if (this.seeAllmods) {
      filters = this.modfilters;
      this.followNotification();
    } else {
      if (this.modfilters != undefined && this.modfilters != null)
        filters = {
          // modid: this.modfilters.modid
          //   ? this.modfilters.modid
          //   : "",
          class: this.modfilters.rvTypeFilter
            ? this.modfilters.rvTypeFilter
            : "",
          make: this.modfilters.makeFilter ? this.modfilters.makeFilter : "",
          series: this.modfilters.modelValue ? this.modfilters.modelValue : "",
          size: this.modfilters.size ? this.modfilters.size : "",
          modCategory: this.modfilters.modCategoryValue
            ? this.modfilters.modCategoryValue
            : "",
          year: this.modfilters.yearValue,
          skillLevel: this.modfilters.skillLevel
            ? this.modfilters.skillLevel
            : "",
          timerange: this.modfilters.timerange,
          startDate: this.modfilters.startDate,
          endDate: this.modfilters.endDate,
          search: this.modfilters.search,
        };
    }
    let isUser = this.checkLoggedinUser();
    if (isUser) {
      filters["uid"] = this.credentials.credentials.id;
    }
    if (this.userId) {
      filters["userid"] = this.userId;
    }
    if(ModID.page){
      filters["page"] = this.page;
      console.log("enter in page", ModID.page);
    }else{
      filters["page"] = this.page;
    }
    
    filters["count"] = 20;
    if (this.seeAllmods) {
      filters["sortType"] = this.sortBy;
    }

    if (this.credentials)
      if (this.featured != undefined && this.featured != null)
        filters["isFeatured"] = this.featured;
    if (filters.type && filters.type == "follwedInterest") {
      this.getMyFollowedInterestMods(filters);
    } else if (filters.type && filters.type == "timeline") {
      this.getMyMemberInterestMods(filters);
    } else {
      this.getAllMods(filters);
    }
    //       this.pageService.getMyMods(filters).subscribe(
    //   (res: any) => {
    //     this.allMods = [];
    //     if (res.success) {
    //       this.allMods = res.data.map((cat) => {
    //         return {
    //           id: cat.id,
    //           slug: cat.slug,
    //           description: cat.description,
    //           isCommentDisabled: cat.isCommentDisabled,
    //           name: cat.name,
    //           registeredRV: cat.registeredRV,
    //           isFeatured: cat.isFeatured,
    //           beforeImages: cat.beforeImages,
    //           afterImages: cat.afterImages,
    //           status: cat.status,
    //           skillLevel: cat.skillLevel,
    //           time: this.pageService.timeDiffCalc(
    //             new Date(cat.updatedAt).getTime(),
    //             this.today.getTime()
    //           ),
    //           createdAt: cat.createdAt,
    //           updatedAt: cat.updatedAt,
    //           addedBy: cat.addedBy,
    //           catName: cat.modCategorydetails.name,
    //           rvType: this.sharedService.getRvType(cat.rvType),
    //           year: cat.year,
    //           series: cat.seriesdetails,
    //           make: cat.makedetails,
    //           model: cat.model,
    //           isEdit: cat.addedBy == this.userId ? true : false,
    //           isFavourite: cat.isFavourite,
    //           likesTotal: cat.likesTotal,
    //           totalShare: cat.totalShare,
    //           commentTotal: cat.commentTotal,
    //           totalTime: cat.totalTime,
    //           addedBydetails: cat.addedBydetails,
    //           timerange: cat.timerange,
    //           whatIDid: cat.whatIDid.replace(/<img[^>]*>/g, ""),
    //           isPending: cat.isPending,
    //           isFollow: cat.isFollow,
    //           isFriend: cat.isFriend,
    //           likestatus:cat.likestatus,
    //           sizedetails: cat.sizedetails,
    //           typeOfPost: 'mod',
    //               showMore: false
    //         };
    //       });
    //       for (let index = 0; index < res.data.length; index++) {
    //         let new_element = {
    //           typeOfPost:'google-ad'
    //         }
    //         if (res.data.length<4 && index==res.data.length-1) {
    //            this.allMods.splice(res.data.length+1, 0, new_element);
    //         }
    //          else if (res.data.length>=4 && index % 4 == 0 && index!=0) {
    //            this.allMods.splice(index-1, 0, new_element);
    //         } else {

    //         }

    //       }
    //       this.updatedata()
    //     } else {
    //       this.toastr.error(res.error.message, "Error");
    //     }
    //     this.spinner.hide();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //   }
    // );
  }

  getAllMods(filters) {
    this.isLoading = true;
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    this.pageService.getMyMods(filters).subscribe(
      (res: any) => {
        if (res.success) {
          this.allMods = [];
          this.totalModsCount = res.total;
          this.allMods = res.data.map((cat) => {
            return {
              id: cat.id,
              slug: cat.slug,
              description: cat.description,
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
              addedBy: cat.addedBy,
              catName: cat.modCategorydetails.name,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              series: cat.seriesdetails,
              make: cat.makedetails,
              model: cat.model,
              isEdit: cat.addedBy == this.userId ? true : false,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              addedBydetails: cat.addedBydetails,
              timerange: cat.timerange,
              // whatIDid: cat.whatIDid.replace(/<img[^>]*>/g, ""),
              isPending: cat.isPending,
              isFollow: cat.isFollow,
              isFriend: cat.isFriend,
              likestatus: cat.likestatus,
              sizedetails: cat.sizedetails,
              ownRV: cat.addedBydetails.ownRV,
              typeOfPost: "mod",
              newW: cat.whatIDid.replace(urlRegex, function (url) {
                return (
                  '<a  href="' + url + '"  target="_blank" >' + url + "</a>"
                );
              }),
              showMore: false,
            };
          });

          console.log("test whatidid", this.newWhatIdid);
          let loopcount = res.data.length / 5;
          for (let index = 0; index <= res.data.length + loopcount; index++) {
            let new_element = {
              typeOfPost: "google-ad",
            };
            // if (res.data.length < 4) {
            // } else if (res.data.length >= 4 && index > 14 && index % 13 == 0) {
            //   this.allMods.splice(index - 1, 0, new_element);
            // } else if (
            //   res.data.length >= 12 &&
            //   index == 13 &&
            //   index % 13 == 0
            // ) {
            //   this.allMods.splice(index - 1, 0, new_element);
            // } else {
            // }
            if (res.data.length < 4 && index == res.data.length - 1) {
              this.allMods.splice(res.data.length + 1, 0, new_element);
            } else if (res.data.length >= 4 && index % 4 == 0 && index != 0) {
              console.log(index, "mod index");
              this.allMods.splice(index - 1, 0, new_element);
            } else {
            }
          }
          // this.seemodCount.emit(this.allMods.length);
          this.updatedata();
          setTimeout(() => {
            this.modScroll();
            setTimeout(() => {
              var modobj = {};
              localStorage.setItem("modobj", JSON.stringify(modobj));
            }, 2500);
          }, 2000);
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  getMyFollowedInterestMods(filters) {
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    this.isLoading = true;
    this.pageService.getMyFollowedInterestMods(filters).subscribe(
      (res: any) => {
        if (res.success) {
          this.allMods = [];
          this.totalModsCount = res.total;
          this.allMods = res.data.map((cat) => {
            return {
              id: cat.id,
              slug: cat.slug,
              description: cat.description,
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
              addedBy: cat.addedBy,
              catName: cat.modCategorydetails.name,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              series: cat.seriesdetails,
              make: cat.makedetails,
              model: cat.model,
              isEdit: cat.addedBy == this.userId ? true : false,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              addedBydetails: cat.addedBydetails,
              timerange: cat.timerange,
              // whatIDid: cat.whatIDid.replace(/<img[^>]*>/g, ""),
              newW: cat.whatIDid.replace(urlRegex, function (url) {
                return (
                  '<a  href="' + url + '"  target="_blank" >' + url + "</a>"
                );
              }),
              isPending: cat.isPending,
              isFollow: cat.isFollow,
              isFriend: cat.isFriend,
              likestatus: cat.likestatus,
              sizedetails: cat.sizedetails,
              typeOfPost: "mod",
              showMore: false,
            };
          });
          let loopcount = res.data.length / 5;
          for (let index = 0; index <= res.data.length + loopcount; index++) {
            let new_element = {
              typeOfPost: "google-ad",
            };
            if (res.data.length < 4 && index == res.data.length - 1) {
              this.allMods.splice(res.data.length + 1, 0, new_element);
            } else if (res.data.length >= 4 && index % 4 == 0 && index != 0) {
              this.allMods.splice(index - 1, 0, new_element);
            } else {
            }
          }
          // this.seemodCount.emit(this.allMods.length);
          this.updatedata();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  getMyMemberInterestMods(filters) {
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    this.isLoading = true;
    this.pageService.getMyMemberInterestMods(filters).subscribe(
      (res: any) => {
        if (res.success) {
          this.allMods = [];
          this.totalModsCount = res.total;
          this.allMods = res.data.map((cat) => {
            return {
              id: cat.id,
              slug: cat.slug,
              description: cat.description,
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
              addedBy: cat.addedBy,
              catName: cat.modCategorydetails.name,
              rvType: this.sharedService.getRvType(cat.rvType),
              year: cat.year,
              series: cat.seriesdetails,
              make: cat.makedetails,
              model: cat.model,
              isEdit: cat.addedBy == this.userId ? true : false,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              addedBydetails: cat.addedBydetails,
              timerange: cat.timerange,
              // whatIDid: cat.whatIDid.replace(/<img[^>]*>/g, ""),
              newW: cat.whatIDid.replace(urlRegex, function (url) {
                return (
                  '<a  href="' + url + '"  target="_blank" >' + url + "</a>"
                );
              }),
              isPending: cat.isPending,
              isFollow: cat.isFollow,
              isFriend: cat.isFriend,
              likestatus: cat.likestatus,
              sizedetails: cat.sizedetails,
              typeOfPost: "mod",
              showMore: false,
            };
          });
          let loopcount = res.data.length / 5;
          for (let index = 0; index <= res.data.length + loopcount; index++) {
            let new_element = {
              typeOfPost: "google-ad",
            };
            if (res.data.length < 4 && index == res.data.length - 1) {
              this.allMods.splice(res.data.length + 1, 0, new_element);
            } else if (res.data.length >= 4 && index % 4 == 0 && index != 0) {
              this.allMods.splice(index - 1, 0, new_element);
            } else {
            }
          }
          // this.seemodCount.emit(res.data.length);
          this.updatedata();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
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
        let data = {
          id: id,
        };
        this.isLoading = false;
        this.sharedService.deleteModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.allMods.splice(index, 1);
              this.toastr.success(res.message);
            } else {
              this.toastr.error(res.error.message, "Error");
            }
            this.isLoading = false;
          },
          (err) => {
            this.isLoading = false;
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
      // this.toastr.success('Registered Successfully. Please verify your email!');
    });
  }

  followNotificationByclick() {
    console.log("name", this.modfilters);
    let filtermod1 = {
      interestArray: [
        {
          categoryType: "modpost",
          categoryId: this.modfilters.modCategoryValue,
          rvClass: this.modfilters.class,
          rvMake: this.modfilters.make,
          rvSeries: this.modfilters.series,
          rvModel: this.modfilters.modelValue,
          rvYear: this.modfilters.year,
          size: this.modfilters.size,
          difficulty: this.modfilters.skillLevel,
          timerange: this.modfilters.timerange,
        },
      ],
    };
    this.isUser = this.checkLoggedinUser();
    if (this.isUser) {
      this.pageService.followNotification(filtermod1).subscribe(
        (res: any) => {
          if (res.success) {
            this.isfollow = res.isFollowed;
          }
          if (this.isfollow == false) {
            this.onFollowInterestSubmitted();
          } else {
            // window.scrollTo(0, 0);
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
    if (!this.isUser) {
      this.onClickImageWithoutLogin(filtermod1);
    }
  }
  unfollowNotificationByclick() {
    console.log("name", this.modfilters);
    let filtermod1 = {
      interestArray: [
        {
          categoryType: "modpost",
          categoryId: this.modfilters.modCategoryValue,
          rvClass: this.modfilters.class,
          rvMake: this.modfilters.make,
          rvSeries: this.modfilters.series,
          rvModel: this.modfilters.modelValue,
          rvYear: this.modfilters.year,
          size: this.modfilters.size,
          difficulty: this.modfilters.skillLevel,
          timerange: this.modfilters.timerange,
        },
      ],
    };
    this.isUser = this.checkLoggedinUser();
    if (this.isUser) {
      this.pageService.unfollowNotification(filtermod1).subscribe(
        (res: any) => {
          if (res.success) {
            this.isfollow = res.isFollowed;
            this._bs.updateFollowListButton.next(res.isFollowed);
          } else {
            // window.scrollTo(0, 0);
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
    if (!this.isUser) {
      this.onClickImageWithoutLogin(filtermod1);
    }
  }
  getMakeSeriesClass() {
    this.pageService.getMakeSeriesClass().subscribe(
      (res: any) => {
        if (res.success) {
          this.makeSeriesClass = res.make;
          this.classdata = res.class;

          console.log("this.makeSeriesClass", this.makeSeriesClass);
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

  onFollowInterestSubmitted() {
    let filtermod1 = {
      interestArray: [
        {
          categoryType: "modpost",
          categoryId: this.modfilters.modCategory,
          rvClass: this.modfilters.class,
          rvMake: this.modfilters.make,
          rvSeries: this.modfilters.series,
          rvModel: this.modfilters.modelValue,
          rvYear: this.modfilters.year,
          size: this.modfilters.size,
          difficulty: this.modfilters.skillLevel,
          timerange: this.modfilters.timerange,
        },
      ],
    };
    if (this.isUser) {
      this.pageService.addFollowCategories(filtermod1).subscribe(
        (res: any) => {
          if (res.success) {
            this.followNotification();
          } else {
            this.toastr.error(res.error.message, "Error");
          }
        },
        (err) => {}
      );
    } else if (!this.isUser) {
      this.onClickImage();
    }
  }

  followNotification() {
    console.log("name", this.modfilters);
    let filtermod1 = {
      interestArray: [
        {
          categoryType: "modpost",
          categoryId: this.modfilters.modCategory,
          rvClass: this.modfilters.class,
          rvMake: this.modfilters.make,
          rvSeries: this.modfilters.series,
          rvModel: this.modfilters.modelValue,
          rvYear: this.modfilters.year,
          size: this.modfilters.size,
          difficulty: this.modfilters.skillLevel,
          timerange: this.modfilters.timerange,
        },
      ],
    };
    if (this.isUser) {
      this.pageService.followNotification(filtermod1).subscribe(
        (res: any) => {
          if (res.success) {
            this.isfollow = res.isFollowed;
            this._bs.updateFollowListButton.next(this.isfollow);
          } else {
            // window.scrollTo(0, 0);
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
    } else if (!this.isUser) {
    }
  }
  openLikeModal(item: any) {
    if (item.likes == 0) return;

    localStorage.setItem("type", "");
    localStorage.setItem("postId", "");
    localStorage.setItem(
      "type",
      item.activityType ? item.activityType : "modPost"
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
  replyClick(p: any) {
    if (p == this.replyForm) {
      this.replyForm = 0;
    } else {
      this.replyForm = p;
    }
  }
  replyComment(postId, commentId: any, replyon: any, type, to_user_id) {
    let data = {};
    if (replyon == "comment") {
      if (this.replyOnPost == "") {
        return;
      }
      data = {
        postId: postId,
        // comment: this.replyOnPost,
        comment: filter.clean(this.replyOnPost),
        postType: type,
      };
    }
    if (replyon == "reply") {
      if (this.replyOnPost2 == "") {
        return;
      }
      data = {
        postId: postId,
        // comment: this.replyOnPost2,
        comment: filter.clean(this.replyOnPost2),
        postType: type,
      };
    }
    if (replyon == "replyonreply") {
      if (this.replyOnPost3 == "") {
        return;
      }
      data = {
        postId: postId,
        comment: this.replyOnPost3,
        postType: "modPost",
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
          // this.getGroupPosts()
          this.replyOnPost = "";
          this.replyOnPost2 = "";
          this.replyForm = "";
          this.allMods[this.postIndex].commentTotal = res.commentdata.count;
          this.getComments(postId, type);

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
  modScroll() {
    var ModID = JSON.parse(localStorage.getItem("modobj"));
    if(ModID.id){
      let element: any = document.getElementById(ModID.id);
      console.log(element,"element")
      var headerOffset = 60;
      var elementPosition = element.getBoundingClientRect().bottom;
      var offsetPosition = elementPosition - headerOffset;
      element.scrollIntoView({ top: offsetPosition, behavior: "smooth" });
    }
  }
  addComment(postId, commentId: any, type, to_user_id) {
    if (this.commentOnPost != "") {
      let data = {
        postId: postId,
        // comment: this.commentOnPost,
        comment: filter.clean(this.commentOnPost),
        postType: type,
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
            this.allMods[this.postIndex].commentTotal = res.commentdata.count;
            // this.toastr.success(res.message, "Success");
            this.getComments(postId, type);
            if (type == "modPost") {
              this.readmoreLess(this.postIndex, "add");
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
  }
  getComments(postId, type) {
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
              fbId: cat.addedBy.fbId,
              slug: cat.addedBy.slug,
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
                        userFullName: cat2.addedBy.fullName,
                        slug: cat2.addedBy.slug,
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
        this.loader = false;
        // this.spinner.hide();
      },
      (err) => {
        this.loader = false;
        // this.spinner.hide();
      }
    );
  }
  deleteComment(
    commentId,
    index1,
    index2: any = "",
    index3: any = "",
    type,
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
          this.allMods[this.postIndex].commentTotal = res.commentTotal;
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
          this.getComments(postId, type);
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

  readmoreLess(i, status = "") {
    if (this.postIndex != i) this.allComments = [];
    this.postIndex = i;
    // this.getComments(postId)
    for (let j = 0; j < this.allMods.length; j++) {
      if (i != j) {
        this.allMods[j].showMore = false;
      } else {
        this.allMods[i].showMore = !this.allMods[i].showMore;
      }
    }
    if (status == "add") {
      this.allMods[i].showMore = true;
    }
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
          this.allMods[index].likesTotal = res.data.count;
          this.allMods[index].likestatus = res.data.likestatus;
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
  openReport(id, key) {
    this.modalReference3 = this.modalService.open(ReportSectionComponent);
    let data = {
      key: key,
      id: id,
    };
    this.modalReference3.componentInstance.reportData = data;
  }
  htmlLength(html = "", length) {
    if (html && html.length > length) {
      return html.slice(0, length) + "...";
    } else {
      return html;
    }
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
  copyLink(obj) {
    console.log("obj", obj);
    this.Copylink = this._baseUrl + "mods/" + obj.slug;
    let value = this.Copylink;
    navigator.clipboard.writeText(value);
    // this.toastr.success("Copied URL to clipboard!");
    // alert("Copied URL to clipboard!");
    this.openLink();
    this.Onshare(obj, "copyClick");
  }
  openLink() {
    this.viewLink = true;
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
  onClickImage() {
    this.sharedService.onClickImageWithoutLogin();
  }
  onClickImageWithoutLogin(interestArray) {
    if (this.credentials) {
      let fireData: any = {
        title: "Sign Up or Login to see more community content. Its free!",
        // title:
        //   "To see more community content, click Sign Up to join, it’s free!",
        confirmButtonText: "Click here to Sign Up or Login",
        showCancelButton: true,
        allowOutsideClick: false,
        cancelButtonColor: "#ff0000",
        cancelButtonText: "Cancel",
      };
      Swal.fire(fireData).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/auth/signup"]);
          // let url = "/mods/" + this.slug;
          localStorage.setItem("interestArray", JSON.stringify(interestArray));
        }
      });
    }
  }
  goToModDetail(url, param, modid) {
    console.log("modid", modid);
    var modobj = { id: modid, page: this.page, sortBy: this.sortBy};
    localStorage.setItem("modobj", JSON.stringify(modobj));
    if (!this.checkLoggedinUser()) {
      // this.onClickImage();
      window.location.href = window.location.origin + url + "/" + param;
    } else if (this.checkLoggedinUser()) {
      // this.onClickImage();
      window.location.href = window.location.origin + url + "/" + param;
    }
    // window.location.href = window.location.origin + url + "/" + param;
    // window.location.href = window.location.origin + url + "?id=" + param;
  }

  favourite(postId, index) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    let data = {
      postId: postId,
      userId: this.credentials.credentials.id,
      postType: "modPost",
    };
    this.spinner.show();

    this.pageService.addFavourite(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.allMods[index].isFavourite = !this.allMods[index].isFavourite;
          this.getMyMods();
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
  followMod(modDetail, i) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    let data = {
      followFriendID: modDetail.addedBydetails._id,
      type: "follower",
    };
    this.spinner.show();
    this.sharedService.post(data, "follow/friend").subscribe(
      (res: any) => {
        if (res.success) {
          this.allMods
            .filter((mod) => mod.addedBydetails._id == res.friendId)
            .map((mod) => {
              mod.isFollow = res.isFollow;
              return mod;
            });
          //  this.allMods[i].isFollow = res.isFollow;
          this.sendNotif(modDetail.addedBydetails._id);
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

  followFriend(modDetail, i) {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.checkLoggedinUser()) {
        this.onClickImage();
        return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
      }
      this.spinner.show();
      let data = {
        requesterId: this.credentials.credentials.id,
        recipientId: modDetail.addedBydetails._id,
      };
      this.sharedService.post(data, "add/friends").subscribe(
        (res: any) => {
          console.log(res);
          this.spinner.hide();
          if (res.success) {
            this.sendNotif(modDetail.addedBydetails._id);
            // this.allMods[i].isPending = res.isPending;
            // this.allMods[i].isFriend = res.isFriend;
            this.toastr.success(res.message);
            this.allMods
              .filter((mod) => mod.addedBydetails._id == res.friendId)
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
  setShareData(item) {
    console.log(item, "facebook item");
    if (!item) return;
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
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
    this.meta.addTag({ property: "og:description", content: item.whatIDid });
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(function () {
        a2a.init_all();
      }, 1000);
    }
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
        this.loader = true;
        let data = {
          id: id,
        };
        this.sharedService.deleteModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.allMods.splice(index, 1);
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

  sendNotif(id) {
    let data = {
      user_id: id,
    };
    this.chatService.sendNotif(data);
  }
  unFriend(modDetail, i) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.spinner.show();

    this.pageService.unFriend(modDetail.addedBydetails._id).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          // this.allMods[i].isPending = res.isPending;
          // this.allMods[i].isFriend = res.isFriend;

          // this.getMyMods();
          this.allMods
            .filter((mod) => mod.addedBydetails._id == res.friendId)
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

    this.pageService.cancelRequest(modDetail.addedBydetails._id).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          // this.allMods[i].isPending = res.isPending;
          // this.allMods[i].isFriend = res.isFriend;
          // this.getMyMods();
          this.allMods
            .filter((mod) => mod.addedBydetails._id == res.friendId)
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

  updatedata() {
    if (this.seeAllmods) {
      this._titleService.setTitle("The Top RV Mods");
      // this.meta.updateTag({
      //   name: "description",
      //   content:
      //    "Explore our categorized mod database, we even include a class for custom builds. Filter search results based on the RV class, make, model, year, type of mod and size.Learn what it takes to tackle any mod that inspires you.",
      // });
      this.meta.updateTag({
        name: "title",
        content: "The Top RV Mods",
      });
    }
  }
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }
}
