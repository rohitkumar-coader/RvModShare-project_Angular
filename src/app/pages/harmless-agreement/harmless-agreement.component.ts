import { Component, OnInit } from "@angular/core";
import { PagesService } from "../pages.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
@Component({
  selector: "app-harmless-agreement",
  templateUrl: "./harmless-agreement.component.html",
  styleUrls: ["./harmless-agreement.component.scss"],
})
export class HarmlessAgreementComponent implements OnInit {
  public response: any;
  _contactObservable: any;
  isLoading: boolean = false;
  public commonContactForm: FormGroup;
  submitted = false;
  public token = "";
  public userID: any;
  public user: any = {};
  data: any;
  pageContent: any;
  id: any;

  constructor(
    private location: Location,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private pageService: PagesService,
    private formBuilder: FormBuilder,
    private _activateRouter: ActivatedRoute,
    private router: Router
  ) {
    // this.contactForm();
  }

  ngOnInit() {
    this._activateRouter.queryParams.subscribe((params) => {
      console.log(params, "params");
      this.pageContent = params.pageContent;
      this.id = params.id;
    });
    this.pageService.sendTop();
    this.getData();
  }
  back() {
    let url = "/welcome/" + this.id;
    this.router.navigate([url], {
      queryParams: { pageContent: this.pageContent },
    });
    // this.location.back(); // <-- go back to previous location on cancel
  }
  // contactForm() {
  //   this.commonContactForm = this.formBuilder.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     subject: ['', Validators.required],
  //     description: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     phone: ['', [Validators.min(1000000000), Validators.max(999999999999), Validators.pattern]],
  //   });
  // }

  // get e() { return this.commonContactForm.controls; }

  // onSubmit() {
  //   this.submitted = true;
  //   if (!this.commonContactForm.invalid) {
  //     this.spinner.show();

  //     this._contactObservable = this.pageService.contactUs(this.commonContactForm.value).subscribe(res => {
  //       if (res.success) {
  //         // this.toastr.success(res.data.message);
  //         this.commonContactForm.reset();
  //         this.submitted = false;
  //       } else {
  //         this.toastr.error(res.error.message, 'Error');
  //       }
  //       this.spinner.hide();
  //     },
  //       error => {
  //         this.spinner.hide();
  //         this.toastr.error(error, 'Error');
  //       });
  //   }
  // }

  getData() {
    this.spinner.show();
    let filters = {
      slug: "harmless-agreement",
    };
    this._contactObservable = this.pageService
      .getAll("page", filters)
      .subscribe(
        (response) => {
          if (response.success) {
            this.data = response.data;
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  ngOnDestroy(): void {
    if (this._contactObservable) {
      this._contactObservable.unsubscribe();
    }
  }
}
