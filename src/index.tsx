import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { store } from './App/store';
import AuthContextProvider from './Context/authContext';
import PostContextProveider from './Context/postContext';
import StoryContextProvider from './Context/storyContext';
import './index.css';
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <StoryContextProvider>
                    <PostContextProveider>
                        <AuthContextProvider>
                            <App />
                        </AuthContextProvider>
                    </PostContextProveider>
                </StoryContextProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
