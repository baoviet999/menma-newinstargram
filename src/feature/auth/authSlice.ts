import { RootState } from './../../App/store';
import { createSlice } from '@reduxjs/toolkit';
import { TOKEN } from '../../constants/common';

interface AuthState {
    authLoading: boolean;
    isAuthenticate: boolean;
    user: any;
    allUser : any
}

const initialState: AuthState = {
    authLoading: true,
    isAuthenticate: false,
    user: {},
    allUser : []
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkUserFail(state) {
            state.authLoading = false;
            state.isAuthenticate = false;
        },
        checkUserSuccess(state, actions) {
            state.authLoading = false;
            state.isAuthenticate = true;
            state.user = actions.payload;
        },
        getAllUser(state, actions) {
            state.allUser = actions.payload;
        },
        logout(state) {
            localStorage.removeItem(TOKEN)
            state.isAuthenticate = false;

        }
    },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticate;
export const selectAuthLoading = (state: RootState) => state.auth.authLoading;
