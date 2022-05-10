import { isPlatformBrowser } from "@angular/common";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, Inject, Input, OnInit, PLATFORM_ID } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from "ngx-spinner/lib/ngx-spinner.enum";
import { ToastrService } from "ngx-toastr";
import { AppInjector } from "src/app/app.module";
import { CredentialsService } from "src/app/auth/credentials.service";
import { ChatService } from "src/app/chat.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { SharedService } from "src/app/shared/shared.service";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";

@Component({
  selector: "app-share-modal",
  templateUrl: "./share-modal.component.html",
  styleUrls: ["./share-modal.component.css"],
})
export class ShareModalComponent implements OnInit {
  @Input() modPostId: any;
  @Input() postId: any;
  @Input() postType: any;
  public _friendObservable: any;
  chatService: any;
  friendsList: any = [];
  postData: any;
  _host = environment.url;
  searchFriend: any = "";
  postSection: any;
  postIndex: any;
  user: any;

  constructor(
    private pageService: PagesService,
    public activeModal: NgbActiveModal,
    private _bs: BehaviorService,
    private credential: CredentialsService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.postId, "this.modPostId");

    if (this.modPostId) {
      this.postId = this.postId;
    }

    _bs.sharedPostData.subscribe((res) => {
      if (res.postId) {
        (this.postId = res.postId),
          (this.postType = res.postType),
          (this.postData = res.postData),
          (this.postSection = res.postSection),
          (this.postIndex = res.postIndex);
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    this.getFriendList();
  }

  getFriendList() {
    let data = {
      id: this.credential.credentials.id,
      search: this.searchFriend,
      postId: this.postId,
    };
    this._friendObservable = this.pageService
      .getFriendsListToSharePost(data)
      .subscribe(
        (res: any) => {
          if (res.success) {
            //     "_id": "61e02690fddd100132a9b281",
            // "id": "61e02690fddd100132a9b281",
            // "role": "user",
            // "isDeleted": false,
            // "firstName": "Dave",
            // "lastName": "Holdan",
            // "fullName": "Dave Holdan",
            // "displayName": "",
            // "email": "dholdan@outlook.com",
            // "image": "images/users/c76a603d-8ffe-4b5a-9413-7df1af5e7aff1642253146287.jpeg",
            // "fbId": "",
            // "gId": "",
            // "client_id": "",
            // "isOnline": true,
            // "badgeType": "",
            // "status": "active",
            // "earnPoints": 0,
            // "isVerified": "Y",
            // "createdAt": "2022-01-13T13:18:08.431Z",
            // "deletedAt": null,
            // "isshared": false
            this.friendsList = res.data.map((cat) => {
              return {
                _id: cat._id,
                id: cat.id,
                badgeType: "",
                createdAt: cat.createdAt ? cat.createdAt : null,
                deletedAt: cat.deletedAt,
                displayName: cat.displayName,
                earnPoints: cat.earnPoints,
                email: cat.email,
                firstName: cat.firstName,
                fullName: cat.fullName,
                image: cat.image,
                isDeleted: cat.isDeleted,
                // isFollow: cat.followFriendIDDetails.isFollow,
                isOnline: cat.isOnline,
                isVerified: cat.isVerified,
                lastName: cat.lastName,
                role: cat.role,
                status: cat.status,
                fbId: cat.fbId,
                gId: cat.gId,
                isFriend: true,
                isPending: false,
                isFollow: cat.isFollow ? cat.isFollow : false,
                isshared: cat.isshared,
              };
            });
            // this.spinner.hide();
          } else {
            this.toastr.error(res.error.message, "Error");
          }
          // this.spinner.hide();
        },
        (err) => {
          this.toastr.error(err);
          // this.spinner.hide();
        }
      );
    // this._friendObservable = this.pageService.getFriendsList(data).subscribe(
    //   (res: any) => {
    //     if (res.success) {
    //       this.friendsList = res.data
    //       // this.spinner.hide();
    //     } else {
    //       this.toastr.error(res.error.message, "Error");
    //     }
    //     // this.spinner.hide();
    //   },
    //   (err) => {
    //     this.toastr.error(err);
    //     // this.spinner.hide();
    //   }
    // );
  }
  share(id) {
    let data = {
      postId: this.postId,
      userTo: id,
      postType: this.postType,
    };
    if (this.postData && this.postData.addedByName) {
      data["fullName"] = this.postData
        ? this.postData.addedByName.fullName
        : "";
      data["originalAddedByID"] = this.postData
        ? this.postData.addedByName.id
        : "";
    }
    if (this.postData && this.postData.addedBydetails) {
      data["fullName"] = this.postData
        ? this.postData.addedBydetails.fullName
        : "";
      data["originalAddedByID"] = this.postData
        ? this.postData.addedBydetails.id
        : "";
    }
    this._friendObservable = this.pageService.sharePost(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
          // this.getFriendList();
          this._bs.postDataToreload.next({
            postSection: this.postSection,
            postType: this.postType,
            postIndex: this.postIndex,
            sharecount: res.sharecount,
          });
          this.activeModal.close();
          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        this.toastr.error(err);
        // this.spinner.hide();
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
  followMod(id, i) {
    let data = {
      followFriendID: id,
      type: "follower",
    };
    this.spinner.show();
    this.sharedService.post(data, "follow/friend").subscribe(
      (res: any) => {
        if (res.success) {
          this.friendsList[i].isFollow = res.isFollow;
          this.sendNotif(id);
          // this.toastr.success(res.message)
          this.getFriendList();
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
  cancelRequest(id, index) {
    this.spinner.show();

    this.pageService.cancelRequest(id).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.sendNotif(id);
          this.toastr.success(res.message);
          this.friendsList[index]["isPending"] = res.isPending;
          this.friendsList[index]["isFriend"] = false;
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
  addFriend(recipientId) {
    let user: any = JSON.parse(localStorage.getItem("user") || "");

    let data = {
      recipientId: recipientId,
      requesterId: user.id,
    };
    this.spinner.show();
    this.pageService.post(data, `add/friends`).subscribe(
      (res) => {
        if (res.success) {
          this.toastr.success(res.message);
        } else {
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
  unFriend(id, index) {
    this.spinner.show();

    this.pageService.unFriend(id).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.sendNotif(id);
          this.toastr.success(res.message);
          this.friendsList.splice(index, 1);
          // this.friendsList[index].isFriend = false;
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
  sendNotif(id) {
    let data = {
      user_id: id,
    };
    this.chatService.sendNotif(data);
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
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this._friendObservable) {
      this._friendObservable.unsubscribe();
    }
  }
}
