import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { ImageUploadModule } from "ng2-imageupload";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { PagesRoutingModule } from "./pages-routing.module";
// import { NgxCarouselModule } from 'ngx-carousel';
import { AboutUsComponent } from "./about-us/about-us.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { PagesService } from "./pages.service";
import { AuthInterceptor } from "../shared/auth-interceptor";
import { ContactComponent } from "./contact/contact.component";
import { GroupsComponent } from "./groups/groups.component";
import { MarketplaceComponent } from "./marketplace/marketplace.component";
import { GroupDetailComponent } from "./group-detail/group-detail.component";
import { CommunityGuidelinesComponent } from "./community-guidelines/community-guidelines.component";
import { FaqComponent } from "./faq/faq.component";
import { TermsOfServiceComponent } from "./terms-of-service/terms-of-service.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { Routes, RouterModule } from "@angular/router";
import { MarketPlaceDetailComponent } from "./market-place-detail/market-place-detail.component";
import { SearchByCategoriesComponent } from "./search-by-categories/search-by-categories.component";
import { ChatComponent } from "./chat/chat.component";
import { ModmarketComponent } from "./modmarket/modmarket.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { ManageGroupComponent } from "./manage-group/manage-group.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NguCarouselModule } from "@ngu/carousel";
// import { CKEditorModule } from 'ng2-ckeditor';
// import 'hammerjs';
import { SelectDropDownModule } from "ngx-select-dropdown";
import { FollowProfileComponent } from "./follow-profile/follow-profile.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { HarmlessAgreementComponent } from "./harmless-agreement/harmless-agreement.component";
import { PointsComponent } from "./points/points.component";
import { DCMAComponent } from "./dcma/dcma.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { ModDetailsComponent } from "./mod-details/mod-details.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FollowCategoriesComponent } from "./follow-categories/follow-categories.component";
import { FriendsListingComponent } from "./friends-listing/friends-listing.component";
import { FriendProfileComponent } from "./friend-profile/friend-profile.component";
import { ShareModalComponent } from "./share-modal/share-modal.component";
import { ShareModsComponent } from "./share-mods/share-mods.component";
import { FavouriteListingComponent } from "./favourite-listing/favourite-listing.component";
import { ModsSharedComponent } from "./mods-shared/mods-shared.component";
import { RecaptchaModule } from "angular-google-recaptcha";
import { ModTypeFollowComponent } from "./mod-type-follow/mod-type-follow.component";
import { RvInterestComponent } from "./rv-interest/rv-interest.component";
import { ReportSectionComponent } from "./report-section/report-section.component";
import { FollowModsListComponent } from "./follow-mods-list/follow-mods-list.component";
// import { HomeComponent } from '../theme/home/home.component';
import { MyModFriendListingComponent } from "./my-mod-friend-listing/my-mod-friend-listing.component";
import { SponsoredComponent } from "./sponsored/sponsored.component";
import { ExploreComponent } from "./explore/explore.component";
import { RightSponsoredComponent } from "./right-sponsored/right-sponsored.component";
import { FollowFriendListComponent } from "./follow-friend-list/follow-friend-list.component";
import { LikeListingModalComponent } from "./like-listing-modal/like-listing-modal.component";
import { LikedModsListingComponent } from "./liked-mods-listing/liked-mods-listing.component";
import { PostSharedWithComponent } from "./post-shared-with/post-shared-with.component";
// import { PostDetailComponent } from "./post-detail/post-detail.component";
import { NormalPostDetailComponent } from "./normal-post-detail/normal-post-detail.component";
import { GroupPostDetailComponent } from "./group-post-detail/group-post-detail.component";
import { PollPostDetailComponent } from "./poll-post-detail/poll-post-detail.component";
import { EditSocialPostComponent } from "./edit-social-post/edit-social-post.component";
import { ContestComponent } from "./contest/contest.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { EditGroupPostComponent } from "./edit-group-post/edit-group-post.component";
import { SharedModule } from "../shared/shared/shared.module";
import { TestContestComponent } from "./test-contest/test-contest.component";
import { NormalSearchComponent } from "./normal-search/normal-search.component";
import { DraftModsComponent } from "./draft-mods/draft-mods.component";
import { MyhomeComponent } from "./myhome/myhome.component";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { CommunityDashboardComponent } from "./community-dashboard/community-dashboard.component";
import { RvHelpComponent } from "./rv-help/rv-help.component";
import { ErrorComponent } from "./error/error.component";
import { CustomizeFeedComponent } from "./customize-feed/customize-feed.component";
import { TalkModsComponent } from "./talk-mods/talk-mods.component";
import { AdsenseModule } from "ng2-adsense";
import { ConnectionsComponent } from "./connections/connections.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { PopularModsComponent } from "./popular-mods/popular-mods.component";
import { HomeNewComponent } from "./home-new/home-new.component";
import { AccountSettingComponent } from "./account-setting/account-setting.component";
import { LoaderComponent } from "./loader/loader.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MostpopularModsComponent } from "./mostpopular-mods/mostpopular-mods.component";
import { TagsModsComponent } from "./tags-mods/tags-mods.component";
import { NgxPaginationModule } from "ngx-pagination";
// import { AutocompleteLibModule } from "angular-ng-autocomplete";
// import { NgxStickySidebarModule } from '@smip/ngx-sticky-sidebar';

@NgModule({
  declarations: [
    AboutUsComponent,
    MyModFriendListingComponent,
    BlogsComponent,
    ContactComponent,
    GroupsComponent,
    MarketplaceComponent,
    LoaderComponent,
    GroupDetailComponent,
    CommunityGuidelinesComponent,
    FaqComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    MarketPlaceDetailComponent,
    SearchByCategoriesComponent,
    ChatComponent,
    ModmarketComponent,
    WelcomePageComponent,
    ManageGroupComponent,
    SidebarComponent,
    FollowProfileComponent,
    HarmlessAgreementComponent,
    PointsComponent,
    DCMAComponent,
    GettingStartedComponent,
    ModDetailsComponent,
    FollowCategoriesComponent,
    FriendsListingComponent,
    FriendProfileComponent,
    ShareModalComponent,
    ShareModsComponent,
    FavouriteListingComponent,
    ModsSharedComponent,
    ModTypeFollowComponent,
    RvInterestComponent,
    ReportSectionComponent,
    FollowModsListComponent,
    SponsoredComponent,
    ExploreComponent,
    RightSponsoredComponent,
    FollowFriendListComponent,
    LikeListingModalComponent,
    LikedModsListingComponent,
    PostSharedWithComponent,
    // PostDetailComponent,
    NormalPostDetailComponent,
    GroupPostDetailComponent,
    PollPostDetailComponent,
    EditSocialPostComponent,
    ContestComponent,
    EditGroupPostComponent,
    TestContestComponent,
    NormalSearchComponent,
    DraftModsComponent,
    MyhomeComponent,
    ComingSoonComponent,
    CommunityDashboardComponent,
    RvHelpComponent,
    ErrorComponent,
    CustomizeFeedComponent,
    TalkModsComponent,
    ConnectionsComponent,
    TimelineComponent,
    PopularModsComponent,
    HomeNewComponent,
    AccountSettingComponent,
    MostpopularModsComponent,
    TagsModsComponent,
  ],
  imports: [
    PickerModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    CommonModule,
    PagesRoutingModule,
    NgxSpinnerModule,
    ImageUploadModule,
    NgxDatatableModule,
    EmojiModule,
    SharedModule,
    InfiniteScrollModule,
    NguCarouselModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    SlickCarouselModule,
    NgxPaginationModule,
    // CKEditorModule,
    // AutocompleteLibModule,
    NgxDaterangepickerMd.forRoot(),
    BsDatepickerModule.forRoot(),
    // NgMultiSelectDropDownModule.forRoot(),
    RecaptchaModule.forRoot({
      siteKey: "6LcjPlIeAAAAAEneXQDJasmyBcxWIHPgCvxT-gmK",
    }),
    AngularEditorModule,
    AdsenseModule.forRoot({
      adClient: "ca-pub-7911750406935657",
      adSlot: 9631333463,
    }),
    // NgxStickySidebarModule
  ],
  entryComponents: [
    ShareModalComponent,
    ReportSectionComponent,
    RvInterestComponent,
    LikeListingModalComponent,
    PostSharedWithComponent,
    EditSocialPostComponent,
    EditGroupPostComponent,
    SponsoredComponent,
    RightSponsoredComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    PagesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [SponsoredComponent, RightSponsoredComponent],
})
export class PagesModule {}
