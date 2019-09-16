import { UserModel } from './../models/user.model';
import { Action } from '@ngrx/store';


export const START_AUTH = '[Auth] Http post request for login or register';
export const SUCCESS_AUTH = '[Auth] Successful authentiaction';
export const ERROR_AUTH = '[Auth] Error in authenticating';
export const AUTO_LOGIN = '[Auth] Auto login if user in localstorage';
export const LOG_OUT = '[Auth] Loging out';
export const CLEAR_ERROR = '[Auth] Clear error msg';

export class StartAuth implements Action {
    readonly type = START_AUTH;
    constructor(public payload: {email: string, password: string, login: boolean}) {}
}

export class SuccessAuth implements Action {
    readonly type = SUCCESS_AUTH;
    constructor(public payload: UserModel) {}
}

export class AuthError implements Action {
    readonly type = ERROR_AUTH;
    constructor(public payload: string) {}
}

export class Logout implements Action {
    readonly type = LOG_OUT;
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActionsTypes = SuccessAuth | AuthError | StartAuth | Logout | ClearError | AutoLogin;
