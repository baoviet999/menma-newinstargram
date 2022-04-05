import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './App/store';
import AuthContextProvider from './Context/authContext';
import PostContextProveider from './Context/postContext';
import StoryContextProvider from './Context/storyContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <StoryContextProvider>
                    <PostContextProveider>
                        <AuthContextProvider>
                            <App />
                            <ToastContainer />
                        </AuthContextProvider>
                    </PostContextProveider>
                </StoryContextProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
