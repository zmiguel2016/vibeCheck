import { Component } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  showProgress : any;
  images = [];
  profilePic : String;
  constructor(public itemService: ItemService, private router: Router,public afstore: AngularFirestore, public user: AuthService) {}

  ionViewDidEnter(){
    this.reset();
    this.loadImages();
    //this.loadProfilePic();
    this.loadProfilePic();
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

  goToFeed(){
    this.router.navigate(["/tabs/tab2"])
  }
  /*loadProfilePic(){
    this.profilePic="";
    this.profilePic = this.itemService.getProfilePic();
    console.log("this.profile", this.profilePic)
  }*/
  async loadProfilePic(){
    let a = this.afstore.collection(`users`).doc(this.user.getUID())
    let b = await a.get()
    .toPromise()
    .then(doc =>{
      //console.log(doc.data());
      this.profilePic = doc.data().image;
      //console.log("img:" ,this.image)
    })
  
    return this.profilePic;
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
