import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import { ActivatedRouteSnapshot } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private post:Array<any>=[];
  private users:Array<any>=[];
  private friends:Array<any>=[];
  private memories:Array<any>=[];
  private image:any;
  constructor(public afstore: AngularFirestore, public user: AuthService) { }

  postRefresh(){
    this.post.length=0;
    this.friends.length=0;
    this.users.length=0;
  }
   async getFeed(){
    this.postRefresh();
    let friendsuid= await this.pullFriends();
    let friendEmail= []
    for(let i=0; i< friendsuid.length; i++){
      friendEmail.push(friendsuid[i].uid)
    }
    friendEmail.push(this.user.getUID())
    let store = this.afstore.collection('post');
    let Items =  store.get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(friendEmail.includes(doc.data().uid)){
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
      }
    }
    });
  })
  return this.friends;
}

  async getProfilePic(){
    let a = this.afstore.collection(`users`).doc(this.user.getUID())
    let b = await a.get()
    .toPromise()
    .then(doc =>{
      this.image = doc.data().image;
    })
  
    return this.image;
  }

 async getImages(){
    this.memories.length = 0;
    for (let i=0; i<this.post.length; i++){

      if (this.post[i].uid == this.user.getUID()){
        this.memories.push(this.post[i])
        //console.log("Success")
      }
    }
    return this.memories;
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

updateItem(newValues){
  let setDoc = this.afstore.collection('post').doc(newValues.id).update(newValues)
 // let itemIndex = this.items.findIndex(item => item.id == newValues.id);
 // if(newValues.img == undefined){
 // 	newValues.img = this.items[itemIndex].img
//  }

  //this.items[itemIndex] = newValues;
 // console.log(newValues.img);
}





}
