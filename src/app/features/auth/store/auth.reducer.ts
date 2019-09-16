import * as fromAuthActions from './auth.actions';
import { UserModel } from './../models/user.model';

export interface State {
    user: UserModel;
    error: string;
    loading: boolean;
}

const intialState: State = {
    user: null,
    error: null,
    loading: false,
};

export function authReducer(state = intialState, action: fromAuthActions.AuthActionsTypes) {
    switch (action.type) {
        case fromAuthActions.SUCCESS_AUTH:
            return {
                ...state,
                user: action.payload,
                error: null,
                loading: false,
            };
        case fromAuthActions.START_AUTH:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case fromAuthActions.ERROR_AUTH:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case fromAuthActions.LOG_OUT:
            return {
                ...state,
                user: null,
                error: null,
            };
        case fromAuthActions.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

