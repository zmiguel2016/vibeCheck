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
  private memories:Array<any>=[];

  constructor(public afstore: AngularFirestore, public user: AuthService) { }

  postRefresh(){
    this.post.length=0;
    this.memories.length=0;
  }
  getFeed(){
    this.postRefresh();
    let store = this.afstore.collection('post');
    let Items =  store.get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data().username)
        this.post.push(doc.data())
      });
    })
  	return this.post;
  }

  getImages(){
    for (let i=0; i<this.post.length; i++){

      if (this.post[i].username == this.user.getUser()){
        this.memories.push(this.post[i])
        console.log("Success")
      }else{
        console.log("Failed")
      }
    }
    return this.memories;
  } 
  /*getImages(){
    this.postRefresh();
    let af = this.afstore.collection('post');
    let Items2 =  af.get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data().username)
        //console.log(this.user.getUser(), "getUser")
        if (doc.data().username.equals(this.user.getUser())) {
          console.log("Image pulled")
            this.memories.push(doc.data())   
        }else{
            console.log("Not in user storage");
        }
      });
    })
    return this.memories;
  }*/

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
