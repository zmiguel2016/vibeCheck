import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class FriendsService {

friends:Array<any>=[{"name":"helloWorld", "gmail":"helloworld@gmail.com"}];
  constructor() {console.log("loading your friends")};
  //private friend:Array<any>=[];
  refresh(){
    this.friends.length = 0;
  }


addFriend(name: string, email: string) { 
  return firebase.firestore().collection('friends').doc(email).set({name, email});
}

getFriendList() {
  return firebase.firestore().collection('friends').get();
}

updateFriend(friend) {
  return firebase.firestore().collection('friends').doc(friend.id).update(friend);
}
// }

removeFriend(friendId): Promise<any> {
  return firebase.firestore().collection('friends').doc(friendId).delete();

//   //function to save friends gmail, get friends
// getFriends(){
//   return this.friends;
// }

}

}
