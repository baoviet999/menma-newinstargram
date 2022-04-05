import React, { useContext, useState } from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import download1 from '../../../../assets/images/appstore.png';
import download2 from '../../../../assets/images/google.png';
import logo from '../../../../assets/images/insta.png';
import { authContext } from '../../../../Context/authContext';
import './Login.scss';

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });
    //handle input
    const handleFormChange = (e: any) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };

    const { userLogin } = useContext(authContext);
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { username, password } = loginForm;
        await userLogin({
            username,
            password,
        });
    };

    return (
        <div className='auth__form'>
            <div className='auth__inner'>
                <div className='auth__top'>
                    <div className='auth__logo'>
                        <img src={logo} alt='' />
                    </div>
                    <form onSubmit={handleSubmit} className='auth__login'>
                        <div className='auth__input'>
                            <input
                                type='text'
                                placeholder='Số điện thoại, tên người dùng hoặc email'
                                value={loginForm.username}
                                onChange={handleFormChange}
                                name='username'
                            />
                        </div>
                        <div className='auth__input'>
                            <input
                                type='password'
                                placeholder='Mật khẩu'
                                value={loginForm.password}
                                onChange={handleFormChange}
                                name='password'
                            />
                        </div>
                        <button type='submit' className='auth__btn'>
                            Đăng nhập
                        </button>
                    </form>
                    <div className='auth__or'>
                        <span>Hoặc</span>
                    </div>
                    <div className='auth__facebook'>
                        <AiFillFacebook />
                        Đăng nhập bằng facebook
                    </div>
                    <div className='auth__fogot'>
                        <span>Quên mật khẩu?</span>
                    </div>
                </div>
                <div className='auth__bottom'>
                    <p>
                        Bạn chưa có tài khoản ư? <Link to='/auth/register'>Đăng ký</Link>
                    </p>
                </div>
                <div className='auth__end'>
                    <span>Tải ứng dụng</span>
                    <div className='auth__end-img'>
                        <img src={download1} alt='' />
                        <img src={download2} alt='' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
