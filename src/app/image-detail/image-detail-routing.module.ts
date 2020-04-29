import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageDetailPage } from './image-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ImageDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageDetailPageRoutingModule {}
