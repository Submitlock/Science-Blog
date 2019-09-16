import { AppState } from './../../../app-store/app-store';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormPostType } from 'src/app/features/posts/models/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  post: FormPostType;
  postID: string;
  loading = false;

  ngOnInit() {
    this.postID = this.route.snapshot.params.id;
    this.store.select('postsState').subscribe( res => this.loading = res.loading);
  }

  onContentEmit(post: FormPostType) {
    this.post = post;
  }

}
