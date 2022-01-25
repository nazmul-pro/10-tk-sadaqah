// Import the functions you need from the SDKs you need
import  {initializeApp}  from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfAHhRFg0KnTtjgkr3n2zGhkVb8JNYEag",
  authDomain: "tksadaqah.firebaseapp.com",
  databaseURL: "https://tksadaqah-default-rtdb.firebaseio.com",
  projectId: "tksadaqah",
  storageBucket: "tksadaqah.appspot.com",
  messagingSenderId: "839242192963",
  appId: "1:839242192963:web:b32dee29206ed6a4541cf6"
};
// Initialize Firebase
const app =initializeApp(firebaseConfig);
//const db =firebase.firestore(app);

export const db =getFirestore(app);