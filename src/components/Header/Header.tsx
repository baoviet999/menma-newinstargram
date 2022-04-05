import React, { useContext, useEffect, useRef, useState } from 'react';
//Img
import { IoCloseCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../App/hook';
import logo from '../../assets/images/insta.png';
import { ReactComponent as Search } from '../../assets/svg/search.svg';
import { ReactComponent as Camera } from '../../assets/svg/Camera.svg';
import { ReactComponent as Mess } from '../../assets/svg/Mess.svg';
//Context
import { authContext } from '../../Context/authContext';
import { ACCOUNT_ACTION, HEADER_ICON } from '../../data/HeaderIcon';
import { selectUser } from '../../feature/auth/authSlice';
import { postActions } from '../../feature/CreatePost/postSlice';
import SearchDrop from '../DropModal/SearchDrop/SearchDrop';
import './Header.scss';

const Header = () => {
    // handle open account list
    const [openAccount, setOpenAccount] = useState(false);
    const iconRef = useRef<any>();
    const modalRef = useRef<any>();

    useEffect(() => {
        const handleModalAcc = (e: any) => {
            if (iconRef.current && iconRef.current.contains(e.target)) {
                setOpenAccount(!openAccount);
            } else if (modalRef.current && !modalRef.current.contains(e.target)) {
                setOpenAccount(false);
            }
        };
        document.addEventListener('mousedown', handleModalAcc);
        return () => document.removeEventListener('mousedown', handleModalAcc);
    });
    // handle open search input
    const [activeInput, setActiveInput] = useState(false);
    const inputRef = useRef<any>();
    const contentRef = useRef<any>();
    const user = useAppSelector(selectUser);
    useEffect(() => {
        const handleToggle = (e: any) => {
            if (inputRef.current && inputRef.current.contains(e.target)) {
                setActiveInput(!activeInput);
            } else {
                if (contentRef.current && !contentRef.current.contains(e.target)) {
                    setActiveInput(false);
                }
            }
        };
        document.addEventListener('mousedown', handleToggle);
        return () => document.removeEventListener('mousedown', handleToggle);
    }, [activeInput]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { logOut, checkUser } = useContext(authContext);

    // handle chức năng các icon trên header
    const handleOpenPost = (name: string) => {
        switch (name) {
            case 'post':
                dispatch(postActions.setModal(true));
                break;
            default:
                break;
        }
    };
    // handle các option trong accound list
    const [loading, setLoading] = useState(false);
    const handleOption = (options: string) => {
        switch (options) {
            case 'logout':
                setLoading(true);
                logOut(user.data._id);
                setLoading(false);
                break;
            case 'account':
                navigate('/profile/post');
                break;
            default:
                break;
        }
    };
    //Mỗi lần vào header check lại user để lấy lại dữ liệu lúc f5 page
    useEffect(() => {
        checkUser();
    }, []);

    const [progress, setProgress] = useState(0);

    useEffect(() => {});
    const updateProgress = () => {
        const windowHeight: number = window.innerHeight;
        const documentFullHeight: number = document.body.clientHeight;
        const scroll: number = window.scrollY;
        const pecentsScrolled: number = (scroll / (documentFullHeight - windowHeight)) * 100;
        setProgress(pecentsScrolled);
    };

    useEffect(() => {
        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className='header'>
            <div className='grid wide header__container'>
                <div className='row'>
                    <div className='col l-7-5 m-7 c-12'>
                        <div className='header__left'>
                            <div className='header__mobile'>
                                <Camera />
                            </div>
                            <div className='header__logo' onClick={() => navigate('/home')}>
                                <img src={logo} alt='' />
                            </div>
                            <div className='header__mobile'>
                                <Mess />
                            </div>
                            <div className={`header__input ${activeInput ? 'active' : ''}`}>
                                <Search />
                                <input ref={inputRef} type='text' placeholder='Tìm kiếm' />
                                <div className='header__input-close' onClick={() => setActiveInput(false)}>
                                    <IoCloseCircle />
                                </div>
                                {activeInput && <SearchDrop ref={contentRef} />}
                            </div>
                        </div>
                    </div>
                    <div className='col l-4-5 m-5 c-12'>
                        <div className='header__right'>
                            {HEADER_ICON.map((item, idx) => (
                                <div
                                    style={{ cursor: 'pointer' }}
                                    key={idx}
                                    className='header__right-icon'
                                    onClick={() => handleOpenPost(item.name)}
                                >
                                    <item.icon />
                                    {item.status === true && <div className='header__noti'></div>}
                                </div>
                            ))}
                            <div className='header__right-icon' style={{ cursor: 'pointer' }}>
                                <img src={user.data.avatar} alt='' ref={iconRef} />
                                {openAccount && (
                                    <>
                                        <div className='header__right-icon--arrow'></div>
                                        <div className='header__right-acc--modal' ref={modalRef}>
                                            {ACCOUNT_ACTION.map((item, idx) => (
                                                <div
                                                    className='header__right-acc--icon'
                                                    key={idx}
                                                    onClick={() => handleOption(item?.action)}
                                                >
                                                    {item.icon && <item.icon />}
                                                    <span>{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='header__indicator' style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default Header;
