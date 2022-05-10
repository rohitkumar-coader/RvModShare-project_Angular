import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { PagesService } from "../pages.service";
import { ToastrService } from "ngx-toastr";
import { BehaviorService } from "src/app/shared/behavior.service";
import { Router } from "@angular/router";
import { SharedService } from "src/app/shared/shared.service";
import { RightSponsoredComponent } from "../right-sponsored/right-sponsored.component";
import { ifStmt } from "@angular/compiler/src/output/output_ast";
@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.css"],
})
export class ExploreComponent implements OnInit {
  selected;
  search: any;
  searchKeyword: any;
  @Input() selectedDropDownFeed: any;
  @Input() favourite: any;
  showExplore = true;
  selectedDate: any;
  _baseUrl = window.location.origin + "/";
  seeModUrl: any;
  favids: any;
  likedids: any;
  followids: any;
  followmodIds: any;
  modfiltersubscribe: any;
  timelinemods: any;
  user: any;
  // modfilters:any={};
  //   this.selectedDaterange.startDate.toDate();
  // this.selectedDaterange.endDate.toDate();
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
  timeRanges: any = [];
  MakesFilters: any = [];
  categories: Array<any> = [];
  difficulties = [];
  skillLevelNeeded: any;
  filterModels: any = [];
  modCategories: any = [];
  year = new Date().getFullYear() + 1;

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
  totalcount: any = 20;
  className: any;
  isfollow: any;
  filterdata: any;
  isUser: boolean;
  constructor(
    public pageService: PagesService,
    public _bs: BehaviorService,
    private toastr: ToastrService,
    private router: Router,
    private _sharedService: SharedService
  ) {
    // this._bs.modFilter.subscribe((elem) => {
    //   this.followNotification()
    //   if (elem != null && elem != undefined && elem != "") {
    //     this.filterdata=elem

    //     console.log(this.filterdata,"in subscribe filter mod");

    //   }
    // });
    this._bs.resetToBrowsemod.subscribe((res) => {
      console.log("behaviour", res);
      if (res == true) {
        this.reset();
      }
    });
    this._bs.updateFollowListButton.subscribe((res) => {
      this.isfollow = res;
    });
    this.user = JSON.parse(localStorage.getItem("user"));
    this.isUser = this.checkLoggedinUser();
    this.modfiltersubscribe = this._bs.feedFilter.subscribe((elem) => {
      console.log(elem, "feed filter");
      if (elem != null && elem != undefined && elem != "") {
        // document.getElementById(elem).click();
        this.modfilters.type = elem;
        this.searchValue();
      } else {
        this.modfilters.type = "SimpleMods";
      }
    });
  }
  ngOnInit() {
    // this.seemodfavorites()
    // this.seemodLikedMods()
    // this.seemodFollowMemberMods()
    // this.seemodFollowInterestMods()
    // this.seemodtimelineMods()
    this.getCategories("size");
    this.getCategories("modpost");
    this.getSkillCategories();
    this.getYears();
    this.getAllTimeRange();
    this.getFilterallMake();
    // this.reset();
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
  resetCount() {
    this._bs.resetTotalCount.next(true);
  }
  // seemodfavorites() {

  //   this.pageService.seemodfavorites().subscribe(
  //     (response) => {
  //       if (response.success) {
  //         this.favids = response.data;
  //         // console.log(this.allMakes, "this.allMakes");
  //         // this.spinner.hide();
  //       } else {
  //         // this.spinner.hide();
  //       }
  //     },
  //     (error) => {
  //       // this.spinner.hide();
  //     }
  //   );
  // }
  // seemodLikedMods() {
  //   this.pageService.seemodLikedMods().subscribe(
  //     (response) => {
  //       if (response.success) {
  //         this.likedids = response.data;
  //         // console.log(this.allMakes, "this.allMakes");
  //         // this.spinner.hide();
  //       } else {
  //         // this.spinner.hide();
  //       }
  //     },
  //     (error) => {
  //       // this.spinner.hide();
  //     }
  //   );
  // }
  // seemodFollowMemberMods() {
  //   this.pageService.seemodFollowMemberMods().subscribe(
  //     (response) => {
  //       if (response.success) {
  //         this.followids = response.data;
  //         // console.log(this.allMakes, "this.allMakes");
  //         // this.spinner.hide();
  //       } else {
  //         // this.spinner.hide();
  //       }
  //     },
  //     (error) => {
  //       // this.spinner.hide();
  //     }
  //   );
  // }
  //  seemodFollowInterestMods() {
  //   this.pageService.seemodFollowInterestMods().subscribe(
  //     (response) => {
  //       if (response.success) {
  //         this.followmodIds = response.data;
  //         // console.log(this.allMakes, "this.allMakes");
  //         // this.spinner.hide();
  //       } else {
  //         // this.spinner.hide();
  //       }
  //     },
  //     (error) => {
  //       // this.spinner.hide();
  //     }
  //   );
  //  }
  //  seemodtimelineMods() {
  //   this.pageService.seemodtimelineMods().subscribe(
  //     (response) => {
  //       if (response.success) {
  //         this.timelinemods = response.data;
  //         // console.log(this.allMakes, "this.allMakes");
  //         // this.spinner.hide();
  //       } else {
  //         // this.spinner.hide();
  //       }
  //     },
  //     (error) => {
  //       // this.spinner.hide();
  //     }
  //   );
  // }
  getYears() {
    // for (let i = this.year - 25; i < this.year + 1; i++) {
    for (let i = this.year; i >= 1980; i--) {
      // console.log(i);
      this.years.push(i);
    }
    // this.years.push("I'm a Wannabe");
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
    this.followNotification();
    this._bs.modFilter.next(this.modfilters);
  }
  // old make get data
  getFiltersMake() {
    console.log("make", this.modfilters.makeFilter);
    if (this.modfilters.rvTypeFilter || this.modfilters.rvTypeFilter == "") {
      this.getFilterallMake();
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
  getFilterallMake() {
    this.modfilters.makeFilter = "";
    this.modfilters.modelValue = "";
    let filters = {
      type: this.modfilters.rvTypeFilter,
      sortBy: "name asc",
      count: 1000,
    };
    this.pageService.getAllMakes(filters).subscribe(
      (response) => {
        if (response.success) {
          this.MakesFilters = response.data;
          console.log("this.MakesFilters", this.MakesFilters);
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
  getClassName() {
    this.MakesFilters.forEach((element) => {
      if (element.id == this.modfilters.makeFilter) {
        this.modfilters.rvTypeFilter = element.cat_type;
      }
      let highlite = document.getElementById("carsff5");
      highlite.classList.add("highlightfilter");
    });
    console.log("make data", this.className);
  }
  getFilterModels() {
    this.getClassName();
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
            console.log("response of all class", this.filterModels);
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

  followNotificationByclick() {
    this.isUser = this.checkLoggedinUser();
    console.log("name", this.modfilters);
    let filtermod1 = {
      interestArray: [
        {
          categoryType: "modpost",
          categoryId: this.modfilters.modCategoryValue,
          rvClass: this.modfilters.rvTypeFilter,
          rvMake: this.modfilters.makeFilter,
          rvSeries: this.modfilters.modelValue,
          rvYear: this.modfilters.yearValue,
          size: this.modfilters.size,
          difficulty: this.modfilters.skillLevel,
          timerange: this.modfilters.timerange,
        },
      ],
    };
    if (this.isUser) {
      this.pageService.followNotification(filtermod1).subscribe(
        (res: any) => {
          if (res.success) {
            this.isfollow = res.isFollowed;
          }
          if (this.isfollow == false) {
            this.onSubmitted();
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
    } else {
      this.onClickImage();
    }
  }
  unfollowNotificationByclick() {
    let filtermod1 = {
      interestArray: [
        {
          categoryType: "modpost",
          categoryId: this.modfilters.modCategoryValue,
          rvClass: this.modfilters.rvTypeFilter,
          rvMake: this.modfilters.makeFilter,
          rvSeries: this.modfilters.modelValue,
          rvYear: this.modfilters.yearValue,
          size: this.modfilters.size,
          difficulty: this.modfilters.skillLevel,
          timerange: this.modfilters.timerange,
        },
      ],
    };
    this.isUser = this.checkLoggedinUser();
    if (this.isUser) {
      this.pageService.unfollowNotification(filtermod1).subscribe(
        (res: any) => {
          if (res.success) {
            this.isfollow = res.isFollowed;
            this._bs.updateFollowListButton.next(res.isFollowed);
          } else {
            // window.scrollTo(0, 0);
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
    } else if (!this.isUser) {
      this.onClickImage();
    }
  }
  onSubmitted() {
    let filtermod1 = {
      interestArray: [
        {
          categoryType: "modpost",
          categoryId: this.modfilters.modCategoryValue,
          rvClass: this.modfilters.rvTypeFilter,
          rvMake: this.modfilters.makeFilter,
          rvSeries: this.modfilters.modelValue,
          rvYear: this.modfilters.yearValue,
          size: this.modfilters.size,
          difficulty: this.modfilters.skillLevel,
          timerange: this.modfilters.timerange,
        },
      ],
    };
    if (this.isUser) {
      this.pageService.addFollowCategories(filtermod1).subscribe((res: any) => {
        if (res.success) {
          this.followNotification();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
      });
    } else {
      this.onClickImage();
    }
  }

  followNotification() {
    console.log("name explore", this.modfilters);
    let filtermod1 = {
      interestArray: [
        {
          categoryType: "modpost",
          categoryId: this.modfilters.modCategoryValue,
          rvClass: this.modfilters.rvTypeFilter,
          rvMake: this.modfilters.makeFilter,
          rvSeries: this.modfilters.modelValue,
          rvYear: this.modfilters.yearValue,
          size: this.modfilters.size,
          difficulty: this.modfilters.skillLevel,
          timerange: this.modfilters.timerange,
        },
      ],
    };
    if (this.isUser) {
      this.pageService.followNotification(filtermod1).subscribe(
        (res: any) => {
          if (res.success) {
            this.isfollow = res.isFollowed;
            this._bs.updateFollowListButton.next(res.isFollowed);
            console.log("explore response ", this.isfollow);
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
    } else {
    }
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
  copy() {
    this.seeModUrl = this._baseUrl + "mods";
    let value = this.seeModUrl;
    navigator.clipboard.writeText(value);
    // this.toastr.success("Copied URL to clipboard!");
    alert("Copied URL to clipboard!");
    // this._clipboardService.copy(this._baseUrl + "page/friend-profile/" + text);
    // this.toastr.success("Copied URL to clipboard!", "Success");
  }
  goToshareMod() {
    if (!this.checkLoggedinUser()) {
      this.onClickImage();
      return; // This block of code will check the loggedin user, if user is not loggedin it will return from here and show logging modal
    }
    this.router.navigate(["/share-mod"]);
  }
  checkLoggedinUser() {
    let user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }
  onClickImage() {
    this._sharedService.onClickImageWithoutLogin();
  }
  getSkillCategories() {
    let data = {
      type: "categories",
      cat_type: "difficulty",
      status: "active",
    };
    this.pageService.getCategories(data).subscribe(
      (res: any) => {
        if (res.success) {
          // if (type == "modpost") {
          //   this.modCategories = res.data;
          // }

          // if(type=='skills'){
          this.skillLevelNeeded = res.data;
          // }
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
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.modfiltersubscribe) {
      console.log("in mod unsubscribe");
      // this.modfiltersubscribe.unsubscribe();
      this._bs.feedFilter.next("");
    }
  }
}
