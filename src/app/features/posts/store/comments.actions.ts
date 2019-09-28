import { CommentsModel } from './../models/comments.model';
import { Action } from '@ngrx/store';

export const ADD_COMMENT = '[Comments] Add a comment';
export const FETCH_COMMENTS = '[Comments] Fetch comments';
export const ON_ADD_COMMENT = '[Comments] On add comment';

export class AddComment implements Action {
    readonly type = ADD_COMMENT;
    constructor(public payload: CommentsModel) {}
}
export class FetchComments implements Action {
    readonly type = FETCH_COMMENTS;
    constructor(public payload: string) {}
}
export class OnAddComment implements Action {
    readonly type = ON_ADD_COMMENT;
    constructor(public payload: CommentsModel) {}
}

export type CommentsActions = AddComment | FetchComments | OnAddComment;

