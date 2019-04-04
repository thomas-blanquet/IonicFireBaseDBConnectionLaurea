import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'music-detail', loadChildren: './music-detail/music-detail.module#MusicDetailPageModule' },
  { path: 'music-detail/:id', loadChildren: './music-detail/music-detail.module#MusicDetailPageModule' },
  { path: 'music-lyrics', loadChildren: './music-lyrics/music-lyrics.module#MusicLyricsPageModule' },
  { path: 'music-lyrics/:id', loadChildren: './music-lyrics/music-lyrics.module#MusicLyricsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
