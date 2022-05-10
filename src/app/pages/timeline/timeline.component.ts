import { HttpEvent, HttpEventType } from "@angular/common/http";
import { elementEventFullName } from "@angular/compiler/src/view_compiler/view_compiler";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MyAuthService } from "src/app/auth/auth.service";
import { CredentialsService } from "src/app/auth/credentials.service";
import { ChatService } from "src/app/chat.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { SharedService } from "src/app/shared/shared.service";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";
import { AppInjector } from "../../app.module";
import { isPlatformBrowser } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditSocialPostComponent } from "../edit-social-post/edit-social-post.component";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"],
})
export class TimelineComponent implements OnInit {
  suggestedFriendInterval: any;
  searchKeyword: any = "";
  _host = environment.url;
  suggestedRVfriends: any;
  slug: string;
  DefaultPost: any;
  slideConfig: any;
  timelineModscount: any;
  @ViewChild("myIdentifier", { static: false })
  myIdentifier: ElementRef;
  constructor(
    // private chatService: ChatService,
    private _sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: MyAuthService,
    private _bs: BehaviorService,
    private router: Router,
    public credentials: CredentialsService,
    private pageService: PagesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.getDeafultPinnedPost();
    // if (isPlatformBrowser(this.platformId)) {
    //  let tab1 = document.getElementById("pills-See-tab");
    //  tab1.classList.remove("active");
    // }
  }
  showAllMods(value: number) {
    console.log(value, "count of mod in timeline");
    if (value) {
      this.timelineModscount = value;
    } else {
      this.timelineModscount = 0;
    }
  }
  breakpoint(e) {
    console.log("breakpoint");
  }

  getDeafultPinnedPost() {
    this.pageService.getDefaultPost("618b9383713c825d5505b1f2").subscribe(
      (response) => {
        if (response.success) {
          this.DefaultPost = response.data;

          // this.spinner.hide();
        } else {
          this.DefaultPost = {};
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }
  // ngAfterViewInit() {
  //   var width = this.myIdentifier.nativeElement.offsetWidth;
  //   var height = this.myIdentifier.nativeElement.offsetHeight;

  //   console.log("Width:" + width);
  //   console.log("Height: " + height);
  // }
}
