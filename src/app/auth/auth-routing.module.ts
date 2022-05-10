import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResendConfirmationComponent } from './resend-confirmation/resend-confirmation.component';

const routes: Routes = [	

	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{
		path: 'forgot',
		component: ForgotPasswordComponent
	},
	{
		path: 'resetpassword',
		component: ResetPasswordComponent
	},
	{
		path: 'changepassword',
		component: ChangePasswordComponent
	},
	{
		path: 'resend',
		component: ResendConfirmationComponent
	},
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
