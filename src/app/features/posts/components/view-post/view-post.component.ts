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

  ngOnInit() {
    if (!this.post) {
      this.store.select('postsState').subscribe( res => {
        this.post = res.posts.filter( v => v.id === this.route.snapshot.params.id)[0];
      });
    }
  }

  deletePost() {
    this.store.dispatch( new OnDeletePost(this.route.snapshot.params.id) );
  }
  editPost() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
