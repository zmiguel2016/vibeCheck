import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { ItemService } from '../item.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
//import { Storage } from '@ionic/storage';
import { AuthService } from '../auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";


import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { verifyHostBindings } from '@angular/compiler';

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
  imgfile="";

  constructor(private router: Router,
    public itemService: ItemService,
    public formBuilder: FormBuilder,
    private camera:Camera,
    private file:File,
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

  async captureImage() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    try{
      console.log(this);
      let cameraInfo = await this.camera.getPicture(options);
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      let uploadInfo: any = await this.uploadToFirebase(blobInfo);
      console.log(uploadInfo);
      // let url:any = uploadInfo.ref.getDownloadURL();
      alert("File Upload Success " + uploadInfo);
      this.imgfile = uploadInfo;
      await firebase.firestore().collection('users').doc(this.user.getUID()).update({
        "image": this.imgfile
      })

      
    } catch (e) {
      console.log(e.message);
      alert("File Upload Error " + e.message);
    }
  }
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          console.log("path", path);
          console.log("fileName", name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

  /**
   *
   * @param _imageBlobInfo
   */
  uploadToFirebase(_imageBlobInfo) {
    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let imageid = (Math.floor(Math.random() * 2000)).toString();
      let filename = "menu_"+imageid
      // filename = _imageBlobInfo.fileName;
      let fileRef = firebase.storage().ref("images/" + filename);

      let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);
      let mydownloadurl="";
      

      uploadTask.on(
        "state_changed",
        (_snapshot: any) => {
          console.log(
            "snapshot progess " +
              (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...  get the image URL for saving to database
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            mydownloadurl = downloadURL;
            resolve( mydownloadurl);
          });
          // resolve( uploadTask.snapshot);
          // resolve( mydownloadurl);

        }
      );
    });
  }

  logout(){
    this.user.logout();
    this.router.navigate(["/login"]);
  }



}
