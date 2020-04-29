import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemService } from '../item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.page.html',
  styleUrls: ['./image-detail.page.scss'],
})
export class ImageDetailPage implements OnInit {

  currentpost:any;
  edit_item_form:FormGroup;
  constructor(public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public itemService: ItemService,
    private router:Router,
    public afstore: AngularFirestore) {this.edit_item_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
    }); }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.currentpost = param;
        this.edit_item_form.patchValue({title:this.currentpost.title});
      }
    )
  console.log(this.currentpost)
  }
  updateItem(value){
  	console.log(value.title);

  	//update the item in the items of th Service Object
  	//need to import the ItemService and create it in constructor
  	let newValues = {
      id: this.currentpost.id,
      title: value.title,
      img: this.currentpost.img,
      uid: this.currentpost.uid,
      username: this.currentpost.username,
      vibe: this.currentpost.vibe
    }
    this.itemService.updateItem(newValues);
    this.goBack();
  }

  ionViewDidLeave(){}
  deletePost(){
    this.itemService.deleteItem(this.currentpost.id)
    this.goBack();
  }
  goBack(){
    this.ionViewDidLeave;
    this.router.navigate(['/tabs/tab3']);
  }


}