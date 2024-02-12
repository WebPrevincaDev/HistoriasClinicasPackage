import { createSlice } from "@reduxjs/toolkit";
import { login } from "./thunks";

// user
/* {
  cierre
  firma: { id: string id, uri: string base64 }
  mail
  matricula
  nombre
} */

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
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
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

export const { logout, updateUser } = sharedSlice.actions;

export default sharedSlice.reducer;
