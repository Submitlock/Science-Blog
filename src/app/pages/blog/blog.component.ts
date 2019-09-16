import { PostModel } from './../../features/posts/models/post.model';
import { AppState } from 'src/app/app-store/app-store';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  posts: PostModel[] = [];

  ngOnInit() {
    this.store.select('postsState').subscribe( res => this.posts = res.posts);
  }

}
