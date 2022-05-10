import { Component, OnInit, Inject, Input, PLATFORM_ID } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PagesService } from "src/app/pages/pages.service";
import { SharedService } from "src/app/shared/shared.service";
import { ToastrService } from "ngx-toastr";
import { ChatService } from "src/app/chat.service";

import { isPlatformBrowser } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpEvent, HttpEventType, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
@Component({
  selector: "app-following-modal",
  templateUrl: "./following-modal.component.html",
  styleUrls: ["./following-modal.component.css"],
})
export class FollowingModalComponent implements OnInit {
  @Input() followData: any;
  closeResult = "";
  Followingdata: any = [];
  userid: any;
  user: any;
  chatService: any;
  isLoading = false;
  _url: any = environment.url;
  Followerdata: any;
  constructor(
    public activeModal: NgbActiveModal,
    private pageService: PagesService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService,
    private toast: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getfollowing();
    this.userid = this.followData.id;
    if (isPlatformBrowser(this.platformId)) {
      // this.chatService = AppInjector.get(ChatService);
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
      (detail.gId != "" || this.user.fbId != "")
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
      console.log("in else if 1");
      image = this._url + img;
    } else if (
      img &&
      (!detail.gId || detail.gId == "" || !detail.fbId || detail.fbId == "")
    ) {
      image = this._url + img;
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
  close() {
    this.activeModal.close();
  }
  followerMod(id, index) {
    console.log(id);
    let data = {
      followFriendID: id,
      type: "follower",
    };
    this.spinner.show();
    this.sharedService.post(data, "follow/friend").subscribe(
      (res: any) => {
        if (res.success) {
          this.Followingdata[index].isFollow = res.isFollow;
          // this.sendNotif(id)
          // this.toastr.success(res.message)
          // this.getData();
          this.getfollowing();
        } else {
          this.toast.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  sendNotif(id) {
    let data = {
      user_id: id,
    };
    this.chatService.sendNotif(data);
  }

  getfollowing() {
    this.isLoading = true;
    let data = {
      id: this.followData.id,
    };
    this.pageService.getFollowings(data).subscribe(
      (response) => {
        if (response.success) {
          this.Followingdata = response.data.map((cat) => {
            if (cat.isUserExist && cat.followFriendIDDetails) {
              return {
                id: cat.followFriendID,
                slug: cat.followFriendIDDetails.slug,
                fullName: cat.followFriendIDDetails.fullName,
                followFriendIDDetails: cat.followFriendIDDetails,

                // status: cat.followFriendIDDetails.status,
                isFollow: (cat.isFollow = true),
                isUserExist: cat.isUserExist,
              };
            }
          });
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      },
      (error) => {
        // this.toastr.error(error);
        this.isLoading = false;
      }
    );
  }
}
