import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useAppSelector } from '../../App/hook';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';
import PostSelekon from '../../components/PostSelekon/PostSelekon';
import User from '../../components/User/User';
import { URL } from '../../constants/common';
import { authContext } from '../../Context/authContext';
import { postContext } from '../../Context/postContext';
import { FOOTER_ITEM } from '../../data/footerItem';
import { selectUser } from '../auth/authSlice';
import CreatePost from '../CreatePost/CreatePost';
import { selectOpenCreatePost, selectPostLoading, selectPosts } from '../CreatePost/postSlice';
import Story from './Components/Story/Story';
import './Home.scss';

const Home = () => {
    const [loading, setLoading] = useState(false);

    const openCreatePost = useAppSelector(selectOpenCreatePost);
    const { getPost } = useContext(postContext);
    const mainUser = useAppSelector(selectUser);
    const posts = useAppSelector(selectPosts);
    const { getAllUser } = useContext(authContext);
    // lúc f5 thì lấy lại post
    useEffect(() => {
        getPost();
    }, []);
    useEffect(() => {
        const timer = setInterval(() => {
            getPost();
        }, 6000);
        return () => clearInterval(timer);
    }, []);
    // post state
    // đảo ngược cho bài post mới nhất lên trên
    const reStatusData = [...posts].reverse();
    const postLoading = useAppSelector(selectPostLoading);

    // lay all user
    const [users, setUsers] = useState<any>([]);
    useEffect(() => {
        (async () => {
            const data: any = await getAllUser();
            setUsers(data.data);
            await axios.put(`${URL}/auth/${data.data.data._id}`, { timeLogOut: '' });
        })();
    }, []);
    // useEffect(() => {
    //     (async () => {

    //         // const data: any = await getAllUser();
    //         // setUsers(data.data);
    //     })();
    // }, [users]);

    // lay ra tat ca user ngoai tru main user
    const excepUser = users.filter((x: any) => x._id !== mainUser.data._id);

    return (
        <div className='home'>
            <Header />
            <div className='grid wide'>
                <div className='row'>
                    <div className='col l-7-5 m-12 c-12'>
                        <div className='main'>
                            {postLoading && (
                                <div className='home__loader'>
                                    <ClipLoader color={'orange'} size={30} />
                                </div>
                            )}
                            <Story />
                            {postLoading ? (
                                <>
                                    <PostSelekon />
                                    <PostSelekon />
                                </>
                            ) : (
                                <>
                                    {reStatusData?.map((post: any, idx: number) => (
                                        <Posts key={idx} data={post} />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className='col l-4-5 m-12 c-0'>
                        <div className='nav'>
                            <div className='nav__user'>
                                <div className='nav__user--avt'>
                                    <img src={mainUser.data.avatar} alt='' />
                                    <div className='nav__user--info'>
                                        <h4>{mainUser.data.nickname}</h4>
                                        <span>{mainUser.data.fullname}</span>
                                    </div>
                                </div>
                                <div className='nav__user--options'>
                                    <span>Chuyển</span>
                                </div>
                            </div>
                            <div className='nav__title'>
                                <h4>Gợi ý cho bạn</h4>
                                <span>Xem tất cả</span>
                            </div>
                            {excepUser.slice(-5).map((user: any, idx: number) => (
                                <User user={user} />
                            ))}
                            <br />
                            <div className='nav__insta'>
                                {FOOTER_ITEM.slice(0, 14).map((item, idx) => (
                                    <span key={idx}>{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openCreatePost && <CreatePost />}
        </div>
    );
};

export default Home;
