import { HttpEvent, HttpEventType } from "@angular/common/http";
import { elementEventFullName } from "@angular/compiler/src/view_compiler/view_compiler";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  Renderer2,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MyAuthService } from "src/app/auth/auth.service";
import { CredentialsService } from "src/app/auth/credentials.service";
import { ChatService } from "src/app/chat.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { SharedService } from "src/app/shared/shared.service";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";
import { AppInjector } from "../../app.module";
import { isPlatformBrowser } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditSocialPostComponent } from "../edit-social-post/edit-social-post.component";
import Swal from "sweetalert2";

import "sweetalert2/src/sweetalert2.scss";
import { ItemsControl } from "@ngu/carousel/lib/ngu-carousel/ngu-carousel";
@Component({
  selector: "app-connections",
  templateUrl: "./connections.component.html",
  styleUrls: ["./connections.component.scss"],
})
export class ConnectionsComponent implements OnInit {
  chatService: any;
  chat_url = environment.chat_url;
  @ViewChild("closeModal", { static: true }) closeModal: ElementRef;
  @ViewChild("scrollMe", { static: true }) public myScrollContainer: ElementRef;
  ModRVfriends: any = [];
  modFriendKeyword: any = "";
  _host = environment.url;
  searchKeyword: any = "";
  userList: any = [];
  userList1: any = [];
  FriendList: any = [];
  FriendList1: any = [];
  listArray: any = [];
  listArray1: any = [];
  listArray2: any = [];
  listArray3: any = [];
  getFriendList: any = [];
  userId: any = "";
  conversationId: any;
  selectedUserData: any = {};
  showChat: boolean = false;
  hideChat: boolean = false;
  dnone = false;
  newMessage: string;
  array = [];
  sum = 20;
  sumFollowing = 20;
  sumFollowers = 20;
  sumSearch = 20;
  throttle = 1000;
  scrollDistance = 10;
  scrollUpDistance = 2;
  direction = "";
  pageSize = 5;
  count: number;
  totalcount: number = 5;
  totalModsCount: any;

  loader = false;
  user: any;
  loadingContent = [1, 2, 3, 4, 5, 6, 7, 8];
  chat_history: any = [
    {
      messages: [],
    },
  ];
  users = [];
  blockedUsers: any = [];
  interval;
  friendSearch: any = "";
  fileToUpload: File = null;
  progress: number = 0;
  friendInterval;
  storeSearch: any = "";
  favStoreList: any = [];
  chat_count = 0;
  // showFavFollowers: boolean = false;
  showFriendList: boolean = true;
  showModFriendList: boolean = false;
  followInterval;
  inviteEmail: any = "";
  public Form: FormGroup;
  submitted = false;
  acceptedFriends: any = [];
  pendingFriends: any = [];
  suggestedRVfriends: any = [];
  addedFriendSearch: any = "";

  addFriendSearch: any = "";
  suggestedFriendInterval: any;
  suggestedRVFriendInterval: any;
  loadHistory = false;
  start: number;
  FrindData: any;
  FriendData: any;
  ModRVfriends1: any = [];
  ModRVfriends2: any = [];
  totalsuggest: number;
  totalFollowing: number;
  totalFollowes: number;
  totalSearch: number;

  // mobiTab= false;
  constructor(
    // private chatService: ChatService,
    private _sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private authService: MyAuthService,
    private _bs: BehaviorService,
    private router: Router,
    public credentials: CredentialsService,
    private pageService: PagesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.appendItems(0, this.sum);
    this.appendItemsFollowing(0, this.sumFollowing);
    this.appendItemsFollowers(0, this.sumFollowers);
    this.appendItemsSearch(0, this.sumSearch);
  }

  ngOnInit() {
    this.hideHighlight();
    this.getSuggestedRVfriendList();
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    this._bs.postDataToreload.subscribe((res) => {
      console.log(res, "res data in chat tab");
      if (res.tabToview) {
        setTimeout(() => {
          document.getElementById(res.tabToview).click();
        }, 400);
      }
    });
    this.user = JSON.parse(localStorage.getItem("user"));
    this.chatService.connect().subscribe((data) => {
      this.setUserOnline();
      this.allFriends();
    });
    this._bs.RequestAccepted.subscribe((res) => {
      if (res == true) {
        this.allFriends();
      }
    });
    this.allFriends();

    this.chatService.verifyReadStatus().subscribe((data: any) => {
      console.log("in update read status chat comp", data);
      if (
        data.from == this.selectedUserData["email"] &&
        data.to == this.user.email
      ) {
        console.log("in update read status chat comp read status if", data);
        this.updateReadStatus(data.from, data.to);
      }
      if (
        this.chat_history[0].messages &&
        this.chat_history[0].messages.length > 0 &&
        ((data.from == this.selectedUserData["email"] &&
          data.to == this.user.email) ||
          (data.from == this.user.email &&
            data.to == this.selectedUserData["email"]))
      ) {
        let objIndex = this.chat_history[0].messages.findIndex(
          (obj) => obj.identifier == data.identifier
        );

        if (objIndex != -1) {
          for (let i = 0; i < this.chat_history[0].messages.length; i++) {
            if (
              i <= objIndex &&
              this.chat_history[0].messages[i]["to"] == data.to &&
              this.chat_history[0].messages[i]["from"] == data.from &&
              ((data.from == this.selectedUserData["email"] &&
                data.to == this.user.email) ||
                (data.from == this.user.email &&
                  data.to == this.selectedUserData["email"]))
            ) {
              this.chat_history[0].messages[i]["receiver_readStatus"] = true;
            }
          }
        }
      }
    });
    this.chatService.updateHistory().subscribe((data: any) => {
      console.log("in update history in it", data);
      if (data.email == this.user.email) {
        this.chat_count = data.count;
      }
      this._bs.chatCount.next({ count: this.chat_count, email: data.email });
    });
    this.chatService.updateDeleteMessage().subscribe((data: any) => {
      console.log("update delete message status ", data);
      let objIndex = this.chat_history[0].messages.findIndex(
        (obj) => obj.identifier == data.identifier
      );

      if (objIndex != -1) {
        this.chat_history[0].messages.splice(objIndex, 1);
      }
    });
    this.chatService.showUserOnline().subscribe((data: any) => {
      if (data.userid) {
        if (this.userList.length > 0) {
          const index = this.userList.findIndex(
            (element) => element.id == data.userid
          );
          if (index != -1) {
            this.userList[index].isOnline = true;
          }
        }
        if (this.getFriendList.length > 0) {
          const index = this.getFriendList.findIndex(
            (element) => element.id == data.userid
          );
          if (index != -1) {
            this.getFriendList[index].isOnline = true;
          }
        }
        if (this.ModRVfriends.length > 0) {
          const index = this.ModRVfriends.findIndex(
            (element) => element.id == data.userid
          );
          if (index != -1) {
            this.ModRVfriends[index].isOnline = true;
          }
        }
        if (this.suggestedRVfriends.length > 0) {
          const index = this.suggestedRVfriends.findIndex(
            (element) => element.id == data.userid
          );
          if (index != -1) {
            this.suggestedRVfriends[index].isOnline = true;
          }
        }
        if (
          this.selectedUserData &&
          this.selectedUserData.userId == data.userid
        ) {
          this.selectedUserData.activityStatus = true;
        }
      }
    });

    this.chatService.showUserOffline().subscribe((data: any) => {
      if (data.userid) {
        if (this.userList.length > 0) {
          const index = this.userList.findIndex(
            (element) => element.id == data.userid
          );
          if (index != -1) {
            this.userList[index].isOnline = false;
          }
        }
        if (this.getFriendList.length > 0) {
          const index = this.getFriendList.findIndex(
            (element) => element.id == data.userid
          );
          if (index != -1) {
            this.getFriendList[index].isOnline = false;
          }
        }
        if (this.ModRVfriends.length > 0) {
          const index = this.ModRVfriends.findIndex(
            (element) => element.id == data.userid
          );
          if (index != -1) {
            this.ModRVfriends[index].isOnline = false;
          }
        }
        if (this.suggestedRVfriends.length > 0) {
          const index = this.suggestedRVfriends.findIndex(
            (element) => element.id === data.userid
          );
          if (index != -1) {
            this.suggestedRVfriends[index].isOnline = false;
          }
        }
        if (
          this.selectedUserData &&
          this.selectedUserData.userId == data.userid
        ) {
          this.selectedUserData.activityStatus = false;
        }
      }
    });

    this.chatService.testMessages().subscribe((message: any) => {
      let d = {
        to: message.to,
        message: message.message,
        from: message.from,
        img: message.img,
        identifier: message.identifier,
        receiver_readStatus: message.receiver_readStatus,
        date_time: message.date_time,
      };
      if (
        message.conversationId == this.conversationId &&
        this.chat_history[0].messages.length > 0 &&
        message.to == this.user["email"] &&
        message.from == this.selectedUserData["email"]
      ) {
        this.chat_history[0].messages.push(d);
        this.chatService.readMessageStatus(d);
      } else if (
        (!this.conversationId || this.conversationId == undefined) &&
        this.chat_history[0].messages &&
        this.chat_history[0].messages.length == 0 &&
        message.to == this.user["email"] &&
        message.from == this.selectedUserData["email"]
      ) {
        this.conversationId = message.conversationId;
        this.chat_history[0] = {
          _id: message.conversationId,
          messages: [d],
        };
        this.chatService.readMessageStatus(d);
      } else if (
        (!this.conversationId || this.conversationId == undefined) &&
        this.chat_history[0].messages.length != 0 &&
        message.to == this.user["email"] &&
        message.from == this.selectedUserData["email"]
      ) {
        this.conversationId = message.conversationId;
        this.chat_history[0].messages.push(d);
        this.chatService.readMessageStatus(d);
      }
      this.chatService.fetchHistory({ email: d.to });
    });

    this.chatService.updateConnection().subscribe((data: any) => {
      if (data.userid == this.user.id) {
        this.allFriends();
        this.showChat = false;
      }
    });
    this.createForm();
    this._sharedService.currentMessage.subscribe((message: any) => {
      if (
        message &&
        message.length &&
        message[0].memberdata &&
        message[0].memberdata.length
      ) {
        message[0].memberdata.forEach((d) => {
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
    });
  }
  addItems(startIndex, endIndex, _method) {
    for (let i = 0; i < this.sum; i++) {
      this.listArray[_method]([i]);
    }
  }
  addItemsFollowing(startIndex, endIndex, _method) {
    for (let i = 0; i < this.sum; i++) {
      this.listArray1[_method](i);
    }
  }
  addItemsFollowers(startIndex, endIndex, _method) {
    for (let i = 0; i < this.sum; i++) {
      this.listArray2[_method](i);
    }
  }
  addItemsSearch(startIndex, endIndex, _method) {
    for (let i = 0; i < this.sum; i++) {
      this.listArray3[_method](i);
    }
  }
  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "push");
  }
  appendItemsSearch(startIndex, endIndex) {
    this.addItemsSearch(startIndex, endIndex, "push");
  }
  appendItemsFollowing(startIndex, endIndex) {
    this.addItemsFollowing(startIndex, endIndex, "push");
  }
  appendItemsFollowers(startIndex, endIndex) {
    this.addItemsFollowers(startIndex, endIndex, "push");
  }

  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "unshift");
  }

  // addItems(startIndex, endIndex, _method) {

  //   const newValues = [];

  //   for (let i = this.start; i < this.sum; ++i) {
  //     newValues.push([i].join(''));
  //   }

  //   Array.prototype[_method].apply(this.array, newValues);
  // }

  // appendItems(startIndex, endIndex) {
  //   this.addItems(startIndex, endIndex, 'push');
  // }

  // prependItems(startIndex, endIndex) {
  //   this.addItems(startIndex, endIndex, 'unshift');
  // }

  // onScrollDown(ev) {
  //   console.log('scrolled down!!', ev);

  //   // add another 20 items
  //   this.start = this.sum;
  //   this.sum += this.pageSize;

  //   this.appendItems(this.start, this.sum);
  //   console.log(this.start, this.sum)
  //   this.direction = 'down';
  // }
  remove() {
    this.dnone = !this.dnone;
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

  setUserOnline() {
    this.chatService.showOnline({
      user_id: this.user.id,
    });
  }

  connectSocket(data) {
    this.chatService.addUser({
      email: data.email,
      user_id: data.id,
    });
    console.log(data);
  }

  sendMessage() {
    if (this.newMessage != "") {
      let identifier = this._sharedService.generateRandomString();
      this.chatService.sendOne2OneMessage({
        conversationId:
          this.chat_history.length > 0 ? this.chat_history[0]._id : null,
        message: this.newMessage,
        to: this.selectedUserData["email"],
        from: this.user.email,
        receiver_readStatus: false,
        identifier: identifier,
      });
      let d = {
        to: this.selectedUserData["email"],
        message: this.newMessage,
        from: this.user.email,
        receiver_readStatus: false,
        date_time: new Date(),
        identifier: identifier,
      };
      this.chat_history[0]["messages"].push(d);

      this.newMessage = "";
      this.chatService.fetchHistory({ email: d.to });
      this._bs.messageSent.next({ status: true, email: d.to });
    }
  }

  updateChatBox(data) {
    this.chat_history = [];
    if (data && data != undefined && data.length > 0) {
      console.log("in chat history if");
      this.conversationId = data._id;
      data.forEach((element) => {
        let d = {
          _id: element._id,
          members: element.members,
          messages: element.messages,
        };
        let a = [];
        a.push(d);
        this.chat_history.push(d);
      });
      let last_element =
        this.chat_history[0]["messages"][
          this.chat_history[0]["messages"].length - 1
        ];
      this.chatService.readMessageStatus(last_element);
      let to_user_id = "";
      if (last_element.to == this.selectedUserData["email"]) {
        to_user_id = last_element.to;
      } else {
        to_user_id = last_element.from;
      }
      this.chatService.fetchHistory({ email: this.user.email });
    } else {
      this.chat_history[0] = {
        messages: [],
      };
    }
  }
  // Following
  allFriends() {
    this.loader = true;
    let data = {
      id: this.user.id,
      search: this.addedFriendSearch,
    };
    this.pageService.getFollowings(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.loader = false;
          this.totalFollowing = res.total;
          this.getFriendList.length = 0; // Clear contents
          this.getFriendList = res.data.map((cat) => {
            return {
              id: cat.followFriendIDDetails
                ? cat.followFriendIDDetails._id
                : null,
              role: cat.followFriendIDDetails
                ? cat.followFriendIDDetails.role
                : null,
              isDeleted: cat.followFriendIDDetails
                ? cat.followFriendIDDetails.isDeleted
                : null,
              firstName: cat.followFriendIDDetails
                ? cat.followFriendIDDetails.firstName
                : "",
              lastName: cat.followFriendIDDetails
                ? cat.followFriendIDDetails.lastName
                : "",
              fullName: cat.followFriendIDDetails
                ? cat.followFriendIDDetails.fullName
                : "",
              // displayName: cat.followFriendIDDetails.displayName,
              // email: cat.followFriendIDDetails.email,
              image: cat.followFriendIDDetails
                ? cat.followFriendIDDetails.image
                : "",
              slug: cat.followFriendIDDetails
                ? cat.followFriendIDDetails.slug
                : "",
              // isOnline: cat.followFriendIDDetails.isOnline,
              // badgeType: cat.followFriendIDDetails.badgeType,
              // status: cat.followFriendIDDetails.status,
              // earnPoints: cat.followFriendIDDetails.earnPoints,
              // isVerified: cat.followFriendIDDetails.isVerified,
              // createdAt: cat.createdAt,
              // deletedAt: cat.deletedAt,
              // isFollow: true,
              // isFriend: cat.isFriend,
              // isPending: cat.isPending,
              isUserExist: cat.isUserExist,
              model: cat.followFriendmodel,
              ownRv: cat.followFriendownRV,
              totalMods: cat.totalMods,

              series: cat.followFriendseries
                ? cat.followFriendseries.name
                : null,
              make: cat.followFriendmake ? cat.followFriendmake.name : null,

              rvType: this._sharedService.getRvType(
                cat.followFriendIDDetails
                  ? cat.followFriendIDDetails.rvType
                  : ""
              ),
              followFriendIDDetails: cat.followFriendIDDetails,
              year: cat.followFriendyear,
              isFollow: true,
              fbId: cat.followFriendIDDetails
                ? cat.followFriendIDDetails.fbId
                : "",
              gId: cat.followFriendIDDetails
                ? cat.followFriendIDDetails.gId
                : "",
            };
          });
        }
        this.ModRVfriends1 = this.getFriendList.slice(0, this.sumFollowing);
        console.log(this.ModRVfriends1, this.sumFollowing);
        // this.onScrollFollowing()
      },
      (error) => {
        this.loader = false;
        console.log(error);
      }
    );

    // let path = "allfriends?search=" + this.addedFriendSearch;
    // this._sharedService.get(path).subscribe(
    //   (res: any) => {
    //     if (res.success) {
    //       this.getFriendList.length = 0; // Clear contents
    //       this.getFriendList = res.data.map((cat) => {
    //         return {
    //           id: cat.id,
    //           role: cat.role,
    //           isDeleted: cat.isDeleted,
    //           firstName: cat.firstName,
    //           lastName: cat.lastName,
    //           fullName: cat.fullName,
    //           displayName: cat.displayName,
    //           email: cat.email,
    //           image: cat.image,
    //           isOnline: cat.isOnline,
    //           badgeType: cat.badgeType,
    //           status: cat.status,
    //           earnPoints: cat.earnPoints,
    //           isVerified: cat.isVerified,
    //           createdAt: cat.createdAt,
    //           deletedAt: cat.deletedAt,
    //           isFollow: cat.isFollow,
    //           isFriend: cat.isFriend,
    //           isPending: cat.isPending,
    //           fbId: cat.fbId,
    //           gId: cat.gId,
    //         };
    //       });
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
  onScrollFollowing() {
    this.ModRVfriends1 = [];
    this.sumFollowing += 20;
    this.appendItemsFollowing(this.totalcount, this.sumFollowing);
    this.ModRVfriends1 = this.getFriendList.slice(0, this.sumFollowing);
    console.log(this.ModRVfriends1.length);
    console.log(this.totalFollowing);
  }
  fetchChatHistory() {
    this.chatService.fetchHistory({
      email: this.credentials.credentials.email,
    });
  }
  focusFollowing() {
    setTimeout(() => {
      try {
        const errorField3 = this.renderer.selectRootElement("#searchFollowing");
        console.log("in");
        errorField3.focus();
      } catch (err) {}
    }, 500);
  }
  focusFollower() {
    setTimeout(() => {
      try {
        const errorField4 = this.renderer.selectRootElement("#searchFollowers");
        errorField4.focus();
        console.log("in");
      } catch (err) {}
    }, 500);
  }
  focus() {
    setTimeout(() => {
      try {
        const errorField2 = this.renderer.selectRootElement("#search11111");
        errorField2.focus();
      } catch (err) {}
    }, 500);
  }
  unFriend(id, key, index) {
    this.spinner.show();

    this.pageService.unFriend(id).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.sendNotif(id);
          this.toastr.success(res.message);
          this.allFriends();
          if (key == "normalFriend") {
            this.userList[index].isFriend = false;
          }
          if (key == "myFriend") {
            console.log("2");
            this.getFriendList[index].isFriend = false;
            if (id == this.selectedUserData.userId) {
              this.showChat = false;
            }
          }
          if (key == "myModFriends") {
            this.ModRVfriends[index].isFriend = false;
          }
          if (key == "suggestedRvfriend") {
            this.suggestedRVfriends[index].isFriend = false;
          }
          //  else {
          //   console.log("4")
          //   this.suggestedRVfriends[index].isFriend = false;
          // }
          this.chatService.removeConnection({ userid: id });
          // this.friendList();
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

  addFriend(id, key, index) {
    // this.spinner.show();
    let data = {
      requesterId: this.user.id,
      recipientId: id,
    };
    this._sharedService.post(data, "add/friends").subscribe(
      (res: any) => {
        // this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.sendNotif(id);
          // this.searchKeyword = "";
          if (key == "normalFriend") {
            this.userList[index].isPending = res.isPending;
            this.userList[index].isFriend = res.isFriend;
          }
          if (key == "myModFriends") {
            this.ModRVfriends[index].isPending = res.isPending;
            this.ModRVfriends[index].isFriend = res.isFriend;
          }
          if (key == "suggestedRvfriend") {
            this.suggestedRVfriends[index].isPending = res.isPending;
            this.suggestedRVfriends[index].isFriend = res.isFriend;
          }
        } else {
          //  this._sharedService.loader('hide');
          this.toastr.error(res.error.message);
        }
      },
      (error) => {
        // this.spinner.hide();
        this.toastr.error("There are some error please try after some time.");
      }
    );
  }
  //search
  suggestedFriendList() {
    this.loader = true;
    console.log(this.addFriendSearch.length, "addFriendSearch");
    if (this.addFriendSearch.length == 0) {
      this.userList1 = [];
    }
    if (this.addFriendSearch.length >= 1) {
      let path = "suggested/friendslist?search=" + this.addFriendSearch;
      // let path = "suggestedRV/friendslist?search=" + this.searchKeyword;
      this._sharedService.get(path).subscribe(
        (res: any) => {
          if (res.success) {
            this.loader = false;
            this.totalSearch = res.totalResult;
            this.userList = res.data.map((cat) => {
              return {
                id: cat.id,
                userData: cat,
                model: cat.model,
                ownRv: cat.ownRV,
                series: cat.series ? cat.series.name : "",
                make: cat.make ? cat.make.name : "",
                rvType: this._sharedService.getRvType(cat.rvType),
                year: cat.year,
                totalMods: cat.totalMods,
                isFollow: cat.isFollow,
              };
            });
          }
          console.log("this.sumSearch", this.sumSearch);
          this.userList1 = this.userList.slice(0, this.sumSearch);
        },
        (error) => {
          this.loader = false;
          console.log(error);
        }
      );
    } else {
      this.loader = false;
      this.userList1 = [];
    }
  }
  onScrollSearch() {
    this.userList1 = [];
    this.sumSearch += 20;
    this.appendItemsSearch(this.totalcount, this.sumSearch);
    this.userList1 = this.userList.slice(0, this.sumSearch);
    console.log("userList ", this.userList1, this.userList1.length);
  }

  // suggested list of users
  getSuggestedRVfriendList() {
    this.sum = 20;
    this.loader = true;
    //suggested list
    clearInterval(this.suggestedFriendInterval);
    // if(this.searchKeyword!=''){
    let path = "suggestedRV/friendslist?search=" + this.searchKeyword;
    // let path = "suggestedRV/friendslist?search=" + this.searchKeyword;
    this._sharedService.get(path).subscribe(
      (res: any) => {
        if (res.success) {
          this.totalsuggest = res.total;
          this.loader = false;
          this.FriendList.length = 0; // Clear contents
          this.FriendList = res.data.map((cat) => {
            console.log(cat.rvType, "cat.rvType");
            return {
              id: cat.id,
              userData: cat,
              model: cat.model,
              ownRv: cat.ownRV,
              series: cat.series ? cat.series.name : "",
              make: cat.make ? cat.make.name : "",
              rvType:
                cat.rvType &&
                cat.rvType != "" &&
                cat.rvType != null &&
                cat.rvType != undefined
                  ? this._sharedService.getRvType(cat.rvType)
                  : "",
              year: cat.year,
              isFollow: cat.isFollow,
              totalMods: cat.totalMods,
            };
          });
          this.FriendList1 = this.FriendList.slice(0, this.sum);
        }
      },
      (error) => {
        this.loader = false;
        console.log(error);
      }
    );
    // }else{
    //   this.suggestedRVfriends=[];
    // }
  }
  onScroll() {
    this.loader = true;
    this.FriendList1 = [];
    this.totalcount = this.sum;
    this.sum += 20;
    this.appendItems(this.totalcount, this.sum);
    this.FriendList1 = this.FriendList.slice(0, this.sum);
    this.loader = false;
  }
  // Followers
  getRVModfriendList() {
    this.loader = true;
    this.showModFriendList = true;
    clearInterval(this.suggestedFriendInterval);
    let data = {
      id: this.user.id,
      search: this.modFriendKeyword,
    };
    this.pageService.getFollowers(data).subscribe(
      (res: any) => {
        this.totalFollowes = res.total;
        if (res.success) {
          this.loader = false;
          this.ModRVfriends.length = 0; // Clear contents
          this.ModRVfriends = res.data.map((cat) => {
            return {
              id: cat.followedbyDetails._id,
              role: cat.followedbyDetails.role,
              isDeleted: cat.followedbyDetails.isDeleted,
              firstName: cat.followedbyDetails.firstName,
              lastName: cat.followedbyDetails.lastName,
              fullName: cat.followedbyDetails.fullName,
              slug: cat.followedbyDetails ? cat.followedbyDetails.slug : "",
              displayName: cat.followedbyDetails.displayName,
              email: cat.followedbyDetails.email,
              image: cat.followedbyDetails.image,
              isOnline: cat.followedbyDetails.isOnline,
              badgeType: cat.followedbyDetails.badgeType,
              status: cat.followedbyDetails.status,
              earnPoints: cat.followedbyDetails.earnPoints,
              isVerified: cat.followedbyDetails.isVerified,
              createdAt: cat.createdAt,
              deletedAt: cat.deletedAt,
              isFollow: cat.isFollow,
              isFriend: cat.isFriend,
              isPending: cat.isPending,
              fbId: cat.followedbyDetails.fbId,
              gId: cat.followedbyDetails.gId,
              isUserExist: cat.isUserExist,
              followedbyDetails: cat.followedbyDetails,
              model: cat.followedbymodel,
              ownRv: cat.followedbyownRV,
              make: cat.followedbymake ? cat.followedbymake.name : "",
              rvType: this._sharedService.getRvType(
                cat.followedbyDetails.rvType
              ),
              followFriendIDDetails: cat.followFriendIDDetails,
              followedbyseries: cat.followedbyseries
                ? cat.followedbyseries.name
                : "",
              series: cat.series,
              year: cat.followedbyyear,
              totalMods: cat.totalMods,
            };
          });
        }
        this.ModRVfriends2 = this.ModRVfriends.slice(0, this.sumFollowers);
      },
      (error) => {
        this.loader = false;
        console.log(error);
      }
    );
    // let path = "followed/friendList?search=" + this.modFriendKeyword;
    // this._sharedService.get(path).subscribe(
    //   (res: any) => {
    //     if (res.success) {
    //       this.ModRVfriends = res.data.map((cat) => {
    //         if (cat.followFriendIDDetails) {
    //           return {
    //             id: cat.followFriendID,
    //             badgeType: "",
    //             createdAt: cat.followFriendIDDetails.createdAt
    //               ? cat.followFriendIDDetails.createdAt
    //               : null,
    //             deletedAt: cat.followFriendIDDetails.deletedAt,
    //             displayName: cat.followFriendIDDetails.displayName,
    //             earnPoints: cat.followFriendIDDetails.earnPoints,
    //             email: cat.followFriendIDDetails.email,
    //             firstName: cat.followFriendIDDetails.firstName,
    //             fullName: cat.followFriendIDDetails.fullName,
    //             image: cat.followFriendIDDetails.image
    //               ? cat.followFriendIDDetails.image
    //               : "",
    //             isDeleted: cat.followFriendIDDetails.isDeleted,
    //             // isFollow: cat.followFriendIDDetails.isFollow,
    //             isOnline: cat.followFriendIDDetails.isOnline,
    //             isVerified: cat.followFriendIDDetails.isVerified,
    //             lastName: cat.followFriendIDDetails.lastName,
    //             role: cat.followFriendIDDetails.role,
    //             status: cat.followFriendIDDetails.status,
    //             fbId: cat.followFriendIDDetails.fbId,
    //             gId: cat.followFriendIDDetails.gId,
    //             isFriend: cat.isFriend,
    //             isPending: cat.isPending,
    //             isFollow: true,
    //             isUserExist:cat.isUserExist
    //           };
    //         }
    //       });
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
  onScrollFollowers() {
    this.sumFollowers += 20;
    console.log(this.sumFollowers);
    this.appendItemsFollowers(this.totalcount, this.sumFollowers);
    this.ModRVfriends2 = this.ModRVfriends.slice(0, this.sumFollowers);
    console.log("followers", this.totalFollowes, this.ModRVfriends2.length);
  }
  hideHighlight() {
    // if (isPlatformBrowser(this.platformId)) {
    //   let tab1 = document.getElementById("pills-See-tab");
    //   let tab2 = document.getElementById("tab2");
    //   let tab3 = document.getElementById("pills-Talk-tab");
    //   tab1.classList.remove("active");
    //   tab2.classList.remove("active");
    //   tab3.classList.remove("active");
    // }
  }
  followMod(id, key, index, isFollow, fullName) {
    console.log("parameter", id, key, index, isFollow, fullName);
    let data = {
      followFriendID: id,
      type: "follower",
    };
    if (isFollow == true) {
      Swal.fire({
        title: "Are you sure you want to unfollow " + fullName + " ?",
        // html: "<b>Next Step:</b> Verify Your Email. <br> We’ve sent you an email. Click the link in the email to continue setting up your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this._sharedService.post(data, "follow/friend").subscribe(
            (res: any) => {
              if (res.success) {
                this.sendNotif(id);
                if (key == "normalFriend") {
                  this.userList[index].isFollow = res.isFollow;
                  // this.userList.splice(index, 1);
                } else if (key == "myModFriends") {
                  this.ModRVfriends[index].isFollow = res.isFollow;
                } else if (key == "myFriend") {
                  // if (res.isFollow == true) {
                  //   this.getFriendList[index].isFollow = res.isFollow;
                  // } else {
                  //   this.getFriendList.splice(index, 1);
                  // }
                  if (res.isFollow == true) {
                    this.ModRVfriends1[index].isFollow = res.isFollow;
                  } else {
                    this.ModRVfriends1.splice(index, 1);
                  }
                } else if (key == "suggestedRvfriend") {
                  // if (res.isFollow == true) {
                  //   this.FriendList.splice(index, 1);
                  // } else {
                  //   this.FriendList[index].isFollow = res.isFollow;
                  // }
                  if (res.isFollow == true) {
                    this.FriendList1.splice(index, 1);
                  } else {
                    this.FriendList1[index].isFollow = res.isFollow;
                  }
                } else {
                }
              } else {
                this.toastr.error(res.error.message, "Error");
              }
            },
            (err) => {
              this.toastr.error(err, "Error");
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
        // this.toastr.success('Registered Successfully. Please verify your email!');
      });
    } else {
      this._sharedService.post(data, "follow/friend").subscribe(
        (res: any) => {
          if (res.success) {
            this.sendNotif(id);
            if (key == "normalFriend") {
              // this.userList.splice(index, 1);
              this.userList[index].isFollow = res.isFollow;
            } else if (key == "myModFriends") {
              this.ModRVfriends[index].isFollow = res.isFollow;
            } else if (key == "myFriend") {
              if (res.isFollow == true) {
                this.ModRVfriends1[index].isFollow = res.isFollow;
              } else {
                this.ModRVfriends1.splice(index, 1);
              }
            } else if (key == "suggestedRvfriend") {
              if (res.isFollow == true) {
                this.FriendList1.splice(index, 1);
              } else {
                this.FriendList1[index].isFollow = res.isFollow;
              }
              // if (res.isFollow) {
              //   this.FriendList.splice(index, 1);
              // } else {
              //   this.FriendList[index].isFollow = res.isFollow;
              // }
            } else {
            }
          } else {
            this.toastr.error(res.error.message, "Error");
          }
        },
        (err) => {
          this.toastr.error(err, "Error");
        }
      );
    }
  }

  getBlockedUsers() {
    let path = "blockedUsers";
    this._sharedService.get(path).subscribe(
      (res: any) => {
        if (res.success) {
          // this.blockedUsers = res.data.blockedUsers;
          this.blockedUsers = res.data.blockedUsers.map((cat) => {
            return {
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              id: cat.isBlocked,
              status: cat.status,
              isBlocked: cat.isBlocked,
              isDeleted: cat.isDeleted,
              deletedAt: cat.deletedAt,
              recipientId:
                cat.recipientId.id == this.user.id
                  ? cat.requesterId
                  : cat.recipientId,
              // requesterId:cat.requesterId,
              // recipientId:cat.recipientId,
              notificationId: cat.notificationId,
              blockedBy: cat.status,
              deletedBy: cat.deletedBy,
              updatedBy: cat.updatedBy,
              addedBy: cat.addedBy,
            };
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  blockFriend(id, status) {
    let obj = {
      recipientId: id,
      isBlocked: status,
    };
    this.spinner.show();
    this._sharedService.put(obj, "blockUser").subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          if (status == true) {
            this.toastr.success("Blocked Successfully");
            this.selectedUserData = {};
            this.allFriends();
            this.showChat = false;
          } else {
            this.toastr.success("Unblocked Successfully");
            this.allFriends();
            this.closeModal.nativeElement.click();
          }
        } else {
        }
      },
      (error) => {
        this.toastr.error(error);
        this.spinner.hide();
      }
    );
  }

  selectedUser(item, friendId) {
    if (!item.isFriend) {
      return;
    } else {
      this.showChat = true;
      this.selectedUserData = {
        name: item.fullName,
        userId: item.id,
        id: friendId,
        isFriend: item.isFriend,
        image: item.image,
        fbId: item.fbId,
        gId: item.gId,
        email: item.email,
        activityStatus: item.isOnline,
      };

      this.chatService.addUser({
        email: this.user.email,
        user_type: "U",
        user_id: this.user.id,
      });
      this.getMessage();
    }
  }

  openEditSocialPost() {
    const modalRef = this.modalService.open(EditSocialPostComponent);
    modalRef.componentInstance.name = "edit-social-modal";
    modalRef.componentInstance.postType = "normalPost";
  }
  deleteMessage(data) {
    console.log(data, "in delete message");
    // this.chatService.deleteUserMessage(data)
    this.chatService.deleteUserMessage(data).subscribe((response) => {
      if (response.status == 200) {
        console.log("update delete ", data);
        let objIndex = this.chat_history[0].messages.findIndex(
          (obj) => obj.identifier == data.identifier
        );

        if (objIndex != -1) {
          this.chat_history[0].messages.splice(objIndex, 1);
        }
        this.chatService.deleteMessage(data);
        // this.chatService.fetchHistory({ email: data.to });
        // this.chatService.fetchHistory({ email: data.to });
      }
    });
    // this.chatService.deleteMessage(data);
  }

  getMessage() {
    this.chatService
      .user_history(this.selectedUserData["email"], this.user.email)
      .subscribe((message: string) => {
        // this.chat_history = message["conversation"];

        // if (this.chat_history.length > 0) {

        // }
        this.loadHistory = true;
        this.updateChatBox(message["conversation"]);
        this.updateReadStatus(this.selectedUserData["email"], this.user.email);
        // this.friendList();
        // this.scrollToBottom();
      });
    // this.updateReadStatus();
  }

  scrollToBottom(): void {
    // this.updateReadStatus();
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
      // if (this.myScrollContainer.nativeElement.scrollTop) {
      // this.updateReadStatus();
      // }
    } catch (err) {}
    // this.updateReadStatus();
  }

  closeChat() {
    this.chatService.removeUser({
      user_id: this.user.id,
    });
    clearInterval(this.interval);
  }

  // onFocusEvent(event: any) {
  //   console.log(event.target.value);
  //   this.updateReadStatus();
  // }

  updateReadStatus(sender, reciever) {
    let body = {};
    this.chatService
      .put(
        body,
        "chat/update_readStatus?receiver=" + reciever + "&sender=" + sender
      )
      .subscribe(
        (res: any) => {
          if (sender && document.getElementById(sender)) {
            document.getElementById(sender).style.border = "none";
          }
          // this.fetchMessagesCount(sender);
          // this.fetchMessagesCount(reciever);
          this.chatService.fetchHistory({
            email: sender,
          });
          this.chatService.fetchHistory({ email: reciever });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  fetchMessagesCount(email) {
    this.chatService.fetch_history({ email: email }).subscribe((res: any) => {
      this.chat_count = res.count;
      this._bs.chatCount.next({ email: email, count: this.chat_count });
    });
  }

  getUrl(img, detail) {
    let image = "";
    let socialImage = false;
    if (img != undefined && img != "" && img != null) {
      socialImage = this.imageIsOfSocialLogin(img);
    }
    if (
      img &&
      img != undefined &&
      img != "" &&
      img != null &&
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

  handleFileInput(files: FileList) {
    if (
      files.item(0).type == "image/png" ||
      files.item(0).type == "image/jpg" ||
      files.item(0).type == "image/jpeg" ||
      files.item(0).type == "image/gif" ||
      files.item(0).type == "image/PNG" ||
      files.item(0).type == "image/JPG" ||
      files.item(0).type == "image/JPEG" ||
      files.item(0).type == "image/GIF"
    ) {
      this.fileToUpload = files.item(0);
      this.uploadFileToActivity();
    } else {
      this.toastr.warning("Sorry, This file extension is not supportable!");
    }
    // this.scrollToBottom();
  }

  uploadFileToActivity() {
    if (this.selectedUserData && this.fileToUpload) {
      // console.log(this.fileToUpload)
      this.chatService
        .postFile(
          this.fileToUpload,
          this.selectedUserData["email"],
          this.user.email,
          this.user.image
        )
        .subscribe(
          (event: HttpEvent<any>) => {
            // do something, if upload success

            switch (event.type) {
              case HttpEventType.UploadProgress:
                this.progress = Math.round((event.loaded / event.total) * 100);
                // console.log(`Uploaded! ${this.progress}%`);
                break;
              case HttpEventType.Response:
                console.log("User successfully created!", event.body);
                if (event.body.success) {
                  console.log("event.body.data", event.body.data);
                  // this.chatService.fileUploadEvent({
                  //   to: this.selectedUserData["email"],
                  //   from: this.user.username,
                  //   message: "attachment",
                  //   img: event.body.data.img,
                  // });
                } else {
                  window.scrollTo(0, 0);
                }
                // let d = {
                //   to: this.selectedUserData["email"],
                //   message: "attachment",
                //   from: this.user.email,
                //   receiver_readStatus: false,
                //   date_time: new Date(),
                //   img: event.body.data.img,
                // };

                // this.chat_history[0].messages.push(d);
                // this.chatService.fileUploadEvent({
                //   to: this.selectedUserData["email"],
                //   from: this.user.email,
                //   message: "attachment",
                //   img: event.body.data.img,
                // });
                let identifier = this._sharedService.generateRandomString();
                this.chatService.sendOne2OneMessage({
                  conversationId:
                    this.chat_history.length > 0
                      ? this.chat_history[0]._id
                      : null,
                  message: "attachment",
                  img: event.body.data.img,
                  to: this.selectedUserData["email"],
                  from: this.user.email,
                  receiver_readStatus: false,
                  identifier: identifier,
                });
                let d = {
                  to: this.selectedUserData["email"],
                  message: "attachment",
                  img: event.body.data.img,
                  from: this.user.email,
                  receiver_readStatus: false,
                  date_time: new Date(),
                  identifier: identifier,
                };
                this.chat_history[0]["messages"].push(d);

                this.newMessage = "";
                this.chatService.fetchHistory({ email: d.to });
                this._bs.messageSent.next({ status: true, email: d.to });
                setTimeout(() => {
                  this.progress = 0;
                }, 100);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
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
            this.toastr.success("You Connection's invite has been sent!");
            this.Form.reset();
            this.submitted = false;
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

  sendNotif(id) {
    let data = {
      user_id: id,
    };
    this.chatService.sendNotif(data);
  }
  viewProfile(slug) {
    this.router.navigate(["profile", slug]);
  }

  cancelRequest(id, key, index) {
    this.spinner.show();

    this.pageService.cancelRequest(id).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.sendNotif(id);
          this.toastr.success(res.message);
          // if (key == "normalFriend") {
          //   this.suggestedFriendList();
          // }
          // if (key == "suggestedModfriend") {
          //   this.getRVModfriendList();
          // } else {
          //   this.getSuggestedRVfriendList();
          // }
          if (key == "normalFriend") {
            this.userList[index].isPending = res.isPending;
            this.userList[index].isFriend = res.isFriend;
          }
          if (key == "myFriend") {
            this.getFriendList.splice(index, 1);
            // this.getFriendList[index].isPending = res.isPending;
            // this.getFriendList[index].isFriend = res.isFriend;
          }
          if (key == "myModFriends") {
            this.ModRVfriends[index].isPending = res.isPending;
            this.ModRVfriends[index].isFriend = res.isFriend;
          }
          if (key == "suggestedRvfriend") {
            this.suggestedRVfriends[index].isPending = res.isPending;
            this.suggestedRVfriends[index].isFriend = res.isFriend;
          }

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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.interval);
    clearInterval(this.friendInterval);
    delete this.selectedUserData;
    // this.setUserOffline()
  }
}
