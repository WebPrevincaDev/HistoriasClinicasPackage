import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../helpers/firebase/firebaseconfig.js";

export const loginWithFirebase = createAsyncThunk(
  "auth/loginWithFirebase",
  async (params) => {
    const response = await signInWithEmailAndPassword(
      auth,
      params.email,
      params.password
    );
    return response;
  }
);
