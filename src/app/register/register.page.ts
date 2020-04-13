import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email:string;
  password: string;
  cpassword:string;
  constructor(public authService: AuthService,public alert: AlertController,) { }

  ngOnInit() {
  }

  signup() {
    if(this.password!== this.cpassword){
      this.showAlert("Error!","Passwords don't match")
      return console.error("Passwords don't match")
    }
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }
  async showAlert(header: string, message: string){
    const alert  = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }

}
