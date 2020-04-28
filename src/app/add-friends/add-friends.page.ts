import { Component, OnInit } from '@angular/core';
import { firestore } from 'firebase/app';
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
//import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { ItemService } from '../item.service';
import { Friend, FriendsService } from '../friends.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.page.html',
  styleUrls: ['./add-friends.page.scss'],
})
export class AddFriendsPage implements OnInit {
  //tab1:Component;
  friend: Friend = {
    email: 'helloworld@gmail.com',
  }
friendId = null;

  constructor(private friendsService: FriendsService, private route: ActivatedRoute, 
    private loadingController: LoadingController, private navCtrl: NavController ){
     // this.tab1 = this.tab1
  }
  ngOnInit(){
    this.friendId = this.route.snapshot.params['id'];
    if (this.friendId) {
      this.loadFriend();
    }

  }
async loadFriend() {
const loading = await this.loadingController.create({
  message: 'loading friends..'

});
await loading.present();

this.friendsService.getFriend(this.friendId).subscribe(res => {
  loading.dismiss();
  this.friend = res;
});
}

// async saveFriend(){
//   const loading = await this.loadingController.create({
//     //content: 'loading friends..'
//   });
//   await loading.present();

//   if (this.friendId){
//     this.friendsService.updateFriend(this.friend, this.friendId).then(() => {
//       loading.dismiss();
//       this.navCtrl.pop(); //navigates back
//     });
//   } else {
//     this.friendsService.addFriend(this.friend).then(() => {
//       loading.dismiss();
//         this.navCtrl.pop();//navigates back
        
//     });
//   }

//   }
async saveFriend() {
 
  const loading = await this.loadingController.create({
    message: 'Saving friend..'
  });
  await loading.present();

  if (this.friendId) {
    this.friendsService.updateFriend(this.friend, this.friendId).then(() => {
      loading.dismiss();
      this.navCtrl.back();
    });
  } else {
    this.friendsService.addFriend(this.friend).then(() => {
      loading.dismiss();
      this.navCtrl.back();
    });
  }
}

}



//  friendList: any;
//   constructor(
//   private router: Router,
//   public formBuilder: FormBuilder,
//   public afstore: AngularFirestore,
//   public user: AuthService,public alert: AlertController,
//   public itemService: ItemService
//   ) {}
//   ngOnInit() {

//   }
  
//   async addFriend(email: string) { 
//     console.log(email)
//     let friends = await this.itemService.pullFriends();
//     let friendsemail=[]
//     console.log(friends.length)
//     for(let i=0; i< friends.length; i++){
//       friendsemail[i].push(friends[i].email)
//     }
//     console.log("Friends" ,friendsemail)
//     let randomId = Math.random().toString(36).substr(2, 20);
//     let store = this.afstore.collection(`users`)
//     let Items =  store.get()
//     .toPromise()
//     .then(snapshot => {
//       snapshot.forEach(doc => {
//         if(doc.data().email == email){
//           let data = {
//             uid: doc.data().uid
//           }
//           if(friendsemail.includes(email)){
//             console.log("whoops")
//             return;
//           }else{
//         let setDoc = this.afstore.collection(`users/${this.user.getUID()}/friends`).doc(randomId).set(data)
//         console.log("friend added")
//         return;
//         }
//         }else{
//           console.log("usernot found")
//         }
      
//       });
//     })
    
//   }

//   removeFriend(friendId): Promise<any> {
//     return firebase.firestore().collection('friends').doc(friendId).delete();
//   }









  
 


