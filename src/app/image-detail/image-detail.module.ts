import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageDetailPageRoutingModule } from './image-detail-routing.module';

import { ImageDetailPage } from './image-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ImageDetailPageRoutingModule
  ],
  declarations: [ImageDetailPage]
})
export class ImageDetailPageModule {}
