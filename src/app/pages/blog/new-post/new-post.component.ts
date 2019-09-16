import { Component, OnInit } from '@angular/core';
import { FormPostType } from 'src/app/features/posts/models/post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor() { }

  passPostContent: FormPostType;

  ngOnInit() {
  }

  onContentEmit(formPost: FormPostType) {
    this.passPostContent = formPost;
  }
}
