import { ClearErrorComment } from './../../store/comments.actions';
import { AppState } from './../../../../app-store/app-store';
import { Store } from '@ngrx/store';
import { UserModel } from './../../../auth/models/user.model';
import { CommentsModel } from './../../models/comments.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments-loop',
  templateUrl: './comments-loop.component.html',
  styleUrls: ['./comments-loop.component.css']
})
export class CommentsLoopComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  @Input() comments: CommentsModel[];
  @Input() loggedUser: UserModel;
  error: string = null;
  ngOnInit() {
    this.store.select('commentsState').subscribe( commentsState => this.error = commentsState.error );
  }

  clearError() {
    this.store.dispatch( new ClearErrorComment() );
  }

}
