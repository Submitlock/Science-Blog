import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuthStore from '../../store/auth.reducer';
import * as fromAuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {

  constructor(private store: Store<{authState: fromAuthStore.State}>) { }

  loginMode = true;
  loading = false;
  error = '';

  ngOnInit() {
    this.store.select('authState').subscribe( res => {
      this.loading = res.loading;
      this.error = res.error;
    });
  }

  onSubmit(form: NgForm) {
    if (this.loginMode) {
      this.store.dispatch(
        new fromAuthActions.StartAuth({email: form.value.email, password: form.value.password, login: true})
      );
    } else {
      this.store.dispatch(
        new fromAuthActions.StartAuth({email: form.value.email, password: form.value.password, login: false})
      );
    }
  }

}
