import { AppState } from './../app-store/app-store';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LoggedInProtectionService implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      map( store => {
        // IF THERE IS NO LOGGED IN USER
        const loggedUser = store.authState.user;
        if (!loggedUser) {
          console.log('You need to be logged in');
          this.router.navigate(['/']);
          return false;
        }
        // IF THERE IS POST ID
        const postID = route.params.id;
        if (postID) {
          const getPost = store.postsState.posts.filter( post => post.postID === postID )[0];
          if (getPost) {
            if (getPost.userEmail === loggedUser.email) {
              console.log('Route permited. Post user mathces logged user');
              return true;
            }
            console.log('Route not permited. Post user doesnt match logged user');
            this.router.navigate(['/']);
            return false;
          }
          console.log('Post was not found');
          this.router.navigate(['/']);
          return false;
        }
        console.log('Route permited. Logged in user filter only');
        return true;
      })
    );
  }
}
