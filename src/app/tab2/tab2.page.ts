import { Component } from '@angular/core';
import {Router } from '@angular/router'

import { ItemService } from '../item.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
posts=[]
  constructor(private router: Router,
    public itemService: ItemService) {}


    ngOnInit(){
  
    }
    ionViewDidEnter(){
      this.loadItems();
    }
    loadItems(){
      //this.itemService.postRefresh();
      this.posts=[];
      this.posts = this.itemService.getFeed();
      console.log(this.posts)
    }
    goToPost(post){
      this.router.navigate(['/post-detail', post])
    }
    openNewPostPage(){
      this.router.navigate(["/new-post"]);
  
    }



}
