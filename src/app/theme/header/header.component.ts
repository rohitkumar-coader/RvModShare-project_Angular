import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  NgZone,
  PLATFORM_ID,
  Inject,
  HostListener,
} from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { CredentialsService } from "../../auth/credentials.service";
import { MyAuthService } from "../../auth/auth.service";
import { BehaviorService } from "../../shared/behavior.service";
import { environment } from "../../../environments/environment";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PagesService } from "src/app/pages/pages.service";
import { SharedService } from "src/app/shared/shared.service";
import { ChatService } from "src/app/chat.service";
import { isPlatformBrowser } from "@angular/common";
import { AppInjector } from "../../app.module";
import { filter } from "rxjs/operators";
// import { UserIdleService } from "angular-user-idle";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  chatService: any;
  closeResult = "";
  menuHidden = true;
  categoriesnav = 0;
  statusOfChat = "";
  notifActive = false;
  searchModal = false;
  status: any;
  groups: any;
  chat_count: any = 0;
  public Form: FormGroup;
  modalReference: any;
  categorylinks = [1, 2, 3, 4, 5];
  userDropdown = false;
  updateData: any;
  public userID: any;
  public user: any;
  submitted = false;
  addcls = false;
  modfilters: any;
  openMods = false;
  addSearchcls = false;
  token = "";
  currentUrl = "";
  userData: any;
  public _host = environment.url;
  _observable: any;
  data = [];
  homeMenu: boolean = false;
  hideDefault: boolean = true;
  showTabs: boolean = true;
  showMods: boolean = true;

  showSearch: boolean = true;
  isShown = 1;
  activeParam: any;
  notificationsList: any = [];
  Interval;
  searchKeyword: any = "";
  friendsList: any = [];

  categories: any = [];
  modPosts: any = [];
  showFavMods: boolean = false;
  chatUser: any;
  modtabs: boolean = false;

  constructor(
    private modalService: NgbModal,
    private authService: MyAuthService,
    private pageService: PagesService,
    public credentials: CredentialsService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public _bs: BehaviorService,
    private activeRoute: ActivatedRoute,
    private _router: Router,
    private sharedService: SharedService,
    // private userIdle: UserIdleService,
    // private chatService:ChatService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    this._bs.getUserData().subscribe((res: any) => {
      this.updateData = res;
      this.user = res;
      if (res.firstName)
        localStorage.setItem("user", JSON.stringify(this.updateData));
    });
    this.user = JSON.parse(localStorage.getItem("user"));
    if (
      this.user &&
      this.user.isVerified == "Y" &&
      (!this.user.isEmail || !this.user.isRV || !this.user.isInterest)
    ) {
      this.router.navigate(["/welcome/" + this.user.id]);
    } else {
      this.token = localStorage.getItem("token");
    }
    if (this.user) {
      this.userID = this.user.id;
    }

    // let url = this.router.url;
    // if (url.indexOf("home") > -1) {
    //   this.homeMenu = false;
    // }

    // if (url.indexOf("beta") > -1 && this.token) {
    //   this.homeMenu = true;
    //   this.activeParam = "seeMods";
    //   this.router.navigate(["/mods"]);
    // }
    // if (url.indexOf("beta") > -1 && !this.token) {
    //   console.log("in else if beta");
    //   this.homeMenu = true;
    //   delete this.activeParam;
    // }
    // if (url.indexOf("talk-mods") > -1) {
    //   this.homeMenu = true;
    //   this.activeParam = "talkMods";
    // }

    // if (url === "/mods") {
    //   this.homeMenu = true;

    //   this.activeParam = "seeMods";
    // }
    // if (url.indexOf("/mods/") > -1) {
    //   this.homeMenu = true;
    //   delete this.activeParam;
    // }
    // if (url.indexOf("timeline") > -1) {
    //   this.homeMenu = true;
    //   delete this.activeParam;
    // }
    // if (url.indexOf("profile") > -1) {
    //   this.homeMenu = true;
    //   delete this.activeParam;
    // }
    // if (url.indexOf("connections") > -1) {
    //   this.homeMenu = true;
    //   delete this.activeParam;
    // }
    // this._router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   if (
    //     evt.url.indexOf("home") > -1 ||
    //     evt.url.indexOf("alpha") > -1 ||
    //     evt.url.indexOf("terms") > -1 ||
    //     evt.url.indexOf("privacy") > -1 ||
    //     evt.url.indexOf("contact") > -1
    //   ) {
    //     this.homeMenu = false;
    //   } else {
    //     this.homeMenu = true;
    //   }
    //   if (evt.url.indexOf("beta") > -1 && this.token) {
    //     this.homeMenu = true;
    //     this.activeParam = "seeMods";
    //     this.router.navigate(["/mods"]);
    //   }
    //   if (evt.url.indexOf("beta") > -1 && !this.token) {
    //     console.log("in else if beta");
    //     this.homeMenu = true;
    //     delete this.activeParam;
    //   }
    //   if (evt.url.indexOf("talk-mods") > -1) {
    //     this.activeParam = "talkMods";
    //   } else if (evt.url.indexOf("share-mod") > -1) {
    //     this.activeParam = "shareMods";
    //   } else if (evt.url === "/mods") {
    //     this.activeParam = "seeMods";
    //   } else if (url.indexOf("/mods/") > -1) {
    //     delete this.activeParam;
    //   } else if (evt.url.indexOf("profile") > -1) {
    //     this.homeMenu = true;
    //     delete this.activeParam;
    //   } else {
    //     delete this.activeParam;
    //   }
    //   if (evt.url.indexOf("search") > -1) {
    //     this.showSearch = false;
    //   } else {
    //     this.showSearch = true;
    //   }
    // });
    let url = this.router.url;
    if (
      url.indexOf("home") > -1 ||
      url.indexOf("alpha") > -1
      // url.indexOf("terms") > -1 ||
      // url.indexOf("privacy") > -1
    ) {
      this.homeMenu = false;
    } else {
      this.homeMenu = true;
    }
    if (url == "/" && this.token) {
      this.activeParam = "shareMods";
      this.router.navigate(["/timeline"]);
    } else if (url.indexOf("connections") > -1) {
      this.activeParam = "talkMods";
    } else if (url.indexOf("share-mod") > -1) {
      this.activeParam = "shareMods";
    } else if (url.indexOf("timeline") > -1) {
      this.router.navigate(["/timeline"]);
      this.activeParam = "shareMods";
    } else if (url == "/mods") {
      this.activeParam = "seeMods";
    } else if (url.indexOf("/mods/") > -1) {
      delete this.activeParam;
    } else {
      delete this.activeParam;
    }
    if (url.indexOf("search") > -1) {
      this.showSearch = false;
    } else {
      this.showSearch = true;
    }
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (
        evt.url.indexOf("home") > -1 ||
        evt.url.indexOf("alpha") > -1
        // evt.url.indexOf("terms") > -1 ||
        // evt.url.indexOf("privacy") > -1
      ) {
        this.homeMenu = false;
      } else {
        this.homeMenu = true;
      }
      // if (evt.url.indexOf("beta") > -1 && this.token) {
      //   this.activeParam = "shareMods";
      //   this.router.navigate(["/timeline"]);
      // }
      if (evt.url.indexOf("connections") > -1) {
        this.activeParam = "talkMods";
      } else if (evt.url.indexOf("timeline") > -1) {
        this.activeParam = "shareMods";
      } else if (evt.url.indexOf("share-mod") > -1) {
        this.activeParam = "shareMods";
      } else if (evt.url == "/mods") {
        this.activeParam = "seeMods";
      } else if (evt.url.indexOf("/mods/") > -1) {
        delete this.activeParam;
      } else {
        delete this.activeParam;
      }
      if (evt.url.indexOf("search") > -1) {
        this.showSearch = false;
      } else {
        this.showSearch = true;
      }
    });

    this.createForm();
  }
  _route(key, value) {
    if (key == "myFriends") {
      if (value == "all") {
        this.router.navigate(["friend-listing"]);
      } else {
        this.router.navigate(["friend-profile"], {
          queryParams: { id: value },
        });
      }
    }
    if (key == "savedMods") {
      if (value == "all") {
        this.showFavMods = true;
        // this.router.navigate(["page/favourite-listing"]);
      } else {
        this.router.navigate(["mods"], {
          queryParams: { id: value, uid: this.credentials.credentials.id },
        });
      }
    }
    if (key == "followedCategories") {
      if (value == "all") {
        this.router.navigate(["followed-interests"]);
      } else {
        this.router.navigate(["mod-type"], { queryParams: { id: value } });
      }
    }
    if (key == "myMods") {
      if (value == "all") {
        this.router.navigate(["dashboard/profile"]);
      } else {
        this.router.navigate(["mods"], {
          queryParams: { id: value, uid: this.credentials.credentials.id },
        });
      }
    }
    if (key == "myModsFriends") {
      if (value == "all") {
        this.router.navigate(["followed-mod-friends"]);
      } else {
        this.router.navigate(["friend-profile"], {
          queryParams: { id: value },
        });
      }
    }
  }
  goToPage(page) {
    this._bs.feedFilter.next(page);
    this.router.navigate(["/mods"]);
  }
  goTofollowing() {
    this._bs.postDataToreload.next({
      tabToview: "pills-home-tab",
    });
  }
  addClss() {
    this.addcls = !this.addcls;
  }
  openModss() {
    this.openMods = !this.openMods;
  }
  addSearchClss() {
    this.addSearchcls = !this.addSearchcls;
  }

  open(invitecontent) {
    // this.modalReference = this.modalService.open(contents);
    // this.modalReference.result.then(
    //   (result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   },
    //   (reason) => {
    //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   }
    // );
    this.modalReference = this.modalService.open(invitecontent, {
      ariaLabelledBy: "modal-basic-title",
    });
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  viewPost(postId, postType) {
    this.spinner.show();
    let data = {
      postType: postType,
      postId: postId,
    };
    this.sharedService.viewPost(data);
    this.spinner.hide();
  }

  route(p) {
    let url = "/mods";
    // if(p=='seeMods'){
    let urldata = {
      modal: p,
      // hideDefault:p=='seeMods'?true:false
    };
    // }else{
    //   let urldata = {
    //     modal:p,
    //     hideDefault:true
    //   }
    // }

    this.router.navigate([url], { queryParams: urldata });
    if (this._bs.Tabs.value != p) this._bs.Tabs.next(p);
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
  ngOnInit() {
    // setInterval(() => {
    //   if (this.user) {
    //     this.getAllNotification();
    //   }
    // }, 50000);
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }

    if (this.user) {
      this.getAllNotification();
      // this.chatService.connect().subscribe((data) => {
      //   this.chatService.addUser({user_id:this.user.id,email:this.user.email})
      // });
      this.chatService.getNotifs().subscribe((data: any) => {
        console.log("data", data);
        if (data.user_id == this.user.id) {
          this.getAllNotification();
        }
      });
      this.fetchMessagesCount(this.user.email);
      this._bs.messageSent.subscribe((res) => {
        if (res.status == true && res.email) {
          // this.chatService.fetchHistory({email:res.email})
        }
      });
      this._bs.chatCount.subscribe((res) => {
        if (res) {
          if (res.email == this.user.email) this.chat_count = res.count;
          // this.fetchMessagesCount()
        }
      });

      //
      this.chatService.updateHistory().subscribe((data: any) => {
        this.chatUser = data;
        if (data.email == this.user.email) {
          this.chat_count = data.count;
        }
        this.highlightUser(this.chatUser);
      });
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.currentUrl = evt.url;
      this.token = localStorage.getItem("token");
    });
    this.setUserOnline();
  }

  // stop() {
  //   this.userIdle.stopTimer();
  // }

  // stopWatching() {
  //   this.userIdle.stopWatching();
  // }

  // startWatching() {
  //   this.userIdle.startWatching();
  // }

  // restart() {
  //   this.userIdle.resetTimer();
  // }
  setUserOnline() {
    if (this.user) {
      this.chatService.showOnline({
        user_id: this.user.id,
      });
    }
  }
  createForm() {
    this.Form = this.formBuilder.group({
      toEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            "^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$"
          ),
        ],
      ],
    });
  }
  get f() {
    return this.Form.controls;
  }
  getUrl(img, detail) {
    let image = "";
    let socialImage = false;
    if (img != undefined && img != "") {
      socialImage = this.imageIsOfSocialLogin(img);
      // console.log(socialImage,"socialImage")
    }
    if (
      img &&
      img != undefined &&
      img != "" &&
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
      !detail.gId &&
      detail.gId == "" &&
      !detail.fbId &&
      detail.fbId == ""
    ) {
      image = this._host + img;
    } else {
      image = "/assets/img/user.png";
      // if (detail.socialimage && detail.image) {
      //   // console.log("in else if nested")
      //   image = this._host + detail.image;
      // }
    }
    return image;
  }
  fetchMessagesCount(email) {
    if (this.user) {
      this.chatService.fetch_history({ email: email }).subscribe((res: any) => {
        this.chat_count = res.count;
      });
    }
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

  onSubmit() {
    this.submitted = true;
    if (!this.Form.invalid) {
      let data = this.Form.value;
      data["refcode"] = this.user["referralCode"];
      this.spinner.show();
      this.authService.sendInvite(data).subscribe(
        (res) => {
          if (res.success) {
            this.toastr.success("Your friends invite has been sent!");
            this.Form.reset();
            this.modalReference.close();
          } else {
            this.toastr.error(res.error.message, "Error");
          }
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error, "Error");
        }
      );
    }
  }

  // Rohit chat status for online offline start
  getstatus() {
    this.statusOfChat = localStorage.getItem("Status");
    if (this.statusOfChat == "Offline") {
      this.setUserOffline();
    } else {
      this.setUserOnline();
    }
  }
  setIntrvl() {
    setInterval(() => this.getstatus(), 120000);
  }

  // Rohit chat status for online offline end
  getAllNotification() {
    console.log("notification status");
    this.sharedService.get("allnotification").subscribe(
      (res: any) => {
        if (res.success) {
          this.notificationsList = res.data;
        }
      },
      (error) => {
        // this.toastr.error(error);
      }
    );
  }
  gotoModPageFromNotif(notifData) {
    console.log("notifData",notifData)
    this._bs.postDataToreload.next({
      commentId: notifData.commentId,
    });
  }
  viewGroup(notif) {
    this.router.navigate(["group"], {
      queryParams: { id: notif.groupId },
    });
  }

  getSearchResult() {
    // Add event listener on keyup
    document.addEventListener(
      "keyup",
      (event) => {
        var name = event.key;
        var code = event.code;
        console.log(event.detail, "event code", name);
        // Alert the key name and key code on keydown
        if (
          event.key == "Enter" ||
          event.key == "Return" ||
          event.code == "13" ||
          event.detail == 13 ||
          event.code == "Enter" ||
          event.code == "0" ||
          event.code == "Return"
        ) {
          document.getElementById("searchClose").click();
        }
      },
      false
    );

    this._bs.headerSearchKeyword.next(this.searchKeyword);
    this.router.navigate(["search"]);
    this.searchKeyword = "";
    // this.showSearch = false;

    // this.sharedService.get("search?s=" + this.searchKeyword).subscribe(
    //   (res: any) => {
    //     if (res.success) {
    //       this.friendsList = res.Users;
    //       // this.categories = res.categoryData;
    //       this.modPosts = res.ModpostData;
    //       this.groups = res.groupData;
    //       this.router.navigate(["page/search"], {
    //         queryParams: { search: this.searchKeyword },
    //       });
    //     }
    //   },
    //   (error) => {
    //     this.toastr.error(error);
    //   }
    // );
  }

  followMod(id) {
    let data = {
      followFriendID: id,
      type: "follower",
    };
    this.spinner.show();
    this.sharedService.post(data, "follow/friend").subscribe(
      (res: any) => {
        if (res.success) {
          this.getSearchResult();
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

  followFriend(id) {
    this.spinner.show();
    let data = {
      requesterId: this.credentials ? this.credentials.credentials.id : null,
      recipientId: id,
    };
    this.sharedService.post(data, "add/friends").subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.getSearchResult();
          this.chatService.sendNotif({ user_id: id });
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

  redirect(id, type) {
    this.searchKeyword = "";
    if (type == "friends") {
      this.router.navigate(["friend-profile"], {
        queryParams: { id: id },
      });
    }
    if (type == "mods") {
      this.router.navigate(["mods"], {
        queryParams: { id: id, uid: this.credentials.credentials.id },
      });
    }
    if (type == "categories") {
      this.router.navigate(["mod-type"], { queryParams: { id: id } });
    }
    if (type == "groups") {
      this.router.navigate(["group"], { queryParams: { id: id } });
    }
  }

  redirectToModPage(type, event) {
    this.reset();
    this.router.navigate(["mods"]);
    let user = this.checkLoggedinUser();
    if (user) {
      if (type == "mods") {
        this.router.navigate(["mods"]);
      }
      if (type == "talk-mods") {
        this.router.navigate(["connections"]);
      }
      if (type == "share-mod") {
        this.router.navigate(["share-mod"]);
      }
    } else {
      this.onClickImage();
    }
  }

  checkLoggedinUser() {
    let user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }
  onClickImage() {
    this.sharedService.onClickImageWithoutLogin();
  }
  setUserOffline() {
    this.chatService.showOffline({
      user_id: this.user.id,
    });
  }
  removeUser() {
    this.chatService.removeUser({
      user_id: this.user.id,
    });
  }
  logout() {
    this.credentials.logout().subscribe((res) => {
      this.router.navigate(["/"]);
      delete this.activeParam;
      delete this.token;
      // this.router.navigate(["/alpha"]);
      // this.user = {}
      // window.location.reload()
    });
    localStorage.removeItem("url");
    localStorage.removeItem("interestArray");
    this._bs.unsetUser();
    this.removeUser();
    clearInterval(this.Interval);
  }

  // seeModsBtn(){
  //   if(this._bs.Tabs.value != 'seeMods') this._bs.Tabs.next('seeMods')
  // }

  // shareModBtn(){
  //   if(this._bs.Tabs.value != 'seeMods') this._bs.Tabs.next('seeMods')
  // }

  // talkModBtn(){
  //   if(this._bs.Tabs.value != 'seeMods') this._bs.Tabs.next('seeMods')
  // }

  friendRequest(url, id, user_id) {
    // this.sharedService.actionRequest(url).subscribe(
    //   (res: any) => {
    //     if (res.success) {
    //       this.toastr.success(res.message);
    //       this.updateNotification(id);
    //       this.getAllNotification();
    //       this.sendNotif(user_id);
    //       this.chatService.removeConnection({ userid: user_id });
    //       this._bs.RequestAccepted.next(true);
    //     }
    //   },
    //   (error) => {
    //     this.toastr.error(error);
    //   }
    // );
    this.sharedService.actionRequest(url).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.updateNotification(id);
          this.getAllNotification();
          this.sendNotif(user_id);
          this.chatService.removeConnection({ userid: user_id });
          this._bs.RequestAccepted.next(true);
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
  reset() {
    console.log("RESET TEST11");
    this.modfilters = {
      type: "SimpleMods",
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

    this._bs.modFilter.next(this.modfilters);
    this._bs.resetToBrowsemod.next(true);
  }

  updateNotification(id, data?) {
    this.sharedService.updateNotification(id).subscribe(
      (res: any) => {
        if (res.success) {
          // this.toastr.success(res.message);
          // this.updateNotification(id);
          this.getAllNotification();
          if (data && data.postType == "groupPost") {
            this.router.navigateByUrl("/group?id=" + data.postId);
          }
        }
      },
      (error) => {
        this.toastr.error(error);
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
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.Interval);
  }

  // showUser() {
  //   let tab1 = document.getElementById("pills-See-tab");
  //   let tab2 = document.getElementById("tab2");
  //   let tab3 = document.getElementById("pills-Talk-tab");
  //   tab1.classList.remove("active");
  //   tab2.classList.remove("active");
  //   tab3.classList.remove("active");
  //   setTimeout(() => {
  //     this.sharedService.changeMessage([this.chatUser]);
  //   }, 2000);
  // }
  // highlitertab() {
  //   let tab1 = document.getElementById("pills-See-tab");
  //   let tab2 = document.getElementById("tab2");
  //   let tab3 = document.getElementById("pills-Talk-tab");
  //   tab1.classList.remove("active");
  //   tab2.classList.remove("active");
  //   tab3.classList.remove("active");
  // }
  highlightUser(message) {
    if (message && message.memberdata && message.memberdata.length) {
      message.memberdata.forEach((d) => {
        if (
          d.email &&
          d.count &&
          d.count >= 1 &&
          document.getElementById(d.email)
        ) {
          document.getElementById(d.email).style.border =
            "thick solid rgb(82 227 150)";
        }
      });
    }
  }
  goToModDetail(url) {
    window.location.href = window.location.origin + url;
  }
}
