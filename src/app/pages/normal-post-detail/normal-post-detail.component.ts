import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CredentialsService } from "src/app/auth/credentials.service";
import { ChatService } from "src/app/chat.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { SharedService } from "src/app/shared/shared.service";
import { environment } from "src/environments/environment";
import { LikeListingModalComponent } from "../like-listing-modal/like-listing-modal.component";
import { PagesService } from "../pages.service";
import { PostSharedWithComponent } from "../post-shared-with/post-shared-with.component";
import { ShareModalComponent } from "../share-modal/share-modal.component";
import { AppInjector } from "../../app.module";
import { Meta } from "@angular/platform-browser";
declare var a2a: any;
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { MagnifyImageComponent } from "src/app/shared/shared/magnify-image/magnify-image.component";
import { EditSocialPostComponent } from "../edit-social-post/edit-social-post.component";

@Component({
  selector: "app-normal-post-detail",
  templateUrl: "./normal-post-detail.component.html",
  styleUrls: ["./normal-post-detail.component.css"],
})
export class NormalPostDetailComponent implements OnInit {
  chatService: any;
  postDetail: any;
  userId: any;
  postId: any;
  _postObservable: any;
  _host = environment.url;
  replyForm: any;
  editComment = false;
  editReply = false;
  commentData: any;
  allComments: Array<any> = [];
  totalComments: Array<any> = [];
  today = new Date();
  loader = false;
  replyOnPost: any;
  replyOnPost2: any;
  replyOnPost3: any;
  commentOnPost: any;
  slideConfig: any;
  pollVoting: any;
  // slideConfig = {
  //   slidesToShow: 4, slidesToScroll: 4, responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         centerPadding: '40px',
  //         slidesToShow: 2
  //       }
  //     },
  //     {
  //       breakpoint: 767,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         centerPadding: '40px',
  //         slidesToShow: 1
  //       }
  //     }
  //   ]
  // };
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _activateRouter: ActivatedRoute,
    private pageService: PagesService,
    public _bs: BehaviorService,
    public credentials: CredentialsService,
    public sharedService: SharedService,
    // public chatService:ChatService,
    private router: Router,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    let u = localStorage.getItem("user");
    if (
      u &&
      this.credentials.credentials != null &&
      this.credentials.credentials != undefined
    ) {
      this.userId = this.credentials.credentials.id;
    }

    this._activateRouter.queryParams.subscribe((params) => {
      this.postId = params.id;
      // this.getPostDetails();
    });
    _bs.viewNormalPostDetail.subscribe((res) => {
      if (res == true || this.postId) {
        console.log("in view normal post", res);
        this.getPostDetails();
      }
    });
    _bs.postDataToreload.subscribe((res) => {
      if (res.sharecount) {
        this.postDetail.totalShare = res.sharecount;
      }
    });
  }

  ngOnInit() {}

  setShareData(item) {
    if (!item) return;
    //   let title = this.object.title.replace(/<[^>]+>/g, '');
    this.meta.addTag({ property: "og:title", content: item.post });
    this.meta.addTag({ property: "og:type", content: "article" });
    this.meta.addTag({ property: "fb:app_id", content: "995503910998783" });
    this.meta.addTag({
      property: "og:url",
      content: `https://rvmodshare.com/normal-post-detail?id=${item.id}&uid=${item.addedBy.id}`,
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
  breakpoint(e) {
    // console.log("breakpoint");
  }
  getPostDetails() {
    this.spinner.show();
    let data = {
      id: this.postId,
    };
    if (this.userId) {
      data["uid"] = this.userId;
    }
    this._postObservable = this.sharedService
      .getNormalPostDetail(data)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.postDetail = res.data;
            this.postDetail["isValidTime"] = this.sharedService.secondsToDhms(
              this.postDetail["isValidTime"]
            );
            this.setShareData(this.postDetail);
            // if(!this.credentials.credentials){
            //   let fireData:any = {
            //     title: "To see more community content, click Sign Up to join, it’s free!",
            //     confirmButtonText: 'Click here to sign up',
            //     showCancelButton: false,
            //     allowOutsideClick: false
            //   }
            //   Swal.fire(fireData).then((result) => {
            //     if (result.isConfirmed) {
            //       this.router.navigate(['/auth/signup']);
            //     }
            //   })
            // }
            // this.spinner.hide();
          } else {
            this.toastr.error(res.error.message, "Error");
          }
          this.spinner.hide();
        },
        (err) => {
          console.log("EEEEEED ", err);
          this.spinner.hide();
        }
      );
  }
  calculateWeightage(percent) {
    return ((percent / 100) * 100).toFixed(2);
  }
  pollVote(postId, activityType) {
    let data = {
      postId: postId,
      postType: activityType,
      choices: this.pollVoting,
    };
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
  onClickImage() {
    this.sharedService.onClickImageWithoutLogin();
  }
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }
  openEditSocialPost() {
    const modalRef = this.modalService.open(EditSocialPostComponent);
    modalRef.componentInstance.name = "edit-social-modal";
    modalRef.componentInstance.postId = this.postDetail.id;
    modalRef.componentInstance.postType = "normalPost";
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
    } else if (
      img &&
      img != undefined &&
      img != "" &&
      !socialImage &&
      (detail.gId || detail.fbId) &&
      (detail.gId != "" || detail.fbId != "")
    ) {
      image = this._host + img;
    } else if (
      img &&
      (!detail.gId || detail.gId == "" || !detail.fbId || detail.fbId == "")
    ) {
      image = this._host + img;
    } else {
      image = "/assets/img/user.png";
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
  openLikeModal(item: any) {
    console.log("item", item);

    if (item.likesTotal == 0) return;

    localStorage.setItem("type", "");
    localStorage.setItem("postId", "");
    localStorage.setItem("type", "normalPost");
    localStorage.setItem("postId", this.postId);
    // let url = '/page/timeline';
    // let urldata = {
    //   type:item.activityType,
    //   postId:item.id
    // }
    // this.router.navigate([url],{ queryParams: urldata});
    const modalRef = this.modalService.open(LikeListingModalComponent);
    modalRef.componentInstance.name = "Link Modal";
  }
  openshare() {
    const modalRef = this.modalService.open(ShareModalComponent);
    modalRef.componentInstance.postId = this.postDetail.id;
    modalRef.componentInstance.postType = "normalPost";
  }
  addLike(to_user_id) {
    let data = {
      postId: this.postId,
      likeBy: this.credentials.credentials.id,
      postType: "normalPost",
    };
    // this.spinner.show();
    this.pageService.addLike(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.postDetail.likesTotal = res.data.count;
          this.postDetail.likestatus = res.data.likestatus;
          this.sendNotif(to_user_id);
          // this.getModDetails();
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
  deleteComment(commentId, index1, index2: any = "", index3: any = "", type) {
    let object = {
      id: commentId,
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
          this.postDetail.commentTotal = res.commentTotal;
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
  submiteditComment(comment, type) {
    let data = {
      postId: this.postId,
      postType: "normalPost",
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
          this.getComments();
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
  addComment(commentId: any, to_user_id) {
    let data = {
      postId: this.postId,
      comment: this.commentOnPost,
      postType: "normalPost",
    };
    if (commentId) {
      data["commentId"] = commentId;
    }
    if (this.commentOnPost == "") {
      return;
    }
    // this.spinner.show();
    this.pageService.addComment(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(to_user_id);
          // this.getGroupPosts()
          this.commentOnPost = "";
          this.postDetail.commentTotal = res.commentdata.count;
          // this.toastr.success(res.message, "Success");
          this.getComments();
          this.readmoreLess();
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
  replyComment(commentId: any, replyon: any, to_user_id) {
    let data = {};
    if (replyon == "comment") {
      if (this.replyOnPost == "") {
        return;
      }
      data = {
        postId: this.postId,
        comment: this.replyOnPost,
        postType: "normalPost",
      };
    }
    if (replyon == "reply") {
      if (this.replyOnPost2 == "") {
        return;
      }
      data = {
        postId: this.postId,
        comment: this.replyOnPost2,
        postType: "normalPost",
      };
    }
    if (replyon == "replyonreply") {
      if (this.replyOnPost3 == "") {
        return;
      }
      data = {
        postId: this.postId,
        comment: this.replyOnPost3,
        postType: "normalPost",
      };
    }

    if (commentId) {
      data["commentId"] = commentId;
    }
    // this.spinner.show();
    this.pageService.addComment(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(to_user_id);
          // this.getGroupPosts();
          this.replyOnPost = "";
          this.replyOnPost2 = "";
          this.replyOnPost3 = "";
          this.replyForm = "";
          this.postDetail.commentTotal = res.commentdata.count;
          // this.toastr.success(res.message, "Success");
          this.getComments();
          this.readmoreLess();
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
  sendNotif(id) {
    let data = {
      user_id: id,
    };
    console.log("send notif data", data);
    this.chatService.sendNotif(data);
  }
  replyClick(p: any) {
    if (p == this.replyForm) {
      this.replyForm = 0;
    } else {
      this.replyForm = p;
    }
    console.log(this.replyForm);
  }
  getComments() {
    this.allComments = [];
    let data = {
      postId: this.postId,
      // id : postId,
      type: "normalPost",
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
    //           // postImage: cat.image,
    //           // postTitle: cat.name,
    //           // likes: cat.likes,
    //           // likestatus: cat.likestatus,
    //           comment: cat.comment,
    //           userFullName: cat.addedBy.fullName,
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
    //                     userFullName: cat2.addedBy.fullName,
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
    //     this.loader = false;
    //     // this.spinner.hide();
    //   },
    //   (err) => {
    //     this.loader = false;
    //     // this.spinner.hide();
    //   }
    // );
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
  readmoreLess() {
    this.postDetail.showMore = true;
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
}
