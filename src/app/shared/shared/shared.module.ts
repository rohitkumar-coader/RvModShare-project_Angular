import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MagnifyImageComponent } from "./magnify-image/magnify-image.component";
import { ModsComponent } from "./mods/mods.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { AdsenseModule } from "ng2-adsense";
import { FollowingModalComponent } from "./following-modal/following-modal.component";
import { FollowerModalComponent } from "./follower-modal/follower-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxPaginationModule } from "ngx-pagination";
import { OnlyAlphabetsDirective } from "../directives/only-alphabets.directive";

@NgModule({
  declarations: [
    MagnifyImageComponent,
    ModsComponent,
    FollowingModalComponent,
    FollowerModalComponent,
    OnlyAlphabetsDirective,
  ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    FormsModule,
    AdsenseModule.forRoot({
      adClient: "ca-pub-7911750406935657",
      adSlot: 9631333463,
    }),
  ],
  exports: [ModsComponent, OnlyAlphabetsDirective],
  entryComponents: [
    MagnifyImageComponent,
    ModsComponent,
    FollowerModalComponent,
    FollowingModalComponent,
  ],
})
export class SharedModule {}
