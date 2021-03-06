import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService} from './auth.service'

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
    
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'new-post',
    loadChildren: () => import('./new-post/new-post.module').then( m => m.NewPostPageModule)
  },
  {
    path: 'post-detail',
    loadChildren: () => import('./post-detail/post-detail.module').then( m => m.PostDetailPageModule)
  },
  {
    path: 'add-friends',
    loadChildren: () => import('./add-friends/add-friends.module').then( m => m.AddFriendsPageModule)
  },
  {
    path: 'previewpage',
    loadChildren: () => import('./previewpage/previewpage.module').then( m => m.PreviewpagePageModule)
  },
  {
    path: 'memories',
    loadChildren: () => import('./memories/memories.module').then( m => m.MemoriesPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'update-email',
    loadChildren: () => import('./update-email/update-email.module').then( m => m.UpdateEmailPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'update-info',
    loadChildren: () => import('./update-info/update-info.module').then( m => m.UpdateInfoPageModule)
  },
  {
    path: 'image-detail',
    loadChildren: () => import('./image-detail/image-detail.module').then( m => m.ImageDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
