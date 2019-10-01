import { CommentsModel } from './../models/comments.model';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-store';
import * as fromCommentsActions from './comments.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const fireBaseURL = 'https://science-blog-db452.firebaseio.com';

@Injectable()
export class CommentsEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private store: Store<AppState>) {}

  @Effect()
    onAddComment = this.actions$.pipe(
        ofType(fromCommentsActions.ON_ADD_COMMENT),
        exhaustMap( (action: fromCommentsActions.OnAddComment) => {
            return this.http.post<{name: string}>(
                `${fireBaseURL}/comments/${action.payload.postID}/${action.payload.userID}.json`, action.payload
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
                        return new fromCommentsActions.AddComment(newComment);
                    }),
                    catchError(this.hadnleError)
                );
        })
    );

    @Effect()
    onFetchComments = this.actions$.pipe(
        ofType(fromCommentsActions.ON_FETCH_COMMENTS),
        exhaustMap( (action: fromCommentsActions.OnFetchComments) => {
            return this.http.get(`${fireBaseURL}/comments/${action.payload}.json`)
                .pipe(
                    map( this.handleOnFetchComments ),
                    catchError(this.hadnleError)
                );
        })
    );

    @Effect()
    onDeleteComment = this.actions$.pipe(
        ofType(fromCommentsActions.ON_DELETE_COMMENT),
        exhaustMap( (action: fromCommentsActions.OnDeleteComment) => {
            return this.http.delete(
                `${fireBaseURL}/comments/${action.payload.postID}/${action.payload.userID}/${action.payload.commentID}.json`
                ).pipe(
                    map( () => new fromCommentsActions.DeleteComment(action.payload.commentID) ),
                    catchError(this.hadnleError)
                );
        })
    );

    handleOnFetchComments(res: any) {
        const comments: CommentsModel[] = [];
        if (res) {
            Object.keys(res).map( uID => {
                Object.keys(res[uID]).map( commentID => {
                    const comment = new CommentsModel(
                        uID,
                        res[uID][commentID].userEmail,
                        res[uID][commentID].postID,
                        res[uID][commentID].postUserID,
                        new Date(res[uID][commentID].created),
                        res[uID][commentID].content,
                        commentID
                    );
                    comments.push(comment);
                });
            });
        }
        return new fromCommentsActions.FetchComments(comments);
    }

    hadnleError(err: HttpErrorResponse) {
        return of(new fromCommentsActions.ErrorComment(err.error.error + '!'));
    }
}
