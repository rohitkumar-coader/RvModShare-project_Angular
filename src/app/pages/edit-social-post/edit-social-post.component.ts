import { HttpEvent, HttpEventType, HttpParams } from "@angular/common/http";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbCarouselConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CredentialsService } from "src/app/auth/credentials.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { SharedService } from "src/app/shared/shared.service";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";
declare var require: any;
var Filter = require("bad-words"),
  filter = new Filter();
@Component({
  selector: "app-edit-social-post",
  templateUrl: "./edit-social-post.component.html",
  styleUrls: ["./edit-social-post.component.scss"],
})
export class EditSocialPostComponent implements OnInit {
  @ViewChild("postInput", { static: false }) postInput;
  @Input() public postId: any;
  @Input() public postType: any;
  @Input() public postFromTab: any;
  user: any;
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
  postDetail: any;
  pollForm: FormGroup;
  pollVoting: any = "";
  newBadWords = environment.bad_word;
  posterr = "";
  progress: number = 0;
  fileToUpload: File = null;
  postImage: any = [];
  poll = false;
  pollvoting = "";
  message = "";
  isCommentDisabled = false;
  _postObservable: any;
  postimageLoader: boolean = false;
  showEmojiPicker: boolean = false;
  pollSubmitted: boolean = false;
  _host = environment.url;
  constructor(
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public _bs: BehaviorService,
    public pageService: PagesService,
    private modalService: NgbModal,
    config: NgbCarouselConfig,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    public credentials: CredentialsService
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
    // filter.addWords(...this.newBadWords);
    this.pollForm = this.formBuilder.group({
      post: ["", Validators.required],
      choice1: ["", Validators.required],
      isCommentDisabled: ["false"],
      choice2: ["", Validators.required],
      isValidTime: ["", Validators.required],
      choices: this.formBuilder.array([]),
    });
    if (this.postId) {
      this.getPostDetails();
    }
  }
  get pf() {
    return this.pollForm.controls;
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
  addEmoji(event) {
    console.log(this.message);
    const { message } = this;
    console.log(message);
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
  pollVote(postId, activityType, index) {
    let data = {
      postId: postId,
      postType: activityType,
      choices: this.pollVoting,
    };
    console.log(data);
    this.pageService.addPoll(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message);
        } else {
          window.scrollTo(0, 0);
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err, "Error");
      }
    );
  }

  calculateWeightage(percent) {
    return ((percent / 100) * 100).toFixed(2);
  }
  savePost() {
    if (this.poll == true) {
      this.pollSubmitted = true;
      console.log(this.pollForm);
      if (!this.pollForm.invalid) {
        let formData = {
          id: this.postId,
          post: this.pollForm.value.post,
          postType: "postPoll",
          isCommentDisabled: this.pollForm.value.isCommentDisabled,
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
        this.pageService.updateSocialPost(formData).subscribe(
          (res: any) => {
            if (res.success) {
              this.pollSubmitted = false;
              this.pollForm.reset();
              this.poll = false;
              this.close();
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
      if (this.message == "" && !this.postImage) {
        this.posterr = "Content is required";
        return;
      }

      if (this.message != "") {
        this.spinner.show();
        let data = {
          id: this.postId,
          isCommentDisabled: this.isCommentDisabled,
          post: filter.clean(this.message),
          image: this.postImage,
        };
        this.pageService.updateSocialPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.postImage = [];
              this.message = "";
              if (!this.postFromTab) {
                this._bs.viewNormalPostDetail.next(true);
              } else {
                this._bs.postDataToreload.next({
                  postSection: this.postFromTab,
                });
              }

              this.close();
              // this.groupForm.patchValue({ image: this.groupImage })
            } else {
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
  }
  addPost() {
    if (this.poll == true) {
      this.pollSubmitted = true;
      if (!this.pollForm.invalid) {
        let formData = {
          post: filter.clean(this.pollForm.value.post),
          isCommentDisabled: this.pollForm.value.isCommentDisabled,
          postType: "postPoll",
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
              this.close();
              // this.groupForm.patchValue({ image: this.groupImage })
            } else {
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
      if (this.message == "" && !this.postImage) {
        this.posterr = "Content is required";
        return;
      }

      if (this.message != "") {
        this.spinner.show();
        let data = {
          post: filter.clean(this.message),
          isCommentDisabled: this.isCommentDisabled,
          // post: filter.clean(this.message),
          image: this.postImage,
        };
        this.pageService.addPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.postImage = [];
              this.message = "";
              this.isCommentDisabled = false;
              this.close();
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
  }
  uploadPostImage(files: FileList) {
    if (files) {
      const formData: FormData = new FormData();
      let uploadedImageArray: any = [];
      let docData = [];
      if (this.postImage) {
        docData = this.postImage;
      }
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
      formData.append("modelName", "posts");
      let params = new HttpParams().set("?modelName", "posts");
      this.postimageLoader = true;
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
                console.log(
                  "event.body.data",
                  event.body.data,
                  "docdata",
                  docData
                );
                if (docData.length > 0) {
                  docData.push(event.body.data.imagePath);
                } else {
                  docData = event.body.data.imagePath;
                }
                console.log(this.postImage, "postimages", docData);
                // this.postImage = docData;
                // this.postimageLoader = false;
                // this.postInput.nativeElement.value = "";
                setTimeout(() => {
                  this.postImage = docData;
                  this.postimageLoader = false;
                  this.postInput.nativeElement.value = "";
                }, 2000);
              } else {
                window.scrollTo(0, 0);
                this.postimageLoader = false;
              }
              setTimeout(() => {
                this.progress = 0;
                this.postimageLoader = false;
              }, 100);
          }
        },
        (err) => {
          this.progress = 0;
          this.postimageLoader = true;
          // this.toastr.error('There are some errors, please try again after some time !', 'Error');
        }
      );
    }
  }

  removePostImage(image, index) {
    this.postImage.splice(index, 1);
    // this.groupForm.controls.image.setValue("");
    // this.groupImage = "";
    let object = {
      imageName: image,
      modelName: "posts",
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
  getPostDetails() {
    this.spinner.show();
    let data = {
      id: this.postId,
    };
    // if(this.userId){
    //   data['uid']=this.userId
    // }
    this._postObservable = this.sharedService
      .getNormalPostDetail(data)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.postDetail = res.data;
            this.isCommentDisabled = res.data.isCommentDisabled;
            this.postImage = this.postDetail.image;
            this.message = this.postDetail.post;
            this.postDetail["isValidTime"] = this.sharedService.secondsToDhms(
              this.postDetail["isValidTime"]
            );
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
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
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
  close() {
    this.modalService.dismissAll();
  }
}
