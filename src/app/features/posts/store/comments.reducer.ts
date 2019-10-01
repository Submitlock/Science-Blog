import { CommentsModel } from './../models/comments.model';
import * as fromCommentsActions from './comments.actions';
export interface State {
    comments: CommentsModel[];
    loading: boolean;
    error: string;
}

const initialState: State = {
    comments: [],
    loading: false,
    error: null,
};

export function CommentsReducer(state = initialState, action: fromCommentsActions.CommentsActions) {
    switch (action.type) {
        case fromCommentsActions.ON_ADD_COMMENT:
            return {
                ...state,
                loading: true
            };
        case fromCommentsActions.ADD_COMMENT:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, action.payload]
            };
        case fromCommentsActions.ON_FETCH_COMMENTS:
            return {
                ...state,
                loading: true
            };
        case fromCommentsActions.FETCH_COMMENTS:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, ...action.payload]
            };
        case fromCommentsActions.ON_DELETE_COMMENT:
            return {
                ...state,
                loading: true,
            };
        case fromCommentsActions.DELETE_COMMENT:
            return {
                ...state,
                loading: false,
                comments: state.comments.filter( v => v.commentID !== action.payload)
            };
        case fromCommentsActions.ERROR_COMMENT:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };
        case fromCommentsActions.CLEAR_ERROR_COMMENT:
                return {
                    ...state,
                    loading: false,
                    error: null
                };
        default:
            return state;
    }
}
