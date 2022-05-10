import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { PagesService } from "../pages.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { BehaviorService } from "src/app/shared/behavior.service";
@Component({
  selector: "app-sponsored",
  templateUrl: "./sponsored.component.html",
  styleUrls: ["./sponsored.component.css"],
})
export class SponsoredComponent implements OnInit {
  @ViewChild("myIdentifiersponsor", { static: false })
  myIdentifier: ElementRef;
  leftAdvertisements: any = [];
  rightAdvertisements: any = [];
  centerAdvertisements: any = [];
  images = [];
  spinner: any;
  today: any;
  posts: any;
  @Input() seeModcount: any;
  _host = environment.url;
  constructor(
    public pageService: PagesService,
    private toastr: ToastrService,
    public _bs: BehaviorService
  ) {
    this.getAllAdvertisements();
  }

  ngOnInit() {}
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  // ngAfterViewInit() {
  //   var height = this.myIdentifier.nativeElement.offsetHeight
  //  window.alert('Height: ' + height)
  // }
  updateMethod() {
    this._bs.updateSticky.next(true);
  }
  getAllAdvertisements() {
    let data = {
      count: 1000,
    };
    this.pageService.getAllAdvertisements(data).subscribe(
      (response) => {
        if (response.success) {
          this.rightAdvertisements = response.data.filter(
            (x) => x.position == "right"
          );
          this.leftAdvertisements = response.data.filter(
            (x) => x.position == "left"
          );
          this.centerAdvertisements = response.data.filter(
            (x) => x.position == "center"
          );
          if (response.data.length > 0) {
            this.updateMethod();
          }
          console.log(
            this.rightAdvertisements.length,
            this.leftAdvertisements.length,
            "length ad inleft"
          );
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
  // getallNormalPosts() {
  //   let data={
  //     userid:'',
  //     afterpost:5
  //   }
  //   this.pageService.getAllActivities(data).subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         console.log(res.data);
  //         this.posts = [];
  //         this.posts = res.data.map((cat) => {
  //           // console.log(
  //           //   new Date(cat.updatedAt).getTime(),
  //           //   this.today.getTime()
  //           // );
  //           return {
  //             id: cat.id,
  //             image: cat.image,
  //             post: cat.post,
  //             addedByName: cat.addedBy
  //               ? cat.addedBy
  //               : '',
  //             addedByImage: cat.addedBy?cat.addedBy.image:'',
  //             status: cat.status,
  //             likes: cat.likesTotal,
  //             comments: cat.commentTotal,
  //             likestatus: cat.likestatus,
  //             time: this.pageService.timeDiffCalc(
  //               new Date(cat.updatedAt).getTime(),
  //               this.today.getTime()
  //             ),
  //             createdAt: cat.createdAt,
  //             updatedAt: cat.updatedAt,
  //             adsPosition: cat.position,
  //             adsDescription: cat.description,
  //             adsImage: cat.image,
  //             adsRedirectUrl: cat.redirectURL,
  //             postType:cat.postType,
  //             modCategory: cat.modCategory,
  //             beforeImages:cat.beforeImages,
  //             modName:cat.name
  //           };
  //         });
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
  addClickCount(id) {
    let filters = {
      id: id,
      domain: "desktop",
    };
    this.pageService.addClickCount(filters).subscribe(
      (response) => {
        // if (response.success) {
        //   this.favMods= response.data;
        //   // console.log(  this.modCategories, "this.allMakes");
        //   // this.spinner.hide();
        // } else {
        //   // this.spinner.hide();
        // }
      },
      (error) => {
        this.toastr.error(error);
        // this.spinner.hide();
      }
    );
  }
  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     var width = this.myIdentifier.nativeElement.offsetWidth;
  //     var height = this.myIdentifier.nativeElement.offsetHeight;
  //     console.log("sponser data Width:" + width);
  //     console.log("sponser data Height: " + height);
  //   }, 200);
  // }
}
