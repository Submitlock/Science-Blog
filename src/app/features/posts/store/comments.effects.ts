import { CommentsModel } from './../models/comments.model';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-store';
import { ON_ADD_COMMENT, OnAddComment, AddComment } from './comments.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const fireBaseURL = 'https://science-blog-db452.firebaseio.com/';

@Injectable()
export class CommentsEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private store: Store<AppState>) {}

  @Effect()
    onAddComment = this.actions$.pipe(
        ofType(ON_ADD_COMMENT),
        exhaustMap( (action: OnAddComment) => {
            return this.http.post<{name: string}>(
                `${fireBaseURL}comments/${action.payload.postID}/${action.payload.userID}.json`, action.payload
                ).pipe(
                    map( res => {
                        const newComment = new CommentsModel(
                            action.payload.userID,
                            action.payload.userEmail,
                            action.payload.postID,
                            action.payload.postUserID,
                            action.payload.created,
                            action.payload.content,
                            res.name
                        );
                        return new AddComment(newComment);
                    }),
                    catchError( err => {
                        console.log('Error has occured', err);
                        return of();
                    })
                );
        })
    );
}
