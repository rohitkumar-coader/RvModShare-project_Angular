import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmMatch } from 'src/app/shared/confirm-match.validator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyAuthService } from '../auth.service';
import { Router } from '@angular/router';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPassForm: FormGroup;
  submitted = false;
  newPassTextType: boolean;
  cnfmPassTextType: boolean;
  
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner:NgxSpinnerService,
    private authService:MyAuthService,
    private router: Router  ) {
    this.createForm(); 
  }

  createForm(){
    this.resetPassForm = this.formBuilder.group({
      code: ['', Validators.required],
      newPassword: ['', [Validators.required,Validators.minLength(8),
            Validators.pattern(
              "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
            ),]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: ConfirmMatch('newPassword', 'confirmPassword')
  } 
    );
   }
   
   get f() { return this.resetPassForm.controls; }

  ngOnInit(): void {
    // this.authService.sendTop();
  }

  toggleNewPassword() {
    this.newPassTextType = !this.newPassTextType;
  }

  toggleCnfmPassword() {
    this.cnfmPassTextType = !this.cnfmPassTextType;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.resetPassForm.invalid){

      this.spinner.show();
      this.authService.resetPassword(this.resetPassForm.value).subscribe(res=>{
        if(res.success){
          this.toastr.success(res.message);
          this.resetPassForm.reset();
          this.submitted = false;
          this.router.navigate(['/auth/login']);
        }else{
          this.toastr.error(res.error.message);
        }
        this.spinner.hide();
      },
      error=>{
        this.toastr.error(error);
        this.spinner.hide();
      });
    }
  }



}
