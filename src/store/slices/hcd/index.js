import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    isFetching: false,
    hcd: {},
    hcd_config: {},
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
