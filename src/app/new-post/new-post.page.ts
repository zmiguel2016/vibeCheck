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
    username: this.authService.getUser()
    }
    
    
    let setDoc = this.afstore.collection('post').doc(randomId).set(data)
  
  	this.goBack();
  }

  goBack(){
    this.router.navigate(['/tabs/tab2']);
}

}
