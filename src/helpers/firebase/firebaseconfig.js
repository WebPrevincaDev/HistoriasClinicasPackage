import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAYf5tfdRtyS6jj2WugoBCO0X96n1voBI",
    authDomain: "historiasclinicaspackage.firebaseapp.com",
    projectId: "historiasclinicaspackage",
    storageBucket: "historiasclinicaspackage.appspot.com",
    messagingSenderId: "709312338238",
    appId: "1:709312338238:web:79cd01c9f395518181346f"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
