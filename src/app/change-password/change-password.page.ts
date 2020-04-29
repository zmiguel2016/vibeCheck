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
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  updatePassword: FormGroup;
  currentLogin:any;
  constructor(private router: Router,
    public itemService: ItemService,
    public formBuilder: FormBuilder,
    public db: AngularFirestore,
    public alertController: AlertController,public user: AuthService) { }

  ngOnInit() {
    this.updatePassword = this.formBuilder.group({
      password: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required)
    });
  }

  update(value){
    var self = this;
    if(value.password != value.confirmpassword) //checks to see if passwords match
    {
      self.presentAlert('Error','Passwords do not match');
      return;
    }
    else
    {
      var user = firebase.auth().currentUser;
      var self = this;
      user.updatePassword(value.confirmpassword).then(function() {
        console.log("password set to: "+value.confirmpassword);
        self.presentAlert("password updated", "hurray");
        self.currentLogin.password = value.confirmpassword;
        return;
       // self.storage.set('login', self.currentLogin);
        self.router.navigate(['/settings']);
      }).catch(function(error) {
        self.presentAlert(error.code, error.message); //firebase error
      });
    }
    
  }
//presents alert that password has been changed or error has occured
  async presentAlert(header, errorMessage) {
    const alert =  await this.alertController.create({
      header: header,
      message: errorMessage,
      buttons: ['OK']

    });
    await alert.present();
  }
}


