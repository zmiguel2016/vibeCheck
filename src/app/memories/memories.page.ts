import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.page.html',
  styleUrls: ['./memories.page.scss'],
})
export class MemoriesPage implements OnInit {

  ngOnInit() {
  }
  showProgress : any;
  images = [];
  constructor(public itemService: ItemService, public afstore: AngularFirestore, public user: AuthService) {}

  ionViewDidEnter(){
    this.reset();
    this.loadImages();
  }
  async doRefresh(event) {
    this.showProgress = 1;
    this.reset();
    await this.loadImages();
    setTimeout(() => {
      event.target.complete();
    }, 10);
    this.showProgress = 0;
  }
  loadImages(){
    this.images=[];
    this.images = this.itemService.getImages();
    console.log(this.images)
  }
  reset(){
    this.images=[];
  }  
}
