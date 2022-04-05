import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../App/store';

interface PostState {
    openModal: boolean;
    posts: any;
    postLoading: boolean;
}

const initialState: PostState = {
    openModal: false,
    posts: [],
    postLoading: true,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setModal(state, actions: PayloadAction<boolean>) {
            state.openModal = actions.payload;
        },
        getPostSuccess(state, actions) {
            state.postLoading = false;
            state.posts = actions.payload;
        },
        getPostFail(state) {
            state.postLoading = true;
        },
        createPostSuccess(state, actions) {
            state.posts = [...state.posts, actions.payload];
        },
        deletePost(state, actions: PayloadAction<String>) {
            const newPosts = state.posts.filter((x: any) => x._id !== actions.payload);
            state.posts = newPosts;
        },
        updateComment(state, actions) {
            state.posts = state.posts.map((item: any) => {
                return item._id === actions.payload._id ? actions.payload : item;
            });
        },
    },
});

export const postActions = postSlice.actions;

const postReducer = postSlice.reducer;
export default postReducer;

export const selectOpenCreatePost = (state: RootState) => state.posts.openModal;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostLoading = (state: RootState) => state.posts.postLoading;
