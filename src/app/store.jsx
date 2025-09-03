import {configureStore} from '@reduxjs/toolkit';
import postsReducer from '../Features/Posts/postsSlice';
import usersReducer from '../Features/Users/usersSLice';

export const store = configureStore({
    reducer: {
    posts: postsReducer,
    users: usersReducer,
    },
});