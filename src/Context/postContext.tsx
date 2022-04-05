import axios from 'axios';
import { createContext, ReactNode } from 'react';
import { useAppDispatch } from '../App/hook';
import { URL } from '../constants/common';
import { postActions } from '../feature/CreatePost/postSlice';
import { CommentForm, DataPostResponse, Post, PostSingleResponse, ServerResponse } from '../models/common';

// initial value cho context
export const postContext = createContext({
    getPost() {},
    createPost(form: Post) {},
    deletePost(_id: String) {},
    getUserPost: () => {},
    handleComment: (value: CommentForm) => {},
});

interface Response {
    data: ServerResponse<DataPostResponse>;
}

const PostContextProveider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    // Get all post
    const getPost = async () => {
        try {
            const { data }: Response = await axios.get(`${URL}/posts/all`);
            if (data.success) {
                dispatch(postActions.getPostSuccess(data.data));
            }
        } catch (error) {
            dispatch(postActions.getPostFail());
        }
    };
    // get mỗi user p
    const getUserPost = async () => {
        try {
            const { data }: Response = await axios.get(`${URL}/posts`);
            if (data.success) {
                return data.data;
            }
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const createPost = async (postForm: Post) => {
        try {
            const { data }: { data: PostSingleResponse } = await axios.post(`${URL}/posts`, postForm);
            if (data.success) {
                dispatch(postActions.createPostSuccess(data.data));
                return data;
            } else {
                return data;
            }
        } catch (error: any) {
            console.log(error)
            return error.response.data && error.response.data;
        }
    };

    const deletePost = async (_id: string) => {
        try {
            const { data }: { data: PostSingleResponse } = await axios.delete(`${URL}/posts/${_id}`);
            if (data.success && data.data) {
                dispatch(postActions.deletePost(data.data._id));
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const handleComment = async ({ newComment, userCommentId, postId }: CommentForm) => {
        try {
            const { data }: { data: ServerResponse<DataPostResponse> } = await axios.put(
                `${URL}/posts/comment/${postId}`,
                {
                    newComment,
                    userCommentId,
                }
            );
            if (data.success) {
                dispatch(postActions.updateComment(data.data))
            }
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const postContextValue = {
        getPost,
        createPost,
        deletePost,
        getUserPost,
        handleComment,
    };

    return <postContext.Provider value={postContextValue}>{children}</postContext.Provider>;
};

export default PostContextProveider;
