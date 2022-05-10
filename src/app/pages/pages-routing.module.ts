import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutUsComponent } from "./about-us/about-us.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { ContactComponent } from "./contact/contact.component";
import { GroupsComponent } from "./groups/groups.component";
import { GroupDetailComponent } from "./group-detail/group-detail.component";
import { MarketplaceComponent } from "./marketplace/marketplace.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { TermsOfServiceComponent } from "./terms-of-service/terms-of-service.component";
import { FaqComponent } from "./faq/faq.component";
import { CommunityGuidelinesComponent } from "./community-guidelines/community-guidelines.component";
import { MarketPlaceDetailComponent } from "./market-place-detail/market-place-detail.component";
import { SearchByCategoriesComponent } from "./search-by-categories/search-by-categories.component";
import { ChatComponent } from "./chat/chat.component";
import { ModmarketComponent } from "./modmarket/modmarket.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { ManageGroupComponent } from "./manage-group/manage-group.component";
import { FollowProfileComponent } from "./follow-profile/follow-profile.component";
import { HarmlessAgreementComponent } from "./harmless-agreement/harmless-agreement.component";
import { PointsComponent } from "./points/points.component";
import { DCMAComponent } from "./dcma/dcma.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { ModDetailsComponent } from "./mod-details/mod-details.component";
import { AuthGuard } from "../shared/auth.guard";
import { FollowCategoriesComponent } from "./follow-categories/follow-categories.component";
import { FriendsListingComponent } from "./friends-listing/friends-listing.component";
import { FriendProfileComponent } from "./friend-profile/friend-profile.component";
import { ShareModsComponent } from "./share-mods/share-mods.component";
import { ModsSharedComponent } from "./mods-shared/mods-shared.component";
import { ModTypeFollowComponent } from "./mod-type-follow/mod-type-follow.component";
import { FavouriteListingComponent } from "./favourite-listing/favourite-listing.component";
import { MyModFriendListingComponent } from "./my-mod-friend-listing/my-mod-friend-listing.component";
import { FollowFriendListComponent } from "./follow-friend-list/follow-friend-list.component";
import { GroupPostDetailComponent } from "./group-post-detail/group-post-detail.component";
import { PollPostDetailComponent } from "./poll-post-detail/poll-post-detail.component";
import { NormalPostDetailComponent } from "./normal-post-detail/normal-post-detail.component";
import { ContestComponent } from "./contest/contest.component";
import { TestContestComponent } from "./test-contest/test-contest.component";
import { NormalSearchComponent } from "./normal-search/normal-search.component";
import { DraftModsComponent } from "./draft-mods/draft-mods.component";
import { MyhomeComponent } from "./myhome/myhome.component";
import { CommunityDashboardComponent } from "./community-dashboard/community-dashboard.component";
import { RvHelpComponent } from "./rv-help/rv-help.component";
import { ErrorComponent } from "./error/error.component";
import { CustomizeFeedComponent } from "./customize-feed/customize-feed.component";
import { TalkModsComponent } from "./talk-mods/talk-mods.component";
import { ConnectionsComponent } from "./connections/connections.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { HomeNewComponent } from "./home-new/home-new.component";
import { AccountSettingComponent } from "./account-setting/account-setting.component";
import { LoaderComponent } from "./loader/loader.component";
import { MostpopularModsComponent } from "./mostpopular-mods/mostpopular-mods.component";
import { TagsModsComponent } from "./tags-mods/tags-mods.component";

const routes: Routes = [
  {
    path: "",
    // pathMatch: "full",
    component: MyhomeComponent,
  },
  {
    path: "timeline",
    pathMatch: "full",
    canActivate: [AuthGuard],
    component: TimelineComponent,
  },
  {
    path: "about-us",
    pathMatch: "full",
    component: AboutUsComponent,
  },
  {
    path: "blogs",
    pathMatch: "full",
    component: BlogsComponent,
  },

  {
    path: "contact-us",
    pathMatch: "full",
    component: ContactComponent,
  },
  {
    path: "groups",
    pathMatch: "full",
    canActivate: [AuthGuard],
    component: GroupsComponent,
  },
  {
    path: "group-details",
    canActivate: [AuthGuard],
    pathMatch: "full",
    component: GroupDetailComponent,
  },
  {
    path: "modstores",
    canActivate: [AuthGuard],
    pathMatch: "full",
    component: MarketplaceComponent,
  },
  {
    path: "privacy-policy",
    pathMatch: "full",
    component: PrivacyPolicyComponent,
  },
  {
    path: "terms-of-service",
    pathMatch: "full",
    component: TermsOfServiceComponent,
  },
  {
    path: "faq",
    pathMatch: "full",
    component: FaqComponent,
  },
  {
    path: "community-guidelines",
    pathMatch: "full",
    component: CommunityGuidelinesComponent,
  },
  {
    path: "community-dashboard",
    pathMatch: "full",
    component: CommunityDashboardComponent,
  },
  {
    path: "market-place-details",
    canActivate: [AuthGuard],
    pathMatch: "full",
    component: MarketPlaceDetailComponent,
  },
  // {
  //   path: "search-category",
  //   canActivate: [AuthGuard],
  //   component: SearchByCategoriesComponent,
  // },
  {
    path: "connections",
    canActivate: [AuthGuard],
    pathMatch: "full",
    component: ConnectionsComponent,
  },
  // {
  //   path: "connections",
  //   canActivate: [AuthGuard],
  //   component: ChatComponent,
  // },
  {
    path: "modmarket",
    canActivate: [AuthGuard],
    pathMatch: "full",
    component: ModmarketComponent,
  },
  {
    path: "welcome",
    pathMatch: "full",
    component: WelcomePageComponent,
  },
  {
    path: "help",
    pathMatch: "full",
    component: RvHelpComponent,
  },
  {
    path: "welcome/:id",
    pathMatch: "full",
    component: WelcomePageComponent,
  },
  {
    path: "tags/:slug",
    pathMatch: "full",
    component: TagsModsComponent,
  },
  // {
  //   path: "manage-group",
  //   canActivate: [AuthGuard],
  //   component: ManageGroupComponent,
  // },
  {
    path: "groups/:slug",
    canActivate: [AuthGuard],
    pathMatch: "full",
    component: ManageGroupComponent,
  },
  {
    path: "groups/:slug/:userSlug",
    canActivate: [AuthGuard],
    component: ManageGroupComponent,
  },
  {
    path: "groups/:slug/:userSlug/:requestStatus",
    canActivate: [AuthGuard],
    component: ManageGroupComponent,
  },
  {
    path: "homenew",
    component: HomeNewComponent,
  },
  {
    path: "follow",
    canActivate: [AuthGuard],
    component: FollowProfileComponent,
  },
  {
    path: "harmless-agreement",
    component: HarmlessAgreementComponent,
  },
  {
    path: "points",
    component: PointsComponent,
  },
  {
    path: "loader",
    component: LoaderComponent,
  },
  {
    path: "account-settings",
    component: AccountSettingComponent,
  },
  {
    path: "dmca",
    component: DCMAComponent,
  },
  {
    path: "getting-started",
    component: GettingStartedComponent,
  },
  {
    path: "mods/:slug",
    // canActivate: [AuthGuard],
    component: ModDetailsComponent,
  },
  {
    path: "followed-interests",
    pathMatch: "full",
    component: FollowCategoriesComponent,
  },
  {
    path: "friend-listing",
    pathMatch: "full",
    component: FriendsListingComponent,
  },
  {
    path: "profile",
    pathMatch: "full",
    component: FriendProfileComponent,
  },
  {
    path: "profile/:slug",
    pathMatch: "full",
    component: FriendProfileComponent,
  },
  {
    path: "share-mod",
    pathMatch: "full",
    component: ShareModsComponent,
  },
  {
    path: "share-mod/:slug",
    pathMatch: "full",
    component: ShareModsComponent,
  },
  {
    path: "mods/popular/:slug",
    pathMatch: "full",
    component: MostpopularModsComponent,
  },
  {
    path: "how-to-customize-your-feed",
    canActivate: [AuthGuard],
    component: CustomizeFeedComponent,
  },
  {
    path: "mod-type",
    component: ModTypeFollowComponent,
  },
  {
    path: "favorite-mods",
    pathMatch: "full",
    component: FavouriteListingComponent,
  },
  {
    path: "my-mod-frined-listing",
    component: MyModFriendListingComponent,
  },
  // {
  //   path: "group",
  //   component: GroupsComponent,
  // },
  {
    path: "mods",
    pathMatch: "full",
    component: SearchByCategoriesComponent,
  },
  {
    path: "talk-mods",
    canActivate: [AuthGuard],
    component: TalkModsComponent,
  },
  {
    path: "followed-mod-friends",
    component: FollowFriendListComponent,
  },
  // {
  //   path: "post-detail",
  //   component: PostDetailComponent,
  // },
  {
    path: "group-post-detail",
    component: GroupPostDetailComponent,
  },
  {
    path: "poll-post-detail",
    component: PollPostDetailComponent,
  },
  {
    path: "normal-post-detail",
    component: NormalPostDetailComponent,
  },
  {
    path: "contest",
    component: ContestComponent,
  },
  {
    path: "test-contest",
    component: TestContestComponent,
  },
  {
    path: "search",
    pathMatch: "full",
    component: NormalSearchComponent,
  },
  {
    path: "draft-mods",
    pathMatch: "full",
    component: DraftModsComponent,
  },
  {
    path: "error",
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
