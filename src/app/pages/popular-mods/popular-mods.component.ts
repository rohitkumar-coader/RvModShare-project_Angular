import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, Input, OnInit, PLATFORM_ID } from "@angular/core";
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
import { MagnifyImageComponent } from "../../shared/shared/magnify-image/magnify-image.component";
declare var a2a: any;
declare var require: any;
var Filter = require("bad-words"),
  filter = new Filter();
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

@Component({
  selector: "app-popular-mods",
  templateUrl: "./popular-mods.component.html",
  styleUrls: ["./popular-mods.component.css"],
})
export class PopularModsComponent implements OnInit {
  viewModal = false;
  allMods = [];
  _host = environment.url;
  _baseUrl = window.location.origin + "/";
  // _baseUrl = "https://www.rvmodshare.com/";
  chatService: any;
  fullCls = false;
  ModRVfriends: any = [];
  smallCls = true;
  @Input() userId: any;
  modalReference3: any;
  showViewMore: Boolean = false;
  showViewMoreFollowings: boolean = false;
  // @Input() modfilters: any;
  // @Input() seeAllmods: any;
  suggestedFriendInterval: any;
  getFriendList: any = [];
  searchKeyword: any = "";
  suggestedRVfriends: any;
  // @Input() featured: any;
  totalComments = 0;
  replyForm: any;
  commentOnPost: any;
  Copylink: string = "";
  replyOnPost: any;
  replyOnPost2: any;
  replyOnPost3: any;
  allComments: Array<any> = [];
  commentData: any;
  editComment = false;
  editReply = false;
  postIndex: any;
  newBadWords = environment.bad_word;

  loader = false;
  today = new Date();
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
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dashService: DashboardService,
    public sharedService: SharedService,
    private _sharedService: SharedService,
    public _bs: BehaviorService,
    private _titleService: Title,
    // private credentialsService: CredentialsService,
    public credentials: CredentialsService,
    private formBuilder: FormBuilder,
    private pageService: PagesService,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // this._bs.modFilter.subscribe((elem) => {
    //   console.log("in subscribe filter mod");
    //   if (elem != null && elem != undefined) {
    //     this.getMyMods();
    //   }
    // });
  }

  ngOnInit() {
    this.getSuggestedRVfriendList();
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    this.getMyMods();
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
  getSuggestedRVfriendList() {
    clearInterval(this.suggestedFriendInterval);
    // if(this.searchKeyword!=''){
    let path = "suggestedRV/friendslist?search=" + this.searchKeyword;
    // let path = "suggestedRV/friendslist?search=" + this.searchKeyword;
    this._sharedService.get(path).subscribe(
      (res: any) => {
        if (res.success) {
          this.suggestedRVfriends = res.data.map((cat) => {
            return {
              id: cat.id,
              userData: cat,
              model: cat.model,
              ownRv: cat.ownRV,
              series: cat.series ? cat.series.name : "",
              make: cat.make ? cat.make.name : "",
              rvType: this._sharedService.getRvType(cat.rvType),
              year: cat.year,
              totalMods: cat.totalMods,
              isFollow: cat.isFollow,
            };
          });
          if (this.suggestedRVfriends.length > 3) {
            this.showViewMoreFollowings = true;
          } else {
            this.showViewMoreFollowings = false;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
    // }else{
    //   this.suggestedRVfriends=[];
    // }
  }
  followMod(id, index) {
    let data = {
      followFriendID: id,
      type: "follower",
    };
    // this.spinner.show();
    this._sharedService.post(data, "follow/friend").subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(id);
          this.getSuggestedRVfriendList();
          if (res.isFollow) {
            this.suggestedRVfriends.splice(index, 1);
          } else {
            this.suggestedRVfriends[index].isFollow = res.isFollow;
          }
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        this.toastr.error(err, "Error");
        // this.spinner.hide();
      }
    );
  }

  getMyMods() {
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    let filters: any = {};
    this.spinner.show();
    console.log("in get my fav,profile, mods", this.modfilters);
    if (this.modfilters != undefined && this.modfilters != null)
      filters = {
        // modid: this.modfilters.modid
        //   ? this.modfilters.modid
        //   : "",
        // type: "PopularMods",
        // class: this.modfilters.rvTypeFilter ? this.modfilters.rvTypeFilter : "",
        // make: this.modfilters.makeFilter ? this.modfilters.makeFilter : "",
        // series: this.modfilters.modelValue ? this.modfilters.modelValue : "",
        // size: this.modfilters.size ? this.modfilters.size : "",
        // modCategory: this.modfilters.modCategoryValue
        //   ? this.modfilters.modCategoryValue
        //   : "",
        // year: this.modfilters.yearValue,
        // skillLevel: this.modfilters.skillLevel
        //   ? this.modfilters.skillLevel
        //   : "",
        // timerange: this.modfilters.timerange,
        // startDate: this.modfilters.startDate,
        // endDate: this.modfilters.endDate,
        // search: this.modfilters.search,
      };

    let isUser = this.checkLoggedinUser();
    // if (isUser) {
    //   filters["uid"] = this.credentials.credentials.id;
    // }
    // if (this.userId) {
    //   filters["userid"] = this.userId;
    // }
    if (this.credentials)
      // if (this.featured != undefined && this.featured != null)
      //   filters["isFeatured"] = this.featured;

      this.pageService.getPopularMods(filters).subscribe(
        (res: any) => {
          this.allMods = [];
          if (res.success) {
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
                  return '<a  href="' + url + '"  target="_blank" >' + url + "</a>";
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
            if (this.allMods.length > 0) {
              this.showViewMore = true;
            } else {
              this.showViewMore = false;
            }
            for (let index = 0; index < res.data.length; index++) {
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
        this.spinner.show();
        this.sharedService.deleteModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.allMods.splice(index, 1);
              this.toastr.success(res.message);
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
    this.openModal();
    this.Onshare(obj, "copyClick");
  }
  openModal() {
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
  onClickImage() {
    this.sharedService.onClickImageWithoutLogin();
  }
  goToModDetail(url, param) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    window.location.href = window.location.origin + url + "/" + param;
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
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }
}
