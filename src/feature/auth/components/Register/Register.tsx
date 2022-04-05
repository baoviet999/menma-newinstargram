import React, { useContext, useState } from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import download1 from '../../../../assets/images/appstore.png';
import download2 from '../../../../assets/images/google.png';
import logo from '../../../../assets/images/instargram.jpg';
import { authContext } from '../../../../Context/authContext';
import './Register.scss';

const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        fullname: '',
        nickname: '',
        confirm: '',
    });

    const handleFormChange = (e: any) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        });
    };

    const { userRegister } = useContext(authContext);

    const handleRegister = async () => {
        const { username, password, confirm, fullname, nickname } = registerForm;
        // if (password !== confirm) return;
        await userRegister({
            username,
            fullname,
            nickname,
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
                    <div className='auth__login'>
                        <div className='auth__input'>
                            <input
                                type='text'
                                placeholder='Số điện thoại, tên người dùng hoặc email'
                                name='username'
                                value={registerForm.username}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div className='auth__input'>
                            <input
                                type='text'
                                placeholder='Tên đầy đủ '
                                name='fullname'
                                value={registerForm.fullname}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className='auth__input'>
                            <input
                                type='text'
                                placeholder='Tên người dùng '
                                name='nickname'
                                value={registerForm.nickname}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className='auth__input'>
                            <input
                                type='password'
                                placeholder='Mật khẩu'
                                name='password'
                                value={registerForm.password}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className='auth__btn' onClick={handleRegister}>
                            Đăng Ký
                        </div>
                    </div>
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
                        Bạn đã có tài khoản? <Link to='/auth/login'>Đăng nhập ngay</Link>
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

export default Register;
