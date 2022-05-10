import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NguCarouselConfig, NguCarousel } from "@ngu/carousel";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { filter } from "rxjs/operators";
import { CredentialsService } from "src/app/auth/credentials.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { SharedService } from "src/app/shared/shared.service";
// import { NgxCarousel } from 'ngx-carousel';
@Component({
  selector: "app-search-by-categories",
  templateUrl: "./search-by-categories.component.html",
  styleUrls: ["./search-by-categories.component.css"],
})
export class SearchByCategoriesComponent implements OnInit {
  // @Input() searchKeyword: any;
  // @Input() modfilters: any = {};
  // @Output() buttonClicked = new EventEmitter();
  user: any;
  private carouselToken: string;
  closeResult = "";
  datas = [];
  _host = environment.url;
  groups = [];
  seeModcount: any;
  loader = false;
  filters: {
    type: string;
    count: number;
    size: string;
    search: string;
    userid: string;
    class: string;
    series: string;
    make: string;
    modCategory: string;
    year: string;
    tag: string;
    skillLevel: string;
    timerange: string;
    endDate: string;
    startDate: string;
    whatIDid: string;
    totalcount: number;
  } = {
    type: "",
    count: 1000,
    userid: "",
    search: "",
    class: "",
    series: "",
    make: "",
    modCategory: "",
    year: "",
    size: "",
    tag: "",
    skillLevel: "",
    timerange: "",
    endDate: "",
    startDate: "",
    whatIDid: "",
    totalcount: 20,
  };
  isFavourate = false;
  myModes = [];
  microModes = [];
  miniModes = [];
  mediumModes = [];
  megaModes = [];
  massiveModes = [];
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
          slidesToShow: 1,
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
  @Input() public selectedMod;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private pageService: PagesService,
    private _route: ActivatedRoute,
    private _bs: BehaviorService,
    public credentials: CredentialsService,
    public sharedService: SharedService
  ) {
    this._bs.modFilter.subscribe((elem) => {
      if (elem != null && elem != undefined) {
        this.filters.type = elem.type ? elem.type : "";
        this.filters.search = elem.search ? elem.search : "";
        this.filters.class = elem.rvTypeFilter ? elem.rvTypeFilter : "";
        // this.filters.series = elem.seriesFilter;
        this.filters.make = elem.makeFilter ? elem.makeFilter : "";
        this.filters.modCategory = elem.modCategoryValue
          ? elem.modCategoryValue
          : "";
        this.filters.series = elem.modelValue ? elem.modelValue : "";
        this.filters.size = elem.size ? elem.size : "";
        this.filters.year = elem.yearValue ? elem.yearValue : "";
        this.filters.tag = elem.tag ? elem.tag : "";
        this.filters.skillLevel = elem.skillLevel ? elem.skillLevel : "";
        this.filters.timerange = elem.timerange ? elem.timerange : "";
        this.filters.startDate = elem.startDate ? elem.startDate : "";
        this.filters.endDate = elem.endDate ? elem.endDate : "";
        this.filters.whatIDid = elem.whatIDid ? elem.whatIDid : "";
      }
    });
    // this.pageService.getModData().subscribe(res => {
    //   this.datas = res
    // })
    // if (this.datas.length == 0) {
    //   this.getMyMods();
    // }
    // else {
    //   this.myModes = this.datas
    // }
    // this.getDifferentMods();

    // _bs.getmodData().subscribe((res: any) => {
    //   if (res) {
    //     console.log(res,"in my mods")
    //     this.getDifferentMods(res);
    //   }
    // })
  }

  public carouselTile: NguCarouselConfig;
  // public carousel:NguCarousel<any>;
  @ViewChild("carousel", { static: false }) carousel: NguCarousel<any>;
  // public carouselTileItems: Array<any>;
  // public carouselTile: NgxCarousel;
  carouselConfig: NguCarouselConfig;
  //  {
  // grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
  // load: 3,
  // interval: {timing: 4000, initialDelay: 1000},
  // loop: true,
  // touch: true,
  // velocity: 0.2
  // }
  carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  mostModes = [0, 1, 2, 3, 4, 5];
  ngOnInit() {
    let user = localStorage.getItem("credentials");
    this.user = JSON.parse(user);

    this.carouselConfig = {
      grid: { xs: 2, sm: 3, md: 3, lg: 4, all: 0 },
      load: 3,
      interval: { timing: 4000, initialDelay: 1000 },
      loop: true,
      touch: true,
      velocity: 0.2,
    };

    //   this.carouselTile = {
    //     grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
    //     slide: 2,
    //     speed: 400,
    //     // interval: 4000,
    //     animation: 'lazy',
    //     point: {
    //       visible: true
    //     },
    //     load: 2,
    //     touch: true,
    //     easing: 'ease'
    //   }
  }

  public carouselTileLoad(evt: any) {
    const len = this.carouselTileItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 10; i++) {
        this.carouselTileItems.push(i);
      }
    }
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
  goToModDetail(url, param) {
    window.location.href = window.location.origin + url + "?id=" + param;
  }
  showAllMods(value: number) {
    console.log(value, "count of mod in timeline");
    if (value) {
      this.seeModcount = value;
    }
  }
}
