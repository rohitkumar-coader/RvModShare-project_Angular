
import { BrowserModule, Meta } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./shared/error.interceptor";
import { AuthInterceptor } from "./shared/auth-interceptor";
import { BehaviorService } from "./shared/behavior.service";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Routes, RouterModule } from "@angular/router";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { NgbCarouselConfig, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Injector } from "@angular/core";
export let AppInjector: Injector;

// import { UserIdleModule } from "angular-user-idle";
// import { AutocompleteLibModule } from "angular-ng-autocomplete";

// import social buttons module
// import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
// const URL = "http://74.208.206.18:4477/";

// import { NgxSocialLoginModule } from 'ngx-social-login';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";
import { environment } from "src/environments/environment";
const URL = environment.chat_url;
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { SharedModule } from "./shared/shared/shared.module";
const config: SocketIoConfig = { url: URL, options: { autoConnect: false } };
// const config: SocketIoConfig = { url: URL, options: {} };
import { EditorModule, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
export const ModulesExport= [
 
  InfiniteScrollModule
];
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("995503910998783"), //2101120293268453,//793873490969728
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        "414860313522-97eu09cv110u046n90g8rrk1k3k8iv1o.apps.googleusercontent.com"
      ), // 1074921213731-uijl2k11ja71bn50d72395dl79vlocbe.apps.googleusercontent.com
    },
  ]);
  return config;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    InfiniteScrollModule,
    //   NgxSocialLoginModule.init(
    //     {
    //         google: {
    //             client_id: '349656393094-pklok3d8e6lafqd1kpumthe90dqrcu5a.apps.googleusercontent.com',
    //             // client_id: '786300942943-gv8ldg7j6eshrg7hultn2ak1tkbrkc6p.apps.googleusercontent.com',
    //             // cookie_policy: 'single_host_origin',
    //             scope: 'https://www.googleapis.com/auth/contacts'
    //         },
    //         facebook: {
    //             initOptions: {
    //                 appId: '995503910998783',
    //                 cookie:true,
    //                 xfbml:true,
    //                 version:'v12.0'
    //                 // appId: '2743548609249532'
    //             }
    //         }
    //     }
    // ),

    SocialLoginModule,
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    RouterModule,
    // AutocompleteLibModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      maxOpened: 1,
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    // SharedModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot({
      url: URL,
      options: { transports: ["websocket"], upgrade: false },
    }),
    // UserIdleModule.forRoot({ idle: 60, timeout: 1 }),
    // /SocketIoModule.forRoot(config),
    JwtModule.forRoot({
      config: {
        // ...
        // tokenGetter: () => {
        //   return localStorage.getItem("access_token");
        // },
        tokenGetter: jwtTokenGetter,
      },
    }),
    EditorModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },

    BehaviorService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Meta,
    NgbCarouselConfig,
    FormBuilder,
    { provide: TINYMCE_SCRIPT_SRC, useValue: "tinymce/tinymce.min.js" },
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
export function jwtTokenGetter() {
  return localStorage.getItem("access_token");
}
