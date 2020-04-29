import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.page.html',
  styleUrls: ['./memories.page.scss'],
})
export class MemoriesPage {

  currentFriend : any;
  showProgress : any;
  images = [];
  post = [];
  username :any;
  profilePic : String;

  constructor(public itemService: ItemService, public afstore: AngularFirestore, public user: AuthService, private route: ActivatedRoute, private router: Router) {}

  ionViewDidEnter() {
    this.reset();
    this.loadPage();
  }

  async loadPage(){
    this.username = this.getUserProfile();
    let store = this.afstore.collection('post');
    let Items =  await store.get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(this.username == (doc.data().uid)){
        this.post.push(doc.data());
        }
      });
    })
    return this.post;
  }

  getUserProfile(){
    this.route.params.subscribe(
      param => {
        this.currentFriend = param;
        this.username = this.currentFriend.uid;
      }
    )
      return this.username;
  }

  
  reset(){
    this.post=[];
  }  
}
