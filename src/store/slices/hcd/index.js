import { createSlice } from '@reduxjs/toolkit';
import { loginWithFirebase } from './thunks';

export const initialState = {
    isFetching: false,
    hcd: {},
};

export const sharedSlice = createSlice({
    name: 'hcd',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})

export default sharedSlice.reducer
