import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyAuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotForm: FormGroup;
  submitted = false;
  _authSubscription: any;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: MyAuthService,
    private router: Router,
    private toastr: ToastrService  ) {
    this.createForm();
  }

  createForm() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      // role: ['user']
    });
  }

  get f() { return this.forgotForm.controls; }

  ngOnInit(): void {
    // this.authService.sendTop();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.forgotForm.invalid) {
      let data = {
        email: this.forgotForm.controls.email.value,
        // roles: ["user", ]
        }
      this.spinner.show();
      this._authSubscription = this.authService.sendEmail(data).subscribe(res => {
        if (res.code == 200) {
          this.forgotForm.reset();
          this.submitted=false;
          this.toastr.success('Code sent successfully to your email!');
          this.router.navigate(['/auth/resetpassword']);
        } else {
          this.toastr.error(res.error.message);
        }
        this.spinner.hide();
      },
        error => {
          this.toastr.error(error);
          this.spinner.hide();
         
        }
      );

    }
  }


}
