import { AppState } from './../app-store/app-store';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LoggedInProtectionService implements CanActivate {

  constructor(private store: Store<AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
     return this.store.select('authState').pipe(
      map( res => {
        if (res.user) {
          console.log('Route path permited');
          return true;
        }
        console.log('Route path not permited');
        return false;
      })
     );
  }
}
