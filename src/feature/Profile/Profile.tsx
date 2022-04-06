import React, { useContext, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../App/hook';
import { ReactComponent as PostMenu } from '../../assets/svg/PostMenu.svg';
import { ReactComponent as ProfileSetting } from '../../assets/svg/ProfileSetting.svg';
import { ReactComponent as SaveMenu } from '../../assets/svg/SaveMenu.svg';
import { ReactComponent as TagMenu } from '../../assets/svg/TagMenu.svg';
import Header from '../../components/Header/Header';
import { authContext } from '../../Context/authContext';
import { FOOTER_ITEM } from '../../data/footerItem';
import { selectUser } from '../auth/authSlice';
import './Profile.scss';

const Profile = () => {
    const { checkUser } = useContext(authContext);
    const { data } = useAppSelector(selectUser);
    useEffect(() => {
        checkUser();
    }, []);
    return (
        <div className='profile'>
            <Header />
            <div className='profile__wrap'>
                <div className='grid wide'>
                    <div className='row'>
                        <div className='col l-4-5'>
                            <div className='profile__img'>
                                <LazyLoadImage src={data?.avatar} effect='blur' width='100%' height='100%' />
                            </div>
                        </div>
                        <div className='col l-7-5'>
                            <div className='profile__info'>
                                <div className='profile__nickname'>
                                    <h2>{data?.nickname}</h2>
                                    <div className='profile__setting'>
                                        <span>Chỉnh sửa trang cá nhân</span>
                                    </div>
                                    <div className='profile__setting-icon'>
                                        <ProfileSetting />
                                    </div>
                                </div>
                                <div className='profile__follow'>
                                    <div className='profile__follow-post'>
                                        <span>1</span> Bài Viêt
                                    </div>
                                    <div className='profile__follow-post'>
                                        <span>1 </span> Người theo dõi
                                    </div>
                                    <div className='profile__follow-post'>
                                        Đang theo dõi <span>30</span> người dùng
                                    </div>
                                </div>
                                <div className='profile__name'>
                                    <h4>{data?.fullname}</h4>
                                </div>
                            </div>
                        </div>
                        <div className='col l-12'>
                            <ul className='profile__menu'>
                                <li>
                                    <NavLink
                                        to='post'
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                    >
                                        <PostMenu />
                                        BÀI VIÊT
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='save'
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                    >
                                        <SaveMenu />
                                        ĐÃ LƯU
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='tag'
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                    >
                                        <TagMenu />
                                        ĐƯỢC GẮN THẺ
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className='col l-12'>
                            <Outlet />
                        </div>
                        <div className='col l-12'>
                            <div className='auth__footer'>
                                <ul className=' grid wide auth__footer-items'>
                                    {FOOTER_ITEM.slice(0, 10).map((item, idx) => (
                                        <li key={idx} className='auth__footer-item'>
                                            <a href='#'>{item}</a>
                                        </li>
                                    ))}
                                </ul>
                                <ul className='auth__footer-bt'>
                                    <li>
                                        <a href='#'>Tiếng Việt</a>
                                    </li>
                                    <li>
                                        <a href='#'>© 2022 Instagram from Meta</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
