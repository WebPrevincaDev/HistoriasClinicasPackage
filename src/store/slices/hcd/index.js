import { createSlice } from "@reduxjs/toolkit";
import { setHcdConfig } from "./thunks";

export const initialState = {
  isLoading: false,
  error: "",
  hcdConfig: null,
  hcd: null,
};

export const sharedSlice = createSlice({
  name: "hcd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setHcdConfig.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.hcdConfig = null;
      })
      .addCase(setHcdConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(setHcdConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hcdConfig = action.payload;
      });
  },
});

export default sharedSlice.reducer;
