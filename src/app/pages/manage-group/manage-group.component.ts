import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { PagesService } from "../pages.service";
import { NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { BehaviorService } from "src/app/shared/behavior.service";
import { HttpEvent, HttpEventType, HttpParams } from "@angular/common/http";
import { SharedService } from "src/app/shared/shared.service";
import { ShareModalComponent } from "../share-modal/share-modal.component";
import { CredentialsService } from "src/app/auth/credentials.service";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { ReportSectionComponent } from "../report-section/report-section.component";
import { ChatService } from "src/app/chat.service";
import { LikeListingModalComponent } from "../like-listing-modal/like-listing-modal.component";
import { PostSharedWithComponent } from "../post-shared-with/post-shared-with.component";
import { AppInjector } from "../../app.module";
import { isPlatformBrowser } from "@angular/common";
import { MagnifyImageComponent } from "src/app/shared/shared/magnify-image/magnify-image.component";
import { EditGroupPostComponent } from "../edit-group-post/edit-group-post.component";

declare var require: any;
var Filter = require("bad-words"),
  filter = new Filter();
@Component({
  selector: "app-manage-group",
  templateUrl: "./manage-group.component.html",
  styleUrls: ["./manage-group.component.scss"],
})
export class ManageGroupComponent implements OnInit {
  newBadWords = environment.bad_word;
  _frontUrl = "https://www.rvmodshare.com/";
  chatService: any;
  groupUrl: any;
  @ViewChild("groupInput", { static: false }) groupInput;
  imageLoader: boolean = false;
  @ViewChild("postInput", { static: false }) postInput;
  postImageLoader: boolean = false;
  groupFileLoader: boolean = false;
  @ViewChild("docInput", { static: false }) docInput;
  progress: number = 0;
  groupdocuments: Array<any> = [];
  modalReference3: any;
  tagsArray: Array<any> = [];
  reportedPosts: Array<any> = [];
  searchPost: any;
  postImages = [];
  detavak: any;
  public response2: any;
  slug: any;
  commentData: any;
  mygroups = [];
  editComment = false;
  editReply = false;
  categories: Array<any> = [];
  message = "";
  onlyFewDetailEdit = false;
  slideConfig: any;
  loader = false;
  poll = false;
  postIndex: any;
  postMessage: string = "";
  allUsers: Array<any> = [];
  joinedGroupMembers: Array<any> = [];
  joinRequest: Array<any> = [];
  totalMembers: number = 0;
  member: any;
  adminAccess: boolean = true;
  isCommentDisabled: boolean = false;
  selected_role = "member";
  today = new Date();
  token = "";
  uid: any;
  showList = false;
  commentOnPost: any;
  replyOnPost: any;
  replyOnPost2: any;
  replyOnPost3: any;
  allPosts: Array<any> = [];
  totalPosts = 0;
  invited_member_id: any;
  allUsersData: Array<any> = [];
  selectedItem: Array<any> = [];
  dropdownSettings: any = {};
  closeDropdownSelection = false;
  disabled = false;
  showEmojiPicker = false;
  oldIndex: number;
  hover: boolean = false;
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
  open(invitecontent) {
    this.modalReference = this.modalService.open(invitecontent);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    this.submitted = false;
    this.groupForm.reset();
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  @ViewChild("content", { static: true }) modalContent: TemplateRef<any>;
  closeResult = "";
  submitted: Boolean = false;
  groupImage: any;
  fileToUpload: File = null;
  groupDetail: any = {};
  modalReference: any;
  groupId: string = "";
  id: string = "";
  userSlug: any;
  user: any;

  _host = environment.url;
  allComments: Array<any> = [];
  totalComments: Array<any> = [];
  public groupForm: FormGroup;
  config1 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose Member", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 10, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search Member", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  replyForm: any;

  comments: any = [
    {
      id: "a1",
      comment: "a",
      reply: [
        { id: "b1", reply: "a", subreply: [{ id: "c1", reply: "a" }] },
        { id: "b2", reply: "b" },
        { id: "b3", reply: "c" },
      ],
    },
    {
      id: "q1",
      comment: "a",
      reply: [
        { id: "w1", reply: "a", subreply: [{ id: "e1", reply: "a" }] },
        { id: "w2", reply: "b" },
        { id: "w3", reply: "c" },
      ],
    },
  ];
  pollForm: FormGroup;
  pollSubmitted: Boolean = false;

  constructor(
    config: NgbModalConfig,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _activateRouter: ActivatedRoute,
    private pageService: PagesService,
    private _bs: BehaviorService,
    private sharedService: SharedService,
    public credential: CredentialsService,
    // public chatService:ChatService
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.createForm();
    config.backdrop = "static";
    config.keyboard = false;
    filter.addWords(...this.newBadWords);
    _bs.postDataToreload.subscribe((res) => {
      if (res.postSection && res.postSection == "manageGroupPost") {
        this.getGroupPosts();
      }
    });
    this.user = JSON.parse(localStorage.getItem("credentials"));
    this.slug = this._activateRouter.snapshot.paramMap.get("slug");
    this.userSlug = this._activateRouter.snapshot.paramMap.get("userSlug");
    if (this.userSlug && !this.user) {
      let data = {
        slug: this.userSlug,
      };
      // this.autoLogin(data);
    }
    if (this.uid && !this.user) {
      let data = {
        id: this.uid,
      };
      // this.autoLogin(data);
    }
    if ((this.slug && this.user) || (this.slug && !this.user)) {
      this.getGroupDetail();
    }
    // this.getGroupMembers();
    // this.getGroupPosts();
    // this.getCategories();

    // this.pageService.getGroupData().subscribe(res=>{
    //   this.user = res
    // })
  }
  getdata(postId: any) {
    console.log("hello  ", postId);
  }
  openshare(postData) {
    // const modalRef = this.modalService.open(ShareModalComponent);
    // modalRef.componentInstance.name = 'World';
    let data = {
      postId: postData.id,
      postData: postData,
      postType: "groupPost",
    };
    this._bs.sharedPostData.next(data);
    const modalRef = this.modalService.open(ShareModalComponent);
    modalRef.componentInstance.name = "World";
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    // this._activateRouter.queryParams.subscribe((params) => {
    //   this.groupId = params.id;
    //   this.uid = params.uid;
    //   this.getGroupDetail();
    // });

    this.pollForm = this.formBuilder.group({
      post: ["", Validators.required],
      isCommentDisabled: ["false"],
      choice1: ["", Validators.required],
      choice2: ["", Validators.required],
      isValidTime: ["", Validators.required],
      choices: this.formBuilder.array([]),
    });
  }

  breakpoint(e) {
    console.log("breakpoint");
  }

  replyClick(p: any) {
    if (p == this.replyForm) {
      this.replyForm = 0;
    } else {
      this.replyForm = p;
    }
  }
  submiteditComment(comment, type, postId) {
    let data = {
      postId: postId,
      postType: "groupPost",
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
          this.getComments(postId);
          this.readmoreLess(this.postIndex, "add");
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

  openReport(id, key, postData, reportType) {
    this.modalReference3 = this.modalService.open(ReportSectionComponent);
    let data = {
      key: key,
      id: id,
      postData: postData,
      reportType: reportType,
      groupId: this.groupId,
    };
    this.modalReference3.componentInstance.reportData = data;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  createForm() {
    this.groupForm = this.formBuilder.group({
      image: [""],
      categoryId: ["", Validators.required],
      tags: [""],
      description: ["", Validators.required],
      name: ["", Validators.required],
      isHidden: [false],
      isPrivate: [false],
    });
  }
  get f() {
    return this.groupForm.controls;
  }
  onClickImage() {
    this.sharedService.onClickImageWithoutLogin();
  }
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  getCategories() {
    let data = {
      type: "categories",
      cat_type: "group",
      sortBy: "name asc",
    };
    this.pageService.getCategories(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.categories = res.data;
          this.spinner.hide();
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
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }
  addEmoji(event) {
    console.log(this.message);
    const { message } = this;
    console.log(message, event, "emojifghfdgfhgfdh");
    console.log(`${event.emoji.native}`);
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }
  onFocus() {
    console.log("focus");
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log("onblur");
  }
  close() {
    this.modalReference.close();
  }

  onSubmit() {
    this.submitted = true;
  }
  uploadImage(files: FileList) {
    if (files) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = this.groupImage ? this.groupImage : [];
      // this.fileToUpload = files.item(0)
      for (let index = 0; index < files.length; index++) {
        let element = files[index];
        uploadedImageArray.push(element);
        this.fileToUpload = uploadedImageArray;
        formData.append(
          "data",
          this.fileToUpload[index],
          this.fileToUpload[index].name
        );
      }
      formData.append("modelName", "group");
      let params = new HttpParams().set("?modelName", "group");
      this.imageLoader = true;
      this.sharedService.uploadMultipleImage(params, formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }

                this.groupImage = docData;
                let data = {
                  image: this.groupImage,
                };

                // this.userForm.patchValue({ image: this.userImage })

                this.imageLoader = false;
                this.updateGroup(data, this.groupId);
                this.imageLoader = false;
              } else {
                window.scrollTo(0, 0);
                this.imageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.imageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.imageLoader = true;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
  }

  openEditGroupPost(postDetail, tab) {
    const modalRef = this.modalService.open(EditGroupPostComponent);
    modalRef.componentInstance.name = "edit-group-post-modal";
    modalRef.componentInstance.postId = postDetail.id;
    modalRef.componentInstance.postType = "groupPost";
    modalRef.componentInstance.postFromTab = tab;
  }
  uploadImage2(files: FileList) {
    if (files) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = this.postImages ? this.postImages : [];
      // this.fileToUpload = files.item(0)
      for (let index = 0; index < files.length; index++) {
        let element = files[index];
        uploadedImageArray.push(element);
        this.fileToUpload = uploadedImageArray;
        formData.append(
          "data",
          this.fileToUpload[index],
          this.fileToUpload[index].name
        );
      }
      formData.append("modelName", "group");
      let params = new HttpParams().set("?modelName", "group");
      this.postImageLoader = true;
      this.sharedService.uploadMultipleImage(params, formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }

                this.postImages = docData;

                // this.userForm.patchValue({ image: this.userImage })

                this.postImageLoader = false;
                this.postInput.nativeElement.value = "";
              } else {
                window.scrollTo(0, 0);
                this.postImageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.postImageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.postImageLoader = true;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
    // this.fileToUpload = files.item(0);
    // let type: "group";
    // // this.spinner.show();
    // this.postImageLoader = true;
    // this.pageService.uploadImage(this.fileToUpload, "group").subscribe(
    //   (event: HttpEvent<any>) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         // console.log('Request has been made!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         // console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         this.progress = Math.round((event.loaded / event.total) * 100);
    //         // console.log(`Uploaded! ${this.progress}%`);
    //         break;
    //       case HttpEventType.Response:
    //         // console.log('User successfully created!', event.body);
    //         if (event.body.success) {
    //           this.groupImage = event.body.data.fullpath;

    //           this.postImageLoader = false;
    //           // this.updateGroup(data, this.groupId);
    //           this.postInput.nativeElement.value = "";
    //           // this.groupImage=""
    //         } else {
    //           window.scrollTo(0, 0);
    //           this.toastr.error(event.body.error.message, "Error");
    //           this.postImageLoader = false;
    //         }
    //         setTimeout(() => {
    //           this.progress = 0;
    //           this.postImageLoader = false;
    //         }, 100);
    //     }

    //     // this.imageLoader=false;
    //   },
    //   (err) => {
    //     this.postImageLoader = false;
    //     // this.toastr.error('There are some errors, please try again after some time !', 'Error');
    //   }
    // );
  }
  uploadFileImage(files: FileList) {
    if (files) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
      // this.fileToUpload = files.item(0)
      for (let index = 0; index < files.length; index++) {
        let element = files[index];
        uploadedImageArray.push(element);
        this.fileToUpload = uploadedImageArray;
        formData.append(
          "data",
          this.fileToUpload[index],
          this.fileToUpload[index].name
        );
      }
      formData.append("modelName", "group");
      let params = new HttpParams().set("?modelName", "group");
      this.groupFileLoader = true;
      this.sharedService.uploadMultipleDocImage(params, formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);
              if (event.body.success) {
                console.log("event.body.data", event.body.data);
                if (docData.length > 0) {
                  docData.push(...event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }
                let newGroupdocuments = docData.map((cat) => {
                  return {
                    doc: cat.name,
                    fileExt: cat.fileExt,
                    originalName: cat.originalName,
                    type: cat.type,
                    addedByName: this.credential.credentials.fullName,
                    addedByImage: this.credential.credentials.image,
                    fbId: this.credential.credentials.fbId,
                    gId: this.credential.credentials.gId,
                    aId: this.credential.credentials.aId,
                    addedById: this.credential.credentials.id,
                    createdAt: new Date(),
                    isHover: false,
                  };
                });
                if (this.groupdocuments.length > 0) {
                  this.groupdocuments =
                    this.groupdocuments.concat(newGroupdocuments);
                  // this.groupdocuments.push(newGroupdocuments)
                } else {
                  this.groupdocuments = newGroupdocuments;
                }
                let data = {
                  groupdocuments: this.groupdocuments,
                };
                // this.userForm.patchValue({ image: this.userImage })
                this.updateGroup(data, this.groupId);
                this.groupFileLoader = false;
                this.docInput.nativeElement.value = "";
              } else {
                window.scrollTo(0, 0);
                this.groupFileLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.groupFileLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.groupFileLoader = true;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
  }
  opens(index) {
    this.groupdocuments[index].isHover = true;
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
          this.sendNotif(id);
          // this.toastr.success(res.message)
          this.groupDetail();
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
      requesterId: this.user.id,
      recipientId: id,
    };
    this.sharedService.post(data, "add/friends").subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.sendNotif(id);
          this.toastr.success(res.message);
          this.groupDetail();
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
  unFriend(id) {
    this.spinner.show();

    this.pageService.unFriend(id).subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.groupDetail();
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
        console.log(res);
        this.spinner.hide();
        if (res.success) {
          this.toastr.success(res.message);
          this.groupDetail();
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
  getDocIconFromType(type) {
    let image = "";
    image = this.sharedService.getDocIconFromType(type);
    return image;
  }
  deleteDocument(doc, index) {
    this.groupdocuments.splice(index, 1);
    let data = {
      groupdocuments: this.groupdocuments,
    };
    let object = {
      imageName: doc,
      modelName: "group",
    };
    this.pageService.deleteImage(object).subscribe(
      (res: any) => {
        if (res.success) {
          // this.groupImage = "";
          this.updateGroup(data, this.groupId);
          this.spinner.hide();
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
  deletePost(postId, index) {
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
        let object = {
          id: postId,
        };
        this.pageService.deletePost(object).subscribe(
          (res: any) => {
            if (res.success) {
              this.allPosts.splice(index, 1);
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
    });
  }
  // deleteComment(commentId, index1, index2: any = "", type) {
  //   let object = {
  //     id: commentId,
  //   };
  //   this.sharedService.deleteComment(object).subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         this.allPosts[this.postIndex].commentTotal = res.commentTotal;
  //         if (type == "comment") {
  //           this.allComments.splice(index1, 1);
  //         }
  //         if (type == "reply") {
  //           this.allComments[index1].reply.splice(index2, 1);
  //         }
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
  deleteComment(commentId, index1, index2: any = "", index3: any = "", type,postdata) {
    console.log(this.postIndex, "this.postIndex delete comment");
    let object = {
      id: commentId,
      postId: postdata.id,
      postType:'groupPost'
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
          this.allPosts[this.postIndex].commentTotal = res.commentTotal;
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

  // removeImage(image) {
  //   this.groupForm.controls.image.setValue("");
  //   this.groupImage = "";
  //   let object = {
  //     Imagename: image,
  //     type: "groups",
  //   };
  //   this.pageService.deleteImage(object).subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         this.groupImage = "";
  //         console.log(res.message, "cfgff");
  //         this.spinner.hide();
  //       } else {
  //         this.toastr.error(res.error.message, "Error");
  //       }
  //       this.spinner.hide();
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }
  removeImage(image, index, type) {
    if (type == "postImage") {
      this.postImages.splice(index, 1);
    } else {
      this.groupImage.splice(index, 1);
      this.groupForm.controls.image.setValue("");
    }

    // this.groupImage = "";
    let object = {
      imageName: image,
      modelName: "group",
    };
    this.pageService.deleteImage(object).subscribe(
      (res: any) => {
        if (res.success) {
          // this.groupImage = "";
          console.log(res.message, "cfgff");
          this.spinner.hide();
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
  updateGroup(data, id) {
    this.pageService.updateGroup(data, id).subscribe(
      (res: any) => {
        if (res.success) {
          this.getGroupDetail();
          // this.groupImage = [];
          // this.groupForm.patchValue({ image: this.groupImage })
        } else {
          window.scrollTo(0, 0);
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(
          "There are some errors, please try again after some time !",
          "Error"
        );
      }
    );
  }
  updateGroupDetail() {
    this.submitted = true;
    if (!this.groupForm.invalid) {
      let data = this.groupForm.value;
      data["tags"] = this.tagsArray;
      // data["tags"] = this.tagsArray.toString();
      this.pageService.updateGroup(data, this.groupId).subscribe(
        (res: any) => {
          if (res.success) {
            this.getGroupDetail();
            this.groupImage = [];
            this.submitted = false;
            if (this.modalReference) {
              this.modalReference.close();
            }
            // this.groupForm.patchValue({ image: this.groupImage })
          } else {
            window.scrollTo(0, 0);
            this.toastr.error(res.error.message, "Error");
          }
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(
            "There are some errors, please try again after some time !",
            "Error"
          );
        }
      );
    }
  }
  getGroupDetail() {
    this.spinner.show();
    // let data = {
    //   id: this.groupId,
    // };
    let data = {
      slug: this.slug,
    };
    if (this.user) {
      this.pageService.getGroupDetail(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.groupDetail = res.data;
            this.groupId = res.data.id;
            // this.groupDetail = res.data;
            this.groupForm.patchValue({
              description: this.groupDetail["description"],
              categoryId: this.groupDetail["categoryId"].id,
              // tags: this.groupDetail["tags"],
              name: this.groupDetail["name"],
              isPrivate: this.groupDetail["isPrivate"],
              isHidden: this.groupDetail["isHidden"],
              image: this.groupDetail["image"],
            });

            if (this.groupId) {
              this.getGroupMembers();
              this.getGroupPosts();
              this.getCategories();
              this.getJoinRequest();
              this.getReportedPosts();
            }
            this.groupImage = this.groupDetail["image"];
            this.groupdocuments = this.groupDetail["groupdocuments"];
            this.tagsArray =
              this.groupDetail["tags"] != "" ? this.groupDetail["tags"] : [];
            // this.splitByComma(this.groupDetail["tags"].toString());

            this.spinner.hide();
          } else {
            this.toastr.error(res.error.message, "Error");
          }
          this.spinner.hide();
        },
        (err) => {
          this.toastr.error(err, "Error");
          this.spinner.hide();
        }
      );
    } else {
      this.pageService.getGroupDetailWithOutLogin(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.groupDetail = res.data;
            this.groupId = res.data.id;
            // this.groupForm.patchValue({
            //   description: this.groupDetail["description"],
            //   categoryId: this.groupDetail["categoryId"].id,
            //   // tags: this.groupDetail["tags"],
            //   name: this.groupDetail["name"],
            //   isPrivate: this.groupDetail["isPrivate"],
            //   isHidden: this.groupDetail["isHidden"],
            //   image: this.groupDetail["image"],
            // });
            // this.groupImage = this.groupDetail["image"];
            // this.groupdocuments = this.groupDetail["groupdocuments"];
            // this.tagsArray =
            //   this.groupDetail["tags"] != "" ? this.groupDetail["tags"] : [];

            // if (this.groupId && this.user) {
            //   this.getGroupMembers();
            //   this.getGroupPosts();
            //   this.getCategories();
            //   this.getJoinRequest();
            // }
            // this.splitByComma(this.groupDetail["tags"].toString());

            this.spinner.hide();
          } else {
            this.toastr.error(res.error.message, "Error");
          }
          this.spinner.hide();
        },
        (err) => {
          this.toastr.error(err, "Error");
          this.spinner.hide();
        }
      );
    }
  }
  copy() {
    this.groupUrl = this._frontUrl + "groups/" + this.slug;
    let value = this.groupUrl;
    navigator.clipboard.writeText(value);
    // this.toastr.success("Copied URL to clipboard!");
    alert("Copied URL to clipboard!");
  }
  changeprivacyOfEvent() {
    console.log(this.groupForm.value.isPrivate, "value");
    if (!this.groupForm.value.isPrivate) {
      this.groupForm.patchValue({
        isHidden: false,
      });
    }
  }
  leaveGroup() {
    Swal.fire({
      title: "Are you sure you want to leave this group?",
      // html: "<b>Next Step:</b> Verify Your Email. <br> We’ve sent you an email. Click the link in the email to continue setting up your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          groupId: this.groupId,
          userID: this.user.id,
        };
        this.sharedService.leaveGroup(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.toastr.success(res.message);
              this.getMygroups();
              // this.router.navigateByUrl("page/group");
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.toastr.error(
              "There are some errors, please try again after some time !",
              "Error"
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
removeGroupMember(id) {
    Swal.fire({
      title: "Are you sure you want to remove this member?",
      // html: "<b>Next Step:</b> Verify Your Email. <br> We’ve sent you an email. Click the link in the email to continue setting up your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          groupId: this.groupId,
          userID: id,
        };
        this.sharedService.leaveGroup(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.toastr.success(res.message);
              this.getGroupMembers();
              // this.router.navigateByUrl("page/group");
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.toastr.error(
              "There are some errors, please try again after some time !",
              "Error"
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
  sendNotif(id) {
    let data = {
      user_id: id,
    };
    console.log("send notif data", data);
    this.chatService.sendNotif(data);
  }
  readmoreLess(i, status = "") {
    this.postIndex = i;
    console.log(this.postIndex, "this.postIndex", i);
    for (let j = 0; j < this.allPosts.length; j++) {
      if (i != j) {
        this.allPosts[j].showMore = false;
      } else {
        this.allPosts[i].showMore = !this.allPosts[i].showMore;
      }
    }
    if (status == "add") {
      this.allPosts[i].showMore = true;
    }
  }

  choices(): FormArray {
    return this.pollForm.get("choices") as FormArray;
  }

  newChoice(): FormGroup {
    return this.formBuilder.group({
      choices: ["", Validators.required],
    });
  }

  addChoice() {
    this.choices().push(this.newChoice());
  }

  removeChoice(empIndex: number) {
    this.choices().controls[empIndex].get("choices").clearValidators();
    this.choices().removeAt(empIndex);
    let array = this.pollForm.value.choices;
    this.pollForm.patchValue({ choices: array.splice(empIndex, 1) });
  }

  get pf() {
    return this.pollForm.controls;
  }

  savePost() {
    if (this.poll == true) {
      this.pollSubmitted = true;
      console.log(this.pollForm);
      if (!this.pollForm.invalid) {
        let formData = {
          post: this.pollForm.value.post,
          isCommentDisabled: this.pollForm.value.isCommentDisabled,
          postType: "groupPoll",
          choice1: this.pollForm.value.choice1,
          choice2: this.pollForm.value.choice2,
          choice3: this.pollForm["controls"].choices["controls"][0]
            ? this.pollForm["controls"].choices["controls"][0].value.choices
            : "",
          choice4: this.pollForm["controls"].choices["controls"][1]
            ? this.pollForm["controls"].choices["controls"][1].value.choices
            : "",
          isValidTime: this.pollForm.value.isValidTime,
        };
        this.pageService.addPost(formData).subscribe(
          (res: any) => {
            if (res.success) {
              this.pollSubmitted = false;
              this.pollForm.reset();
              this.poll = false;
              this.modalReference.close();
              this.getGroupDetail();
              this.getGroupPosts();
              if (
                this.joinedGroupMembers &&
                this.joinedGroupMembers.length > 0
              ) {
                this.joinedGroupMembers.forEach((element) => {
                  this.sendNotif(element.id);
                });
              }
              // this.groupForm.patchValue({ image: this.groupImage })
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.toastr.error(
              "There are some errors, please try again after some time !",
              "Error"
            );
          }
        );
      }
    } else {
      if (this.message != "") {
        this.spinner.show();
        let data = {
          isCommentDisabled: this.isCommentDisabled,
          name: filter.clean(this.message),
          // name: this.message,
          groups: this.groupId,
          image: this.postImages,
        };
        this.pageService.addGroupPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.getGroupDetail();
              this.getGroupPosts();
              this.groupImage = [];
              this.postImages = [];
              this.message = "";
              this.isCommentDisabled = false;
              if (
                this.joinedGroupMembers &&
                this.joinedGroupMembers.length > 0
              ) {
                this.joinedGroupMembers.forEach((element) => {
                  this.sendNotif(element.id);
                });
              }
              this.modalReference.close();
              // this.groupForm.patchValue({ image: this.groupImage })
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.toastr.error(
              "There are some errors, please try again after some time !",
              "Error"
            );
          }
        );
      } else {
        this.toastr.warning("Please enter some text!");
      }
    }
  }
  getAllUsers(search: any = "") {
    //updated_by_gi
    let data = {
      groupId: this.groupId,
      isDeleted: false,
    };
    if (search) {
      data["search"] = search;
      this.showList = true;
    }
    this.pageService.getAllUsers(data).subscribe(
      (res: any) => {
        this.allUsersData = [];
        this.allUsers = [];
        if (res.success) {
          this.allUsersData = res.data;
          this.allUsersData.forEach((element) => {
            this.allUsers.push({
              id: element.id,
              description: element.fullName,
              // description: element.fullName.concat(" | ", element.email),
              detail: element,
            });
          });
          // this.member = [...this.member];
          this.spinner.hide();
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
  getGroupMembers() {
    let data = {
      groupid: this.groupId,
    };
    this.pageService.getGroupMembers(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.joinedGroupMembers = res.data.map((cat) => {
            if (cat.role == "member" && this.user.id == cat.userId.id) {
              this.adminAccess = false;
            }
            return {
              id: cat.id,
              role: cat.role,
              image: cat.userDetails ? cat.userDetails.image : null,
              fullName: cat.userDetails ? cat.userDetails.fullName : null,
              userDetail: cat.userDetails,
              userId: cat.userDetails ? cat.userDetails.id : null,
              fbId: cat.userDetails ? cat.userDetails.fbId : null,
              gId: cat.userDetails ? cat.userDetails.gId : null,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
            };
          });
          // this.joinedGroupMembers = res.data;
          this.totalMembers = res.total;
          this.spinner.hide();
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

  getJoinRequest() {
    let data = {
      id: this.groupId,
    };

    this.pageService.getJoinRequest(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.joinRequest = res.data.map((cat) => {
            if (cat.role == "member" && this.user.id == cat.userId.id) {
              this.adminAccess = false;
            }
            return {
              // id: cat.id,
              role: cat.role,
              image: cat.userId ? cat.userId.image : null,
              fullName: cat.userId ? cat.userId.fullName : null,
              rankBadgeImage: cat.userId ? cat.userId.rankBadgeImage : null,
              rankPoints: cat.userId ? cat.userId.rankPoints : null,
              acceptedlink:
                this._host +
                "joingroup/check?gid=" +
                this.groupId +
                "&uid=" +
                this.user.id +
                "&ruid=" +
                cat.userId.id +
                "&status=accepted",
              rejectedlink:
                this._host +
                "joingroup/check?gid=" +
                this.groupId +
                "&uid=" +
                this.user.id +
                "&ruid=" +
                cat.userId.id +
                "&status=rejected",
            };
          });
          // this.joinedGroupMembers = res.data;
          // this.totalMembers = res.total;
          this.spinner.hide();
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
  getReportedPosts() {
    let data = {
      groupId: this.groupId,
      reportType: "groupAdmin",
    };

    this.pageService.getReportedPosts(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.reportedPosts = res.data.map((cat) => {
            if (cat.role == "member" && this.user.id == cat.userId.id) {
              this.adminAccess = false;
            }
            return {
              id: cat.id,
              postId: cat.postId,
              role: cat.role,
              postdata: cat.postdata,
              image: cat.reportedByDetails ? cat.reportedByDetails.image : null,
              repotedBy: cat.repotedUserID,
              fullName: cat.reportedByDetails
                ? cat.reportedByDetails.fullName
                : null,
              rankBadgeImage: cat.reportedByDetails
                ? cat.reportedByDetails.rankBadgeImage
                : null,
              rankPoints: cat.reportedByDetails
                ? cat.reportedByDetails.rankPoints
                : null,
            };
          });
          // this.joinedGroupMembers = res.data;
          // this.totalMembers = res.total;
          this.spinner.hide();
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
  deleteReport(ID) {
    this.sharedService.deleteReport(ID).subscribe(
      (res: any) => {
        if (res.success) {
          this.getReportedPosts();
          this.getGroupPosts();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
      },
      (err) => {
        this.toastr.error(
          "There are some errors, please try again after some time !",
          "Error"
        );
      }
    );
  }
  /* Function use to delete report and its post */
  deleteReportedPost(postId, reportId) {
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
        let object = {
          id: postId,
        };
        this.pageService.deletePost(object).subscribe(
          (res: any) => {
            if (res.success) {
              this.deleteReport(reportId);
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
    });
  }
  addLike(postId) {
    console.log("post iiiiii", postId);
    let data = {
      postId: postId,
      likeBy: this.user.id,
      postType: "groupPost",
    };
    // this.spinner.show();
    this.pageService.addLike(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(this.groupDetail.addedBy.id);
          this.getGroupPosts();
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
  addComment(postId, commentId: any, to_user_id) {
    let data = {
      postId: postId,
      comment: this.commentOnPost,
      // comment: filter.clean(this.commentOnPost),
      postType: "groupPost",
    };
    if (commentId && commentId != null) {
      data["commentId"] = commentId;
    }
    if (this.commentOnPost == "") {
      return;
    }
    // this.spinner.show();
    this.pageService.addComment(data).subscribe(
      (res: any) => {
        if (res.success) {
          // this.getGroupPosts()
          this.sendNotif(to_user_id);
          this.commentOnPost = "";
          // this.toastr.success(res.message, "Success");
          this.allPosts[this.postIndex].commentTotal = res.commentdata.count;
          this.getComments(postId);
          this.readmoreLess(this.postIndex, "add");
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
  replyComment(postId, commentId: any, replyon: any, to_user_id) {
    let data = {};
    if (replyon == "comment") {
      if (this.replyOnPost == "") {
        return;
      }
      data = {
        postId: postId,
        comment: this.replyOnPost,
        // comment: filter.clean(this.replyOnPost),
        postType: "groupPost",
      };
    }
    if (replyon == "reply") {
      if (this.replyOnPost2 == "") {
        return;
      }
      data = {
        postId: postId,
        // comment: filter.clean(this.replyOnPost2),
        comment: this.replyOnPost2,
        postType: "groupPost",
      };
    }
    if (replyon == "replyonreply") {
      if (this.replyOnPost3 == "") {
        return;
      }
      data = {
        postId: postId,
        comment: this.replyOnPost3,
        postType: "groupPost",
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
          this.replyForm = "";
          // this.toastr.success(res.message, "Success");
          this.getComments(postId);
          this.allPosts[this.postIndex].commentTotal = res.commentdata.count;
          this.readmoreLess(this.postIndex, "add");
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
  getGroupPosts() {
    let data = {
      groupId: this.groupId,
    };
    if (this.searchPost) {
      data["search"] = this.searchPost;
    }
    this.pageService.getGroupPosts(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.allPosts = res.data.map((cat) => {
            return {
              id: cat.id,
              postImage: cat.image,
              postTitle: cat.name,
              likes: cat.likesTotal,
              likestatus: cat.likestatus,
              isCommentDisabled: cat.isCommentDisabled,
              addedBy: cat.userDetails,
              userFullName: cat.userDetails.fullName,
              userImage: cat.userDetails.image,
              fbId: cat.userDetails.fbId,
              gId: cat.userDetails.gId,
              userId: cat.userDetails._id,
              commentTotal: cat.commentTotal,
              totalShare: cat.totalShare,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              showMore: false,
            };
          });
          console.log(this.adminAccess, "adminaccess");
          // this.joinedGroupMembers = res.data;
          this.totalPosts = res.total;
          this.spinner.hide();
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
  viewPost(postId) {
    let data = {
      postType: "groupPost",
      postId: postId,
    };
    this.sharedService.viewPost(data);
  }
  getUrl(img, detail) {
    let image = "";
    let socialImage = false;
    if (img != undefined && img != "") {
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
  getComments(postId) {
    this.allComments = [];
    let data = {
      postId: postId,
      // id : postId,
      type: "groupPost",
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
    //                     commentId: cat2.commentId,
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
  openLikeModal(item: any) {
    console.log("item", item);

    if (item.likesTotal == 0) return;

    localStorage.setItem("type", "");
    localStorage.setItem("postId", "");
    localStorage.setItem("type", "groupPost");
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
  OpenListingOfSharedUsers(item: any) {
    if (item.totalShare == 0) return;

    localStorage.setItem("type", "");
    localStorage.setItem("postId", "");
    localStorage.setItem("type", "groupPost");
    localStorage.setItem("postId", item.id);
    const modalRef = this.modalService.open(PostSharedWithComponent);
    modalRef.componentInstance.name = "Link Modal";
  }
  selectedMember(item) {
    console.log(item.id, "selected memeber");
    this.member = item.description;
    this.invited_member_id = item.id;
    this.showList = false;
  }
  SendInvite() {
    let data = {
      title: "Invitation for " + this.groupDetail["name"],
      description: this.groupDetail["name"],
      // description: "You are invited for the group " + this.groupDetail["name"],
      type: "invite",
      groupId: this.groupId,
      userId: this.invited_member_id,
      role: this.selected_role,
    };
    // let data={
    //   role:this.selected_role,
    //   id:this.invited_member_id
    // }
    this.pageService.InviteMember(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.sendNotif(this.invited_member_id);
          this.toastr.success("Group invite has been sent.");
          // this.toastr.success(res.message);
          this.getGroupMembers();
          // this.groupForm.patchValue({ image: this.groupImage })
        } else {
          window.scrollTo(0, 0);
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(
          "There are some errors, please try again after some time !",
          "Error"
        );
      }
    );
  }
  onlyFewDetails() {
    this.onlyFewDetailEdit = true;
    this.groupForm.controls["categoryId"].clearValidators();
    this.groupForm.controls["categoryId"].updateValueAndValidity();
  }

  deleteGroup() {
    Swal.fire({
      title: "Are you sure you want to delete this group?",
      // html: "<b>Next Step:</b> Verify Your Email. <br> We’ve sent you an email. Click the link in the email to continue setting up your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id: this.groupId,
        };
        this.sharedService.deleteGroup(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.toastr.success(res.message);
              //  this.router.navigateByUrl("page/group");
              this.getMygroups();
              this.modalReference.close();
            } else {
              window.scrollTo(0, 0);
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
            this.toastr.error(
              "There are some errors, please try again after some time !",
              "Error"
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
      // this.toastr.success('Registered Successfully. Please verify your email!');
    });
    // let data={
    //   id:this.groupId
    // }
    // this.sharedService.deleteGroup(data).subscribe(
    //   (res: any) => {
    //     if (res.success) {
    //       this.toastr.success(res.message);
    //       this.router.navigateByUrl('page/group')
    //     } else {
    //       window.scrollTo(0, 0);
    //       this.toastr.error(res.error.message, "Error");
    //     }
    //     this.spinner.hide();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //     this.toastr.error(
    //       "There are some errors, please try again after some time !",
    //       "Error"
    //     );
    //   }
    // );
  }
  sendNotifToAdmins(admins) {
    if (admins.length > 0) {
      admins.forEach((element) => {
        let id = element;
        let data = {
          user_id: id,
        };
        this.chatService.sendNotif(data);
      });
    }
  }
  getMygroups() {
    this.mygroups = [];
    // this.spinner.show();
    this.pageService.getMyGroups().subscribe(
      (res: any) => {
        if (res.success) {
          this.mygroups = res.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              image: cat.image,
              name: cat.name,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
            };
          });

          this.pageService.setGroupData(this.mygroups);
          this.router.navigateByUrl("/groups");
          this.spinner.hide();
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
  autoLogin(data) {
    this.spinner.show();
    if (data.slug) {
      this.sharedService.autoLoginWithSlug(data).subscribe(
        (res) => {
          if (res.success) {
            this._bs.setUserData(res.data);
            this.user = res.data;
            this.token = res.data.access_token;
            // this.pageService.userData.next(res.data)
            if (this.slug) {
              this.getGroupDetail();
            }
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
    } else {
      this.pageService.autoLogin(data).subscribe(
        (res) => {
          if (res.success) {
            this._bs.setUserData(res.data);
            this.user = res.data;
            this.token = res.data.access_token;
            // this.pageService.userData.next(res.data)
            if (this.slug) {
              this.getGroupDetail();
            }
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
  // splitByComma(value) {
  //   console.log("in split", value);
  //   if (value != "") {
  //     let tagnewarray = [];
  //     tagnewarray = this.pageService.splitByComma(value);
  //     tagnewarray = tagnewarray.filter(function (el) {
  //       return el != "";
  //     });
  //     tagnewarray.forEach((element) => {
  //       this.tagsArray.push(element);
  //     });
  //     this.tagsArray = this.uniqBy(this.tagsArray, JSON.stringify);
  //     this.groupForm.patchValue({
  //       tags: "",
  //     });
  //     console.log(this.tagsArray, "tags");
  //   }
  // }
  splitByComma(value) {
    console.log(value, "tag value");
    if (value != "") {
      let tagnewarray = [];
      tagnewarray = this.pageService.splitByComma(value);
      tagnewarray = tagnewarray.filter(function (el) {
        return el != "";
      });
      tagnewarray.forEach((element) => {
        this.tagsArray.push(element);
      });
      this.groupForm.patchValue({
        tags: "",
      });
    }
  }
  deleteTag(item) {
    let index = this.tagsArray.indexOf(item);
    console.log(index, "index");
    this.tagsArray.splice(index, 1);
    console.log(this.tagsArray, "this.tagsArray");
    // this.groupForm.patchValue({
    //   tags: this.tagsArray
    // });
  }
  uniqBy(a, key) {
    let seen = new Set();
    return a.filter((item) => {
      let k = key(item);
      return seen.has(k) ? false : seen.add(k);
    });
  }
  joinGroup(groupId, admins) {
    let data = {
      groupId: groupId,
      userID: this.credential.credentials.id,
    };
    this.spinner.show();
    this.pageService.joinGroup(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success("Your join request has been sent.");
          if (admins.length > 0) {
            this.sendNotif(admins);
          }
          // this.sendNotif(this.groupDetail.addedBy.id);
          this.getGroupDetail();
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.toastr.error(err);
        this.spinner.hide();
      }
    );
  }
}
