import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'prefix',
	},
	{
		path: 'home',
		component: DashboardComponent
	},
	{
		path: 'profile',
		component: ProfileComponent
	},


];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { } 
