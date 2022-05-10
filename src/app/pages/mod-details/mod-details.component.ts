import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
  Renderer2,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { PagesService } from "../pages.service";
import { NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { BehaviorService } from "src/app/shared/behavior.service";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { CredentialsService } from "src/app/auth/credentials.service";
import { ShareModalComponent } from "../share-modal/share-modal.component";
import { SharedService } from "src/app/shared/shared.service";
import { LikeListingModalComponent } from "../like-listing-modal/like-listing-modal.component";
import { ChatService } from "src/app/chat.service";
import { PostSharedWithComponent } from "../post-shared-with/post-shared-with.component";
import { AppInjector } from "../../app.module";
import { isPlatformBrowser } from "@angular/common";
import {
  DomSanitizer,
  Meta,
  SafeResourceUrl,
  Title,
} from "@angular/platform-browser";
declare var a2a: any;
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { MagnifyImageComponent } from "src/app/shared/shared/magnify-image/magnify-image.component";
import { ReportSectionComponent } from "../report-section/report-section.component";

@Component({
  selector: "app-mod-details",
  templateUrl: "./mod-details.component.html",
  styleUrls: ["./mod-details.component.css"],
})
export class ModDetailsComponent implements OnInit {
  loadingContent = [1];
  chatService: any;
  viewModal = false;
  commentData: any;
  editComment = false;
  editReply = false;
  afterImage: boolean = false;
  beforeImage: boolean = true;
  modalReference3: any;
  tagsArray: any = [];
  _postObservable: any;
  _host = environment.url;
  modPostId: any;
  show = false;
  isreadMore = false;
  isLoading: boolean = false;
  isShowMore = false;
  today = new Date();
  url: any = "";
  newWhatIdid: any;
  productArray: any = [];
  toolArray: any = [];
  urlSafe: SafeResourceUrl;
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
  // open(content) {
  //   this.modalService.open(content);
  // }

  // @ViewChild("content", { static: true }) modalContent: TemplateRef<any>;
  closeResult = "";
  submitted: Boolean = false;
  fileToUpload: File = null;
  modDetail: any = {};
  modalReference: any;
  groupId: string = "";
  user: any;
  slideConfig: any;
  slideConfig1: any;
  breakpoint: any;
  allComments: Array<any> = [];
  totalComments: Array<any> = [];
  showshare: boolean = false;
  replyForm: any;
  _baseUrl = "https://www.rvmodshare.com/";
  comments: any = [];
  commentOnPost: any;
  loader = false;
  replyOnPost: any;
  replyOnPost2: any;
  replyOnPost3: any;
  userId: any;
  token = "";
  youtubeVID: any = "";
  description: any = "";
  slug: any;
  Copylink: string;
  keyword: string;
  credentialsService: any;
  visibility: boolean = false;
  constructor(
    config: NgbModalConfig,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _activateRouter: ActivatedRoute,
    private pageService: PagesService,
    public credentials: CredentialsService,
    public sharedService: SharedService,
    public _bs: BehaviorService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private _titleService: Title,
    // public chatService:ChatService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta
  ) {
    this.slug = this._activateRouter.snapshot.paramMap.get("slug");
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    config.backdrop = "static";
    config.keyboard = false;
    // this._activateRouter.queryParams.subscribe((params) => {
    //   this.modPostId = params.id;
    // });
    this.token = localStorage.getItem("token");
    let u = localStorage.getItem("user");
    if (
      u &&
      this.credentials.credentials != null &&
      this.credentials.credentials != undefined
    ) {
      this.userId = this.credentials.credentials.id;
    }
    this.getModDetails();
    _bs.viewModPostDetail.subscribe((res) => {
      if (res == true) {
        this.getModDetails();
      }
    });
    _bs.publishedMod.subscribe((res) => {
      if (res == true) {
        this.showshare = true;
      }
    });
    this._bs.postDataToreload.subscribe((res) => {
      console.log(res, "res data in mods comment view");
      if (res.commentId && this.allComments.length > 0) {
        setTimeout(() => {
          let element: any = document.getElementById(res.commentId);
          var headerOffset = 60;
          var elementPosition = element.getBoundingClientRect().bottom;
          var offsetPosition = elementPosition - headerOffset;
          element.scrollIntoView({ top: offsetPosition, behavior: "smooth" });
        }, 2000);
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    let url = "/mods/" + this.slug;
    localStorage.setItem("url", url);
  }
  openshare() {
    const modalRef = this.modalService.open(ShareModalComponent);
    modalRef.componentInstance.postId = this.modDetail.id;
    modalRef.componentInstance.postType = "modPost";
  }

  changeImage(key) {
    if (key == "after") {
      this.afterImage = true;
      this.beforeImage = false;
    } else {
      this.afterImage = false;
      this.beforeImage = true;
    }
  }
  openReport(id, key) {
    this.modalReference3 = this.modalService.open(ReportSectionComponent);
    let data = {
      key: key,
      id: id,
    };
    this.modalReference3.componentInstance.reportData = data;
  }
  deleteModPost(id) {
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
              this.toastr.success(res.message);
              this.router.navigate(["/mods"]);
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
  replyClick(p: any) {
    if (p == this.replyForm) {
      this.replyForm = 0;
    } else {
      this.replyForm = p;
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onSubmit() {
    this.submitted = true;
  }

  opens(content) {
    this.modalService.open(content, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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
  getModDetails() {
    // if (isPlatformBrowser(this.platformId) && !this.checkLoggedinUser()) {
    //   this.onClickImage();
    //   // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    // }
    // this.spinner.show();
    let data = {
      slug: this.slug,
      // id: this.modPostId,
    };
    if (this.userId) {
      data["uid"] = this.userId;
    }
    this.isLoading = true;
    this._postObservable = this.pageService.getModDetail(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.modPostId = res.data.id;
          this.modDetail = res.data;

          // this.readmoreLess();

          this.setHtmlDesc();

          if (
            this.modDetail["youtubeLink"] &&
            this.modDetail["youtubeLink"] != "" &&
            this.modDetail["youtubeLink"] != null &&
            this.modDetail["youtubeLink"] != undefined
          ) {
            let rx =
              /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            this.youtubeVID = this.modDetail["youtubeLink"].match(rx);
            this.youtubeVID = this.youtubeVID[1];
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
              "https://www.youtube.com/embed/" + this.youtubeVID
            );
          }

          this.setShareData(res.data);
          this.splitByComma(this.modDetail.tags);
          this.updatedata();
          this.productArray = this.modDetail.productUsed;
          this.toolArray = this.modDetail.toolsNeeded;
          console.log(" this.toolArray", this.toolArray);
          this.getWhatIDid(this.modDetail.whatIDid);
          if (
            (this.modDetail.afterImages &&
              this.modDetail.afterImages.length > 0) ||
            (this.modDetail.afterImages &&
              this.modDetail.beforeImages.length > 0)
          ) {
            if (this.modDetail.afterImages.length > 0) {
              this.changeImage("after");
            } else {
              this.changeImage("before");
            }
          }
          if (this.checkLoggedinUser()) {
            this.readmoreLess();
            this.getComments();
          }
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);

          // this.spinner.hide();
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
  public createTrustedHtml(blogContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(blogContent);
  }
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }

  onClickImage() {
    this.onClickImageWithoutLogin();
  }
  onClickImageWithoutLogin() {
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
          let url = "/mods/" + this.slug;
          localStorage.setItem("url", url);
        }
      });
    }
  }
  splitToolByComma(value) {
    console.log(value, "toll");
    if (value != "") {
      let toolsnewarray = [];
      toolsnewarray = this.pageService.splitByComma(value);
      toolsnewarray = toolsnewarray.filter(function (el) {
        return el != "";
      });
      toolsnewarray.forEach((element) => {
        let obj = {
          tool: element,
          affiliateLink: "",
        };
        this.toolArray.push(obj);
      });
    }
  }
  splitProductByComma(value) {
    if (value != "") {
      let productnewarray = [];
      productnewarray = this.pageService.splitByComma(value);
      productnewarray = productnewarray.filter(function (el) {
        return el != "";
      });
      productnewarray.forEach((element) => {
        let obj = {
          product: element,
          affiliateLink: "",
        };
        this.productArray.push(obj);
      });
    }
  }
  splitByComma(value) {
    if (value != "") {
      this.tagsArray = [];
      let tagnewarray = [];
      tagnewarray = this.pageService.splitByComma(value);
      tagnewarray = tagnewarray.filter(function (el) {
        return el != "";
      });
      tagnewarray.forEach((element) => {
        this.tagsArray.push(element);
      });
    }
  }
  // deleteComment(commentId, index1, index2: any = "", index3: any = "", type) {
  //   let object = {
  //     id: commentId,
  //   };
  //   // return;
  //   this.sharedService.deleteComment(object).subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         if (type == "comment") {
  //           this.allComments.splice(index1, 1);
  //         }
  //         if (type == "reply") {
  //           this.allComments[index1].reply.splice(index2, 1);
  //         }
  //         if (type == "replyonreply") {
  //           this.allComments[index1].reply[index2].reply.splice(index3, 1);
  //         }
  //         this.modDetail.commentTotal = res.commentTotal;
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
  deleteComment(commentId, index1, index2: any = "", index3: any = "", type) {
    let object = {
      id: commentId,
      postId: this.modDetail.id,
      postType: "modPost",
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
          this.modDetail.commentTotal = res.commentTotal;
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
  submiteditComment(comment, type, postId) {
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
  downloadPdf(document) {
    let url = this._host + "images/modPost/" + document;
    window.open(url, "_blank");
  }
  addLike(to_user_id) {
    let data = {
      postId: this.modPostId,
      likeBy: this.credentials.credentials.id,
      postType: "modPost",
    };
    // this.spinner.show();
    this.pageService.addLike(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(to_user_id);
          this.modDetail.likesTotal = res.data.count;
          this.modDetail.likestatus = res.data.likestatus;
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

  addComment(commentId: any, to_user_id) {
    let data = {
      postId: this.modPostId,
      comment: this.commentOnPost,
      postType: "modPost",
      commenttoUser: to_user_id,
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
          this.modDetail.commentTotal = res.commentdata.count;
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
  getCommentsScrolldown() {
    try {
      const errorField = this.renderer.selectRootElement(".commentInput");
      const errorField2 = this.renderer.selectRootElement(".commentInputfocus");
      errorField.scrollIntoView();
      errorField2.focus();
    } catch (err) {}
  }

  gotoToLoginPage() {
    let url = "/mods/" + this.slug;
    localStorage.setItem("url", url);
    this.router.navigate(["/auth/login"]);
  }
  gotoToSignupPage() {
    let url = "/mods/" + this.slug;
    localStorage.setItem("url", url);
  }
  getComments() {
    this.allComments = [];

    let data = {
      postId: this.modPostId,
      // id : postId,
      type: "modPost",
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
                        userFullName: cat2.addedBy.fullName,
                        userImage: cat2.addedBy.image,
                        userId: cat2.addedBy.id,
                        slug: cat2.addedBy.slug,
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
                                  slug: cat3.addedBy.slug,
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
  removeSpace(str) {
    let str1: any = str.replace(/\s+/g, "-").toLowerCase();
    return str1;
  }

  replyComment(commentId: any, replyon: any, to_user_id) {
    console.log("user id ", to_user_id);
    let data = {};
    if (replyon == "comment") {
      if (this.replyOnPost == "") {
        return;
      }
      data = {
        postId: this.modPostId,
        comment: this.replyOnPost,
        postType: "modPost",
        commenttoUser: to_user_id,
      };
    }
    if (replyon == "reply") {
      if (this.replyOnPost2 == "") {
        return;
      }
      data = {
        postId: this.modPostId,
        comment: this.replyOnPost2,
        postType: "modPost",
        commenttoUser: to_user_id,
      };
    }
    if (replyon == "replyonreply") {
      if (this.replyOnPost3 == "") {
        return;
      }
      data = {
        postId: this.modPostId,
        comment: this.replyOnPost3,
        postType: "modPost",
        commenttoUser: to_user_id,
      };
    }

    if (commentId) {
      data["commentId"] = commentId;
    }
    // this.spinner.show();
    this.pageService.addComment(data).subscribe(
      (res: any) => {
        if (res.success) {
          console.log("test id for user ", to_user_id);
          this.sendNotif(to_user_id);
          this.sendNotif(this.modDetail.addedBy.id);
          // this.getGroupPosts();
          this.replyOnPost = "";
          this.replyOnPost2 = "";
          this.replyForm = "";
          this.replyOnPost3 = "";
          this.modDetail.commentTotal = res.commentdata.count;
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
    this.modDetail.showMore = true;
    // this.postIndex = i;
    // console.log(this.postIndex, "this.postIndex", i);
    // for (let j = 0; j < this.allPosts.length; j++) {
    //   if (i != j) {
    //     this.allPosts[j].showMore = false;
    //   } else {
    //     this.allPosts[i].showMore = !this.allPosts[i].showMore;
    //   }
    // }
    // if (status == "add") {
    //   this.allPosts[i].showMore = true;
    // }
  }
  openLikeModal(item: any) {
    if (item.likesTotal == 0) return;

    localStorage.setItem("type", "");
    localStorage.setItem("postId", "");
    localStorage.setItem("type", "modPost");
    localStorage.setItem("postId", this.modPostId);
    // let url = '/page/timeline';
    // let urldata = {
    //   type:item.activityType,
    //   postId:item.id
    // }
    // this.router.navigate([url],{ queryParams: urldata});
    const modalRef = this.modalService.open(LikeListingModalComponent);
    modalRef.componentInstance.name = "Link Modal";
  }
  followMod() {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    let data = {
      followFriendID: this.modDetail.addedBy.id,
      type: "follower",
    };
    this.spinner.show();
    this.sharedService.post(data, "follow/friend").subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(this.modDetail.addedBy.id);
          // this.toastr.success(res.message)
          this.getModDetails();
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

  followFriend() {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.spinner.show();
    let data = {
      requesterId: this.userId,
      recipientId: this.modDetail.addedBy.id,
    };
    this.sharedService.post(data, "add/friends").subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.sendNotif(this.modDetail.addedBy.id);
          this.toastr.success(res.message);
          this.getModDetails();
          // this.getFriendsDetail();
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
  htmlLength(html = "", length) {
    if (html && html.length > length) {
      this.isShowMore = true;
      return this.createTrustedHtml(html.slice(0, length) + "...");
    } else {
      // this.isShowMore = false;
      return this.createTrustedHtml(html);
    }
  }
  unFriend() {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.spinner.show();

    this.pageService.unFriend(this.modDetail.addedBy.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.getModDetails();
          //  this.getFriendsDetail();
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

  cancelRequest() {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.spinner.show();

    this.pageService.cancelRequest(this.modDetail.addedBy.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.getModDetails();

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

  favourite(postId) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    let data = {
      postId: postId,
      userId: this.credentials.credentials.id,
      postType: "modPost",
    };
    // this.isFavourate = !postId.isFavourite;
    // this.loader = true;
    this.pageService.addFavourite(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.modDetail.isFavourite = res.data.isFavourite;
          this.sendNotif(this.modDetail.addedBy.id);
          // this.toastr.success(res.message)
          // this.getModDetails();
          // this.loader = false;
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.loader = false;
      },
      (err) => {
        // this.loader = false;
      }
    );
  }
  sendNotif(id) {
    let data = {
      user_id: id,
    };
    this.chatService.sendNotif(data);
  }
  ngOnDestroy(): void {
    if (this._postObservable) {
      this._postObservable.unsubscribe();
    }
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
  // setShareData(item) {
  //   if (!item) return;
  //   this.meta.addTag({ property: "og:title", content: item.name });
  //   this.meta.addTag({ property: "og:type", content: "article" });
  //   this.meta.addTag({ property: "fb:app_id", content: "995503910998783" });
  //   this.meta.addTag({ property: "og:url", content: `https://rvmodshare.com/mods/${item.slug}`});
  //   this.meta.addTag({ property: "og:image:secure", content: `https://endpoint.rvmodshare.com/images/modPost/${item.afterImages[0]}`});
  //   this.meta.addTag({ property: "og:image", content: `https://endpoint.rvmodshare.com/images/modPost/${item.afterImages[0]}`});
  //   this.meta.addTag({ property: 'og:description', content: item.whatIDid });
  //   if (isPlatformBrowser(this.platformId)) {
  //     setTimeout(function () {
  //       a2a.init_all();
  //     }, 1000);
  //   }
  // }
  CopyLink(obj) {
    console.log("obj", obj);
    this.Copylink = this._baseUrl + "mods/" + obj.slug;
    let value = this.Copylink;
    navigator.clipboard.writeText(value);
    // this.toastr.success("Copied URL to clipboard!");
    // alert("Copied URL to clipboard!");
    this.openalertModal();
    this.Onshare(obj, "copyClick");
  }
  Onshare(modData, shareType) {
    console.log(modData);
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

  setShareData(item) {
    let description = item.whatIDid.replace(/(<([^>]+)>)/gi, "");
    if (!item) return;
    this.meta.addTag({ property: "og:title", content: item.name });
    this.meta.addTag({ property: "og:type", content: "article" });
    this.meta.addTag({ property: "fb:app_id", content: "995503910998783" });
    this.meta.addTag({
      property: "twitter:card",
      content: item.whatIDid.replace(/(<([^>]+)>)/gi, ""),
    });
    this.meta.addTag({
      property: "twitter:site",
      content: `https://rvmodshare.com/mods/${item.slug}`,
    });
    this.meta.addTag({
      property: "twitter:creator",
      content: `item.addedBy.fullName`,
    });
    this.meta.addTag({
      property: "og:url",
      content: `https://rvmodshare.com/mods/${item.slug}`,
    });
    if (item.afterImages && item.afterImages.length > 0) {
      console.log("in share if");
      this.meta.addTag({
        property: "og:image:secure",
        content: `https://endpoint.rvmodshare.com/images/modPost/${item.afterImages[0]}`,
      });

      this.meta.addTag({
        property: "og:image",
        content: `https://endpoint.rvmodshare.com/images/modPost/${item.afterImages[0]}`,
      });
    } else {
      console.log("in share else");
      this.meta.addTag({
        property: "og:image:secure",
        content: `assets/img/rvmodshare.png`,
      });

      this.meta.addTag({
        property: "og:image",
        content: `assets/img/rvmodshare.png`,
      });
    }

    this.meta.addTag({
      property: "og:description",
      content: item.whatIDid.replace(/(<([^>]+)>)/gi, ""),
    });
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(function () {
        a2a.init_all();
      }, 1000);
    }
  }
  setHtmlDesc() {
    let html = this.modDetail.howLongTookMe;
    html = html.replace(/<[^>]*>/g, "");
    if (html.length <= 200) this.description = this.modDetail.howLongTookMe;
    else {
      let str = html.substring(200, 210);
      if (str) str = str.trim();
      let i = this.modDetail.howLongTookMe.indexOf(str);
      this.description = this.modDetail.howLongTookMe.substring(0, i);
      this.isShowMore = true;
    }
  }
  showFullText() {
    if (!this.isreadMore) this.description = this.modDetail.howLongTookMe;
    else this.setHtmlDesc();
    this.isreadMore = !this.isreadMore;
  }
  checkLoggedinUser() {
    let user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }
  openalertModal() {
    this.viewModal = true;
  }
  shareModOnFb() {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
  }
  getWhatIDid(value) {
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    this.newWhatIdid = value.replace(urlRegex, function (url) {
      return '<a  href="' + url + '"  target="_blank" >' + url + "</a>";
    });
    console.log("This triggers only when t5 ", this.newWhatIdid);
  }
  updatedata() {
    this.keyword =
      this.sharedService.getRvType(this.modDetail.rvType) +
      "," +
      this.modDetail.make.name +
      "," +
      this.modDetail.series.name +
      "," +
      this.modDetail.year +
      "," +
      this.modDetail.modCategory.name;
    this.comments =
      this.modDetail.name +
      "|" +
      this.modDetail.make.name +
      "|" +
      this.modDetail.series.name;
    const descript = this.modDetail.whatIDid.slice(0, 157) + "...";
    this._titleService.setTitle(this.comments);
    this.meta.updateTag({
      name: "description",
      content: descript.replace(/(<([^>]+)>)/gi, ""),
    });
    this.meta.updateTag({
      name: "keyword",
      content: this.keyword,
    });
    this.meta.updateTag({
      name: "title",
      content: this.comments,
    });
  }
  goTouserProfile(url, params) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.router.navigate([url, params]);
  }
  addhosttointerest() {
    let data1 = {
      postID: this.modPostId,
      userID: this.credentials.credentials.id,
    };
    this.pageService.gethostdata(data1).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.modDetail.isInterested =
            res.data && res.data.isDeleted == true ? false : true;
          console.log(res);
          this.visibility = true;
          // this.visibilityfor
          // setTimeout(()=>{
          //   this.visibility=true

          // },5000)
          setTimeout(() => {
            this.visibility = false;
          }, 5000);
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.loader = false;
      },
      (err) => {
        this.loader = false;
      }
    );
    console.log("test", this.modDetail.id, this.credentials.credentials.id);
  }
  goToModDetail(url, param) {
    console.log("tag", this.tagsArray);
    console.log(param, "param");
    this.router.navigate([url + "/" + param]);

    // setTimeout(()=>{
    //   if(this.modDetail.youtubeLink!="" ){
    //   const elem = (document.getElementsByClassName('accor') as HTMLCollection)[0] as HTMLObjectElement;
    //   elem.classList.add('show');
    //   }if(this.tagsArray.length >= 1 ){
    //     console.log("tag",this.tagsArray)
    //     const elem1 = (document.getElementsByClassName('accor1') as HTMLCollection)[0] as HTMLObjectElement;
    //     elem1.classList.add('show');
    //   }

    // },3000)
    // this.router.navigate([url], { queryParams: param });
    // window.location.href = window.location.origin + url + "?id=" + param;
  }
}
