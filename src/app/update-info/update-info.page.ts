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
  selector: 'app-update-info',
  templateUrl: './update-info.page.html',
  styleUrls: ['./update-info.page.scss'],
})
export class UpdateInfoPage implements OnInit {
  updateInfo: FormGroup;
  fname:any;
  lname:any;
  constructor(
    private router: Router,
    public itemService: ItemService,
    public formBuilder: FormBuilder,
    public db: AngularFirestore,
    public alertController: AlertController,
    public user: AuthService,
    public location: Location
  ) { this.getNames();}

  ngOnInit() {
    this.updateInfo = this.formBuilder.group({
      fname: new FormControl(this.fname, Validators.required),
      lname: new FormControl(this.lname, Validators.required)
    })
  }

  /**
   * Sets first and last name to itemService defined name info.
   * @return undefined
   */
  getNames(){
    var self = this;
    var doc = firebase.firestore().collection('users').doc(this.user.getUID()).get()
    .then(doc => {
      self.fname = doc.data().fname;
      self.lname = doc.data().lname;
    });
   
  
  }
  /**
   * Updates Firebase with the new name values. Routes back to user-settings when successful.
   * @param  value - object containing first and last name
   * @return undefined
   */
  async update(value) {
    var user = firebase.auth().currentUser;
    var self = this;
    await firebase.firestore().collection('users').doc(this.user.getUID()).update({
      "fname": value.fname,
      "lname": value.lname
    }).then(function () {
      console.log('User updated successfully');
      self.presentAlert("Named changed", ":)");
    })
    .catch(function (error) {
      self.presentAlert(error.errorCode, error.errorMessage);
    });
   // await self.itemService.updateUser();
    var changes = {
      fname: value.fname,
      lname: value.lname
    }
   // this.router.navigate(['/settings',changes]);
  }

  /**
   * Generic alert presenter.
   * @param  header       - header of the alert
   * @param  errorMessage - body of the alert
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
