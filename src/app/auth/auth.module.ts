import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { MyAuthService } from "./auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { RecaptchaModule } from "angular-google-recaptcha";
import { ResendConfirmationComponent } from "./resend-confirmation/resend-confirmation.component";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ResendConfirmationComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxIntlTelInputModule,
    NgbModule,
    RecaptchaModule.forRoot({
      siteKey: "6LcjPlIeAAAAAEneXQDJasmyBcxWIHPgCvxT-gmK",
    }),
  ],
  providers: [MyAuthService],
})
export class AuthModule {}
