import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../App/hook';
//Context
import { authContext } from '../../Context/authContext';
import { selectUser } from '../../feature/auth/authSlice';
import { postActions } from '../../feature/CreatePost/postSlice';
//Img
import { IoCloseCircle } from 'react-icons/io5';
import logo from '../../assets/images/insta.png';
import { ReactComponent as Search } from '../../assets/svg/search.svg';
import SearchDrop from '../DropModal/SearchDrop/SearchDrop';
import { ACCOUNT_ACTION, HEADER_ICON } from '../../data/HeaderIcon';

import './Header.scss';
import Toast from '../Toast/Toast';

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
    const handleOption = (options: string) => {
        switch (options) {
            case 'logout':
                logOut(user.data._id);
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

    return (
        <div className='header'>
            <div className='grid wide'>
                <div className='row'>
                    <div className='col l-7-5'>
                        <div className='header__left'>
                            <div className='header__logo' onClick={() => navigate('/home')}>
                                <img src={logo} alt='' />
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
                    <div className='col l-4-5'>
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
        </div>
    );
};

export default Header;
