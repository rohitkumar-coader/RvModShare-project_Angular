import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CredentialsService } from "src/app/auth/credentials.service";
import { SharedService } from "src/app/shared/shared.service";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";

@Component({
  selector: "app-follow-friend-list",
  templateUrl: "./follow-friend-list.component.html",
  styleUrls: ["./follow-friend-list.component.scss"],
})
export class FollowFriendListComponent implements OnInit {
  firendsList: any = [];
  _host = environment.url;

  constructor(
    public credentials: CredentialsService,
    private pageService: PagesService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getFriendsList();
  }

  getFriendsList() {
    let filters = {
      userid: this.credentials.credentials.id,
    };
    this._sharedService.get("followed/friendlist").subscribe(
      (response: any) => {
        console.log("res...", response);
        if (response.success) {
          this.firendsList = response.data;
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        this.toastr.error(error);
        // this.spinner.hide();
      }
    );
  }

  route(value) {
    this.router.navigate(["friend-profile"], { queryParams: { id: value } });
  }

  unFriend(id) {
    this.spinner.show();

    this.pageService.unFriend(id).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.getFriendsList();
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

  followFriend(id) {
    this.spinner.show();
    let data = {
      followFriendID: id,
      type: "follower",
    };
    this._sharedService.post(data, "follow/friend").subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.getFriendsList();
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

  addFriend(id) {
    this.spinner.show();
    let data = {
      requesterId: this.credentials.credentials.id,
      recipientId: id,
    };
    this._sharedService.post(data, "add/friends").subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.getFriendsList();
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
