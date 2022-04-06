import { AnimatePresence } from 'framer-motion';
import React from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'swiper/css';
import Router from './Router';
import './scss/index.scss';

function App() {
    return (
        <AnimatePresence>
            <ToastContainer />
            <Router />
        </AnimatePresence>
    );
}

export default App;
