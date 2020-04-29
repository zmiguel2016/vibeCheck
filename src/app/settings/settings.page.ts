import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { ItemService } from '../item.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
//import { Storage } from '@ionic/storage';
import { AuthService } from '../auth.service';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  userid : any;
  userEmail:any;
  firstName:any;
  lastName:any;

  constructor(private router: Router,
    public itemService: ItemService,
    public formBuilder: FormBuilder,
    public db: AngularFirestore,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public user: AuthService) { }

  ngOnInit() {
    var doc = firebase.firestore().collection('users').doc(this.user.getUID()).get()
    .then(doc => {
      this.userEmail = doc.data().email;
      this.firstName = doc.data().fname;
      this.lastName = doc.data().lname;
    });
    this.route.params.subscribe(params => {
      if(params.email != undefined)
        this.userEmail = params.email;
      if(params.fname != undefined)
        this.firstName = params.fname;
      if(params.lname != undefined)
        this.lastName = params.lname;
    });

  }

  goToUpdateEmail() {
    this.router.navigate(['/update-email']);
  }

  /**
   * Routes to change-password.
   * @return undefined
   */
  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  /**
   * Routes to update-info.
   * @return undefined
   */
  goToUpdateInfo() {
    this.router.navigate(['/update-info']);
  }
  /* @param  header       - header of alert
   * @param  errorMessage - content of alert
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
