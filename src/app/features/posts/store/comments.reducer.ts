import { CommentsModel } from './../models/comments.model';
import { CommentsActions, ADD_COMMENT } from './comments.actions';

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
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };
        default:
            return state;
    }
}
