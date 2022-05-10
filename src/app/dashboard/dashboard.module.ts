import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImageUploadModule } from "ng2-imageupload";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProfileComponent } from "./profile/profile.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DashboardService } from "./dashboard.service";
import { AuthInterceptor } from "../shared/auth-interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { SharedModule } from "../shared/shared/shared.module";
import { ClipboardModule } from "ngx-clipboard";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { PagesModule } from "../pages/pages.module";


@NgModule({
  declarations: [DashboardComponent, ProfileComponent, SidebarComponent ],
  imports: [
    CommonModule,
    NgbModule,
    DashboardRoutingModule,
    NgxSpinnerModule,
    ImageUploadModule,
    NgxDatatableModule,
    FormsModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    // ClipboardModule,
    NgxDaterangepickerMd.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectDropDownModule,
    SlickCarouselModule,
    SharedModule,
    AngularEditorModule,
    PagesModule
  ],
  providers: [
    DashboardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class DashboardModule {}
