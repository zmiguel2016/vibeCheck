import { Component } from '@angular/core';
import {Router } from '@angular/router'
//import { AuthService } from './auth.service';
import { ItemService } from '../item.service';
import { AuthService } from '../auth.service';
//import { ThemeService } from '../services/theme.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
showProgress : any;
posts=[]
  constructor(private router: Router,
    public itemService: ItemService,//, private theme: ThemeService
    private _authSerivice: AuthService
    ) {}


    ngOnInit()
  {}
//     enableDark(){
//     this.theme.enableDark();
//   }

// enableLight(){
//     this.theme.enableLight();
//   }
    
    ionViewDidEnter(){
      this.loadItems();
    }
    async doRefresh(event) {
      this.showProgress = 1;
      this.reset();
      await this.loadItems();
      setTimeout(() => {
        event.target.complete();
      }, 10);
      this.showProgress = 0;
    }
    async loadItems(){
      //this.itemService.postRefresh();
      this.posts=[];
      this.posts = await this.itemService.getFeed();
      console.log(this.posts)
    }
    reset(){
      this.posts=[];
    }
    goToPost(post){
      this.router.navigate(['/post-detail', post])
    }
    openNewPostPage(){
      this.router.navigate(["/new-post"]);
  
    }



}
