import { UserModel } from './../../features/auth/models/user.model';
import { ClearErrorPost } from './../../features/posts/store/posts.actions';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from './../../features/posts/models/post.model';
import { AppState } from 'src/app/app-store/app-store';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  @ViewChild('tabs', {static: false}) tabs: ElementRef;

  posts: PostModel[] = [];
  loading = false;
  selectedCategory: string = null;
  error: string = null;
  loggedUser: UserModel;

  ngOnInit() {
    this.store.subscribe( store => {
      this.posts = store.postsState.posts;
      this.loading = store.postsState.loading;
      this.error = store.postsState.error;
      this.loggedUser = store.authState.user;
    });

    this.route.queryParams.subscribe( params => {
      if (params) {
        this.selectedCategory = params.category;
      }
    });
  }

  switchCategory(category: string) {
    this.selectedCategory = category;
  }

  onHideAlert() {
    this.store.dispatch( new ClearErrorPost() );
  }
}
