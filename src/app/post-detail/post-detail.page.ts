import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { ItemService } from '../item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {
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
  }

  openMemoriesPage(){
    this.router.navigate(["/memories"]);
  }

}
