import { createSlice } from '@reduxjs/toolkit';
import { loginWithFirebase } from './thunks';

export const initialState = {
    auth: false,
    isFetching: false,
    error: '',
};

export const sharedSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginWithFirebase.pending, (state) => {
            state.isFetching = true;
        }),
        builder.addCase(loginWithFirebase.rejected, (state, action) => {
            state.isFetching = false;
            state.error = action.error.message;
        }),
        builder.addCase(loginWithFirebase.fulfilled, (state, action) => {
            state.auth = true;
            state.isFetching = false;
        });
    }
})

export default sharedSlice.reducer
