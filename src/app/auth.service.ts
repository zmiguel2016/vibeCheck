import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, CanActivate } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'

//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // addFriend(email: string) {
  //   throw new Error("Method not implemented.");
  // }
  user: Observable<firebase.User>;
  uid:string
  auth: any;
 

  constructor(private _router: Router,private firebaseAuth: AngularFireAuth,public afStore: AngularFirestore) { 
    this.user = firebaseAuth.authState;
  }
  async signup(email: string, password: string) {
    const res =await this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      this.afStore.doc(`users/${res.user.uid}`).set({
        email,
        uid: res.user.uid
      })
      .then(value => {
        //this.uid=res.user.uid
        console.log('Success!', this.getUID()); 
        this._router.navigate(['/tabs/tab2']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
       //this.uid=res.user.uid
        console.log('Nice, it worked!', this.getUID());
        this._router.navigate(['/tabs/tab2']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
  // async addFriend(email: string) {
  //   const res =await this.firebaseAuth
  //     .auth
  //     .createUserWithEmail(email)
  //     this.afStore.doc(`users/${res.user.uid}`).set({
  //       email
  //     })
  //     .then(value => {
  //       //this.uid=res.user.uid
  //       console.log('Success!', this.getUID()); 
  //       this.router.navigate(['/tabs/tab1']);
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:',err.message);
  //     });    
  // }
  // logout() {
  //   console.log("you clicked logout")
  //   this.auth.logout();
  //     // //localStorage.removeItem('token')
  //     // this._router.navigate(['/login'])
  // }

  getUID(){
    return this.firebaseAuth.auth.currentUser.uid
    
  }
  getUser(){
    return this.firebaseAuth.auth.currentUser.email
  }

  async canActivate(route){
    var loguser = this.firebaseAuth.auth.currentUser
    if(loguser){
      return true
    }
    this._router.navigate(['/login'])
    return false
  }

}

