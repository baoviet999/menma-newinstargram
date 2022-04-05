import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../feature/auth/authSlice';
import postReducer from '../feature/CreatePost/postSlice';
import storyReducer from '../feature/StoryPage/storySlice';
import rootSaga from './rootSaga';
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        story : storyReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
