import { UserModel } from './../../../auth/models/user.model';
import { PostModel } from './../../models/post.model';
import { OnAddComment } from './../../store/comments.actions';
import { ActivatedRoute } from '@angular/router';
import { CommentsModel } from './../../models/comments.model';
import { AppState } from './../../../../app-store/app-store';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  @Input() post: PostModel;
  @Input() loggedUser: UserModel;

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const newComment = new CommentsModel(
      this.loggedUser.userId,
      this.loggedUser.email,
      this.post.postID,
      this.post.postUserID,
      new Date(),
      form.value.content,
    );
    this.store.dispatch(new OnAddComment(newComment));
  }

}
