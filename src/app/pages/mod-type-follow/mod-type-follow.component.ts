import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CredentialsService } from 'src/app/auth/credentials.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-mod-type-follow',
  templateUrl: './mod-type-follow.component.html',
  styleUrls: ['./mod-type-follow.component.scss']
})
export class ModTypeFollowComponent implements OnInit {
  @Input() searchKeyword: any
  @Input() modfilters: any = {};
  private carouselToken: string;
  closeResult = '';
  datas = []
  _host = environment.url
  groups = [

  ];
  loader = false;
  // filters:{count:number,size:string,search:string,userid:string,class:string,series:string,make:string,modCategory:string;year:string}={
  // count:1000, userid:'',search:'',class:'',series:'',make:'',modCategory:'',year:'', size:''
  // }
  isFavourate = false;
  myModes = [];
  microModes = [];
  miniModes = [];
  mediumModes = [];
  megaModes = [];
  massiveModes = [];
  slideConfig = { slidesToShow: 4, slidesToScroll: 4, responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]};
  today = new Date(); slickInit(e) {
  }

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
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private pageService: PagesService,
    private _route: ActivatedRoute,
    public credentials: CredentialsService,
    private sharedService: SharedService
  ) {
    _route.queryParams.subscribe(param => {
      // if(param.modal=="seeMods"){
      this.getDifferentMods(param['id']);
      // }
    })
    // this.pageService.getModData().subscribe(res=>{
    //   this.datas = res
    // })
    // if(this.datas.length==0){
    //   this.getMyMods();
    // }
    // else{
    //   this.myModes=this.datas
    // }

  }
  public carouselTile: NguCarouselConfig;
  // public carousel:NguCarousel<any>;
  @ViewChild('carousel', { static: false }) carousel: NguCarousel<any>;
  // public carouselTileItems: Array<any>;
  // public carouselTile: NgxCarousel;
  carouselConfig: NguCarouselConfig
  //  {
  // grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
  // load: 3,
  // interval: {timing: 4000, initialDelay: 1000},
  // loop: true,
  // touch: true,
  // velocity: 0.2
  // }
  carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  mostModes = [0, 1, 2, 3, 4, 5]
  ngOnInit() {
    this.carouselConfig = {
      grid: { xs: 2, sm: 3, md: 3, lg: 4, all: 0 },
      load: 3,
      interval: { timing: 4000, initialDelay: 1000 },
      loop: true,
      touch: true,
      velocity: 0.2
    }

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
  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes);
    // if(changes.modfilters){
    //   this.filters.search = changes.modfilters.currentValue.search?changes.modfilters.currentValue.search:'';
    //   this.filters.class = changes.modfilters.currentValue.rvTypeFilter?changes.modfilters.currentValue.rvTypeFilter:'';
    //   // this.filters.series = changes.modfilters.currentValue.seriesFilter;
    //   this.filters.make = changes.modfilters.currentValue.makeFilter?changes.modfilters.currentValue.makeFilter:'';
    //   this.filters.modCategory = changes.modfilters.currentValue.modCategoryValue?changes.modfilters.currentValue.modCategoryValue:'';
    //   this.filters.series = changes.modfilters.currentValue.modelValue?changes.modfilters.currentValue.modelValue:'';
    //   this.filters.size = changes.modfilters.currentValue.size?changes.modfilters.currentValue.size:'';
    //   this.filters.year = changes.modfilters.currentValue.yearValue?changes.modfilters.currentValue.yearValue:'';
    //   // if(changes.searchKeyword || changes.size){
    //   //   this.filters.search=changes.searchKeyword.currentValue?changes.searchKeyword.currentValue:'';
    //     // this.filters.size = changes.size.currentValue;
    //     this.getDifferentMods();
    // }else{
    //   this.myModes=changes.selectedMod?changes.selectedMod.currentValue:changes.selectedMod.currentValue
    // }

    // }else{

    // }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }


  public carouselTileLoad(evt: any) {

    const len = this.carouselTileItems.length
    if (len <= 30) {
      for (let i = len; i < len + 10; i++) {
        this.carouselTileItems.push(i);
      }
    }
  }

  // open(content) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  getDifferentMods(id) {
    this.spinner.show();
    let filt = {
      userid: this.credentials.credentials.id
    }
    this.sharedService.get('modposts?modCategory=' + id).subscribe(
      (res: any) => {
        if (res.success) {
          // console.log("res data", res.data);
          this.microModes = res.data.filter(x => x.size == "617117d45dc9eb47e09a2459");
          this.microModes = this.microModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBy,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime
            };
          });
          this.miniModes = res.data.filter(x => x.size == "6171199578121d51ac58f30f");
          this.miniModes = this.miniModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBy,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime
            };
          });

          this.massiveModes = res.data.filter(x => x.size == "61714f23fc2f548d335f5933");
          // console.log(this.massiveModes)
          this.massiveModes = this.massiveModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBy,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime
            };
          });
          this.megaModes = res.data.filter(x => x.size == "61714f0afc2f548d335f5932");
          this.megaModes = this.megaModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBy,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime
            };
          });
          this.mediumModes = res.data.filter(x => x.size == "61714eeefc2f548d335f5931");
          this.mediumModes = this.mediumModes.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBy,
              isFavourite: cat.isFavourite,
              likesTotal: cat.likesTotal,
              commentTotal: cat.commentTotal,
              totalTime: cat.totalTime
            };
          });

          // this.myModes = res.data.map((cat) => {
          //   // console.log(
          //   //   new Date(cat.updatedAt).getTime(),
          //   //   this.today.getTime()
          //   // );
          //   return {
          //     id: cat.id,
          //     description: cat.description,
          //     name: cat.name,
          //     beforeImages:cat.beforeImages,
          //     afterImages:cat.afterImages,
          //     status: cat.status,
          //     time: this.pageService.timeDiffCalc(
          //       new Date(cat.updatedAt).getTime(),
          //       this.today.getTime()
          //     ),
          //     createdAt: cat.createdAt,
          //     updatedAt: cat.updatedAt,
          //   };
          // });

          this.pageService.setModData(this.myModes)
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

  getMyMods() {
    this.spinner.show();
    let filte = {
      userid: this.credentials.credentials.id
    }
    this.pageService.getMyMods(filte).subscribe(
      (res: any) => {
        if (res.success) {
          // console.log("res data", res.data);
          // this.microModes = res.data.filter(x=>x.sizedetails.name=="micro mod");
          // this.microModes = this.microModes.map((cat) => {
          //   // console.log(
          //   //   new Date(cat.updatedAt).getTime(),
          //   //   this.today.getTime()
          //   // );
          //   return {
          //     id: cat.id,
          //     description: cat.description,
          //     name: cat.name,
          //     beforeImages:cat.beforeImages,
          //     afterImages:cat.afterImages,
          //     status: cat.status,
          //     time: this.pageService.timeDiffCalc(
          //       new Date(cat.updatedAt).getTime(),
          //       this.today.getTime()
          //     ),
          //     createdAt: cat.createdAt,
          //     updatedAt: cat.updatedAt,
          //   };
          // });
          // this.miniModes = res.data.filter(x=>x.size.name=="mini mod");
          // this.miniModes = this.miniModes.map((cat) => {
          //   // console.log(
          //   //   new Date(cat.updatedAt).getTime(),
          //   //   this.today.getTime()
          //   // );
          //   return {
          //     id: cat.id,
          //     description: cat.description,
          //     name: cat.name,
          //     beforeImages:cat.beforeImages,
          //     afterImages:cat.afterImages,
          //     status: cat.status,
          //     time: this.pageService.timeDiffCalc(
          //       new Date(cat.updatedAt).getTime(),
          //       this.today.getTime()
          //     ),
          //     createdAt: cat.createdAt,
          //     updatedAt: cat.updatedAt,
          //   };
          // });
          // this.massiveModes = res.data.filter(x=>x.size.name=="Massive Mod");
          // this.massiveModes = this.massiveModes.map((cat) => {
          //   // console.log(
          //   //   new Date(cat.updatedAt).getTime(),
          //   //   this.today.getTime()
          //   // );
          //   return {
          //     id: cat.id,
          //     description: cat.description,
          //     name: cat.name,
          //     beforeImages:cat.beforeImages,
          //     afterImages:cat.afterImages,
          //     status: cat.status,
          //     time: this.pageService.timeDiffCalc(
          //       new Date(cat.updatedAt).getTime(),
          //       this.today.getTime()
          //     ),
          //     createdAt: cat.createdAt,
          //     updatedAt: cat.updatedAt,
          //   };
          // });
          // this.megaModes = res.data.filter(x=>x.size.name=="mega-mod");
          // this.megaModes = this.megaModes.map((cat) => {
          //   // console.log(
          //   //   new Date(cat.updatedAt).getTime(),
          //   //   this.today.getTime()
          //   // );
          //   return {
          //     id: cat.id,
          //     description: cat.description,
          //     name: cat.name,
          //     beforeImages:cat.beforeImages,
          //     afterImages:cat.afterImages,
          //     status: cat.status,
          //     time: this.pageService.timeDiffCalc(
          //       new Date(cat.updatedAt).getTime(),
          //       this.today.getTime()
          //     ),
          //     createdAt: cat.createdAt,
          //     updatedAt: cat.updatedAt,
          //   };
          // });
          // this.mediumModes = res.data.filter(x=>x.size.name=="medium-mod");
          // this.mediumModes = this.mediumModes.map((cat) => {
          //   // console.log(
          //   //   new Date(cat.updatedAt).getTime(),
          //   //   this.today.getTime()
          //   // );
          //   return {
          //     id: cat.id,
          //     description: cat.description,
          //     name: cat.name,
          //     beforeImages:cat.beforeImages,
          //     afterImages:cat.afterImages,
          //     status: cat.status,
          //     time: this.pageService.timeDiffCalc(
          //       new Date(cat.updatedAt).getTime(),
          //       this.today.getTime()
          //     ),
          //     createdAt: cat.createdAt,
          //     updatedAt: cat.updatedAt,
          //   };
          // });

          this.myModes = res.data.map((cat) => {
            // console.log(
            //   new Date(cat.updatedAt).getTime(),
            //   this.today.getTime()
            // );
            return {
              id: cat.id,
              description: cat.description,
              name: cat.name,
              beforeImages: cat.beforeImages,
              afterImages: cat.afterImages,
              status: cat.status,
              time: this.pageService.timeDiffCalc(
                new Date(cat.updatedAt).getTime(),
                this.today.getTime()
              ),
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              addedBy: cat.addedBy
            };
          });

          this.pageService.setModData(this.myModes)
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

  favourite(postId) {
    let data = {
      'postId': postId,
      'userId': this.credentials.credentials.id,
      'postType': 'modPost'
    }
    this.isFavourate = !postId.isFavourite;
    this.loader = true;
    this.pageService.addFavourite(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message)
          // this.getDifferentMods();
          this.loader = false;
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

  followMods(postData) {
    let data = {
      'postId': postData.id,
      'postUserID': postData.addedBy,
      'userBy': this.credentials.credentials.id,
      'postType': 'modPost',
      "type": "follower"
    }
    this.spinner.show();
    this.pageService.addModFollow(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message)
          // this.getMyMods();

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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
