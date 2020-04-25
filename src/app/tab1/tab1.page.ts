import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
//import { NavController } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  friends = []
  showProgress : any;




  constructor(private router: Router, public itemService: ItemService
   
    ) {}
  

  ngOnInit() {
  
   }

   ionViewDidEnter(){
     this.loadFriends();
   }
   async doRefresh(event) {
    this.showProgress = 1;
    this.reset();
    await this.loadFriends();
    setTimeout(() => {
      event.target.complete();
    }, 10);
    this.showProgress = 0;
  }
  reset(){
    this.friends=[];
  }

  loadFriends(){
    //this.itemService.postRefresh();
    this.friends=[];
    this.friends = this.itemService.pullFriends();

    console.log(this.friends)
  }

  addFriend(){
    this.router.navigate(["/add-friends"])
  }
  // go(){
  //   console.log("add friends button is clicked")
  //   //this.router.navigate(['add-friends']);
  //   }
}
