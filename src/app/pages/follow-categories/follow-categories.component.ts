import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { CredentialsService } from "src/app/auth/credentials.service";
import { PagesService } from "../pages.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { RvInterestComponent } from "../rv-interest/rv-interest.component";
import { SharedService } from "src/app/shared/shared.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { BehaviorService } from "src/app/shared/behavior.service";
import { isPlatformBrowser } from "@angular/common";
@Component({
  selector: "app-follow-categories",
  templateUrl: "./follow-categories.component.html",
  styleUrls: ["./follow-categories.component.scss"],
})
export class FollowCategoriesComponent implements OnInit {
  followedCategories: any = [];
  closeResult = "";
  modalRef: any;
  constructor(
    public credentials: CredentialsService,
    private spinner: NgxSpinnerService,
    private pageService: PagesService,
    private modalService: NgbModal,
    public sharedService: SharedService,
    private toastr: ToastrService,
    private router: Router,
    public _bs: BehaviorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this._bs.reloadFollowCategory.subscribe((res: any) => {
      if (res == true) {
        this.getFollowedCategories();
      }
    });
  }

  ngOnInit() {
    // if (isPlatformBrowser(this.platformId)) {
    //   let tab1 = document.getElementById("pills-See-tab");
    //   let tab2 = document.getElementById("tab2");
    //   let tab3 = document.getElementById("pills-Talk-tab");
    //   tab1.classList.remove("active");
    //   tab2.classList.remove("active");
    //   tab3.classList.remove("active");
    // }

    this.getFollowedCategories();
  }
  open() {
    this.router.navigateByUrl("/followed-interests?followModal=true");
    this.modalRef = this.modalService.open(RvInterestComponent);
    this.modalRef.componentInstance.name = "World";

    this.modalRef.componentInstance.followModal = true;
    // this.modalRef.result.then((result) => {
    // }, (reason) => {
    // });
  }

  getFollowedCategories() {
    this.sharedService.get("user/categoryfollow").subscribe(
      (res: any) => {
        if (res.success) {
          this.followedCategories = res.data;
          // console.log(  this.modCategories, "this.allMakes");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        console.log(error);
      }
    );
    // this.spinner.show();
    // let filters = {
    //   type: 'modpost',
    //   userid: this.credentials.credentials.id
    // };
    // this.pageService.getFollowedCategories(filters).subscribe(
    //   (response) => {
    //     if (response.success) {
    //       this.followedCategories = response.data;
    //       // console.log(this.allMakes, "this.allMakes");
    //       // this.spinner.hide();
    //     } else {
    //       // this.spinner.hide();
    //     }
    //   },
    //   (error) => {
    //     // this.spinner.hide();
    //   }
    // );
  }

  removeIntrest(id) {
    let object = {
      id: id,
    };
    this.pageService.removeInterest(object).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message, "Success");
          this.getFollowedCategories();
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
    // this.removeElement(this.interestArray,i);
  }

  route(value) {
    this.router.navigate(["mod-type"], { queryParams: { id: value } });
  }
}
