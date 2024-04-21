import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status : false,
    isAdmin: false,
    userData: null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        checkAdmin: (state) =>{
            state.isAdmin = true;
        },
        disableAdmin : (state) => {
            state.isAdmin = false;
        }
    }
})

export const {login, logout, checkAdmin, disableAdmin } = authSlice.actions;

export default authSlice.reducer;