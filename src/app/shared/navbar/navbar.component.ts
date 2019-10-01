import { toggleModal } from 'src/app/animations/animations';
import { UserModel } from './../../features/auth/models/user.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as fromAuthStore from '../../features/auth/store/auth.reducer';
import * as fromAuthActions from '../../features/auth/store/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private store: Store<{authState: fromAuthStore.State}>) { }

  @Output() toggleModal = new EventEmitter<boolean>();
  loggedUser: UserModel;

  ngOnInit() {
    // Load user if any
    this.store.select('authState').subscribe( res => {
      this.loggedUser = res.user;
    });
  }

  // Triggers modal pop up
  onShowModal(event: Event) {
    event.preventDefault();
    this.toggleModal.emit(true);
  }

  onLogout(event: Event) {
    this.store.dispatch( new fromAuthActions.Logout() );
  }

}
