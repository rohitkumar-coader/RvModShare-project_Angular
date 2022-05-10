import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public response: any;
  _subscriberData: any;
  isLoading: boolean = false;
  public frndForm: FormGroup;
  submitted = false;
  public userID: any;
  public user: any = {};

  constructor(
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dashService: DashboardService,
    private formBuilder: FormBuilder) { }

    ngOnInit() {
      this.dashService.sendTop();
      this.user = JSON.parse(localStorage.getItem('credentials'));
      if (this.user) {
        this.userID = this.user.id;
        this.fetchUser();
      }
    }
  
    fetchUser() {
      this.spinner.show();
      this.dashService.getUserDetail(this.userID).subscribe(res => {
        if (res.success) {
          this.user = res.data;
        } else {
          this.toastr.error(res.message, 'Error');
        }
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.toastr.error(error, 'Error');
        });
    }




}
