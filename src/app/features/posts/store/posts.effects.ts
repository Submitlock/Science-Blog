import { AppState } from './../../../app-store/app-store';
import { Store } from '@ngrx/store';
import { PostModel } from './../models/post.model';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as postsActions from './posts.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


const fireBaseURL = 'https://science-blog-db452.firebaseio.com/';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private store: Store<AppState>) {}

  @Effect()
  onAddPost = this.actions$.pipe(
      ofType(postsActions.ON_ADD_POST),
      exhaustMap( (action: postsActions.OnAddPost) => {
          return this.http.post<{name: string}>(fireBaseURL + 'posts/' + action.payload.uid + '.json', action.payload)
                .pipe(
                    map( res => {
                        const newPost = new PostModel(
                            action.payload.user,
                            action.payload.created,
                            action.payload.title,
                            action.payload.image,
                            action.payload.category,
                            action.payload.content,
                            res.name
                        );
                        this.router.navigate(['/blog', res.name ]);
                        return new postsActions.AddPost(newPost);
                    }),
                    catchError(err => {
                        console.log(err);
                        return  of();
                    })
                );
      })
  );

  @Effect()
  onFetchPosts = this.actions$.pipe(
      ofType(postsActions.ON_FETCH_POSTS),
      exhaustMap( (action: postsActions.OnFetchPosts) => {
        return this.http.get(fireBaseURL + 'posts.json')
            .pipe(
                map( res => {
                    const posts: PostModel[] = [];
                    Object.keys(res).map( userID => {
                        Object.keys(res[userID]).map( postID => {
                            const post = new PostModel(
                                res[userID][postID].user,
                                new Date(res[userID][postID].created),
                                res[userID][postID].title,
                                res[userID][postID].image,
                                res[userID][postID].category,
                                res[userID][postID].content,
                                postID
                            );
                            posts.push(post);
                        });
                    });
                    return new postsActions.FetchPosts(posts);
                }),
                catchError(err => {
                    console.log(err);
                    return  of();
                })
            );
      })
  );

  @Effect()
    onDelete = this.actions$.pipe(
        ofType(postsActions.ON_DELETE_POST),
        exhaustMap( (action: postsActions.OnDeletePost) => {
            return this.http.delete(`${fireBaseURL}posts/${action.payload.user.userId}/${action.payload.postID}.json`)
            .pipe(
                map( () => {
                    this.router.navigate(['/blog']);
                    return new postsActions.DeletePost(action.payload.postID);
                }),
                catchError(err => {
                    console.log(err);
                    return  of();
                })
            );
        })
    );

    @Effect()
    onUpdate = this.actions$.pipe(
        ofType(postsActions.ON_UPDATE_POST),
        exhaustMap( (action: postsActions.OnUpdatePost) => {
            const updatedPost = new PostModel(
                action.payload.user,
                action.payload.created,
                action.payload.title,
                action.payload.image,
                action.payload.category,
                action.payload.content,
                action.payload.id
            );
            return this.http.put(`${fireBaseURL}posts/${action.payload.id}.json`, updatedPost)
            .pipe(
                map( () => {
                    this.router.navigate(['/blog', updatedPost.id]);
                    return new postsActions.UpdatePost(updatedPost);
                }),
                catchError(err => {
                    console.log(err);
                    return  of();
                })
            );
        })
    );
}
