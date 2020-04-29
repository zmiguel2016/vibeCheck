import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '../item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import * as firebase from "firebase";
import { AuthService } from '../auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  imgfile="";
  new_item_form: FormGroup;
  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private camera:Camera,
    private file:File,
        public itemService: ItemService,
        public afstore: AngularFirestore,public authService: AuthService) { }

  ngOnInit() {
    this.captureImage();
    this.new_item_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
    });
  }

  createItem(value){
    let randomId = Math.random().toString(36).substr(2, 20);
    let data = {
    id: randomId,
    title: value.title,
    vibe: this.vibeCheck(value.title),
    username: this.authService.getUser(),
    uid: this.authService.getUID(),
    img: this.imgfile
    }
    let setDoc = this.afstore.collection('post').doc(randomId).set(data)
    
  	this.preview(data);
  }

  vibeCheck(title){
    let vibe = getRandomIntInclusive(0,4) + this.getVibe(title)
    let post;
    if(vibe ==0){
      post = "awful vibes oof"
      
    }
    else if(vibe ==1){
      post = "bad vibes sorry :("
       
    }
    else if(vibe ==2){
      post = "feeling eh"
      
    }
   else if(vibe ==3){
      post = "Chillin Killin :)"
      
    }else if(vibe ==4){
      post = "Happy and vibin!"
      
    }else if(vibe ==5){
      post = "HUGE vibes over here"
      
    }
    else if(vibe ==6){
      post = "Living like Larry!"
      
    }else if(vibe ==7){
      post = "Bigggggg Chillin ;)"
      
    }else if(vibe ==8){
      post = "PLUR!!"
      
    }else{
      post = "Vibes Unmatched!"
  
    }
    return post;
   
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

   
      

  }

  getVibe(title){
    let boast=0;
    if(title.includes('happy')){
      boast=1;
      }
 
  if(title.includes('awesome')){
      boast=2
  }
  if(title.includes('great')){
      boast=2
  }
if(title.includes('super')){
  boast=3
}
if(title.includes('dope')){
  boast=3
}
if(title.includes('music')){
  boast=4
}
if(title.includes('vibe')){
  console.log("superBoast")
  boast=5;
}
if(title.includes('plur')){
  boast=8
}
    return boast
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


  preview(data){
    this.router.navigate(['/previewpage', data]);
}

}
