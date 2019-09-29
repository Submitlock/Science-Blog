import { UserModel } from './../../../auth/models/user.model';
import { CommentsModel } from './../../models/comments.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments-loop',
  templateUrl: './comments-loop.component.html',
  styleUrls: ['./comments-loop.component.css']
})
export class CommentsLoopComponent implements OnInit {

  constructor() { }

  @Input() comments: CommentsModel[];
  @Input() loggedUser: UserModel;

  ngOnInit() {
  }

}
