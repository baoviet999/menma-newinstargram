import React from 'react';
import { useAppSelector } from '../../App/hook';
import { selectIsAuthenticated } from '../../feature/auth/authSlice';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }: any) => {
    const isAuthenticate = useAppSelector(selectIsAuthenticated);

    return isAuthenticate ? <Component /> : <Navigate to='/auth/login' />;
};

export default PrivateRoute;
