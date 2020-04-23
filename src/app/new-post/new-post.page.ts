import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '../item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import * as firebase from "firebase";
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  new_item_form: FormGroup;
  constructor(private router: Router,
 	 public formBuilder: FormBuilder,
        public itemService: ItemService,
        public afstore: AngularFirestore,public authService: AuthService) { }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
    });
  }

  createItem(value){
  	console.log(value.BS);
  	
    let randomId = Math.random().toString(36).substr(2, 20);
    let data = {
    id: randomId,
    title: value.title,
    vibe: this.vibeCheck(value.title),
    username: this.authService.getUser()
    }
    
    
    let setDoc = this.afstore.collection('post').doc(randomId).set(data)
  
  	this.goBack();
  }

  vibeCheck(title){
    console.log(title)
    console.log(this.getVibe(title))
    let vibe = getRandomIntInclusive(0,4) + this.getVibe(title)
    let post;
    console.log(vibe)
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

  goBack(){
    this.router.navigate(['/tabs/tab2']);
}

}
