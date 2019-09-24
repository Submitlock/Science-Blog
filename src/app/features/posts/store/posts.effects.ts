import { PostModel } from './../models/post.model';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as postsActions from './posts.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

const fireBaseURL = 'https://science-blog-db452.firebaseio.com/';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

  @Effect()
  onAddPost = this.actions$.pipe(
      ofType(postsActions.ON_ADD_POST),
      exhaustMap( (action: postsActions.OnAddPost) => {
          return this.http.post<{name: string}>(fireBaseURL + 'posts.json', action.payload)
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
                    if (res) {
                        Object.keys(res).map( key => {
                            const post = new PostModel(
                                res[key].user,
                                new Date(res[key].created),
                                res[key].title,
                                res[key].image,
                                res[key].category,
                                res[key].content,
                                key
                            );
                            posts.push(post);
                        });
                    }
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
            return this.http.delete(`${fireBaseURL}posts/${action.payload}.json`)
            .pipe(
                map( () => {
                    this.router.navigate(['/blog']);
                    return new postsActions.DeletePost(action.payload);
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
