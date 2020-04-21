import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
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
 

  constructor(private router: Router,private firebaseAuth: AngularFireAuth,public afStore: AngularFirestore) { 
    this.user = firebaseAuth.authState;
  }
  async signup(email: string, password: string) {
    const res =await this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      this.afStore.doc(`users/${res.user.uid}`).set({
        email
      })
      .then(value => {
        //this.uid=res.user.uid
        console.log('Success!', this.getUID()); 
        this.router.navigate(['/tabs/tab1']);
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
        console.log('you added a friend', this.getUID());
        this.router.navigate(['/tabs/tab1']);
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
  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  getUID(){
    return this.firebaseAuth.auth.currentUser.uid
    
  }

}

