export interface ServerResponse<T> {
    message: string;
    success: boolean;
    data ?: T[];
}

export interface PostSingleResponse {
    message: string;
    success: boolean;
    data?: DataPostResponse;
}

export interface DataPostResponse {
    _id: string;
    title: string;
    description?: string;
    security?: 'onlyme' | 'public' | 'friend';
    image?: string;
    createdAt?: string;
    user: UserResponse;
    commentList?: {
        comment: string[],
        user : string[]
    }
}


export interface UserResponse {
    _id: string;
    username: string;
    fullname: string;
    nickname: string;
    avatar?: string;
    createdAt: string;
}

export interface AuthForm {
    username: string;
    password: string;
    nickname?: string;
    fullname?: string;
   
}

export interface Post {
    title: string;
    description?: string;
    security?: 'onlyme' | 'public' | 'friend';
    image?: string;
    createdAt?: string;
}

export interface User {
    _id: string;
    username: string;
    createAt: string;
    updateAt: string;
}


export interface CommentForm {
    newComment: string;
    userCommentId: string;
    postId : string
}