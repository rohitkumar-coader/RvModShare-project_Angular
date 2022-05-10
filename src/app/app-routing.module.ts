import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// Layouts
import { ThemeModule } from './theme/theme.module';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: './theme/theme.module#ThemeModule',
    // loadChildren:() =>  import('./theme/theme.module').then(m => m.ThemeModule)
  },
  { path: '**', pathMatch: 'full', 
  loadChildren: './theme/theme.module#ThemeModule', 
  // loadChildren:() =>  import('./theme/theme.module').then(m => m.ThemeModule)

},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule,HttpClientModule ]
})
export class AppRoutingModule { }
