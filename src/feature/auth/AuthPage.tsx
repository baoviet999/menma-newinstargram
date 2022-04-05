import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import BeatLoader from 'react-spinners/ClipLoader';
import { useAppSelector } from '../../App/hook';
import login1 from '../../assets/images/login1.png';
import login2 from '../../assets/images/login2.png';
import login3 from '../../assets/images/login3.png';
import login4 from '../../assets/images/login4.png';
import loginBackGround from '../../assets/images/phone-login.png';
import { FOOTER_ITEM } from '../../data/footerItem';
import './auth.scss';
import { selectAuthLoading, selectIsAuthenticated } from './authSlice';

const AuthPage = () => {

    const containerVariant = {
        hidden: {
            x: '-100vw',
        },
        visible: {
            x: '0vw',
            transition: {
                // delay: 0.3,
                duration : 0.5
            }
        },
        end: {
            x: '100vw',
        },
    };
    // CHANGE image
    const imgs = [login1, login2, login3, login4];
    const [activeImg, setActiveImg] = useState<number>(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveImg((prev: any) => {
                if (prev < imgs.length - 1) {
                    return prev + 1;
                }
                return 0;
            });
        }, 3000);
        return () => clearInterval(timer);
    }, [imgs.length]);
    // nếu isAuthenticated thì sẽ redirect về home
    const isAuthenticate = useAppSelector(selectIsAuthenticated);
    const authLoading = useAppSelector(selectAuthLoading);

    let body;
    if (authLoading) {
        body = (
            <div className='auth__loader'>
                <BeatLoader size={50} color='#F56040' />
            </div>
        );
    } else if (isAuthenticate) {
        return <Navigate to='/home' />;
    } else
        body = (
            <>
                <motion.div variants={containerVariant} initial='hidden' animate='visible' exit='end'  className='auth'>
                    <div className='grid wide'>
                        <div className='row '>
                            <div className='col l-6 m-0 c-0'>
                                <div
                                    className='auth__banner'
                                    style={{ backgroundImage: `url(${loginBackGround})` }}
                                >
                                    <div className='auth__banner-img'>
                                        <img src={imgs[activeImg]} alt='' />
                                    </div>
                                </div>
                            </div>
                            <div className='col l-6 m-12 c-12'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </motion.div>
                <div className='auth__footer'>
                    <ul className=' grid wide auth__footer-items'>
                        {FOOTER_ITEM.map((item, idx) => (
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
            </>
        );

    return <div className='auth__wrap'>{body}</div>;
};

export default AuthPage;
