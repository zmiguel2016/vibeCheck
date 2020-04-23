import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private post:Array<any>=[];
  constructor(public afstore: AngularFirestore, public user: AuthService) { }

  postRefresh(){
    this.post.length=0;
  }
   getFeed(){
    this.postRefresh();
    let store = this.afstore.collection('post');
    let Items =  store.get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.post.push(doc.data())
      });
    })
  	return this.post;
  }

  createPost(title){
    let randomId = Math.random().toString(36).substr(2, 5);
    this.post.push({
      'id': randomId,
      'title': title,
    });
  }

  deleteItem(id){
    let setDoc = this.afstore.collection('post').doc(id).delete();
    console.log("Item deleted:"+id)
}





}