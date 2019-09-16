import { PostModel } from './../models/post.model';
import * as postsActions from './posts.actions';

export interface State {
    posts: PostModel[];
    loading: boolean;
    error: string;
}
const initialState: State = {
    posts: [],
    loading: false,
    error: null,
};

export function PostsReducer(state = initialState, action: postsActions.PostsActions) {
    switch (action.type) {
        case postsActions.ON_ADD_POST:
            return {
                ...state,
                loading: true,
            };
        case postsActions.ADD_POST:
            return {
                ...state,
                loading: false,
                posts: [...state.posts, action.payload]
            };
        case postsActions.ON_FETCH_POSTS:
            return {
                ...state,
                loading: true,
            };
        case postsActions.FETCH_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            };
        case postsActions.ON_DELETE_POST:
            return {
                ...state,
                loading: true,
            };
        case postsActions.DELETE_POST:
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(v => v.id !== action.payload)
            };
        case postsActions.ON_UPDATE_POST:
            return {
                ...state,
                loading: true,
            };
        case postsActions.UPDATE_POST:
            const posts = [...state.posts];
            const updatedPost = action.payload;
            const index = posts.findIndex( v => v.id === updatedPost.id);
            posts[index] = updatedPost;
            return {
                ...state,
                loading: false,
                posts
            };
        default:
            return state;
    }
}
