import { AnimatePresence } from 'framer-motion';
import React from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'swiper/css';
import Router from './Router';
import './scss/index.scss';
import Tab from './feature/Tab/Tab'
function App() {
    return (
        <AnimatePresence>
            <ToastContainer />
            <Router />
        </AnimatePresence>
        // <Tab/>
    );
}

export default App;
