import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { MyAuthService } from "../auth/auth.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CredentialsService } from "../auth/credentials.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    private toastr: ToastrService,
    private credential: CredentialsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        if (err.error.code === 401) {
          // this.toastr.error('Session Expired');
          localStorage.clear();
          this.credential.logout();
          this.router.navigateByUrl("/");
        }
        if (err.url.indexOf("/group?id") >= 0 && err.status === 404) {
          this.router.navigateByUrl("/group");
        }
        // const error = err.error.message || err.error.code;
        return throwError(err.error);
      })
    );
  }
}
