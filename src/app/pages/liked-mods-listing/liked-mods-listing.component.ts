// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-liked-mods-listing',
//   templateUrl: './liked-mods-listing.component.html',
//   styleUrls: ['./liked-mods-listing.component.css']
// })
// export class LikedModsListingComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import {
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { categories } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NguCarousel, NguCarouselConfig } from "@ngu/carousel";
// import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from "ngx-toastr";
import { CredentialsService } from "src/app/auth/credentials.service";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";
import { ReportSectionComponent } from "../report-section/report-section.component";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { SharedService } from "src/app/shared/shared.service";
import { ShareModalComponent } from "../share-modal/share-modal.component";
import { BehaviorService } from "src/app/shared/behavior.service";
import { LikeListingModalComponent } from "../like-listing-modal/like-listing-modal.component";
import { PostSharedWithComponent } from "../post-shared-with/post-shared-with.component";
import { ChatService } from "src/app/chat.service";
import { AppInjector } from "../../app.module";
import { isPlatformBrowser } from "@angular/common";
import { Meta } from "@angular/platform-browser";
import { MagnifyImageComponent } from "src/app/shared/shared/magnify-image/magnify-image.component";
declare var require: any;
var Filter = require("bad-words"),
  filter = new Filter();
  declare var a2a: any;
@Component({
  selector: "app-liked-mods-listing",
  templateUrl: "./liked-mods-listing.component.html",
  styleUrls: ["./liked-mods-listing.component.css"],
})
export class LikedModsListingComponent implements OnInit {
  chatService: any;
  newBadWords = environment.bad_word;
  @Input() showModsTab: any;

  // datas=[]
  _host = environment.url;
  // groups = [
  // ];
  posts = [];
  postIndex: any;
  editComment = false;
  editReply = false;
  commentData: any;
  modalReference3: any;
  totalComments = 0;
  replyForm: any;
  commentOnPost: any;
  replyOnPost: any;
  replyOnPost2: any;
  replyOnPost3: any;
  allComments: Array<any> = [];
  loader = false;
  user: any;
  isFavourate = false;
  myModes = [];
  microModes = [];
  miniModes = [];
  mediumModes = [];
  megaModes = [];
  massiveModes = [];
  isLoading: boolean = false;
  today = new Date();
  slickInit(e) {}
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
  breakpoint(e) {
    console.log("breakpoint");
  }

  afterChange(e) {
    console.log("afterChange");
  }

  beforeChange(e) {
    console.log("beforeChange");
  }

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _bs: BehaviorService,
    private pageService: PagesService,
    private _route: ActivatedRoute,
    public credentials: CredentialsService,
    private sharedService: SharedService,
    private meta: Meta,
    // public chatService: ChatService
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // filter.addWords(...this.newBadWords);
  }
  public carouselTile: NguCarouselConfig;
  @ViewChild("carousel", { static: false }) carousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig;
  carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  mostModes = [0, 1, 2, 3, 4, 5];
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    let user = localStorage.getItem("user");
    this.user = JSON.parse(user);
    // this.user = JSON.parse(user);
    this.carouselConfig = {
      grid: { xs: 2, sm: 3, md: 3, lg: 4, all: 0 },
      load: 3,
      interval: { timing: 4000, initialDelay: 1000 },
      loop: true,
      touch: true,
      velocity: 0.2,
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.showModsTab.currentValue == true) {
      this.getFollowMods();
    }
  }
  public carouselTileLoad(evt: any) {
    const len = this.carouselTileItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 10; i++) {
        this.carouselTileItems.push(i);
      }
    }
  }
  openLikeModal(item: any) {
    console.log("item", item);

    if (item.likes == 0) return;

    localStorage.setItem("type", "");
    localStorage.setItem("postId", "");
    localStorage.setItem(
      "type",
      item.activityType ? item.activityType : "modPost"
    );
    localStorage.setItem("postId", item.id);
    const modalRef = this.modalService.open(LikeListingModalComponent);
    modalRef.componentInstance.name = "Link Modal";
  }
  getFollowMods() {
    // this.spinner.show();

    this.isLoading = true;

    this.pageService.getLikedMods().subscribe(
      (res: any) => {
        if (res.success) {
          this.posts = res.data.map((cat) => {
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              isCommentDisabled: cat.isCommentDisabled,
              year: cat.year,
              registeredRV: cat.registeredRV,
              series: cat.seriesdetails,
              make: cat.makedetails,
              model: cat.model,
              slug: cat.slug,
              rvType: this.sharedService.getRvType(cat.rvType),
              whomSharedByName: cat.whomSharedByName,
              whomSharedById: cat.whomSharedById,
              sharedName: cat.sharedName,
              originalAddedBy: cat.originalAddedBy,
              addedBydetails: cat.addedBydetails,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              addedBy: cat.addedBy,
              likestatus: true,
              updatedAt: cat.updatedAt,
              comments: cat.commentTotal,
              likes: cat.likesTotal,
              totalShare: cat.totalShare,
              showMore: false,
            };
          });

          this.pageService.setModData(this.myModes);
          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      (err) => {
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
  openshare(postData, id, postSection) {
    let data = {
      postId: id,
      postData: postData,
      postType: "modPost",
      postSection: postSection,
    };
    this._bs.sharedPostData.next(data);
    const modalRef = this.modalService.open(ShareModalComponent);
    modalRef.componentInstance.name = "World";
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
  // replyComment(postId, commentId: any, replyon: any, type, to_user_id) {
  //   let data = {};
  //   if (replyon == "comment") {
  //     if (this.replyOnPost == "") {
  //       return;
  //     }
  //     data = {
  //       postId: postId,
  //       comment: filter.clean(this.replyOnPost),
  //       postType: type,
  //     };
  //   }
  //   if (replyon == "reply") {
  //     if (this.replyOnPost2 == "") {
  //       return;
  //     }
  //     data = {
  //       postId: postId,
  //       comment: this.replyOnPost2,
  //       // comment: filter.clean(this.replyOnPost2),
  //       postType: type,
  //     };
  //   }

  //   if (commentId) {
  //     data["commentId"] = commentId;
  //   }

  //   this.loader = true;
  //   // this.spinner.show()
  //   this.pageService.addComment(data).subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         // this.getGroupPosts()
  //         this.sendNotif(to_user_id);
  //         this.replyOnPost = "";
  //         this.replyOnPost2 = "";
  //         this.posts[this.postIndex].comments = res.commentdata.count;
  //         this.getComments(postId, type);
  //         this.replyForm = "";
  //         // this.toastr.success(res.message, "Success");
  //         // this.getComments(postId)
  //         // this.groupForm.patchValue({ image: this.groupImage })
  //       } else {
  //         window.scrollTo(0, 0);
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       // this.spinner.hide();
  //       this.loader = false;
  //     },
  //     (err) => {
  //       // this.spinner.hide();
  //       this.loader = false;
  //       this.toastr.error(
  //         "There are some errors, please try again after some time !",
  //         "Error"
  //       );
  //     }
  //   );
  // }
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
          this.replyOnPost3 = "";
          this.replyForm = "";
          this.posts[this.postIndex].comments = res.commentdata.count;
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
            this.posts[this.postIndex].comments = res.commentdata.count;
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
  openReport(id, key) {
    this.modalReference3 = this.modalService.open(ReportSectionComponent);
    let data = {
      key: key,
      id: id,
    };
    this.modalReference3.componentInstance.reportData = data;
  }
  favourite(postId, type, index) {
    console.log(postId, type, index, "favourite sbfjfnjkfnsdjk");
    let data = {
      postId: postId,
      userId: this.credentials.credentials.id,
      postType: "modPost",
    };
    // this.isFavourate = !postId.isFavourite;

    this.loader = true;
    this.pageService.addFavourite(data).subscribe(
      (res: any) => {
        if (res.success) {
          if (type == "megaModes") {
            this.megaModes[index].isFavourite =
              !this.megaModes[index].isFavourite;
          }
          if (type == "mediumModes") {
            this.mediumModes[index].isFavourite =
              !this.mediumModes[index].isFavourite;
          }
          if (type == "massiveModes") {
            this.massiveModes[index].isFavourite =
              !this.massiveModes[index].isFavourite;
          }
          if (type == "microModes") {
            this.microModes[index].isFavourite =
              !this.microModes[index].isFavourite;
          }
          // this.toastr.success(res.message)
          // this.getDifferentMods();
          this.loader = false;
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
  likePost(postId, type, index, to_user_id) {
    let data = {
      postId: postId,
      likeBy: this.user.id,
      postType: type,
    };
    // this.spinner.show();
    this.pageService.addLike(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(to_user_id);
          this.posts[index].likes = res.data.count;
          this.posts[index].likestatus = res.data.likestatus;
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

  sendNotif(id) {
    let data = {
      user_id: id,
    };
    console.log("send notif data", data);
    this.chatService.sendNotif(data);
  }
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }
  getComments(postId, type) {
    console.log(type);
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
    // this.pageService.getComments(data).subscribe(
    //   (res: any) => {
    //     if (res.success) {
    //       this.allComments = res.data.map((cat) => {
    //         return {
    //           id: cat.id,
    //           comment: cat.comment,
    //           userFullName: cat.addedBy.fullName
    //             ? cat.addedBy.fullName
    //             : cat.addedBy.displayName,
    //           userImage: cat.addedBy.image,
    //           userId: cat.addedBy.id,
    //           fbId: cat.addedBy.fbId,
    //           gId: cat.addedBy.gId,
    //           time: this.pageService.timeDiffCalc(
    //             new Date(cat.updatedAt).getTime(),
    //             this.today.getTime()
    //           ),
    //           createdAt: cat.createdAt,
    //           updatedAt: cat.updatedAt,
    //           showMore: false,
    //           reply:
    //             cat.reply && cat.reply.length > 0
    //               ? cat.reply.map((cat2) => {
    //                   return {
    //                     id: cat2.id,
    //                     comment: cat2.comment,
    //                     commentId: cat2.commentId,
    //                     userFullName: cat2.addedBy.fullName
    //                       ? cat2.addedBy.fullName
    //                       : cat2.addedBy.displayName,
    //                     userImage: cat2.addedBy.image,
    //                     userId: cat2.addedBy.id,
    //                     fbId: cat2.addedBy.fbId,
    //                     gId: cat2.addedBy.gId,
    //                     time: this.pageService.timeDiffCalc(
    //                       new Date(cat2.updatedAt).getTime(),
    //                       this.today.getTime()
    //                     ),
    //                     createdAt: cat2.createdAt,
    //                     updatedAt: cat2.updatedAt,
    //                     showMore: false,
    //                   };
    //                 })
    //               : cat.reply,
    //         };
    //       });
    //       // this.joinedGroupMembers = res.data;
    //       this.totalComments = res.total;
    //       // this.spinner.hide();
    //     } else {
    //       this.toastr.error(res.error.message, "Error");
    //     }
    //     // this.spinner.hide();
    //     this.loader = false;
    //   },
    //   (err) => {
    //     this.loader = false;
    //     // this.spinner.hide();
    //   }
    // );
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
  // deleteComment(commentId, index1, index2: any = "", type) {
  //   let object = {
  //     id: commentId,
  //   };
  //   this.sharedService.deleteComment(object).subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         if (type == "comment") {
  //           this.allComments.splice(index1, 1);
  //         }
  //         if (type == "reply") {
  //           this.allComments[index1].reply.splice(index2, 1);
  //         }
  //         this.posts[this.postIndex].commentTotal = res.commentTotal;
  //         this.toastr.success(res.message);
  //       } else {
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       this.loader = false;
  //     },
  //     (err) => {
  //       this.loader = false;
  //     }
  //   );
  // }
  deleteComment(commentId, index1, index2: any = "", index3: any = "", type,postdata) {
    console.log(this.postIndex, "this.postIndex delete comment");
    let object = {
      id: commentId,
        postId: postdata.id,
      postType:postdata.activityType
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
          this.posts[this.postIndex].comments = res.commentTotal;
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
      postType: "modPost",
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
          this.getComments(postId, "modPost");
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
              this.posts.splice(index, 1);
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
    });
  }
  initA2A() {
    setTimeout(function () {
      a2a.init_all();
    }, 100);
  }
}
