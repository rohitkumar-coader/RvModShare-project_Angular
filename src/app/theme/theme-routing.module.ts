import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthModule } from "../auth/auth.module";
import { PagesModule } from "../pages/pages.module";
import { LayoutComponent } from "./layout/layout.component";
import { AuthGuard } from "../shared/auth.guard";
import { AlphaTestComponent } from "./alpha-test/alpha-test.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      // {
      //   path: "",
      //   redirectTo: "/home",
      //   // redirectTo: 'auth/login',
      //   pathMatch: "full",
      // },
      // {
      // 	path: 'home',
      // 	// loadChildren: '../home/home.module#HomeModule'
      // 	loadChildren: () => HomeModule,
      // },
      {
        path: "auth",
        loadChildren: "../auth/auth.module#AuthModule",
        // loadChildren: () => AuthModule,
      },
      {
        path: "dashboard",
        canActivate: [AuthGuard],
        loadChildren: "../dashboard/dashboard.module#DashboardModule",
        // loadChildren: () => DashboardModule,
      },
      {
        path: "",
        // canActivate: [AuthGuard],
        loadChildren: "../pages/pages.module#PagesModule",
        // loadChildren: () => PagesModule,
      },

      // {
      //   path: "home",
      //   // loadChildren: '../pages/pages.module#PagesModule'
      //   component: HomeComponent,
      // },
      {
        // path: "alpha",
        path: "beta",
        // loadChildren: '../pages/pages.module#PagesModule'
        component: AlphaTestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
