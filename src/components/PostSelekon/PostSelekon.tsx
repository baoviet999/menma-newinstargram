import React, { useContext, useState } from 'react';
import BoderLinear from '../BorderLinear/BoderLinear';
import user1 from '../../assets/images/user1.jpg';
import { ReactComponent as Options } from '../../assets/svg/Option.svg';
import { ReactComponent as Like } from '../../assets/svg/Like.svg';
import { ReactComponent as Comment } from '../../assets/svg/Comment.svg';
import { ReactComponent as Share } from '../../assets/svg/Share.svg';
import { ReactComponent as BookMaker } from '../../assets/svg/BookMark.svg';
import { ReactComponent as MiniHeart } from '../../assets/svg/MiniHeart.svg';
import '../Posts/Posts.scss';
import { postContext } from '../../Context/postContext';
import './PostSelekon.scss';

const PostSelekon = () => {
    return (
        <div className='post'>
            <div className='post__header'>
                <div className='post__header--user selekon-header' style={{ width: '100%' }}>
                    <div
                        className='selekon'
                        style={{ borderRadius: '50%', width: '32px', height: '32px', marginRight: '6px' }}
                    ></div>
                    <div className='selekon-name'>
                        <span
                            style={{ display: 'block', width: '35%', marginBottom: '3px' }}
                            className='selekon-text selekon'
                        ></span>
                        <span
                            style={{ display: 'block', width: '30%' }}
                            className='selekon-text selekon'
                        ></span>
                    </div>
                </div>
            </div>
            <div className='post__content selekon'>
                <div className='post__content-img selekon-img'></div>
            </div>
            <div className='post__footer' style={{ paddingBottom: '40px' }}>
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
                <div className='post__total selekon-text selekon' style={{ width: '30%' }}>
                    <span className=''></span>
                </div>
                <div className='post__desc selekon-text selekon' style={{ width: '30%' }}>
                    <span></span>
                    <p></p>
                </div>
                <div className='post__totalcomment selekon-text selekon'>
                    <span></span>
                </div>
                <div className='post__newcomment'>
                    <div className='post__comment-first'>
                        <div className='post__desc selekon-text selekon'>
                            <span></span>
                            <p></p>
                        </div>
                        <MiniHeart />
                    </div>
                    <div className='post__comment-first'>
                        <div className='post__desc selekon-text selekon'>
                            <span></span>
                            <p></p>
                        </div>
                        <MiniHeart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostSelekon;
