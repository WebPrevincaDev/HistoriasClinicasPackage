import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../../helpers/firebase/firebaseconfig.js";

export const createNewFirebaseUser = createAsyncThunk(
  "auth/createNewFirebaseUser",
  async (params) => {
    try {
      const { email, password } = params;
      const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response;
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      return error;
    }
  }
);

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

export const checkIfEmailExistsInFirebase = createAsyncThunk("auth/checkIfTheEmailExistsInFirebase",async (params) => {
  const response = await fetchSignInMethodsForEmail(
    auth,
    params.email,
  );
  return response;
})