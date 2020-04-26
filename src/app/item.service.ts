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
  private users:Array<any>=[];
  private friends:Array<any>=[];
  private memories:Array<any>=[];
  constructor(public afstore: AngularFirestore, public user: AuthService) { }

  postRefresh(){
    this.post.length=0;
    this.friends.length=0;
    this.users.length=0;
  }
   async getFeed(){
    this.postRefresh();
    //keeps for only friends or self post
    let friendsuid= await this.pullFriends();
    let friendEmail= []
    for(let i=0; i< friendsuid.length; i++){
      friendEmail.push(friendsuid[i].email)
    }
    friendEmail.push(this.user.getUser())
    let store = this.afstore.collection('post');
    let Items =  store.get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(friendEmail.includes(doc.data().username)){
        this.post.push(doc.data())
        }
      });
    })
  	return this.post;
  }

  async getFriends(){
    this.postRefresh();
    let store = this.afstore.collection(`users/${this.user.getUID()}/friends`)
    let Items =  await store.get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.users.push(doc.data())
      });
    })
  	return this.users;
  }

  async pullFriends(){
     this.postRefresh();
    await this.getFriends();
    let store =  this.afstore.collection(`users`)
    let Items =  await store.get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        for(let i =0; i< this.users.length; i++){
        if(doc.id == this.users[i].uid){
        this.friends.push(doc.data())
      }else{
        //console.log("usernot found")
      }
    }
    });
  })
  return this.friends;
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
          //console.log("usernot found")
        }
      }
      });
    })
    return this.friends;
  }
  */

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
