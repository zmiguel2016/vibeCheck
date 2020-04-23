import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../friends.service';
//import { NavController } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  friends = [{"name":"helloWorld", "gmail":"helloworld@gmail.com"}]




  constructor(private router: Router, 
    //public friendsService: FriendsService
    ) {}
  

  // ngOnInit() {
  //   this.friends = this.friendsService.getFriends();
  // }


  // go(){
  //   console.log("add friends button is clicked")
  //   //this.router.navigate(['add-friends']);
  //   }
}
