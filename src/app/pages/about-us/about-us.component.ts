import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {NgbCarousel,NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  public response: any;
  _contactObservable: any;
  isLoading: boolean = false;
  public commonContactForm: FormGroup;
  submitted = false;
  public token = '';
  public userID: any;
  public user: any = {};
  data:any;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private pageService: PagesService,
    private formBuilder: FormBuilder,
    private config: NgbCarouselConfig,
    private router: Router) {
    this.contactForm();
    this.config.interval = 910000;
    this.config.wrap = false;
    this.config.keyboard = false;
  }

  ngOnInit() {
    this.pageService.sendTop();
    this.getData()
  }

  contactForm() {
    this.commonContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.min(1000000000), Validators.max(999999999999), Validators.pattern]],
    });
  }

  get e() { return this.commonContactForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (!this.commonContactForm.invalid) {
      this.spinner.show();

      this._contactObservable = this.pageService.contactUs(this.commonContactForm.value).subscribe(res => {
        if (res.success) {
          // this.toastr.success(res.data.message);
          this.commonContactForm.reset();
          this.submitted = false;
        } else {
          this.toastr.error(res.error.message, 'Error');
        }
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.toastr.error(error, 'Error');
        });
    }
  }

 

  getData() {
		this.spinner.show();
    let filters = {
      slug: 'about-us'
    }
		this._contactObservable = this.pageService.getAll('page', filters).subscribe((response) => {
		  if (response.success) {
			this.data = response.data;
			this.spinner.hide();
		  } else {
			this.spinner.hide();
		  }
		}, error=> {
		  this.spinner.hide();
		});
	}

  ngOnDestroy(): void {
    if (this._contactObservable) {
      this._contactObservable.unsubscribe();
    }
  }

}
