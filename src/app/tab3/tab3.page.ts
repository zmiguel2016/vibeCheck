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
  private post:Array<any>=[];
  private posts: Array<any>=[];
  images = [];
  profilePic : String;
  constructor(public itemService: ItemService, private router: Router,public afstore: AngularFirestore, public user: AuthService) {}
  ngOnInit(){
  }
  ionViewDidEnter(){
    this.reset();
    this.loadImages();
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
  
  async loadProfilePic(){
    let a = this.afstore.collection(`users`).doc(this.user.getUID())
    let b = await a.get()
    .toPromise()
    .then(doc =>{
      this.profilePic = doc.data().image;
    })
  
    return this.profilePic;
  }
  
  async loadImages(){
    this.images=[];
    this.images = await this.itemService.getImages();
    console.log(this.images)
  }
 

  reset(){
    this.images=[];
  }  
  goToSettings(){
    this.router.navigate(["/settings"])
  }

  goToImage(image){
    this.router.navigate(["/image-detail",image])
  }

  goToFriends(){
    this.router.navigate(["/tabs/tab1"])
  }
}
