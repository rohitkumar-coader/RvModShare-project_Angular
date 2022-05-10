import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dashService: DashboardService,
    private formBuilder: FormBuilder,
    private router: Router ) {}

  ngOnInit() {
    // this.dashService.sendTop();
    // this.user = JSON.parse(localStorage.getItem('credentials'));
    // if (this.user) {
    //   this.userID = this.user.id;
    //   this.fetchUser();
    // }
  }

  // fetchUser() {
  //   this.spinner.show();
  //   this.dashService.getUserDetail(this.userID).subscribe(res => {
  //     if (res.success) {
  //       this.user = res.data;
  //       this.plan = res.data.plan_id.name;
  //       this.courses = res.data.plan_id.courses.length;
  //     } else {
  //       this.toastr.error(res.message, 'Error');
  //     }
  //     this.spinner.hide();
  //   },
  //     error => {
  //       this.spinner.hide();
  //       this.toastr.error(error, 'Error');
  //     });
  // }

}
