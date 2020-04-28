import { Component } from '@angular/core';
//import {ActivatedRoute} from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  //id;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    //private fb = FormBuilder
    //private route: ActivatedRoute
   
  ) 
  {
   // this.control = fb.control({value: 'my val', disabled: true()
    this.initializeApp()
  
  }
  
// ngOnInit(){
//   this.route.snapshot.paramMap.get('id');
// }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
