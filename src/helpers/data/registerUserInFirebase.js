import { auth } from "../firebase/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as Sentry from "@sentry/react-native";

export const registerUserInFirebase = async (email, password) => {
  console.log("registerUserInFirebase profesional a guardar:", { email, password });
  try {
    let result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("registerUserInFirebase result", result);
    return "";
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error registerUserInFirebase:", error);
    let result_error = "";
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == "auth/weak-password") {
      result_error =
        "La contraseña ingresada es insegura, por favor ingresar más de 8 dígitos";
    } else {
      result_error = errorMessage;
    }

    throw new Error(result_error);
  }
};
