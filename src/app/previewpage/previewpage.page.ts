import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { ItemService } from '../item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
@Component({
  selector: 'app-previewpage',
  templateUrl: './previewpage.page.html',
  styleUrls: ['./previewpage.page.scss'],
})
export class PreviewpagePage implements OnInit {
  currentpost:any;
  constructor(private route: ActivatedRoute,
    public itemService: ItemService,
    private router:Router,
    public afstore: AngularFirestore) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.currentpost = param;
      }
    )
    console.log(this.currentpost)
  }

  deletePost(){
    this.itemService.deleteItem(this.currentpost.id)
    console.log("post delete")
    this.goToFeed();
  }

  goToFeed(){
    this.router.navigate(["/tabs/tab2"]);
  }
  }


