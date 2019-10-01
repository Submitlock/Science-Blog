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
  error: string = null;

  ngOnInit() {
    this.postID = this.route.snapshot.params.id;
    this.store.select('postsState').subscribe( postsState => this.error = postsState.error);
  }

  onContentEmit(post: FormPostType) {
    this.post = post;
  }
}
