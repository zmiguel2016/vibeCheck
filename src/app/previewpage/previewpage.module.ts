import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewpagePageRoutingModule } from './previewpage-routing.module';

import { PreviewpagePage } from './previewpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewpagePageRoutingModule
  ],
  declarations: [PreviewpagePage]
})
export class PreviewpagePageModule {}
