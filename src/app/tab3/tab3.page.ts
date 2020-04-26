import { Component } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  showProgress : any;
  images = [];
  constructor(public itemService: ItemService) {}

  ionViewDidEnter(){
    console.log("loading...")
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
    //this.itemService.postRefresh();
    console.log("loading...222")
    this.images=[];
    this.images = this.itemService.getImages();
    console.log(this.images)
  }
  reset(){
    this.images=[];
  }  
}
