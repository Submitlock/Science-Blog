import { CommentsModel } from './../models/comments.model';
import { Action } from '@ngrx/store';

export const ON_ADD_COMMENT = '[Comments] On add comment';
export const ADD_COMMENT = '[Comments] Add a comment';
export const ON_FETCH_COMMENTS = '[Comments] On Fetch comments';
export const FETCH_COMMENTS = '[Comments] Fetch comments';
export const ON_DELETE_COMMENT = '[Comments] On delete comment';
export const DELETE_COMMENT = '[Comments] Delete comment';

export class OnAddComment implements Action {
    readonly type = ON_ADD_COMMENT;
    constructor(public payload: CommentsModel) {}
}
export class AddComment implements Action {
    readonly type = ADD_COMMENT;
    constructor(public payload: CommentsModel) {}
}
export class OnFetchComments implements Action {
    readonly type = ON_FETCH_COMMENTS;
    constructor(public payload: string) {}
}
export class FetchComments implements Action {
    readonly type = FETCH_COMMENTS;
    constructor(public payload: CommentsModel[]) {}
}
export class OnDeleteComment implements Action {
    readonly type = ON_DELETE_COMMENT;
    constructor(public payload: CommentsModel) {}
}
export class DeleteComment implements Action {
    readonly type = DELETE_COMMENT;
    constructor(public payload: string) {}
}

export type CommentsActions = AddComment | FetchComments | OnAddComment | OnFetchComments | OnDeleteComment | DeleteComment;

