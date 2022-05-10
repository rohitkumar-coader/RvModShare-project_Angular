import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AppInjector } from "src/app/app.module";
import { CredentialsService } from "src/app/auth/credentials.service";
import { ChatService } from "src/app/chat.service";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { SharedService } from "src/app/shared/shared.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { PagesService } from "../pages.service";
import { ReportSectionComponent } from "../report-section/report-section.component";
declare var a2a: any;
declare var require: any;
@Component({
  selector: "app-tags-mods",
  templateUrl: "./tags-mods.component.html",
  styleUrls: ["./tags-mods.component.css"],
})
export class TagsModsComponent implements OnInit {
  p: number = 1;
  selectedDate: any;
  userId: any;
  timeRanges: any = [];
  MakesFilters: any = [];
  categories: Array<any> = [];
  difficulties = [];
  skillLevelNeeded: any;
  filterModels: any = [];
  modCategories: any = [];
  tagSlug: any;
  modfilters: any = {
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
  allMods = [];
  sum = 40;
  viewLink = false;
  _host = environment.url;
  _baseUrl = window.location.origin + "/";
  // _baseUrl = "https://www.rvmodshare.com/";
  chatService: any;
  fullCls = false;
  isLoading = false;
  smallCls = true;
  page = 1;
  modalReference3: any;
  totalComments = 0;
  replyForm: any;
  commentOnPost: any;
  Copylink: string = "";
  InfiniteScrollModule;
  replyOnPost: any;
  replyOnPost2: any;
  replyOnPost3: any;
  allComments: Array<any> = [];
  loadingContent = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  orgSlug: any;
  commentData: any;
  editComment = false;
  editReply = false;
  postIndex: any;
  newBadWords = environment.bad_word;
  rvTypes: Array<any> = [
    {
      description: "Class A",
      detail: { value: "a", key: "Class A" },
    },
    {
      description: "Class B",
      detail: { value: "b", key: "Class B" },
    },
    {
      description: "Class C",
      detail: { value: "c", key: "Class C" },
    },
    {
      description: "Truck Camper",
      detail: { value: "truck-camper", key: "Truck Camper" },
    },
    // {
    //   description: "Camper Van",
    //   detail: { value: "camper-van", key: "Camper Van" },
    // },
    {
      description: "Travel Trailer",
      detail: { value: "trailer", key: "Travel Trailer" },
    },
    // {
    //   description: "Folding Trailer",
    //   detail: { value: "folding-trailer", key: "Folding Trailer" },
    // },
    {
      description: "Fifth-Wheel",
      detail: { value: "fifth-wheel", key: "Fifth-Wheel" },
    },
    {
      description: "Custom",
      detail: { value: "custom", key: "Custom" },
    },
    {
      description: "Ambulance",
      detail: { value: "ambulance", key: "Ambulance" },
    },
    {
      description: "Skoolie",
      detail: { value: "skoolie", key: "Skoolie" },
    },
    // ,
    // {
    //   description: "Other",
    //   detail: { value: "other", key: "Other" },
    // },
    // {
    //   description: "I'm a Wannabe",
    //   detail: { value: "wanna-be", key: "I'm a Wannabe" },
    // },
  ];

  years: any = [];
  loader = false;
  today = new Date();
  count: number;
  totalcount: number = 20;
  totalModsCount: any;
  newWhatIdid: any;
  whatIdid: any;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dashService: DashboardService,
    public sharedService: SharedService,
    private renderer: Renderer2,
    public _bs: BehaviorService,
    private _titleService: Title,

    // private credentialsService: CredentialsService,
    public credentials: CredentialsService,
    private formBuilder: FormBuilder,
    private pageService: PagesService,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.chatService = AppInjector.get(ChatService);
    }
    this.tagSlug = this._activateRouter.snapshot.paramMap.get("slug");
    if (this.tagSlug) {
      this.orgSlug = this.removeDashFromString(this.tagSlug);
      this.getpopularTagsMods();
    }
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
          this.allMods[index].isFavourite = !this.allMods[index].isFavourite;
          this.getpopularTagsMods();
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
  openLink() {
    this.viewLink = true;
  }
  copyLink(obj) {
    console.log("obj", obj);
    this.Copylink = this._baseUrl + "mods/" + obj.slug;
    let value = this.Copylink;
    navigator.clipboard.writeText(value);
    // this.toastr.success("Copied URL to clipboard!");
    // alert("Copied URL to clipboard!");
    this.openLink();
    this.Onshare(obj, "copyClick");
  }
  sendNotif(id) {
    let data = {
      user_id: id,
    };
    this.chatService.sendNotif(data);
  }
  reset() {
    this.selectedDate = null;
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
  }
  getFiltersMake() {
    if (this.modfilters.rvTypeFilter && this.modfilters.rvTypeFilter != "") {
      this.modfilters.makeFilter = "";
      this.modfilters.modelValue = "";
      let filters = {
        type: this.modfilters.rvTypeFilter,
        sortBy: "name asc",
        count: 1000,
      };
      this.pageService.getMainCategories(filters).subscribe(
        (response) => {
          if (response.success) {
            this.MakesFilters = response.data;
            // this.spinner.hide();
          } else {
            // this.spinner.hide();
          }
        },
        (error) => {
          // this.spinner.hide();
        }
      );
    } else {
      this.MakesFilters = [];
      this.filterModels = [];
      this.modfilters.makeFilter = "";
      this.modfilters.modelValue = "";
    }
  }

  getFilterModels() {
    // this.spinner.show();
    if (
      this.modfilters.rvTypeFilter != "" &&
      this.modfilters.makeFilter != ""
    ) {
      this.modfilters.modelValue = "";
      let filters = {
        type: this.modfilters.rvTypeFilter,
        categoryId: this.modfilters.makeFilter,
      };
      this.pageService.getSubCategories(filters).subscribe(
        (response) => {
          // console.log('res...',response);
          if (response.success) {
            this.filterModels = response.data;
            // this.spinner.hide();
          } else {
            // this.spinner.hide();
          }
        },
        (error) => {
          // this.spinner.hide();
        }
      );
    } else {
      this.filterModels = [];
      this.modfilters.modelValue = "";
    }
  }

  getAllTimeRange() {
    this.pageService.getTimeRanges().subscribe(
      (response) => {
        if (response.success) {
          this.timeRanges = response.data;
          // console.log(this.allMakes, "this.allMakes");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
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
          this.allMods[index].likesTotal = res.data.count;
          this.allMods[index].likestatus = res.data.likestatus;
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
  getCategories(type) {
    let data = {
      type: "categories",
      cat_type: type,
      // sortBy: 'name asc',
      count: 1000,
    };
    if (type != "size") {
      data["sortBy"] = "name asc";
    }
    this.pageService.getCategories(data).subscribe(
      (res: any) => {
        if (res.success) {
          if (type == "modpost") {
            this.modCategories = res.data;
          }
          if (type == "group") {
            this.categories = res.data;
          }
          if (type == "size") {
            this.difficulties = res.data;
          }
          if (type == "skills") {
            this.skillLevelNeeded = res.data;
          }
          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
      }
    );
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
  goTouserProfile(url, params) {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.router.navigate([url], { queryParams: params });
  }
  onClickImage() {
    this.sharedService.onClickImageWithoutLogin();
  }
  checkLoggedinUser() {
    let user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }
  goToModDetail(url, param, modid) {
    console.log("modid", modid);
    var modobj = { id: modid, page: this.page };
    localStorage.setItem("modobj", JSON.stringify(modobj));
    if (!this.checkLoggedinUser()) {
      // this.onClickImage();
      window.location.href = window.location.origin + url + "/" + param;
    } else if (this.checkLoggedinUser()) {
      // this.onClickImage();
      window.location.href = window.location.origin + url + "/" + param;
    }
    // window.location.href = window.location.origin + url + "/" + param;
    // window.location.href = window.location.origin + url + "?id=" + param;
  }
  openReport(id, key) {
    this.modalReference3 = this.modalService.open(ReportSectionComponent);
    let data = {
      key: key,
      id: id,
    };
    this.modalReference3.componentInstance.reportData = data;
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
  pageChanged(e) {
    this.page = e;
    this.getpopularTagsMods();
    window.scrollTo(0, 0);
  }
  getpopularTagsMods() {
    // this.page = ModID.page
    let filters: any = {};
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    filters = {
      // modid: this.modfilters.modid
      //   ? this.modfilters.modid
      //   : "",
      class: this.modfilters.rvTypeFilter ? this.modfilters.rvTypeFilter : "",
      make: this.modfilters.makeFilter ? this.modfilters.makeFilter : "",
      series: this.modfilters.modelValue ? this.modfilters.modelValue : "",
      size: this.modfilters.size ? this.modfilters.size : "",
      modCategory: this.modfilters.modCategoryValue
        ? this.modfilters.modCategoryValue
        : "",
      year: this.modfilters.yearValue,
      skillLevel: this.modfilters.skillLevel ? this.modfilters.skillLevel : "",
      timerange: this.modfilters.timerange,
      startDate: this.modfilters.startDate,
      endDate: this.modfilters.endDate,
      search: this.modfilters.search,
    };
    let isUser = this.checkLoggedinUser();
    if (isUser) {
      filters["uid"] = this.credentials.credentials.id;
    }
    if (this.userId) {
      filters["userid"] = this.userId;
    }
    // if(ModID.page){
    //   filters["page"] = ModID.page;
    //   console.log("enter in page", ModID.page);
    // }
    filters["page"] = this.page;
    // filters["page"] = ModID.page;
    filters["count"] = 20;
    filters["tag"] = this.removeDashFromString(this.tagSlug);

    this.pageService.getpopularTagsMods(filters).subscribe(
      (res: any) => {
        if (res.success) {
          this.allMods = [];
          this.totalModsCount = res.total;
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
              whatIDid: cat.whatIDid.replace(/<img[^>]*>/g, ""),
              isPending: cat.isPending,
              isFollow: cat.isFollow,
              isFriend: cat.isFriend,
              likestatus: cat.likestatus,
              sizedetails: cat.sizedetails,
              typeOfPost: "mod",
              showMore: false,
              newW: cat.whatIDid.replace(urlRegex, function (url) {
                return (
                  '<a  href="' + url + '"  target="_blank" >' + url + "</a>"
                );
              }),
            };
          });
          // for (let index = 0; index < res.data.length; index++) {
          //   let new_element = {
          //     typeOfPost: "google-ad",
          //   };
          //   if (res.data.length < 4 && index == res.data.length - 1) {
          //     this.allMods.splice(res.data.length + 1, 0, new_element);
          //   } else if (res.data.length >= 4 && index % 4 == 0 && index != 0) {
          //     this.allMods.splice(index - 1, 0, new_element);
          //   } else {
          //   }
          // }
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
  htmlLength(html = "", length) {
    if (html && html.length > length) {
      return html.slice(0, length) + "...";
    } else {
      return html;
    }
  }
  removeDashFromString(str) {
    let str1 = str.replace(/-/g, " ");
    return str1;
  }

  deleteModPost(id, index) {
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
        this.isLoading = false;
        this.sharedService.deleteModPost(data).subscribe(
          (res: any) => {
            if (res.success) {
              this.allMods.splice(index, 1);
              this.toastr.success(res.message);
            } else {
              this.toastr.error(res.error.message, "Error");
            }
            this.isLoading = false;
          },
          (err) => {
            this.isLoading = false;
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
      // this.toastr.success('Registered Successfully. Please verify your email!');
    });
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
    this.getpopularTagsMods();
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
}
