import { Component, OnInit } from '@angular/core';
import { firestore } from 'firebase/app';
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FriendsService } from '../friends.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.page.html',
  styleUrls: ['./add-friends.page.scss'],
})
export class AddFriendsPage implements OnInit {


 friendList: any;
  constructor(
  private router: Router,
  public formBuilder: FormBuilder,
  public friendsService: FriendsService,
  public afstore: AngularFirestore,
  public authService: AuthService,public alert: AlertController,
  
  ) {
    this.getFriendList().then( friends => this.friendList = friends);
   }
  ngOnInit() {

  }
  //function to add friend 
  //it should take an email address 
  //once you click the done button, it should serch the database and find the friend. 
  addFriend(name: string, email: string) { 
    return firebase.firestore().collection('friends').doc(email).set({name, email});
  }

  // addContact(name: string, email: string) {
  //   return firebase.firestore().collection('contacts').add({name, email});
  // }

  getFriendList() {
    return firebase.firestore().collection('friends').get();
  }
  // getFriends(friendsId: string) {
  //   return firebase.firestore().collection('friends').doc(friendsId).get()
  // }
 
  // updateFriend(friend) {
  //   return firebase.firestore().collection('friends').doc(friend.id).update(friend);
  // }

  removeFriend(friendId): Promise<any> {
    return firebase.firestore().collection('friends').doc(friendId).delete();
  }









  
 

}
