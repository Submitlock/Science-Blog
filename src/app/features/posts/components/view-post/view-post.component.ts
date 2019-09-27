import { UserModel } from './../../../auth/models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormPostType, PostModel } from '../../models/post.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-store';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDeletePost } from '../../store/posts.actions';

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
  postID = this.route.snapshot.params.id;
  loggedUser: UserModel;

  ngOnInit() {
    this.store.subscribe(res => {
      if (!this.post) {
        this.post = res.postsState.posts.filter( v => v.id === this.postID)[0];
      }
      if (res.authState.user) {
        this.loggedUser = res.authState.user;
        this.userMatchPostUser = this.post.user === res.authState.user.email ? true : false;
      }
      this.loading = res.postsState.loading;
    });
  }

  deletePost() {
    this.store.dispatch( new OnDeletePost({user: this.loggedUser, postID: this.postID}) );
  }
  editPost() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
