import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAYf5tfdRtyS6jj2WugoBCO0X96n1voBI",
  authDomain: "historiasclinicaspackage.firebaseapp.com",
  databaseURL: "https://historiasclinicaspackage-default-rtdb.firebaseio.com",
  projectId: "historiasclinicaspackage",
  storageBucket: "historiasclinicaspackage.appspot.com",
  messagingSenderId: "709312338238",
  appId: "1:709312338238:web:79cd01c9f395518181346f",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.firestore(app);
