import { AppState } from './app-store/app-store';
import { UserModel } from './features/auth/models/user.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromAuthActions from './features/auth/store/auth.actions';
import * as postsActions from './features/posts/store/posts.actions';
import { PostModel } from './features/posts/models/post.model';
import { toggleModal } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ toggleModal ]
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  title = 'science-blog';
  showModal = false;

  loggedUser: UserModel;
  posts: PostModel[] = [];
  show = false;
  loading = true;

  changeState() {
    this.show = !this.show;
  }

  ngOnInit() {
    this.store.select('authState').subscribe( res => {
      this.loggedUser = res.user;
      if (this.loggedUser) {
        this.showModal = false;
      }
    });
    this.store.dispatch( new fromAuthActions.AutoLogin() );
    if (this.posts.length === 0) {
      this.store.dispatch( new postsActions.OnFetchPosts() );
      console.log('Fetch Triggered');
    }
  }

  onShowModal(event: boolean) {
    if (!event) {
      this.store.dispatch( new fromAuthActions.ClearError() );
    }
    this.showModal = event;
  }

  onToggleModal(event: boolean) {
    if (!event) {
      this.store.dispatch( new fromAuthActions.ClearError() );
    }
    this.showModal = event;
  }
}
