import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from '../features/auth/store/auth.reducer';
import * as postsReducer from './../features/posts/store/posts.reducer';
import * as commentsReducer from './../features/posts/store/comments.reducer';

export interface AppState {
    authState: authReducer.State;
    postsState: postsReducer.State;
    commentsState: commentsReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    authState: authReducer.authReducer,
    postsState: postsReducer.PostsReducer,
    commentsState: commentsReducer.CommentsReducer
};
