import { AppState } from './../../../app-store/app-store';
import { Component, OnInit } from '@angular/core';
import { FormPostType } from 'src/app/features/posts/models/post.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  passPostContent: FormPostType;

  ngOnInit() {
  }

  onContentEmit(formPost: FormPostType) {
    this.passPostContent = formPost;
  }
}
