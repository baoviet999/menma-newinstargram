import { AnimatePresence } from 'framer-motion';
import React from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'swiper/css';
import LandingPage from './components/layout/LandingPage/LandingPage';
import ProfilePost from './components/layout/ProfilePost/ProfilePost';
import ProfileSave from './components/layout/ProfileSave/ProfileSave';
import ProfileTag from './components/layout/ProfileTag/ProfileTag';
import MotionPage from './components/MotionPage/MotionPage';
import PrivateRoute from './components/Router/PrivateRoute';
import Auth from './feature/auth/AuthPage';
import Login from './feature/auth/components/Login/Login';
import Register from './feature/auth/components/Register/Register';
import CreateStory from './feature/CreateStory/CreateStory';
import Home from './feature/home/Home';
import Profile from './feature/Profile/Profile';
import StoryPage from './feature/StoryPage/StoryPage';
import UploadImg from './feature/UploadImg/UploadImg';
import './scss/index.scss';

function App() {
    const location = useLocation();

    return (
        <AnimatePresence><ToastContainer />
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<LandingPage />} />
                <Route path='auth' element={<Auth />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>
                <Route path='home' element={<PrivateRoute Component={Home} />} />
                <Route
                    path='/story/:id'
                    element={
                        <MotionPage>
                            <StoryPage />
                        </MotionPage>
                    }
                />
                <Route
                    path='/update'
                    element={
                        <MotionPage>
                            <UploadImg />
                        </MotionPage>
                    }
                />
                <Route
                    path='/create'
                    element={
                        <MotionPage>
                            <CreateStory />
                        </MotionPage>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <MotionPage>
                            <Profile />
                        </MotionPage>
                    }
                >
                    <Route
                        path='post'
                        element={
                            <MotionPage>
                                <ProfilePost />
                            </MotionPage>
                        }
                    />
                    <Route
                        path='save'
                        element={
                            <MotionPage>
                                <ProfileSave />
                            </MotionPage>
                        }
                    />
                    <Route
                        path='tag'
                        element={
                            <MotionPage>
                                <ProfileTag />
                            </MotionPage>
                        }
                    />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

export default App;
