import {
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CredentialsService } from "src/app/auth/credentials.service";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { SharedService } from "src/app/shared/shared.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MagnifyImageComponent } from "src/app/shared/shared/magnify-image/magnify-image.component";
import { isPlatformBrowser } from "@angular/common";
import { AppInjector } from "src/app/app.module";
import { ChatService } from "src/app/chat.service";
import { Meta } from "@angular/platform-browser";
import { ReportSectionComponent } from "src/app/pages/report-section/report-section.component";
import { PagesService } from "src/app/pages/pages.service";
declare var a2a: any;
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

@Component({
  selector: "app-draft-mods",
  templateUrl: "./draft-mods.component.html",
  styleUrls: ["./draft-mods.component.scss"],
})
export class DraftModsComponent implements OnInit {
  @Output() editModItem = new EventEmitter<string>();
  @Output() modCount = new EventEmitter<number>();

  @Input() reload = false;
  loader: boolean = false;
  totalMods = 0;
  friendDetail: any = {};
  public data: any = {};
  chatService: any;
  public userID: any;
  friendId: any;
  user: any;
  selectedDate: any;
  progress = 0;
  usercoverimg: any;
  userimg: any;
  userPostImages: any = [];
  filterBy: any = "";
  filterrvTypes: Array<any> = [];
  MakesFilters: Array<any> = [];
  filterModels: Array<any> = [];
  difficulties: Array<any> = [];
  skillLevelNeeded: Array<any> = [];
  timeRanges: Array<any> = [];
  rvYears: Array<any> = [];
  modCategories: Array<any> = [];
  featuredMods: Array<any> = [];
  miniModes: Array<any> = [];
  // massiveModes: Array<any> = []
  mediumModes: Array<any> = [];
  megaModes: Array<any> = [];
  modalReference3: any;
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
  favMods: any = [];
  _host = environment.url;
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };
  today = new Date();
  homeMenu: boolean;
  hideDefault: boolean = true;
  showTabs: boolean = true;
  provideid: any;
  istransfer: boolean;
  slickInit(e) {}

  breakpoint(e) {
    console.log("breakpoint");
  }

  afterChange(e) {
    // console.log("afterChange");
  }

  beforeChange(e) {
    // console.log("beforeChange");
  }
  constructor(
    public credentials: CredentialsService,
    private pageService: PagesService,
    private toastr: ToastrService,
    private router: Router,
    public _sharedService: SharedService,
    private spinner: NgxSpinnerService,
    public _bs: BehaviorService,
    private modalService: NgbModal,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // this._bs.modFilter.subscribe((elem) => {
    //   if (elem != null && elem != undefined) {
    //     console.log(elem, "filter elem");
    //     this.filters.search = elem.search ? elem.search : "";
    //     this.filters.class = elem.rvTypeFilter ? elem.rvTypeFilter : "";
    //     // this.filters.series = elem.seriesFilter;
    //     this.filters.make = elem.makeFilter ? elem.makeFilter : "";
    //     this.filters.modCategory = elem.modCategoryValue
    //       ? elem.modCategoryValue
    //       : "";
    //     this.filters.series = elem.modelValue ? elem.modelValue : "";
    //     this.filters.size = elem.size ? elem.size : "";
    //     this.filters.year = elem.yearValue ? elem.yearValue : "";
    //     this.filters.tag = elem.tag ? elem.tag : "";
    //     this.filters.skillLevel = elem.skillLevel ? elem.skillLevel : "";
    //     this.filters.timerange = elem.timerange ? elem.timerange : "";
    //   }
    //   this.getFavouriteMods();
    // });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (evt.url.indexOf("favorite-mods") >= 0) {
        this.showTabs = false;
        // localStorage.removeItem('search');
      } else {
        this.showTabs = true;
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    // this.getFavModPostFilter();
    this.getDraftMods();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.reload, "reload");
    console.log(changes, "changes in draft");
    if (changes.reload.currentValue != changes.reload.previousValue) {
      this.getDraftMods();
    }
  }

  htmlLength(html = "", length) {
    return html.slice(0, length);
  }
  reset() {
    this.selectedDate = null;
    this.modfilters = {
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

    this.getDraftMods();
  }
  getMagnifyImage(url) {
    let data = {
      url: this._host + "images/badges/" + url,
    };
    this._bs.magnifyBadgeData.next(data);
    const modalRef = this.modalService.open(MagnifyImageComponent);
    modalRef.componentInstance.name = "World";
  }
  openReport(id, key) {
    this.modalReference3 = this.modalService.open(ReportSectionComponent);
    let data = {
      key: key,
      id: id,
    };
    this.modalReference3.componentInstance.reportData = data;
  }
  deleteModPost(id, index) {
    Swal.fire({
      title: "Are you sure you want to delete this post from drafts?",
      // html: "<b>Next Step:</b> Verify Your Email. <br> We’ve sent you an email. Click the link in the email to continue setting up your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true;
        let data = {
          id: id,
        };
        this._sharedService.deleteModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.favMods.splice(index, 1);
              this.totalMods = this.totalMods - 1;
              this.modCount.emit(this.totalMods);
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
      // this.toastr.success('Registered Successfully. Please verify your email!');
    });
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
  getDraftMods() {
    let filters = {
      userid: this.credentials.credentials.id,
      status: "draft",
      class: this.modfilters.rvTypeFilter,
      make: this.modfilters.makeFilter,
      series: this.modfilters.modelValue,
      size: this.modfilters.size,
      modCategory: this.modfilters.modCategoryValue,
      year: this.modfilters.yearValue,
      skillLevel: this.modfilters.skillLevel,
      timerange: this.modfilters.timerange,
      startDate: this.modfilters.startDate,
      endDate: this.modfilters.endDate,
      count: 1000,
    };
    // filters["userid"] = this.credentials.credentials.id;
    filters["modPost"] = "modPost";
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    this.pageService.getMyMods(filters).subscribe(
      (response) => {
        if (response.success) {
          this.favMods = response.data.map((cat) => {
            console.log(this.favMods, "draft mode");
            return {
              id: cat.id,
              description: cat.description,
              isCommentDisabled: cat.isCommentDisabled,
              name: cat.name,
              slug: cat.slug,
              tags: cat.tag,
              productUsed: cat.productUsed,
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
              catName: cat.modCategorydetails
                ? cat.modCategorydetails.name
                : "",
              rvType: this._sharedService.getRvType(cat.rvType),
              year: cat.year,
              series: cat.seriesdetails,
              make: cat.makedetails,
              model: cat.model,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              totalShare: cat.totalShare,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime,
              addedBydetails: cat.addedBydetails,
              timerange: cat.timerange,
              // whatIDid: cat.whatIDid,
              isPending: cat.isPending,
              isFollow: cat.isFollow,
              isFriend: cat.isFriend,
              sizedetails: cat.sizedetails,
              newW: cat.whatIDid.replace(urlRegex, function (url) {
                return (
                  '<a  href="' + url + '"  target="_blank" >' + url + "</a>"
                );
              }),
              // modDetailSharedata: this.setShareData(cat),
            };
          });
          this.totalMods = response.total;
          this.modCount.emit(response.total);
          this.reload = false;
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }
  checkLoggedinUser() {
    let user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }
  goTouserProfile(url, params: any = {}) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.router.navigate([url], { queryParams: params });
  }
  onClickImage() {
    this._sharedService.onClickImageWithoutLogin();
  }
  goToModDetail(url, param) {
    window.location.href = window.location.origin + url + "?id=" + param;
  }
  getFavModPostFilter() {
    let filter = {
      userid: this.credentials.credentials.id,
      class: this.modfilters.rvTypeFilter,
      make: this.modfilters.makeFilter,
      series: this.modfilters.modelValue,
      size: this.modfilters.size,
      modCategory: this.modfilters.modCategoryValue,
      year: this.modfilters.yearValue,
      skillLevel: this.modfilters.skillLevel,
      timerange: this.modfilters.timerange,
      startDate: this.modfilters.startDate,
      endDate: this.modfilters.endDate,
    };
    this.pageService.getFavModPostFilter(filter).subscribe(
      (res: any) => {
        if (res.success) {
          this.filterrvTypes = this._sharedService.getRvTypeArray(res.rvClass);
          this.MakesFilters = res.rvMake;
          this.skillLevelNeeded = res.skillLevel;
          this.timeRanges = res.timerange;
          this.rvYears = res.years;
          this.filterModels = res.rvSeries;
          this.modCategories = res.modCategory;
          this.difficulties = res.size;
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
  searchValue() {
    if (
      this.selectedDate &&
      this.selectedDate != "" &&
      this.selectedDate != null &&
      this.selectedDate.startDate != null &&
      this.selectedDate.endDate != null &&
      this.selectedDate.startDate != "" &&
      this.selectedDate.endDate != ""
    ) {
      this.modfilters.startDate = new Date(
        this.selectedDate.startDate.toDate()
      );
      this.modfilters.endDate = new Date(this.selectedDate.endDate.toDate());
    }

    this.getFavModPostFilter();
    this.getDraftMods();
  }
  route(value) {
    this.router.navigate(["mod-details"], {
      queryParams: { id: value, uid: this.credentials.credentials.id },
    });
  }
  setShareData(item) {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(function () {
        a2a.init_all();
      }, 500);
    }
    return;
  }
  sendNotif(id) {
    let data = {
      user_id: id,
    };
    this.chatService.sendNotif(data);
  }
  edit(slug) {
    console.log("slug", slug);
    this.editModItem.emit(slug);
    //  setTimeout(()=>{
    //   if(this.favMods.youtubeLink!="" ){
    //   const elem = (document.getElementsByClassName('accor') as HTMLCollection)[0] as HTMLObjectElement;
    //   elem.classList.add('show');
    //   }if(this.favMods.tags!=''){
    //     console.log("tag",this.favMods.tags)
    //     const elem1 = (document.getElementsByClassName('accor1') as HTMLCollection)[0] as HTMLObjectElement;
    //     elem1.classList.add('show');
    //   }

    // },1000)
  }
}
