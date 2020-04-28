import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
//import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

export interface Friend {
  email : any;
}


@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private friendsCollection: AngularFirestoreCollection<Friend>;

  private friends: Observable<Friend[]>;
  constructor(db: AngularFirestore) { 
     this.friendsCollection = db.collection<Friend>('friends');

     this.friends = this.friendsCollection.snapshotChanges().pipe(
         map(actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id, ...data };
         });
       })
     );
  }
getFriends() {
  return this.friends;
}

getFriend(id){
return this.friendsCollection.doc<Friend>(id).valueChanges();
}
updateFriend(friend: Friend, id: string){
  return this.friendsCollection.doc(id).update(friend);
}
addFriend(friend: Friend) {
  return this.friendsCollection.add(friend);
}

removeFriend(id){
  return this.friendsCollection.doc(id).delete();
}

}
