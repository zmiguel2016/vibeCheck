import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewpagePage } from './previewpage.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewpagePageRoutingModule {}
