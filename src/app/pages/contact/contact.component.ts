import { Component, OnInit } from "@angular/core";
import { PagesService } from "../pages.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Location, ViewportScroller } from "@angular/common";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  public response: any;
  _contactObservable: any;
  isLoading: boolean = false;
  public commonContactForm: FormGroup;
  submitted = false;
  public token = "";
  public userID: any;
  public user: any = {};

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private viewportScroller: ViewportScroller,
    private pageService: PagesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.contactForm();
  }

  ngOnInit() {
    this.pageService.sendTop();
  }

  contactForm() {
    this.commonContactForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      subject: ["", Validators.required],
      description: ["", Validators.required],
      myRecaptcha: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            "^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$"
          ),
        ],
      ],
      phone: [
        "",
        [
          Validators.min(1000000000),
          Validators.max(999999999999),
          Validators.pattern,
        ],
      ],
    });
  }

  get e() {
    return this.commonContactForm.controls;
  }

  onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  onScriptLoad() {
    console.log("Google reCAPTCHA loaded and is ready for use!");
  }

  onScriptError() {
    console.log("Something went long when loading the Google reCAPTCHA");
  }

  onSubmit() {
    this.submitted = true;
    if (!this.commonContactForm.invalid) {
      this.spinner.show();

      this._contactObservable = this.pageService
        .contactUs(this.commonContactForm.value)
        .subscribe(
          (res) => {
            if (res.success) {
              this.toastr.success(res.message);
              this.commonContactForm.reset();
              this.submitted = false;
            } else {
              this.toastr.error(res.error.message, "Error");
            }
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            this.toastr.error(error, "Error");
          }
        );
    }
  }

  ngOnDestroy(): void {
    if (this._contactObservable) {
      this._contactObservable.unsubscribe();
    }
  }
}
