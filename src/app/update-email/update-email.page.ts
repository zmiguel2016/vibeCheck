import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, Routes, RouterModule } from '@angular/router';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { ItemService } from '../item.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
//import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {
  updateEmail: FormGroup;
  email:any;
  currentLogin:any;
  constructor(private router: Router,
    public itemService: ItemService,
    public formBuilder: FormBuilder,
    public db: AngularFirestore,
    //private storage: Storage,
    public alertController: AlertController,public user: AuthService) {this.getEmail()}

  ngOnInit() {
    this.updateEmail = this.formBuilder.group({
      email: new FormControl(this.email, Validators.required),
    });

  }

  /**
   * Assigns `email` to the user authenticated email from `itemService`.
   * @return undefined
   */
  getEmail() {
    var self = this;
    self.email = this.user.getUser();
  }

  /**
   * Updates Firebase with the new email and refreshes user information.
   * @param  value - new email to update with
   * @return undefined
   */
  async update(value) {
    var user = firebase.auth().currentUser;
    var self = this;
    await user.updateEmail(value.email).then(() => {
      this.updateDB(value);
      var changes = {
        email: value.email
      }
      self.currentLogin.email = value.email;
      self.presentAlert("Email Updated", "poof");
      return;
      this.router.navigate(['/user-settings',changes]);
    }).catch((error) => {
      //self.presentAlert("Email Updated", "poof");
      self.presentAlert("Invalid Email","Email already exists");
      this.router.navigate(['/settings']);
      return;
    });
  }

  /**
   * Specifically updates Firebase with the updated email.
   * @param  value - new email to be updated
   * @return undefined
   */
  updateDB(value){
    var user = firebase.auth().currentUser;
    var self = this;
    firebase.firestore().collection('users').doc(this.user.getUID()).update({
      "email": value.email
    }).then(function () {
      console.log('User updated successfully');
    })
    .catch(function (error) {
      self.presentAlert(error.errorCode, error.errorMessage);
    });
  }

  /**
   * Presents a generic alert with input for the content of the alert.
   * @param  header       - alert header
   * @param  errorMessage - alert body
   * @return undefined
   */
  async presentAlert(header, errorMessage) {
    const alert =  await this.alertController.create({
      header: header,
      message: errorMessage,
      buttons: ['OK']

    });
    await alert.present();
  }

}
