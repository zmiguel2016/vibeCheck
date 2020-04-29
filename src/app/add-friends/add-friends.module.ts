import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddFriendsPageRoutingModule } from './add-friends-routing.module';
import { AddFriendsPage } from './add-friends.page';
import { AppComponent } from '../app.component';
const routes: Routes = [
  {
    path: '',
    component: AddFriendsPage
  },
  {
    path: ':id',
    component: AppComponent //the app component will check for the id in the database and will pull it
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFriendsPageRoutingModule
  ],
  declarations: [AddFriendsPage]
})
export class AddFriendsPageModule {}
