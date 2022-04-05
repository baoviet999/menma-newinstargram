import axios from 'axios';
import { createContext, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authApi from '../apis/authApi';
import { TOKEN, URL } from '../constants/common';
import { authActions } from '../feature/auth/authSlice';
import { AuthForm, UserResponse } from '../models/common';
import setHeader from '../utils/setHeader';

export const authContext = createContext({
    userLogin: (form: AuthForm) => {},
    userRegister: (form: AuthForm) => {},
    getAllUser: () => {},
    logOut: (id: string) => {},
    checkUser: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // check token cua user co hop le k => hop le tra ve 1 user
    const checkUser = async () => {
        if (localStorage[TOKEN]) setHeader(localStorage[TOKEN]);
        try {
            const data = await axios.get(`${URL}/auth`);
            if (!data.data.success) return;
            dispatch(authActions.checkUserSuccess(data.data));
        } catch (error) {
            dispatch(authActions.checkUserFail());
        }
    };


    

    const logOut = async (id: string) => {
        const today = new Date();
        console.log(today);
        const data = await axios.put(`${URL}/auth/${id}`, { timeLogOut: today });
        dispatch(authActions.logout());
        navigate('/home');
    };

    const userLogin = async (form: AuthForm) => {
        try {
            const data = await authApi.login(form);
            if (!data.data.success) return;
            localStorage.setItem(TOKEN, data.data.data);
            await checkUser();
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const userRegister = async (form: AuthForm) => {
        try {
            const data = await axios.post(`${URL}/auth/register`, form);
            if (data.data.success) navigate('/auth/login');
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const getAllUser = async () => {
        try {
            const { data }: { data: UserResponse } = await axios.get(`${URL}/auth/all`);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const authContextData = {
        userLogin,
        userRegister,
        getAllUser,
        logOut,
        checkUser,
    };
    useEffect(() => {
        checkUser();
    }, []);
    return <authContext.Provider value={authContextData}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
