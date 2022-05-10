import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ThemeRoutingModule } from "./theme-routing.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LayoutComponent } from "./layout/layout.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { AlphaTestComponent } from "./alpha-test/alpha-test.component";
import { ThankyouPageComponent } from "./thankyou-page/thankyou-page.component";

// import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    SlickCarouselModule,
    // ClipboardModule,
    // TooltipModule
  ],
  entryComponents: [ThankyouPageComponent],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent,
    AlphaTestComponent,
    ThankyouPageComponent,
  ],
})
export class ThemeModule {}
