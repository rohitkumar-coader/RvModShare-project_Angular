import {
  Component,
  OnInit,
  TemplateRef,
  ViewChildren,
  PLATFORM_ID,
  Inject,
  Input,
} from "@angular/core";
// import { Component,  OnInit, SimpleChanges, ViewChild, PLATFORM_ID, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { SharedService } from "src/app/shared/shared.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Meta } from "@angular/platform-browser";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";
import { ThankyouPageComponent } from "src/app/theme/thankyou-page/thankyou-page.component";
import { PagesService } from "../pages.service";
import { CredentialsService } from "src/app/auth/credentials.service";
import { environment } from "src/environments/environment";

declare var a2a: any;

@Component({
  selector: "app-myhome",
  templateUrl: "./myhome.component.html",
  styleUrls: ["./myhome.component.scss"],
})
export class MyhomeComponent implements OnInit {
  _host = environment.url;
  _baseUrl = window.location.origin;
  showViewMore: Boolean = false;
  allMods = [];
  @Input() userId: any;
  today = new Date();
  suggestedRVfriends: any;
  suggestedFriendInterval: any;
  searchKeyword: any = "";
  showViewMoreFollowings: boolean = false;

  date: number = new Date().getFullYear();

  subscriberForm: FormGroup;
  subscriberForm2: FormGroup;
  subscriberForm3: FormGroup;
  submitted: any;
  submitted2: any;
  submitted3: any;
  content: string | TemplateRef<any>;
  closeResult = "";
  user: any;
  ambassador_slides = [
    "assets/img/ambassador.jpg",
    "assets/img/ambassador2.jpg",
    // "assets/img/ambassador.jpeg",
    // "assets/img/ambassador2.jpg",
    // "assets/img/ambassador.jpeg",
    // "assets/img/ambassador2.jpg",
  ];
  slideAmbassadorConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  slides = [
    { image: "assets/img/partner8.png", url: "https://harvesthosts.com/" },
    {
      image: "assets/img/partner4.png",
      url: "https://www.blackseriescamper.com/",
    },
    { image: "assets/img/partner2.png", url: "https://www.spot2nite.com/" },
    { image: "assets/img/partner1.png", url: "https://rvshare.com/" },
    { image: "assets/img/partner3.png", url: "https://rvblogger.com/" },
    // "assets/img/partner3.png",
    // "assets/img/partner5.png",
    // "assets/img/partner6.png",
    // "assets/img/partner7.png",
    // "assets/img/partner1.png",
  ];
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          // arrows: false,
          centerMode: true,
          centerPadding: "20px",
          slidesToShow: 2,
        },
      },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     // arrows: false,
      //     centerMode: true,
      //     centerPadding: "40px",
      //     slidesToShow: 1,
      //   },
      // },
    ],
  };

  // this.slide('.autoplay').slick({

  // });

  slickInit(e) {
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }

  imagemodal = false;
  imageData: any;
  modfilters: any = {
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

  constructor(
    config: NgbCarouselConfig,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private meta: Meta,
    private router: Router,
    private pageService: PagesService,
    public credentials: CredentialsService,
    private _sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    config.interval = 2000;
    this.createForm();
    this.createForm2();
    this.createForm3();
    this.getMyMods();
    this.getLandingSuggestedRVfriendList();
  }

  ngOnInit() {}

  redirectToModPage(type, event) {
    // event.target.classList.add('active');
    let user = this.checkLoggedinUser();
    let div = document.getElementById("pills-See-tab");
    if (user) {
      if (type == "mods") {
        this.router.navigate(["mods"]);
        // event.target.classList.add("active");
      }
      if (type == "talk-mods") {
        this.router.navigate(["connections"]);
        // event.target.classList.add("active");
        // div.classList.remove("active");
      }
      if (type == "share-mod") {
        this.router.navigate(["share-mod"]);
        // div.classList.remove("active");
        // event.target.classList.add("active");
      }
    } else {
      this.onClickImage();
    }
  }
  
  setShareData(item) {
    this.meta.addTag({ property: "og:title", content: item.modName });
    this.meta.addTag({ property: "og:type", content: "article" });
    this.meta.addTag({ property: "fb:app_id", content: "995503910998783" });
    this.meta.addTag({
      property: "og:url",
      content: `https://www.rvmodshare.com/assets/img/rvmodshare.png`,
    });
    this.meta.addTag({
      property: "og:image:secure",
      content: `https://www.rvmodshare.com/assets/img/rvmodshare.png`,
    });

    // this.meta.addTag({ property: 'og:description', content: description });
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(function () {
        a2a.init_all();
      }, 1000);
    }
  }

  openImage(title, img) {
    this.imageData = { title, img };
    this.imagemodal = true;
  }

  close() {
    this.imagemodal = false;
  }

  createForm() {
    this.subscriberForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }
  createForm2() {
    this.subscriberForm2 = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }
  createForm3() {
    this.subscriberForm3 = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.subscriberForm.controls;
  }
  get f2() {
    return this.subscriberForm2.controls;
  }
  get f3() {
    return this.subscriberForm3.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.subscriberForm.invalid) {
      this.spinner.show();
      this.sharedService
        .post(this.subscriberForm.value, "add/subscribe")
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.submitted = false;
              this.subscriberForm.reset();
              // this.toastr.success(res.message);
              this.open();
            } else {
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            this.toastr.error(error.error.message);
          }
        );
    }
  }
  onSubmit2() {
    this.submitted2 = true;
    if (!this.subscriberForm2.invalid) {
      this.spinner.show();
      this.sharedService
        .post(this.subscriberForm2.value, "add/subscribe")
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.submitted2 = false;
              this.subscriberForm2.reset();
              this.open();
              // this.toastr.success(res.message);
            } else {
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            this.toastr.error(error.error.message);
          }
        );
    }
  }
  onSubmit3() {
    this.submitted3 = true;
    if (!this.subscriberForm3.invalid) {
      this.spinner.show();
      this.sharedService
        .post(this.subscriberForm3.value, "add/subscribe")
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.submitted3 = false;
              this.subscriberForm3.reset();
              this.open();
              // this.toastr.success(res.message);
            } else {
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            this.toastr.error(error.error.message);
          }
        );
    }
  }

  opens(content) {
    this.modalService.open(content, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  open() {
    const modalRef = this.modalService.open(ThankyouPageComponent);
    modalRef.componentInstance.name = "World";
  }
  onClickImage() {
    this.sharedService.onClickImageWithoutLogin();
  }
  goToModDetail(url, param) {
    console.log("url, param",url, param,)
    // if (!this.checkLoggedinUser()) {
      
    //   return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    // }
    let newurl=url+"/"+param
    console.log(newurl)
    this.router.navigate([newurl])
    // window.location.href = window.location.origin + url + "/" + param;
    // window.location.href = window.location.origin + url + "?id=" + param;
  }
  getMyMods() {
    var urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    let filters: any = {};
    this.spinner.show();
    console.log("in get my fav,profile, mods", this.modfilters);
    if (this.modfilters != undefined && this.modfilters != null)
      filters = {
        // modid: this.modfilters.modid
        //   ? this.modfilters.modid
        //   : "",
        // type: "PopularMods",
        // class: this.modfilters.rvTypeFilter ? this.modfilters.rvTypeFilter : "",
        // make: this.modfilters.makeFilter ? this.modfilters.makeFilter : "",
        // series: this.modfilters.modelValue ? this.modfilters.modelValue : "",
        // size: this.modfilters.size ? this.modfilters.size : "",
        // modCategory: this.modfilters.modCategoryValue
        //   ? this.modfilters.modCategoryValue
        //   : "",
        // year: this.modfilters.yearValue,
        // skillLevel: this.modfilters.skillLevel
        //   ? this.modfilters.skillLevel
        //   : "",
        // timerange: this.modfilters.timerange,
        // startDate: this.modfilters.startDate,
        // endDate: this.modfilters.endDate,
        // search: this.modfilters.search,
      };

    let isUser = this.checkLoggedinUser();
    // if (isUser) {
    //   filters["uid"] = this.credentials.credentials.id;
    // }
    // if (this.userId) {
    //   filters["userid"] = this.userId;
    // }
    if (this.credentials)
      // if (this.featured != undefined && this.featured != null)
      //   filters["isFeatured"] = this.featured;

      this.pageService.getLandingPopularMods(filters).subscribe(
        (res: any) => {
          this.allMods = [];
          if (res.success) {
            this.allMods = res.data.map((cat) => {
              return {
                id: cat.id,
                slug: cat.slug,
                description: cat.description,
                isCommentDisabled: cat.isCommentDisabled,
                name: cat.name,
                registeredRV: cat.registeredRV,
                isFeatured: cat.isFeatured,
                beforeImages: cat.beforeImages,
                afterImages: cat.afterImages,
                status: cat.status,
                skillLevel: cat.skillLevel,
                time: this.pageService.timeDiffCalc(
                  new Date(cat.updatedAt).getTime(),
                  this.today.getTime()
                ),
                createdAt: cat.createdAt,
                updatedAt: cat.updatedAt,
                addedBy: cat.addedBy,
                catName: cat.modCategorydetails.name,
                rvType: this.sharedService.getRvType(cat.rvType),
                year: cat.year,
                series: cat.seriesdetails,
                make: cat.makedetails,
                model: cat.model,
                isEdit: cat.addedBy == this.userId ? true : false,
                isFavourite: cat.isFavourite,
                likesTotal: cat.likesTotal,
                totalShare: cat.totalShare,
                commentTotal: cat.commentTotal,
                totalTime: cat.totalTime,
                addedBydetails: cat.addedBydetails,
                timerange: cat.timerange,
                // whatIDid: cat.whatIDid.replace(/<img[^>]*>/g, ""),
                newW: cat.whatIDid.replace(urlRegex, function (url) {
                  return '<a  href="' + url + '"  target="_blank" >' + url + "</a>";
                }),
                isPending: cat.isPending,
                isFollow: cat.isFollow,
                isFriend: cat.isFriend,
                likestatus: cat.likestatus,
                sizedetails: cat.sizedetails,
                typeOfPost: "mod",
                showMore: false,
              };
            });
            if (this.allMods.length > 0) {
              this.showViewMore = true;
            } else {
              this.showViewMore = false;
            }
            for (let index = 0; index < res.data.length; index++) {
              let new_element = {
                typeOfPost: "google-ad",
              };
              if (res.data.length < 4 && index == res.data.length - 1) {
                this.allMods.splice(res.data.length + 1, 0, new_element);
              } else if (res.data.length >= 4 && index % 4 == 0 && index != 0) {
                this.allMods.splice(index - 1, 0, new_element);
              } else {
              }
            }
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
  goTouserProfile(url, params) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.router.navigate([url], { queryParams: params });
  }
  checkLoggedinUser() {
    let user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }

  htmlLength(html = "", length) {
    if (html && html.length > length) {
      return html.slice(0, length) + "...";
    } else {
      return html;
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

  getLandingSuggestedRVfriendList() {
    this.pageService.getLandingSuggestedGroups().subscribe(
      (res: any) => {
        if (res.success) {
          this.suggestedRVfriends = res.data.map((cat) => {
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
          if (this.suggestedRVfriends.length > 3) {
            this.showViewMoreFollowings = true;
          } else {
            this.showViewMoreFollowings = false;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
    // }else{
    //   this.suggestedRVfriends=[];
    // }
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
}
