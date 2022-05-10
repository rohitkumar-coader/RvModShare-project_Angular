import { Component, Inject, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { SharedService } from "src/app/shared/shared.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { PagesService } from "src/app/pages/pages.service";
import { CredentialsService } from "../../auth/credentials.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { isPlatformBrowser } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Meta, Title } from "@angular/platform-browser";
import { ReportSectionComponent } from "../report-section/report-section.component";
declare var a2a: any;
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-normal-search",
  templateUrl: "./normal-search.component.html",
  styleUrls: ["./normal-search.component.scss"],
})
export class NormalSearchComponent implements OnInit {
  ModpostTotal: number = 0;
  groupTotal: number = 0;
  UsersTotal: number = 0;
  totalResult: number = 0;
  searchKeyword: any = "";
  friendsList: any = [];
  categories: any = [];
  modPosts: any = [];
  addcls = false;
  groups: any;
  isLoading = false;
  chatService: any;
  token = "";
  allData = [];
  modalReference3: any;
  Copylink = "";
  _baseUrl = window.location.origin + "/";
  _host = environment.url;
  modPosts1: any=[];
  newWhatIdid: any;

  constructor(
    private spinner: NgxSpinnerService,
    public sharedService: SharedService,
    private toastr: ToastrService,
    private pageService: PagesService,
    private router: Router,
    private _route: ActivatedRoute,
    public _bs: BehaviorService,
    private modalService: NgbModal,
    public credentials: CredentialsService,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this._bs.headerSearchKeyword.subscribe((res: any) => {
      this.searchKeyword = res;
      this.getSearchResult();
    });
  }

  ngOnInit() {
    // this._route.queryParams.subscribe((param) => {
    //   if (param.search) {
    //     this.searchKeyword = param.search;
    //     this.getSearchResult();
    //   }
    // });
  }
  addClsec() {
    this.addcls = !this.addcls;
  }
  addCls() {
    this.addcls = !this.addcls;
  }
  getSearchResult() {
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    // if (isPlatformBrowser(this.platformId)) {
    //   let tab1 = document.getElementById("pills-See-tab");
    //   let tab2 = document.getElementById("tab2");
    //   let tab3 = document.getElementById("pills-Talk-tab");
    //   tab1.classList.remove("active");
    //   tab2.classList.remove("active");
    //   tab3.classList.remove("active");
    // }
    this.isLoading = true;
    if (this.searchKeyword != "") {
      this.sharedService.get("search?s=" + this.searchKeyword).subscribe(
        (res: any) => {
          if (res.success) {
          
            this.ModpostTotal = res.ModpostTotal;
            this.groupTotal = res.groupTotal;
            this.UsersTotal = res.UsersTotal;
            this.totalResult = res.totalResult;
           
            console.log(this.ModpostTotal, "  this.ModpostTotal");
            this.friendsList = res.Users;
            // this.categories = res.categoryData;
            this.modPosts = res.ModpostData;
            this.groups = res.groupData;
            this.allData = Array.prototype.concat.apply(
              [],
              [res.Users, res.ModpostData, res.groupData]
            );
            // this.modPosts1 = res.ModpostData.map((cat) => {
            //   return{
            //     newW: cat.whatIDid.replace(urlRegex, function (url) {
            //       return '<a  href="' + url + '"  target="_blank" >' + url + "</a>";
            //     }),
  
            //   }
            // })
            console.log(" this.modPosts1", this.modPosts1)
            // this.allData = [...res.Users, ...res.ModpostData, ...res.groupData];
          }
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    } else {
      this.isLoading = false;
      this.friendsList = [];
      // this.categories = res.categoryData;
      this.modPosts = [];
      this.groups = [];
      this.allData = [];
      this.ModpostTotal = 0;
      this.groupTotal = 0;
      this.UsersTotal = 0;
      this.totalResult = 0;
    }
  }
  getWhatIDid(value) {
    console.log("value",value)
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    this.newWhatIdid = value.replace(urlRegex, function (url) {
      return '<a  href="' + url + '"  target="_blank" >' + url + "</a>";
    });
    console.log("This triggers ", this.newWhatIdid);
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
          // this.getSearchResult();
          this.chatService.sendNotif({ user_id: id });
          // this.toastr.success(res.message)
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

  unFriend(id) {
    this.spinner.show();

    this.pageService.unFriend(id).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.getSearchResult();
          // this.getModDetails();
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

  cancelRequest(id) {
    this.spinner.show();

    this.pageService.cancelRequest(id).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.getSearchResult();
          // this.getModDetails();

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
          this.modPosts[index].likesTotal = res.data.count;
          this.modPosts[index].likestatus = res.data.likestatus;
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
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
   
    if (html && html.length > length) {
      return  html.replace(urlRegex, function (url) {

        return'<a  href="' + url + '"  target="_blank" >' + url + "</a>" ;
      }).slice(0, length)+ "..."
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
    alert("Copied URL to clipboard!");
    this.Onshare(obj, "copyClick");
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
          this.modPosts[index].isFavourite = !this.modPosts[index].isFavourite;
          this.getSearchResult();
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
        let data = {
          id: id,
        };
        this.sharedService.deleteModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.modPosts.splice(index, 1);
              this.toastr.success(res.message);
            } else {
              this.toastr.error(res.error.message, "Error");
            }
          },
          (err) => {}
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

  convertArrayIntoString(arrayOfObjects) {
    let string = arrayOfObjects.map((x) => x.product).join(", ");
    return string;
  }

  redirect(id, type) {
    this.searchKeyword = "";
    if (type == "friends") {
      this.router.navigate(["friend-profile"], {
        queryParams: { id: id },
      });
    }
    if (type == "mods") {
      this.router.navigate(["mods", id]);
    }
    if (type == "categories") {
      this.router.navigate(["mod-type"], { queryParams: { id: id } });
    }
    if (type == "groups") {
      this.router.navigate(["groups", id]);
    }
  }
}
