import { Component, Inject, Input, OnInit, PLATFORM_ID } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PagesService } from "src/app/pages/pages.service";
import { SharedService } from "src/app/shared/shared.service";
import { ToastrService } from "ngx-toastr";
import { ChatService } from "src/app/chat.service";

import { isPlatformBrowser } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpEvent, HttpEventType, HttpParams } from "@angular/common/http";
import { id } from "@swimlane/ngx-datatable";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-follower-modal",
  templateUrl: "./follower-modal.component.html",
  styleUrls: ["./follower-modal.component.css"],
})
export class FollowerModalComponent implements OnInit {
  @Input() followData: any;
  Followerdata: Array<any> = [];
  val: any;
  userid: any;
  user: any;
  isLoading = false;
  _url: any = environment.url;

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
    this.getfollower();
    // this.val = JSON.parse(localStorage.getItem('user'));
    this.userid = this.followData.id;
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
          this.Followerdata[index].isFollow = res.isFollow;
          // this.sendNotif(id)
          // this.toastr.success(res.message)
          // this.getData();
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
  getfollower() {
    let data = {
      id: this.followData.id,
    };
    this.isLoading = true;
    this.pageService.getFollowers(data).subscribe(
      (response) => {
        if (response.success) {
          this.Followerdata = response.data.map((cat) => {
            if (cat.isUserExist && cat.followByID) {
              return {
                id: cat.followByID,

                fullName: cat.followedbyDetails.fullName,
                followedbyDetails: cat.followedbyDetails,
                isFollow: cat.isFollow,
                slug: cat.followedbyDetails.slug,
                // status: cat.followFriendIDDetails.status,

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
        this.isLoading = false;
      }
    );
  }
}
