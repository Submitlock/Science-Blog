import { AppState } from './../../../app-store/app-store';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  loading = true;

  ngOnInit() {
    this.store.select('postsState').subscribe( res => {
      this.loading = res.loading;
    });
  }

}
