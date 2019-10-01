import { CommentsModel } from './../../models/comments.model';
import { UserModel } from './../../../auth/models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormPostType, PostModel } from '../../models/post.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-store';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDeletePost, ClearErrorPost } from '../../store/posts.actions';
import { OnFetchComments } from '../../store/comments.actions';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  @Input() post: FormPostType | PostModel;
  @Input() showOptions: boolean;

  loading = false;
  userMatchPostUser = false;
  postID: string;
  loggedUser: UserModel;
  comments: CommentsModel[] = [];
  commentsLoading: boolean;
  error: string = null;

  ngOnInit() {
    // Gets post ID if exists
    this.postID = this.route.snapshot.params.id;
    this.store.subscribe(res => {
      // Get error and loading from postsState
      this.error = res.postsState.error;
      this.loading = res.postsState.loading;
      // If no post passed from parent, will look in postsState
      if (!this.post) {
        this.post = res.postsState.posts.filter( v => v.postID === this.postID)[0];
      }
      // Checks if logged user matches post user
      if (res.authState.user) {
        this.loggedUser = res.authState.user;
        this.userMatchPostUser = this.post.userEmail === res.authState.user.email ? true : false;
      }
      // Looks in comments state for this post comment
      this.comments = res.commentsState.comments.filter( v => v.postID === this.postID);
      this.commentsLoading = res.commentsState.loading;
    });
    // If no comments in state will make http request
    if (!this.comments.length) {
      this.store.dispatch(new OnFetchComments(this.postID));
    }
  }

  deletePost() {
    this.store.dispatch( new OnDeletePost({user: this.loggedUser, postID: this.postID}) );
  }
  editPost() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  clearError() {
    this.store.dispatch( new ClearErrorPost() );
  }
}
