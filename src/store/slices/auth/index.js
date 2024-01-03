import { createSlice } from "@reduxjs/toolkit";
import { login } from "./thunks";

export const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: "",
  user: null,
};

export const sharedSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.error = "";
        state.user = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

export const { logout } = sharedSlice.actions;

export default sharedSlice.reducer;
