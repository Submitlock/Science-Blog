import { UserModel } from './../../auth/models/user.model';
import { Action } from '@ngrx/store';
import { FormPostType, PostModel } from '../models/post.model';

export const ADD_POST = '[Posts] Add a post';
export const ON_ADD_POST = '[Posts] Starting http post request for adding a post';
export const FETCH_POSTS = '[Posts] Fetch posts';
export const ON_FETCH_POSTS = '[Posts] On start fetching posts';
export const DELETE_POST = '[Posts] Delete post';
export const ON_DELETE_POST = '[Posts] Send delete request';
export const ON_UPDATE_POST = '[Posts] Send post/update request';
export const UPDATE_POST = '[Post] Update Post';
export const ERROR_POST = '[Post] Error from request';
export const CLEAR_ERROR_POST = '[Post] Clear post error from request';

export class AddPost implements Action {
    readonly type = ADD_POST;
    constructor(public payload: PostModel) {}
}

export class OnAddPost implements Action {
    readonly type = ON_ADD_POST;
    constructor(public payload: FormPostType) {}
}

export class OnFetchPosts implements Action {
    readonly type = ON_FETCH_POSTS;
}

export class FetchPosts implements Action {
    readonly type = FETCH_POSTS;
    constructor(public payload: PostModel[]) {}
}

export class DeletePost implements Action {
    readonly type = DELETE_POST;
    constructor(public payload: string) {}
}

export class OnDeletePost implements Action {
    readonly type = ON_DELETE_POST;
    constructor(public payload: {user: UserModel, postID: string}) {}
}

export class OnUpdatePost implements Action {
    readonly type = ON_UPDATE_POST;
    constructor(public payload: FormPostType) {}
}

export class UpdatePost implements Action {
    readonly type = UPDATE_POST;
    constructor(public payload: PostModel) {}
}

export class ErrorPost implements Action {
    readonly type = ERROR_POST;
    constructor(public payload: string) {}
}

export class ClearErrorPost implements Action {
    readonly type = CLEAR_ERROR_POST;
}

export type PostsActions =
                AddPost |
                OnAddPost |
                FetchPosts |
                OnFetchPosts |
                DeletePost |
                OnDeletePost |
                OnUpdatePost |
                UpdatePost |
                ErrorPost |
                ClearErrorPost;
