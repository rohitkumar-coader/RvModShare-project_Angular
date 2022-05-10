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
import { MagnifyImageComponent } from "src/app/shared/shared/magnify-image/magnify-image.component";
declare var a2a: any;

declare var require: any;
var Filter = require("bad-words"),
  filter = new Filter();
@Component({
  selector: "app-follow-mods-list",
  templateUrl: "./follow-mods-list.component.html",
  styleUrls: ["./follow-mods-list.component.scss"],
})
export class FollowModsListComponent implements OnInit {
  chatService: any;
 
  @Input() showModsTab: any;
  commentData: any;
  editComment = false;
  editReply = false;
  postIndex: any;
   newBadWords = environment.bad_word;
  // datas=[]
  _host = environment.url;
  // groups = [
  // ];
  posts = [];

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
  // allGroups=[];
  // modFirendsList:any=[];
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
    // private formBuilder: FormBuilder,
    private modalService: NgbModal,
    // private router: Router,
    private toastr: ToastrService,
    // private spinner: NgxSpinnerService,
    private _bs: BehaviorService,
    private pageService: PagesService,
    private _route: ActivatedRoute,
    public credentials: CredentialsService,
    private sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object // private chatService:ChatService
  ) {
    // filter.addWords(...this.newBadWords);
    //  let user = localStorage.getItem("user");
  }
  public carouselTile: NguCarouselConfig;
  // public carousel:NguCarousel<any>;
  @ViewChild("carousel", { static: false }) carousel: NguCarousel<any>;
  // public carouselTileItems: Array<any>;
  // public carouselTile: NgxCarousel;
  carouselConfig: NguCarouselConfig;
  //  {
  // grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
  // load: 3,
  // interval: {timing: 4000, initialDelay: 1000},
  // loop: true,
  // touch: true,
  // velocity: 0.2
  // }
  carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  mostModes = [0, 1, 2, 3, 4, 5];
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    let user = localStorage.getItem("user");
    this.user = JSON.parse(user);
    this.carouselConfig = {
      grid: { xs: 2, sm: 3, md: 3, lg: 4, all: 0 },
      load: 3,
      interval: { timing: 4000, initialDelay: 1000 },
      loop: true,
      touch: true,
      velocity: 0.2,
    };

    //   this.carouselTile = {
    //     grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
    //     slide: 2,
    //     speed: 400,
    //     // interval: 4000,
    //     animation: 'lazy',
    //     point: {
    //       visible: true
    //     },
    //     load: 2,
    //     touch: true,
    //     easing: 'ease'
    // //   }
    // this.spinner.show();
    // setTimeout(() => { this.spinner.hide(); }, 100)
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

  // open(content) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
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
  getFollowMods() {
    // this.spinner.show();

    this.isLoading = true;

    this.pageService.getFollowCategoriesMods().subscribe(
      (res: any) => {
        if (res.success) {
          this.posts = res.data.map((cat) => {
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              slug: cat.slug,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              addedByName: cat.addedBydetails,
              addedBydetails: cat.addedBydetails,
              whomSharedByName: cat.whomSharedByName,
              whomSharedById: cat.whomSharedById,
              registeredRV: cat.registeredRV,
              sharedName: cat.sharedName,
              originalAddedBy: cat.originalAddedBy,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              isCommentDisabled: cat.isCommentDisabled,
              createdAt: cat.createdAt,
              addedBy: cat.addedBy,
              adsPosition: cat.position,
              adsDescription: cat.description,
              adsImage: cat.image,
              adsRedirectUrl: cat.redirectURL,
              updatedAt: cat.updatedAt,
              year: cat.year,
              series: cat.seriesdetails,
              make: cat.makedetails,
              model: cat.model,
              rvType: this.sharedService.getRvType(cat.rvType),
              comments: cat.commentTotal,
              likes: cat.likesTotal,
              totalShare: cat.totalShare,
              likestatus: cat.likestatus,
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
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
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
  replyClick(p: any) {
    if (p == this.replyForm) {
      this.replyForm = 0;
    } else {
      this.replyForm = p;
    }
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

  sendNotif(id) {
    let data = {
      user_id: id,
    };
    this.chatService.sendNotif(data);
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
  deleteComment(commentId, index1, index2: any = "", index3: any = "", type,postdata) {
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
      // this.toastr.success('Registered Successfully. Please verify your email!');
    });
  }
  // followMods(postData){
  //   let data={
  //     'postId':postData.id,
  //     'postUserID':postData.addedBy,
  //     'userBy':this.credential.credentials.id,
  //     'postType':'modPost',
  //     "type": "follower"
  //   }
  //   this.spinner.show();
  //     this.pageService.addModFollow(data).subscribe(
  //       (res: any) => {
  //         if (res.success) {
  //           this.toastr.success(res.message)
  //             // this.getMyMods();

  //         } else {
  //           this.toastr.error(res.error.message, "Error");
  //         }
  //         this.spinner.hide();
  //       },
  //       (err) => {
  //         this.spinner.hide();

  //       }
  //     );
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  initA2A() {
    setTimeout(function () {
      a2a.init_all();
    }, 100);
  }
}
