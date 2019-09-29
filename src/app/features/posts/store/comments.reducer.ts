import { CommentsModel } from './../models/comments.model';
import { CommentsActions, ADD_COMMENT, FETCH_COMMENTS, ON_ADD_COMMENT, ON_FETCH_COMMENTS, ON_DELETE_COMMENT, DELETE_COMMENT } from './comments.actions';

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

export function CommentsReducer(state = initialState, action: CommentsActions) {
    switch (action.type) {
        case ON_ADD_COMMENT:
            return {
                ...state,
                loading: true
            };
        case ADD_COMMENT:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, action.payload]
            };
        case ON_FETCH_COMMENTS:
            return {
                ...state,
                loading: true
            };
        case FETCH_COMMENTS:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, ...action.payload]
            };
        case ON_DELETE_COMMENT:
            return {
                ...state,
                loading: true,
            };
        case DELETE_COMMENT:
            return {
                ...state,
                loading: false,
                comments: state.comments.filter( v => v.commentID !== action.payload)
            };
        default:
            return state;
    }
}
