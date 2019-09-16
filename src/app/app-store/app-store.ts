import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from '../features/auth/store/auth.reducer';
import * as postReducer from './../features/posts/store/posts.reducer';

export interface AppState {
    authState: authReducer.State;
    postsState: postReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    authState: authReducer.authReducer,
    postsState: postReducer.PostsReducer
};
