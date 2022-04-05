import React, { useContext, useEffect, useState } from 'react';
import BoderLinear from '../BorderLinear/BoderLinear';
import user1 from '../../assets/images/user1.jpg';
import { ReactComponent as Options } from '../../assets/svg/Option.svg';
import { ReactComponent as Like } from '../../assets/svg/Like.svg';
import { ReactComponent as Comment } from '../../assets/svg/Comment.svg';
import { ReactComponent as Share } from '../../assets/svg/Share.svg';
import { ReactComponent as BookMaker } from '../../assets/svg/BookMark.svg';
import { ReactComponent as MiniHeart } from '../../assets/svg/MiniHeart.svg';
import { ReactComponent as CommentLogo } from '../../assets/svg/CommentLogo.svg';
import TimeAgo from 'react-timeago';
import './Posts.scss';
import { postContext } from '../../Context/postContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { selectUser } from '../../feature/auth/authSlice';
import { useAppSelector } from '../../App/hook';
import { authContext } from '../../Context/authContext';

interface PostProps {
    data: {
        _id: string;
        title?: string;
        description?: string;
        security?: string;
        image?: string;
        user?: any;
        createdAt?: string;
        commentList?: {
            comment: string[];
            user: {
                username: string;
                id : string
            }[];
        };
    };
}

const Posts = ({ data }: PostProps) => {
    const { deletePost } = useContext(postContext);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        await deletePost(data._id);
        setLoading(false);
    };

    const [commentForm, setCommentForm] = useState('');

    const { handleComment } = useContext(postContext);

    const userHasLOg = useAppSelector(selectUser)
    console.log("userHasLOg: ", userHasLOg);


    const handleSubmitComment = async () => {
        const newPost = await handleComment({
            newComment: commentForm,
            userCommentId: userHasLOg.data._id,
            postId: data._id,
        });
    };
    console.log(data);
    const { commentList } = data;

    return (
        <div className='post'>
            <div className='post__header'>
                <div className='post__header--user'>
                    <BoderLinear
                        width='32px'
                        height='32px'
                        image={data.user.avatar ? data.user.avatar : user1}
                    />
                    <span>{data.user.nickname}</span>
                </div>
                <div className='post__header--options' onClick={handleDelete}>
                    <Options />
                </div>
            </div>
            <div className='post__content'>
                <div className='post__content-img'>
                    <LazyLoadImage
                        src={data.image ? data.image : user1}
                        width='100%'
                        height='100%'
                        alt='main-img'
                        effect='blur'
                    />
                </div>
            </div>
            <div className='post__footer'>
                <div className='post__like'>
                    <div className='post__like--left'>
                        <div className='post__like-icon'>
                            <Like />
                        </div>
                        <div className='post__like-icon'>
                            <Comment />
                        </div>
                        <div className='post__like-icon'>
                            <Share />
                        </div>
                    </div>
                    <div className='post__like--right'>
                        <div className='post__like-icon'>
                            <BookMaker />
                        </div>
                    </div>
                </div>
                <div className='post__total'>
                    <span>4,363,234 lượt thích</span>
                </div>
                <div className='post__desc'>
                    <span>{data.user.nickname}</span>
                    <p>{data.title}</p>
                </div>
                <div className='post__totalcomment'>
                    <span>Xem tất cả 47,689 bình luận</span>
                </div>
                <div className='post__newcomment'>
                    {commentList?.comment.slice(-2).map((item, idx) => (
                        <div className='post__comment-first'>
                            <div className='post__desc'>
                                <span>{commentList.user.slice(-2)[idx].username}</span>
                                <p>{item}</p>
                            </div>
                            <MiniHeart />
                        </div>
                    ))}
                </div>
                <div className='post__timer'>
                    <TimeAgo date={data.createdAt} />
                </div>
            </div>
            <div className='post__comment'>
                <div className='post__comment--logo'>
                    <CommentLogo />
                </div>
                <div className='post__comment--input'>
                    <input type='text' value={commentForm} onChange={(e) => setCommentForm(e.target.value)} />
                </div>
                <div className='post__comment--submit' onClick={handleSubmitComment}>
                    Đăng
                </div>
            </div>
        </div>
    );
};

export default Posts;
