import React from 'react';
import { Navigate } from 'react-router-dom';
const LandingPage = () => {
    return (
        <div>
            <Navigate to='/auth/login' />
        </div>
    );
};

export default LandingPage;
