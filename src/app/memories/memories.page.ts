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
    //this.loadImages();
    //this.loadProfilePic();
  }

  /*async doRefresh(event) {
    this.showProgress = 1;
    this.reset();
    await this.loadImages();
    setTimeout(() => {
      event.target.complete();
    }, 10);
    this.showProgress = 0;
  }*/

  async loadPage(){
    this.username = this.getUserProfile();
    let store = this.afstore.collection('post');
    let Items =  await store.get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(this.username == (doc.data().username)){
        this.post.push(doc.data());
        }
      });
    })
    console.log(this.post);
    return this.post;
  }

  getUserProfile(){
    this.route.params.subscribe(
      param => {
        this.currentFriend = param;
        this.username = this.currentFriend.email;
      }
    )
      return this.username;
  }

  /*loadImages(){
    this.images=[];
    this.images = this.itemService.getImages();
    console.log(this.images)
  }*/
  
  /*async loadProfilePic(){
    let a = this.afstore.collection(`users`).doc(this.user.getUID())
    let b = await a.get()
    .toPromise()
    .then(doc =>{
      //console.log(doc.data());
      this.profilePic = doc.data().image;
      //console.log("img:" ,this.image)
    })
  
    return this.profilePic;
  }*/
  
  reset(){
    this.post=[];
  }  
}
