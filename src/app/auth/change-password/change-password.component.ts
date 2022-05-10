import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmMatch } from 'src/app/shared/confirm-match.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MyAuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/auth/credentials.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePassForm: FormGroup;
  submitted = false;
  oldPassTextType: boolean;
  newPassTextType: boolean;
  cnfmPassTextType: boolean;
  _changePassSubscription: any;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private authService: MyAuthService,
    public credentialsService: CredentialsService,
    private router: Router
  ) { this.createForm(); }

  createForm() {
    this.changePassForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: ConfirmMatch('newPassword', 'confirmPassword')
      }
    );
  }

  get f() { return this.changePassForm.controls; }

  ngOnInit(): void {
  }

  toggleOldPassword() {
    this.oldPassTextType = !this.oldPassTextType;
  }

  toggleNewPassword() {
    this.newPassTextType = !this.newPassTextType;
  }

  toggleCnfmPassword() {
    this.cnfmPassTextType = !this.cnfmPassTextType;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.changePassForm.invalid) {
      this.spinner.show();
      this._changePassSubscription = this.authService.changePass(this.changePassForm.value).subscribe(res => {
          if (res.code == 200) {
          this.toastr.success(res.message);
          this.logout();
        } else {
          this.toastr.error(res.error.message, 'Error');
        }
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.toastr.error(error, 'Error');
        }
      )
    }

  }

  logout() {
    this.credentialsService.logout().subscribe(res => {
      this.router.navigate(['/auth/login']);
    });
  }

  ngOnDestroy(): void {
    if (this._changePassSubscription) {
      this._changePassSubscription.unsubscribe();
    }
  }
}
