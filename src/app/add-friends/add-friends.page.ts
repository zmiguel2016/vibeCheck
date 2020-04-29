import { Component, OnInit } from '@angular/core';
import { firestore } from 'firebase/app';
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { ItemService } from '../item.service';
@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.page.html',
  styleUrls: ['./add-friends.page.scss'],
})
export class AddFriendsPage implements OnInit {
  friendsemail: Array<any> = [];
friendList: any;
  constructor(
  private router: Router,
  public formBuilder: FormBuilder,
  public afstore: AngularFirestore,
  public user: AuthService,public alert: AlertController,
  public itemService: ItemService
  ) {}
  ngOnInit() {

  }
  
  async addFriend(email: string) { 
    let friends = await this.itemService.pullFriends();
    let friendsemail=[];
    for(let i=0; i< friends.length; i++){
      friendsemail.push(friends[i].email)
    }
    let randomId = Math.random().toString(36).substr(2, 20);
    let store = this.afstore.collection(`users`)
    let Items =  await store.get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.data().email == email){
          let data = {
            uid: doc.data().uid
          }
          if(doc.data().uid == this.user.getUID()){
            return;
          }
          if(friendsemail.includes(email)){
            return;

          }else{
        let setDoc = this.afstore.collection(`users/${this.user.getUID()}/friends`).doc(randomId).set(data)
        console.log("friend added")
        return;
        }
        }else{
          console.log("usernot found")
        }
      
      });
    })
    
  }










  
 

}
