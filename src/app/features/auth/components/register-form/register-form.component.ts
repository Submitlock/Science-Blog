import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuthStore from '../../store/auth.reducer';
import * as fromAuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private store: Store<{authState: fromAuthStore.State}>) { }
  loading = false;
  error: string;

  ngOnInit() {
    this.store.select('authState').subscribe( res => {
      this.loading = res.loading;
      this.error = res.error;
    });
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(
      new fromAuthActions.StartAuth({email: form.value.email, password: form.value.password, login: false})
    );
  }

}
