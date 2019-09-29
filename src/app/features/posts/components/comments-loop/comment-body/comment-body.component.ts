import { AppState } from 'src/app/app-store/app-store';
import { Store } from '@ngrx/store';
import { UserModel } from './../../../../auth/models/user.model';
import { CommentsModel } from './../../../models/comments.model';
import { Component, OnInit, Input } from '@angular/core';
import { OnDeleteComment } from '../../../store/comments.actions';

@Component({
  selector: 'app-comment-body',
  templateUrl: './comment-body.component.html',
  styleUrls: ['./comment-body.component.css']
})
export class CommentBodyComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  @Input() comment: CommentsModel;
  @Input() loggedUser: UserModel;

  showDeleteBtn: boolean;

  ngOnInit() {
    this.showDeleteBtn = false;
    if (this.loggedUser) {
      this.showDeleteBtn = this.comment.userID === this.loggedUser.userId ? true : false;
    }
  }

  onDelete() {
    this.store.dispatch(new OnDeleteComment(this.comment));
  }
}
