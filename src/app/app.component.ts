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

  title = 'Science-blog';

  showModal = false;
  loggedUser: UserModel;
  show = false;

  ngOnInit() {
    // Trigger auto login
    this.store.dispatch( new fromAuthActions.AutoLogin() );
    // Hide modal auth if logged in
    this.store.select('authState').subscribe( res => {
      this.loggedUser = res.user;
      if (this.loggedUser) {
        this.showModal = false;
      }
    });
    // Trigger fetch posts
    this.store.dispatch( new postsActions.OnFetchPosts() );
  }

  // Toggle auth modal and clear http error if hidden
  onToggleModal(event: boolean) {
    if (!event) {
      this.store.dispatch( new fromAuthActions.ClearError() );
    }
    this.showModal = event;
  }
}
